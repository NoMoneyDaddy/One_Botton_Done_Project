# Zeabur MCP 整合指南：讓 AI 直接部署你的應用

在 Loop Engineering 框架中，我們追求「零門檻」的極致自動化體驗。透過整合 **Zeabur 官方 Model Context Protocol (MCP) 伺服器**，我們現在可以讓 AI（如 Claude Desktop、Cursor 或 Manus AI）**直接使用自然語言為您完成部署**，徹底免除切換到 Zeabur 控制台手動點擊的繁瑣過程 [1]。

---

## 什麼是 MCP？

Model Context Protocol (MCP) 是一個開放協定，相當於為 AI 應用程式提供了一個「USB-C 連接器」[1]。透過這個協定，AI 模型能夠安全且標準化地連接到不同的資料來源和外部工具。

當 AI 裝上 Zeabur MCP 伺服器後，它就擁有了直接操作 Zeabur 雲端資源的能力，包括建立專案、部署應用、綁定網域與查看日誌等 [1]。

---

## AI 部署的魔法：你可以這樣命令 AI

安裝設定完成後，您可以直接在 AI 助理中輸入以下指令，AI 將自動為您執行對應的 Zeabur 操作 [1]：

| 您的自然語言指令 | AI 將自動執行的 Zeabur 操作 |
| :--- | :--- |
| `請在 Zeabur 上幫我建立一個新專案，命名為 my-awesome-app` | 建立全新的 Zeabur 專案 |
| `請將這個 Node.js 應用程式部署到我的 Zeabur 專案中` | 建立服務並啟動部署流程 |
| `幫我的 Zeabur 服務綁定一個子網域` | 自動配置並綁定 `.zeabur.app` 網域 |
| `顯示我最近部署的應用程式日誌` | 獲取並分析部署日誌，協助除錯 |
| `幫我設定 Supabase URL 和 API Key 到環境變數中` | 安全地配置環境變數 |

---

## 如何安裝 Zeabur MCP 伺服器

### 前置準備
1. 已安裝支援 MCP 的 AI 助理（如 **Claude Desktop** 或 **Cursor**）[1]。
2. 已擁有 Zeabur 帳號。
3. 前往 Zeabur Dashboard 的設定頁面，生成並獲取您的 **Zeabur API Token** (`sk-xxxxxx`) [1]。

### 在 Claude Desktop 中設定

1. 打開 Claude Desktop 的設定檔：
   - **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
2. 將以下內容加入設定檔中（請將 `sk-xxxxxx` 替換為您的實際 Token）[1]：

```json
{
  "mcpServers": {
    "zeabur": {
      "command": "npx",
      "args": [
        "-y",
        "@zeabur/mcp-server"
      ],
      "env": {
        "ZEABUR_TOKEN": "sk-xxxxxx"
      }
    }
  }
}
```

3. **重新啟動 Claude Desktop**。啟動後，您會在對話框右下角看到一個小小的「插頭」圖示，表示 Zeabur MCP 已成功連線。

### 在 Cursor 中設定

1. 打開 Cursor 設定 (Settings) -> Features -> MCP。
2. 點擊 **"+ Add New MCP Server"**。
3. 填寫以下資訊：
   - **Name**: `Zeabur`
   - **Type**: `command`
   - **Command**: `npx -y @zeabur/mcp-server`
4. 在 Cursor 的環境變數設定中，新增 `ZEABUR_TOKEN` 並填入您的 API Token。
5. 點擊 Save 並重啟 Cursor。

---

## 結合 Loop Engineering 的終極工作流

透過整合 Zeabur MCP，Loop Engineering 的閉環變得更加完美：

1. **AI 規劃與開發**：AI 根據您的想法生成 `install.js`。
2. **本地執行**：您在 Codespaces 或 Cursor 中執行腳本，生成專案代碼。
3. **推送到 GitHub**：將代碼推送到您的 GitHub 倉庫。
4. **AI 直接部署 (全新！)**：您直接對 AI 說：「`代碼已推送到 GitHub，請幫我在 Zeabur 建立專案並部署這個倉庫。`」
5. **AI 自動完成**：AI 會透過 MCP 自動建立專案、連接您的 GitHub 倉庫、設定環境變數，並返回最終的訪問網址！

這就是真正的「一句話完成部署」！

---

## 常見問題 (FAQ)

**Q: Zeabur MCP 伺服器需要付費嗎？**
A: MCP 伺服器本身是完全免費的。不過，您在 Zeabur 平台上實際消耗的運算資源，仍會依照 Zeabur 的標準計費方式收費 [1]。

**Q: 把 API Token 放在設定檔中安全嗎？**
A: 您的 API Token 僅會安全地儲存在您的本地電腦設定檔中，只用於與 Zeabur API 進行通訊認證。請務必妥善保管該設定檔，不要將其分享或上傳至公開的 GitHub 倉庫 [1]。

**Q: 手機版 Claude 可以使用 MCP 嗎？**
A: 目前 MCP 協定主要支援桌面版應用程式（如 Claude Desktop 和 Cursor）。如果您純粹使用手機瀏覽器，仍建議使用 GitHub App 自動部署的傳統方式。

---

## References
[1] Zeabur. (2025). Zeabur MCP 伺服器整合官方文件. https://zeabur.com/docs/zh-TW/mcp
