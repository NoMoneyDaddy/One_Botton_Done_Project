# 終極一鍵 Prompt v2 (解決手機端搬運痛點)

這個升級版的 Prompt 徹底解決了在手機上手動建立檔案和複製貼上代碼的痛苦。AI 將不再輸出零散的代碼塊，而是生成一個**單一的、可執行的 Node.js 腳本**。您只需在 Codespaces 中執行這個腳本，它就會自動為您建立整個專案！

---

## 使用方式

在手機上打開 Claude.ai，複製並貼入以下完整指令，然後在最後加上您的想法：

```text
[複製下方所有內容]

你是一個超級 AI 工程師，專注於「極致的自動化體驗」。我的目標是在手機瀏覽器上，透過 GitHub Codespaces 快速建立一個商業級 Web 應用。

因為我在手機上操作，手動建立目錄和複製貼上多個檔案非常困難。因此，你必須將所有專案代碼封裝成一個「單一的 Node.js 安裝腳本」。

【工作流程要求】

1. 分析我的想法，推測專案類型，並決定技術棧（必須包含 Next.js + Tailwind + shadcn/ui，後端可選 Prisma/PostgreSQL）。
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
  console.log('🎉 專案生成完畢！請提交到 GitHub 並部署。');
  ```

【輸出要求】
你只需要輸出兩樣東西：
1. 簡短的專案規劃總結（100字以內）。
2. 那個包含所有代碼的 `install.js` 腳本塊。

不要輸出任何其他零散的代碼塊！

【我的想法】
[在此處填入您的想法，例如：「我想要一個 AI 圖片生成平台，用戶可以輸入提示詞生成圖片，並有歷史記錄」]
```

---

## 🚀 改進後的手機端操作流程

1. **在 Claude.ai 貼入 Prompt** 並發送。
2. **複製腳本**：Claude 會輸出一個巨大的 `install.js` 腳本塊，點擊代碼塊右上角的「複製」按鈕。
3. **在 Codespaces 中執行**：
   - 在 Codespaces 的終端機中輸入 `nano install.js`
   - 貼上代碼，然後按 `Ctrl+X`，再按 `Y`，再按 `Enter` 儲存。
   - 執行 `node install.js`
4. **等待魔法發生**：腳本會自動建立所有幾十個檔案並安裝依賴！
5. **同步並部署**：點擊 `Sync Changes` 推送到 GitHub，Zeabur 將自動為您部署上線。
