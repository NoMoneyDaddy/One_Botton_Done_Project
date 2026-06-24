# Codex Remote 配置與使用指南

當我們希望 AI Agent 擁有真正的「全自動化」能力，而不想手動「複製貼上」代碼時，我們可以利用 **Codex Remote**（或類似的遠端開發擴充功能）讓 AI 直接連線到雲端伺服器（如 GitHub Codespaces、AWS EC2 或 Zeabur 容器）進行操作。

## 1. 什麼是 Codex Remote？

Codex Remote 是一種架構模式，允許在本地（或手機瀏覽器）運行的 AI Agent，透過 SSH 或 WebSockets 直接將代碼寫入遠端伺服器，並在遠端執行終端機命令。

**優勢：**
- 📱 **手機端友好**：手機不具備執行 Node.js 或 Docker 的環境，但可以作為一個「遙控器」。
- 🤖 **AI 完全自主**：AI 可以直接呼叫 `npm install`、`git push`，真正實現無人值守的 Loop Engineering。
- ⚡ **資源無限**：編譯與測試都在雲端伺服器進行，不消耗本地算力。

## 2. 雲端環境準備 (以 GitHub Codespaces 為例)

GitHub Codespaces 是最容易獲取的雲端環境，我們已經在倉庫中預先配置了 `.devcontainer/devcontainer.json`。

1. 在您的 GitHub 倉庫點擊 `<> Code` -> `Codespaces` -> `Create codespace on main`。
2. 等待環境啟動。這個環境已經預裝了 Node.js、Git、Zeabur CLI 以及我們提供的 AI 指令碼（`scripts/`）。

## 3. 連接 AI Agent (Cursor Web 模式)

如果您使用的是 Cursor Web 或類似的 AI 編輯器：

1. 打開 Cursor Web，選擇 `Connect to Remote`。
2. 選擇 `GitHub Codespaces`。
3. 授權登入後，選擇您剛剛創建的 Codespace。
4. **完成！** 現在 Cursor 裡的 AI 已經「附身」在雲端伺服器上了。

## 4. 驅動 AI 進行遠端開發

在連接成功的遠端環境中，您可以在聊天視窗輸入以下「遠端專用金牌指令」：

> **角色設定**：你是一個具有伺服器完整控制權的 AI 工程師。你現在運行在雲端開發環境中。
> 
> **任務目標**：[您的想法，例如：建立一個帶有資料庫的任務管理系統]
> 
> **遠端工作流 (Remote Loop)**：
> 1. **環境檢查**：使用 `node scripts/validate.js` 檢查當前環境狀態。
> 2. **開發**：直接在工作區中建立與修改檔案。
> 3. **測試**：每完成一個模組，請在終端機執行對應的測試。如果報錯，請自動修復。
> 4. **提交與部署**：
>    - 開發完成後，呼叫 `node scripts/git_sync.js "完成任務管理系統"` 將代碼推送到 GitHub。
>    - (可選) 呼叫 `node scripts/zeabur_status.js` 確認 Zeabur 是否已自動攔截並開始部署。
> 
> **注意事項**：
> - 你擁有終端機執行權限，遇到問題請自行 `grep` 尋找錯誤原因。
> - 不要問我「是否要執行此命令」，請直接執行並回報結果。

## 5. 其他遠端方案 (SSH 模式)

如果您有自己的 VPS (如 AWS EC2 或 Zeabur 的自定義容器)：

1. 確保伺服器已安裝 Node.js 和 Git。
2. 將本倉庫 Clone 到伺服器：`git clone https://github.com/your-username/ai-loop-engineering-framework.git`
3. 在本地 AI Agent (如 Aider 或 Claude Desktop) 中配置 SSH 連線。
   - 範例 (Aider)：`aider --ssh user@your-server-ip:/path/to/repo`
4. AI 將透過 SSH 隧道在遠端執行所有 `scripts/` 下的指令碼。

## 6. 安全性警告

- **API 金鑰保護**：請確保您的 `.env` 檔案（包含 OpenAI/Claude/Zeabur 金鑰）**絕對不要**提交到 GitHub。我們的 `.gitignore` 已預設排除此檔案。
- **權限控制**：在遠端環境中，AI 具有執行任意代碼的權限。請確保您在安全的容器（如 Codespaces）中運行，避免影響宿主機。
