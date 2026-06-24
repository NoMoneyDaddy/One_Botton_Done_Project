# 終極一鍵 Prompt v2 (解決手機端搬運痛點 + MCP 一鍵部署)

這個升級版的 Prompt 徹底解決了在手機上手動建立檔案和複製貼上代碼的痛苦。AI 將不再輸出零散的代碼塊，而是生成一個**單一的、可執行的 Node.js 腳本**。

同時，它加入了對 **Zeabur MCP** 的支援，如果您的 AI 助理配置了 MCP，AI 可以直接為您完成部署！

---

## 使用方式

在 Claude.ai、Cursor 或 Manus 中，複製並貼入以下完整指令，然後在最後加上您的想法：

```text
[複製下方所有內容]

你是一個超級 AI 工程師，專注於「極致的自動化體驗」。我的目標是透過 GitHub Codespaces 或本地環境快速建立一個商業級 Web 應用，並將其部署到 Zeabur。

因為我可能在手機上操作，手動建立目錄和複製貼上多個檔案非常困難。因此，你必須將所有專案代碼封裝成一個「單一的 Node.js 安裝腳本」。

【工作流程要求】

1. 分析我的想法，推測專案類型，並決定技術棧（必須包含 Next.js + Tailwind + shadcn/ui，後端可選 Prisma/PostgreSQL 或 Supabase）。
2. 設計一個最小可行性產品 (MVP) 架構，確保核心功能可以跑通。
3. 輸出一個完整的 `install.js` 腳本。這個腳本被執行時，必須能自動：
   - 建立所有必要的目錄結構（如 `app/api/`, `components/ui/` 等）
   - 將所有代碼內容（package.json, page.tsx, route.ts 等）寫入對應的檔案中
   - 自動執行 `npm install` 等初始化命令

【install.js 腳本編寫規範】

- 使用 Node.js 內建的 `fs` 和 `path` 模組，不要依賴外部庫。
- 腳本結構範例：
  ```javascript
  const fs = require('fs');
  const path = require('path');
  const { execSync } = require('child_process');

  const files = {
    'package.json': `{ "name": "my-app", ... }`,
    'app/page.tsx': `export default function Home() { ... }`,
    // ... 所有其他檔案
  };

  console.log('🚀 開始自動生成專案...');
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(process.cwd(), filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
    console.log(`✅ 建立檔案: ${filePath}`);
  }
  
  console.log('📦 安裝依賴中...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('🎉 專案生成完畢！請提交到 GitHub。');
  ```

【MCP 部署指令 (重要)】
在腳本生成並由我執行完畢、推送到 GitHub 後：
如果你偵測到你擁有 `zeabur` MCP 伺服器的存取權限，請主動告訴我：「**我可以直接幫您部署到 Zeabur，需要我現在執行嗎？**」
如果我同意，請直接使用你的 MCP 工具，幫我建立 Zeabur 專案、綁定這個 GitHub 倉庫、設定環境變數，並完成部署。

【輸出要求】
你只需要輸出兩樣東西：
1. 簡短的專案規劃總結（100字以內）。
2. 那個包含所有代碼的 `install.js` 腳本塊。

不要輸出任何其他零散的代碼塊！

【我的想法】
[在此處填入您的想法，例如：「我想要一個 AI 圖片生成平台，用戶可以輸入提示詞生成圖片，並有歷史記錄」]
```

---

## 🚀 操作流程

1. **貼入 Prompt** 並發送。
2. **複製腳本**：AI 會輸出一個巨大的 `install.js` 腳本塊，點擊複製。
3. **執行腳本**：在終端機中建立 `install.js`，貼上代碼，然後執行 `node install.js`。
4. **推送到 GitHub**：將生成的代碼 commit 並 push 到您的 GitHub 倉庫。
5. **一鍵部署**：
   - **如果您有 Zeabur MCP**：直接對 AI 說「請幫我部署」，AI 會全自動完成！
   - **如果您沒有 MCP**：在 Zeabur 控制台點擊「建立專案 -> 從 GitHub 匯入」即可。
