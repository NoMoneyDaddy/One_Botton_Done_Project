# 手機端快速開始指南 (30 秒上手)

## 🚀 三步完成商業級專案

### 步驟 1️⃣：準備工作 (1 分鐘)
1. 在手機上打開 `github.com`，登入您的帳號
2. 點擊 `+` → `New repository`，取名 `my-awesome-app`，勾選 `Add a README`
3. 點擊 `Create repository`

### 步驟 2️⃣：啟動雲端編輯器 (1 分鐘)
1. 在倉庫頁面，點擊綠色的 `<> Code` 按鈕
2. 切換到 `Codespaces` 標籤
3. 點擊 `Create codespace on main`
4. 等待環境啟動（約 30-60 秒）

### 步驟 3️⃣：喚醒 AI 工程師 (1 分鐘)
1. 打開 `claude.ai` 新分頁
2. 複製 `prompts/ultimate_one_prompt.md` 中的完整指令
3. 在最後加上您的想法，例如：
   ```
   【我的想法】
   我想要一個個人記帳軟體，支援手機端，要有圖表分析
   ```
4. 發送

---

## ⏳ 接下來會發生什麼？

AI 將自動：
- ✅ 補全您的想法
- ✅ 推薦最佳技術棧
- ✅ 生成 6 階段開發計畫
- ✅ 生成所有代碼檔案
- ✅ 提供部署指令

---

## 📋 複製代碼到 Codespaces

當 AI 輸出代碼時，您只需：
1. **複製** AI 生成的代碼塊
2. 切換回 Codespaces 分頁
3. **貼上** 到對應的檔案中
4. 重複直到所有代碼都貼完

> 💡 **手機端小技巧**：長按代碼區可以複製；在 Codespaces 中長按檔案列表可以新增檔案

---

## 🚢 部署到 Zeabur

代碼都貼好後：

1. **同步到 GitHub**：在 Codespaces 左側點擊「Source Control」圖示，輸入提交訊息，點擊「Commit」，再點擊「Sync Changes」

2. **在 Zeabur 上部署**：
   - 打開 `zeabur.com`
   - 點擊 `Create Project`
   - 點擊 `Deploy New Service` → 選擇 `GitHub`
   - 授權後選擇您的倉庫
   - 點擊 `Deploy`

3. **等待部署完成** (2-5 分鐘)

4. **獲得正式 URL**：Zeabur 會給您一個類似 `https://my-app.zeabur.app` 的連結

---

## 🎉 完成！

您的商業級應用已上線！分享這個連結給朋友吧。

---

## ❓ 常見問題

**Q: 我可以在手機上修改代碼嗎？**
A: 可以！在 Codespaces 中修改後，點擊「Sync Changes」，Zeabur 會自動重新部署。

**Q: 如果代碼有錯誤？**
A: 在 Claude.ai 中告訴 AI 錯誤訊息，它會自動修復。

**Q: 我想添加更多功能？**
A: 在 Claude.ai 中說「請添加 [功能]」，AI 會生成新代碼，您再次同步即可。

---

## 📞 需要幫助？

- 查看 `docs/` 目錄中的詳細教學
- 閱讀 `prompts/ultimate_one_prompt.md` 了解完整流程
- 參考 `docs/codex_remote.md` 了解進階用法
