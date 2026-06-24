# 手機端一鍵式操作流程 (純 Web 方案)

本流程專為**手機瀏覽器**設計，完全不需要打開終端機，也不需要任何寫代碼的經驗。我們將利用 GitHub Codespaces (或 Cursor Web) 作為雲端編輯器，Claude.ai 作為大腦，Zeabur 作為自動部署平台。

## 準備工作 (僅需一次，約 3 分鐘)

1. **註冊必要帳號** (如果還沒有)：
   - GitHub (存放代碼)
   - Zeabur (負責讓網站上線)
   - Claude.ai (負責寫代碼)

## 完整開發流程 (Loop Engineering for Mobile)

### 步驟 1：在手機上創建「空白畫布」 (GitHub)
1. 打開手機瀏覽器，進入 `github.com`。
2. 點擊右上角的 `+` 號，選擇 `New repository` (新增倉庫)。
3. 隨便取個名字（例如 `my-app`），勾選 `Add a README file`，然後點擊 `Create repository`。

### 步驟 2：喚醒雲端編輯器 (Codespaces)
1. 在剛創建的倉庫頁面，點擊綠色的 `<> Code` 按鈕。
2. 切換到 `Codespaces` 標籤，點擊 `Create codespace on main`。
3. 等待幾秒鐘，您的手機瀏覽器中會出現一個完整的代碼編輯器。

### 步驟 3：呼叫 AI 工程師 (Claude.ai)
1. 在手機上開一個新的瀏覽器分頁，進入 `claude.ai`。
2. 複製我們提供的**「Web 端專屬金牌指令」**，並在最後加上您的想法（例如：「幫我做一個可以記帳的網站」）。
3. 貼給 Claude。

### 步驟 4：搬運工模式 (AI 寫代碼，您負責貼上)
Claude 會開始輸出代碼。您只需要做一件事：**複製與貼上**。

1. Claude 會說：「請創建 `package.json` 並貼入以下內容」。
2. 您切換到 Codespaces 的分頁，點擊左側的新增檔案圖示，命名為 `package.json`，然後貼上代碼。
3. 回到 Claude，回覆「已完成，繼續」。
4. 重複這個過程，直到 Claude 說「所有代碼已生成完畢」。

> **💡 手機端小技巧**：在 Codespaces 中，長按檔案列表可以新增檔案；長按代碼區可以貼上。

### 步驟 5：一鍵同步到雲端 (Git Push)
代碼都貼好後，我們需要把它們「存檔」。

1. 在 Codespaces 左側的圖示欄中，找到一個看起來像「樹枝分岔」的圖示（Source Control）。
2. 在輸入框中隨便打幾個字（例如 `init`）。
3. 點擊藍色的 `Commit` 按鈕，然後點擊 `Sync Changes`。
*(這一步相當於告訴 GitHub：我的代碼寫好了！)*

### 步驟 6：見證奇蹟的時刻 (Zeabur 自動部署)
現在，我們要讓全世界都能看到您的網站。

1. 打開瀏覽器新分頁，進入 `zeabur.com/dash`。
2. 點擊 `Create Project` (創建專案)。
3. 點擊 `Deploy New Service`，選擇 `GitHub`。
4. 授權 Zeabur 存取您的 GitHub，然後在列表中選擇您剛剛創建的 `my-app` 倉庫。
5. 點擊 `Deploy`。

**🎉 完成！**
Zeabur 會自動讀取您的代碼並開始構建。大約 1-2 分鐘後，它會給您一個專屬的網址（例如 `my-app.zeabur.app`）。點擊它，您就能在手機上看到由 AI 為您打造的商業級專案了！

---

## 為什麼這個流程能成功？

- **無終端限制**：我們用 GitHub App 的自動化觸發機制，取代了傳統的 CLI 指令。
- **降維打擊**：使用者不需要懂什麼是 `npm install`，Codespaces 會在背景自動處理。使用者只需要扮演「複製貼上」的搬運工。
- **完美閉環**：如果網站有 Bug，使用者只需截圖或複製錯誤訊息給 Claude，Claude 會給出修正後的代碼，使用者再次「貼上 → Sync → Zeabur 自動更新」，這就是最純粹的 Loop Engineering。
