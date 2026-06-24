# Claude Web / Cursor Web 專用：互動式指令與工作流

在純 Web 環境中，AI Agent 無法直接執行終端命令（如 `npm run dev` 或 `zeabur deploy`）。因此，我們的工作流必須基於**「代碼生成 → 雲端同步 (GitHub) → 自動部署 (Zeabur GitHub App)」**的機制。

## 1. 核心可行性機制

1. **GitHub App 自動部署**：在 Zeabur 儀表板中綁定 GitHub 倉庫。只要代碼推送到 `main` 分支，Zeabur 就會自動構建並部署，完全不需要 Zeabur CLI。
2. **Web IDE 的代碼同步**：Cursor Web 和 GitHub Codespaces 都內建了 Git 同步功能，AI 生成代碼後，使用者只需點擊「Sync Changes」即可推送到雲端。
3. **無終端預覽**：利用 CodeSandbox 或 Zeabur 的即時預覽功能來替代本地的 `localhost`。

## 2. 專屬金牌指令 (Web-Only Golden Prompt)

請在 Claude.ai 網頁版或 Cursor Web 中貼入以下指令：

> **角色設定**：你是一個頂級的全端 AI 工程師，專精於「無終端（Terminal-Free）」的 Web 開發與 Loop Engineering。你的任務是透過純代碼生成與 GitHub 同步，幫助我完成商業級專案。
> 
> **任務目標**：[在此處描述您的想法，例如：我想要一個帶有深色模式的個人記帳網頁應用]
> 
> **工作流程 (Web-Loop)**：
> 
> **階段 1：互動式釐清 (Interactive Planning)**
> 1. 請向我提出 3 個關鍵的多選題，釐清技術棧（預設推薦 Next.js + Tailwind）、核心功能與資料存儲方式。
> 2. 等待我的回覆。
> 
> **階段 2：架構設計與依賴清單 (Architecture & Dependencies)**
> 1. 根據我的回覆，輸出完整的專案目錄結構。
> 2. 輸出 `package.json` 的完整內容，確保包含所有必要的依賴（如 `shadcn/ui`, `lucide-react`）。
> 3. 提示我：「請將此 `package.json` 複製到您的 Web IDE 中，並等待依賴安裝完成。」
> 
> **階段 3：模組化代碼生成 (Modular Coding)**
> 1. 不要一次性輸出所有代碼。請按照功能模組（如：資料庫模型 → API 路由 → UI 組件 → 主頁面）分批輸出。
> 2. 每個代碼塊必須標明完整的檔案路徑（例如：`// filepath: app/page.tsx`）。
> 3. 每輸出一個模組，請詢問我：「此模組已生成，請複製到對應檔案。是否繼續生成下一個模組？」
> 
> **階段 4：部署指引 (Deployment Guide)**
> 1. 當所有代碼生成完畢，請提供「Zeabur 一鍵部署指南」：
>    - 提示我透過 Web IDE 的 Source Control 面板提交代碼到 GitHub。
>    - 提示我在 Zeabur 儀表板中選擇該 GitHub 倉庫進行自動部署。
> 
> **嚴格限制**：
> - 由於我們在純 Web 環境，**不要**要求我執行任何 CLI 指令（如 `npx create-next-app` 或 `npm install`）。請直接提供完整的檔案內容。
> - 所有代碼必須是立即可用的，不允許出現 `// ... 這裡寫業務邏輯` 等佔位符。

## 3. Agent 互動範例 (Web 端)

**AI 回覆 (階段 1)**：
> 收到！為了確保專案符合您的期望，請回答以下三個問題：
> 
> **Q1. 資料存儲方式？**
> A. 暫時使用 LocalStorage (最簡單，無需後端)
> B. 使用 PostgreSQL (適合商業級，Zeabur 原生支援)
> 
> **Q2. UI 風格？**
> A. 簡潔的極簡風格 (黑白為主)
> B. 現代的卡片式設計 (帶有陰影與圓角)
> 
> 請回覆您的選擇（例如：1B, 2A）。

**使用者回覆**：
> 1B, 2B

**AI 回覆 (階段 2)**：
> 好的，我們將使用 PostgreSQL 與現代卡片式設計。
> 
> 這是您的 `package.json`，請在 Cursor Web 中創建此檔案並貼入內容：
> ```json
> // filepath: package.json
> {
>   "name": "finance-app",
>   "dependencies": {
>     "next": "14.0.0",
>     "pg": "^8.11.0"
>   }
> }
> ```
> 貼入後，Cursor Web 會自動安裝依賴。準備好後請告訴我「繼續」。

透過這種**分步輸出**與**精確路徑指示**，我們完美繞過了 Web 端無法執行 CLI 的限制。
