# AI Loop Engineering Framework 🚀

**「一個想法 + 一台手機 = 完整的商業級專案」**

這是一個專為 AI Agent（如 Claude, Cursor）設計的終極開發框架。我們將複雜的軟體工程流程（規劃、開發、測試、部署）封裝為純 Web 端的自動化工作流。

無論您是創業者、接案者，還是毫無代碼經驗的新手，只需透過手機瀏覽器，即可指揮 AI 為您打造商業級的 Web 應用程式。

---

## 🌟 核心特色

- 📱 **純手機端支援**：完全不需要電腦或本地終端機，所有操作皆在瀏覽器內完成。
- 🤖 **Claude Web 完美相容**：專為 Claude.ai 網頁版設計的互動式指令。
- 🔄 **Loop Engineering**：AI 自動完成「寫代碼 → 測試 → 修正 → 部署」的完美閉環。
- ⚡ **Zeabur 一鍵部署**：利用 GitHub App 自動觸發部署，零配置上線。
- 🛠️ **內建 AI 指令碼**：提供 `grep`, `write`, `validate` 等 API，讓 AI 具備強大的環境操作能力。

---

## 🚀 快速開始 (手機端 3 分鐘上手) - ✨ V2 全新升級！

> **🔥 V2 重大更新**：徹底解決了手機端「手動建立檔案與複製貼上代碼」的痛苦！現在 AI 會生成一個單一的 `install.js` 腳本，一鍵為您建立整個專案！

### 步驟 1：Fork 本倉庫
點擊右上角的 **Fork** 按鈕，將此框架複製到您的 GitHub 帳號下。

### 步驟 2：喚醒雲端編輯器
在您 Fork 的倉庫頁面，點擊綠色的 `<> Code` 按鈕，選擇 `Codespaces`，然後點擊 `Create codespace on main`。
*(這將為您準備好一個包含所有依賴的雲端開發環境)*

### 步驟 3：指揮 AI
打開 [Claude.ai](https://claude.ai)，複製 `prompts/ultimate_one_prompt_v2.md` 中的「終極一鍵指令 V2」，並在最後加上您的想法。

### 步驟 4：一鍵安裝魔法 (V2 新功能)
AI 會輸出一個包含所有代碼的 `install.js` 腳本。您只需在 Codespaces 終端機執行：
```bash
nano install.js # 貼上代碼後儲存
node install.js # 一鍵自動建立所有幾十個檔案！
```

### 步驟 5：一鍵上線
代碼貼完後，在 Codespaces 中點擊 `Sync Changes` 推送到 GitHub。
接著前往 [Zeabur](https://zeabur.com)，綁定此 GitHub 倉庫，您的網站將自動部署上線！

---

## 📚 詳細教學文檔

- [🛠️ 技術棧對比與選擇指南](docs/tech_stack_guide.md) (✨ 新增)
- [🚀 Zeabur 與 GitHub 自動部署工作流詳解](docs/zeabur_github_workflow.md) (✨ 新增)
- [🚨 深度檢視與 V2 改進報告](docs/simulation_report.md) (🔥 最新)
- [🔄 閉環修復機制：GitHub Actions](docs/github_actions_loop.md) (🔥 最新)
- [📱 手機端一鍵式操作流程](docs/mobile_workflow.md)
- [🤖 Claude Web 專用指南與 Prompt](docs/claude_web_guide.md)
- [☁️ Codex Remote 配置與使用指南](docs/codex_remote.md)
- [🏗️ 純 Web 架構設計說明](docs/architecture.md)

---

## 🛠️ AI 可調用的指令碼 (Scripts)

本框架在 `scripts/` 目錄下提供了專供 AI 調用的工具：
- `file_ops.js`：提供 `read`, `write`, `grep` 功能。
- `git_sync.js`：自動化 Git 提交與推送。
- `validate.js`：執行 ESLint 與單元測試。
- `zeabur_deploy.js`：觸發 Zeabur 部署 API。

*(AI 可以透過 Node.js 執行這些腳本，實現自動化操作)*

---

## 🤝 貢獻與社群

歡迎提交 Pull Request 或建立 Issue 來改進此框架！我們致力於讓 AI 開發變得更加普及與簡單。
