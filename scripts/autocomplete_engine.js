#!/usr/bin/env node

/**
 * AI 自動補全引擎
 * 功能：根據使用者的片段輸入，自動補全想法、技術棧、專案計畫等
 * 使用方式：node scripts/autocomplete_engine.js <mode> <input>
 * 
 * 模式：
 *   - idea: 補全專案想法
 *   - tech-stack: 推薦技術棧
 *   - project-plan: 生成完整的專案計畫
 */

const fs = require('fs');
const path = require('path');

// 載入技術棧配置
const configPath = path.join(__dirname, '../config/tech_stack_recommendations.json');
const techConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const mode = process.argv[2];
const input = process.argv[3] || '';

// ============ 模式 1: 補全想法 ============
function completeIdea(partialIdea) {
  const keywords = partialIdea.toLowerCase().split(' ');
  let detectedType = null;
  let confidence = 0;

  // 根據關鍵字推測專案類型
  for (const [type, config] of Object.entries(techConfig.projectTypes)) {
    const typeKeywords = config.keywords;
    const matches = keywords.filter(kw => typeKeywords.some(tk => tk.includes(kw) || kw.includes(tk)));
    if (matches.length > confidence) {
      confidence = matches.length;
      detectedType = type;
    }
  }

  if (!detectedType) {
    detectedType = 'web-app'; // 預設
  }

  const projectConfig = techConfig.projectTypes[detectedType];
  
  return {
    status: 'success',
    mode: 'idea_completion',
    originalIdea: partialIdea,
    detectedType: detectedType,
    projectName: projectConfig.name,
    description: projectConfig.description,
    suggestedFeatures: projectConfig.exampleFeatures,
    completedIdea: `${partialIdea}。這是一個${projectConfig.name}，將包含以下功能：${projectConfig.exampleFeatures.slice(0, 3).join('、')}。`
  };
}

// ============ 模式 2: 推薦技術棧 ============
function recommendTechStack(projectType) {
  const config = techConfig.projectTypes[projectType];
  
  if (!config) {
    return {
      status: 'error',
      message: `Unknown project type: ${projectType}. Available types: ${Object.keys(techConfig.projectTypes).join(', ')}`
    };
  }

  return {
    status: 'success',
    mode: 'tech_stack_recommendation',
    projectType: projectType,
    projectName: config.name,
    recommendedStack: config.recommendedStack,
    exampleFeatures: config.exampleFeatures,
    packageJson: generatePackageJson(projectType)
  };
}

// ============ 模式 3: 生成專案計畫 ============
function generateProjectPlan(projectType, additionalContext = '') {
  const config = techConfig.projectTypes[projectType];
  
  if (!config) {
    return {
      status: 'error',
      message: `Unknown project type: ${projectType}`
    };
  }

  const plan = {
    status: 'success',
    mode: 'project_plan_generation',
    projectType: projectType,
    projectName: config.name,
    overview: config.description,
    techStack: config.recommendedStack,
    phases: [
      {
        phase: 1,
        name: '需求分析與架構設計',
        duration: '1-2 天',
        tasks: [
          '確認核心功能需求',
          '設計資料庫 Schema',
          '規劃 API 端點',
          '設計 UI/UX 流程'
        ]
      },
      {
        phase: 2,
        name: '環境設置與初始化',
        duration: '0.5-1 天',
        tasks: [
          '初始化 Next.js 專案',
          '配置 Tailwind CSS 與 shadcn/ui',
          '設置 Prisma ORM',
          '配置 ESLint 與 Prettier'
        ]
      },
      {
        phase: 3,
        name: '後端開發',
        duration: '3-5 天',
        tasks: [
          '實現數據庫模型',
          '開發 API 路由',
          '實現認證邏輯',
          '編寫單元測試'
        ]
      },
      {
        phase: 4,
        name: '前端開發',
        duration: '3-5 天',
        tasks: [
          '設計 UI 組件',
          '實現頁面與路由',
          '集成 API 調用',
          '實現表單驗證'
        ]
      },
      {
        phase: 5,
        name: '測試與優化',
        duration: '2-3 天',
        tasks: [
          '端到端測試',
          '效能優化',
          '安全性審查',
          '使用者體驗測試'
        ]
      },
      {
        phase: 6,
        name: '部署與上線',
        duration: '1 天',
        tasks: [
          '配置 Zeabur 環境變數',
          '執行 GitHub App 自動部署',
          '驗證正式環境',
          '設置監控與日誌'
        ]
      }
    ],
    estimatedDuration: '11-17 天',
    keyMilestones: [
      '完成架構設計',
      '後端 API 可用',
      '前端基礎頁面完成',
      '完整功能測試通過',
      '正式環境上線'
    ]
  };

  return plan;
}

// ============ 輔助函數: 生成 package.json ============
function generatePackageJson(projectType) {
  const config = techConfig.projectTypes[projectType];
  
  const dependencies = {
    'next': '^14.0.0',
    'react': '^18.2.0',
    'react-dom': '^18.2.0',
    'typescript': '^5.0.0',
    'tailwindcss': '^3.3.0',
    'postcss': '^8.4.0',
    'autoprefixer': '^10.4.0'
  };

  // 根據專案類型添加特定依賴
  if (projectType === 'web-app' || projectType === 'landing-page') {
    Object.assign(dependencies, {
      '@prisma/client': '^5.0.0',
      'shadcn-ui': 'latest',
      'lucide-react': '^0.263.0'
    });
  }

  if (projectType === 'data-dashboard') {
    Object.assign(dependencies, {
      'recharts': '^2.10.0',
      'plotly.js-dist-min': '^2.26.0'
    });
  }

  if (projectType === 'ecommerce') {
    Object.assign(dependencies, {
      'stripe': '^13.0.0',
      'next-auth': '^4.23.0'
    });
  }

  return {
    name: `ai-generated-${projectType}`,
    version: '0.1.0',
    private: true,
    scripts: {
      'dev': 'next dev',
      'build': 'next build',
      'start': 'next start',
      'lint': 'eslint . --ext .ts,.tsx',
      'test': 'jest'
    },
    dependencies: dependencies,
    devDependencies: {
      '@types/node': '^20.0.0',
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@typescript-eslint/eslint-plugin': '^6.0.0',
      '@typescript-eslint/parser': '^6.0.0',
      'eslint': '^8.0.0',
      'eslint-config-next': '^14.0.0',
      'prettier': '^3.0.0',
      'jest': '^29.0.0',
      '@testing-library/react': '^14.0.0'
    }
  };
}

// ============ 主程式 ============
try {
  let result;

  switch (mode) {
    case 'idea':
      result = completeIdea(input);
      break;
    case 'tech-stack':
      result = recommendTechStack(input);
      break;
    case 'project-plan':
      result = generateProjectPlan(input);
      break;
    default:
      result = {
        status: 'error',
        message: `Unknown mode: ${mode}. Available modes: idea, tech-stack, project-plan`
      };
  }

  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.log(JSON.stringify({
    status: 'error',
    message: e.message
  }));
  process.exit(1);
}
