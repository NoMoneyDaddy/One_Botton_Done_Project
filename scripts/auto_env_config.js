#!/usr/bin/env node

/**
 * 自動環境變數配置腳本（已更新）
 * 根據技術棧自動生成 .env.local 模板
 * 並提供互動式 API Key 詢問
 * 以及 Zeabur 環境變數配置指南
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 讀取環境變數模板
const envTemplates = require('../config/env_templates.json');

// 創建 readline 介面用於互動
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * 詢問用戶問題
 * @param {string} question - 問題文本
 * @returns {Promise<string>} 用戶的回答
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

/**
 * 根據技術棧生成 .env.local 內容
 * @param {string} techStack - 技術棧標識
 * @param {Object} apiKeys - 用戶提供的 API Key
 * @returns {string} .env.local 文件內容
 */
function generateEnvFile(techStack, apiKeys = {}) {
  const template = envTemplates.env_templates[techStack];
  
  if (!template) {
    console.error(`❌ 未知的技術棧: ${techStack}`);
    console.log('可用的技術棧:');
    Object.keys(envTemplates.env_templates).forEach(key => {
      console.log(`  - ${key}: ${envTemplates.env_templates[key].description}`);
    });
    process.exit(1);
  }

  let envContent = `# ${template.description}\n`;
  envContent += `# 生成時間: ${new Date().toISOString()}\n`;
  envContent += `# ⚠️ 重要: 不要將此文件提交到 GitHub!\n\n`;

  // 添加所有變數
  Object.entries(template.variables).forEach(([key, config]) => {
    envContent += `# ${config.description}\n`;
    if (config.required) {
      envContent += `# ⚠️ 必須配置\n`;
    }
    
    // 如果用戶提供了該 API Key，使用它；否則使用示例
    const value = apiKeys[key] || config.example;
    envContent += `${key}=${value}\n\n`;
  });

  return envContent;
}

/**
 * 詢問用戶 API Key
 * @param {string} techStack - 技術棧標識
 * @returns {Promise<Object>} 用戶提供的 API Key
 */
async function askForAPIKeys(techStack) {
  const template = envTemplates.env_templates[techStack];
  const apiKeys = {};

  console.log('\n🔑 API Key 配置\n');
  console.log('以下是您的應用需要的 API Key。\n');

  for (const [key, config] of Object.entries(template.variables)) {
    if (config.required && key.includes('KEY') || key.includes('URL') || key.includes('ID')) {
      console.log(`\n📋 ${config.description}`);
      console.log(`   示例: ${config.example}`);
      
      const answer = await askQuestion(`\n您是否有 ${key}? (有/沒有/跳過) > `);
      
      if (answer === '有' || answer === '1' || answer === 'yes' || answer === 'y') {
        const apiKey = await askQuestion(`請提供 ${key}: `);
        if (apiKey) {
          apiKeys[key] = apiKey;
          console.log('✅ 已保存');
        }
      } else if (answer === '沒有' || answer === '2' || answer === 'no' || answer === 'n') {
        console.log(`⚠️ 您可以稍後在 Zeabur Dashboard 中添加 ${key}`);
      } else if (answer === '跳過' || answer === '3' || answer === 'skip') {
        console.log(`⏭️ 已跳過 ${key}`);
      }
    }
  }

  return apiKeys;
}

/**
 * 生成 Zeabur 環境變數配置指南
 * @param {string} techStack - 技術棧標識
 * @param {Object} apiKeys - 用戶提供的 API Key
 * @returns {string} 配置指南
 */
function generateZeabur Guide(techStack, apiKeys = {}) {
  const template = envTemplates.env_templates[techStack];
  
  if (!template) {
    return '';
  }

  let guide = `# Zeabur 環境變數配置指南\n\n`;
  guide += `## ${template.description}\n\n`;
  guide += `### 必須配置的環境變數:\n\n`;

  const requiredVars = Object.entries(template.variables).filter(
    ([_, config]) => config.required
  );

  requiredVars.forEach(([key, config]) => {
    guide += `#### ${key}\n`;
    guide += `- **描述**: ${config.description}\n`;
    guide += `- **公開**: ${config.public ? '是 (NEXT_PUBLIC_* 或 VITE_*)' : '否 (敏感信息)'}\n`;
    
    if (apiKeys[key]) {
      guide += `- **狀態**: ✅ 已配置\n`;
    } else {
      guide += `- **狀態**: ⚠️ 需要配置\n`;
      guide += `- **示例**: ${config.example}\n`;
    }
    guide += '\n';
  });

  guide += `### 在 Zeabur 中配置步驟:\n\n`;
  guide += `1. 前往 [Zeabur Dashboard](https://zeabur.com/projects)\n`;
  guide += `2. 選擇您的項目\n`;
  guide += `3. 點擊 "Settings" → "Environment Variables"\n`;
  guide += `4. 點擊 "Add Variable"\n`;
  guide += `5. 填入以下環境變數:\n\n`;

  requiredVars.forEach(([key, config]) => {
    if (apiKeys[key]) {
      guide += `   - **${key}**: [已在本地配置]\n`;
    } else {
      guide += `   - **${key}**: [請填入您的值]\n`;
    }
  });

  guide += `\n6. 點擊 "Save" 並等待應用自動重新部署\n`;
  guide += `\n### ⚠️ 安全提示:\n`;
  guide += `- 不要將 .env.local 文件提交到 GitHub\n`;
  guide += `- API Key 應該只在 Zeabur Dashboard 中配置\n`;
  guide += `- 定期輪換您的 API Key\n`;

  return guide;
}

/**
 * 主函數
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法: node auto_env_config.js <techStack> [output]');
    console.log('\n可用的技術棧:');
    Object.entries(envTemplates.env_templates).forEach(([key, config]) => {
      if (key !== 'common') {
        console.log(`  - ${key}: ${config.description}`);
      }
    });
    console.log('\n示例:');
    console.log('  node auto_env_config.js next_js_supabase');
    console.log('  node auto_env_config.js next_js_postgresql .env.local');
    rl.close();
    process.exit(0);
  }

  const techStack = args[0];
  const outputFile = args[1] || '.env.local';

  try {
    // 詢問用戶 API Key
    const apiKeys = await askForAPIKeys(techStack);

    // 生成 .env.local 文件
    const envContent = generateEnvFile(techStack, apiKeys);
    fs.writeFileSync(outputFile, envContent);
    console.log(`\n✅ 已生成 ${outputFile}`);

    // 生成 Zeabur 配置指南
    const zeabur Guide = generateZeabur Guide(techStack, apiKeys);
    const guideFile = '.env.zeabur.guide.md';
    fs.writeFileSync(guideFile, zeabur Guide);
    console.log(`✅ 已生成 ${guideFile}`);

    console.log('\n📋 下一步:');
    console.log(`1. 編輯 ${outputFile} 填入實際的環境變數值`);
    console.log(`2. 參考 ${guideFile} 在 Zeabur 中配置環境變數`);
    console.log('3. ⚠️ 不要將 .env.local 提交到 GitHub');
    console.log('4. 推送代碼到 GitHub，Zeabur 將自動部署');

  } catch (error) {
    console.error('❌ 錯誤:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
