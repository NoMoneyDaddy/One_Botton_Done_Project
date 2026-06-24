# Zeabur 與 GitHub 自動部署工作流詳解

本指南將詳細說明如何將 GitHub 倉庫與 Zeabur 整合，實現「程式碼推送即部署」的自動化工作流。這套工作流已經過全面驗證，確保流暢無斷點。

## 1. 工作流架構概覽

這套自動化工作流的核心在於 **Zeabur 的 GitHub App 整合**。架構如下：

1. **開發階段**：在 GitHub Codespaces 或本地環境中編寫程式碼。
2. **版本控制**：將程式碼推送到 GitHub 倉庫的特定分支（通常是 `main`）。
3. **自動觸發**：Zeabur 監聽到 GitHub 的 Webhook 事件。
4. **自動構建與部署**：Zeabur 自動拉取最新程式碼，進行構建，並將新版本部署上線。

## 2. 前置準備

在開始之前，請確保您已具備以下條件：
* 一個 GitHub 帳號，並已創建您的專案倉庫。
* 一個 Zeabur 帳號（可使用 GitHub 登入）。

## 3. 整合步驟 (一次性設定)

### 步驟 1：在 Zeabur 創建專案
1. 登入 [Zeabur 控制台](https://dash.zeabur.com/)。
2. 點擊 **Create Project** 創建一個新專案。
3. 選擇部署區域（建議選擇離您目標使用者最近的區域）。

### 步驟 2：授權 GitHub App
1. 在專案中，點擊 **Deploy New Service**。
2. 選擇 **Deploy from GitHub**。
3. 如果這是您第一次使用，點擊 **Configure GitHub App**。
4. 在 GitHub 授權頁面中，選擇您要授權的儲存庫。
   > **⚠️ 最佳實踐提示**：為了安全性，建議選擇 **Only select repositories**，並僅勾選您要部署的專案倉庫，而非授權所有倉庫。

### 步驟 3：綁定儲存庫與分支
1. 授權完成後，回到 Zeabur 控制台。
2. 搜尋並選擇您的目標儲存庫。
3. 選擇要部署的分支（通常是 `main` 或 `master`）。
4. 點擊 **Deploy**。

## 4. 環境變數配置 (關鍵步驟)

如果您的專案需要環境變數（例如資料庫連線字串、API 金鑰），必須在 Zeabur 中進行配置，**絕對不要將敏感資訊提交到 GitHub**。

1. 在 Zeabur 控制台中，點擊您剛部署的服務。
2. 進入 **Variables** 標籤頁。
3. 點擊 **Add Variable**，將您的環境變數（如 `.env` 檔案中的內容）逐一加入。
4. Zeabur 會自動重新部署以套用新的環境變數。

## 5. 自動部署工作流驗證

設定完成後，您可以透過以下步驟驗證自動部署工作流是否暢通：

1. **修改程式碼**：在您的開發環境（如 Codespaces）中，對專案進行一個小修改（例如修改頁面標題）。
2. **提交並推送**：
   ```bash
   git add .
   git commit -m "chore: update title to test auto-deployment"
   git push origin main
   ```
3. **觀察 Zeabur 控制台**：
   * 切換到 Zeabur 控制台。
   * 您應該會看到該服務的狀態變為 **Building**。
   * 點擊服務可以查看即時的構建日誌。
4. **驗證上線**：
   * 當狀態變為 **Running** 時，點擊 Zeabur 提供的域名。
   * 檢查您的修改是否已成功反映在線上版本中。

## 6. 常見問題與故障排除

### Q: 推送程式碼後，Zeabur 沒有自動觸發構建？
* **檢查分支**：確認您推送的分支與 Zeabur 中綁定的分支一致。
* **檢查權限**：確認 Zeabur GitHub App 仍有該儲存庫的存取權限。
* **手動觸發**：在 Zeabur 控制台中，您可以點擊 **Redeploy** 按鈕手動觸發部署。

### Q: 構建失敗 (Build Failed) 怎麼辦？
* **查看日誌**：點擊失敗的部署記錄，仔細查看構建日誌。常見的錯誤包括依賴安裝失敗（如 `npm install` 報錯）或 TypeScript 編譯錯誤。
* **本地重現**：嘗試在本地執行 `npm run build`，確保本地能成功構建。

### Q: 部署成功但應用程式無法訪問？
* **檢查環境變數**：確保所有必需的環境變數都已在 Zeabur 中正確配置。
* **檢查啟動指令**：確認您的專案 `package.json` 中的 `start` 指令是正確的。

## 7. 進階技巧：資料庫整合

Zeabur 原生支援多種資料庫（如 PostgreSQL、MySQL、Redis）。您可以直接在 Zeabur 專案中創建資料庫服務：

1. 點擊 **Deploy New Service** → **Deploy from Marketplace**。
2. 選擇 **PostgreSQL**（或其他資料庫）。
3. 創建完成後，Zeabur 會自動生成連線字串（如 `DATABASE_URL`）。
4. 您可以將此連線字串注入到您的應用程式服務的環境變數中。

透過這種方式，您的前端、後端與資料庫都能在 Zeabur 內網中高效通訊，實現完美的閉環部署。
