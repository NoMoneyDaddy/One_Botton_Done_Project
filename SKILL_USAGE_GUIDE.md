# 🎯 Manus Skill 使用指南：loop-engineering

## 什麼是 loop-engineering Skill？

`loop-engineering` 是一個為 Manus AI 設計的專業 Skill，它將整個「AI 驅動開發框架」封裝成一個可重複使用的工具。當您使用這個 Skill 時，Manus 會自動：

1. **詢問您的技術偏好**（前端框架、資料庫、UI 組件庫等）
2. **根據您的選擇生成完整代碼**
3. **自動部署到 Zeabur**

## 🚀 5 分鐘快速開始

### 步驟 1：導入 Skill

1. 打開 Manus AI
2. 在檔案瀏覽器中找到 `skills/loop-engineering/SKILL.md`
3. 點擊「添加到我的技能」按鈕
4. 確認導入完成

### 步驟 2：觸發 Skill

在 Manus 的對話框中，輸入：

```
使用 loop-engineering 技能，幫我做一個 [您的想法]
```

**例子：**
- 「使用 loop-engineering 技能，幫我做一個 AI 圖片生成平台」
- 「使用 loop-engineering 技能，幫我做一個個人記帳軟體」
- 「使用 loop-engineering 技能，幫我做一個實時協作文檔編輯器」

### 步驟 3：回答技術棧問題

Manus 會問您 5 個問題，例如：

```
好的！在開始寫代碼前，請選擇您偏好的技術棧：

【前端框架】
1. Next.js (推薦，全棧框架)
2. React + Vite (輕量級)
3. Vue (溫和的學習曲線)
4. 純 HTML + Vanilla JS (最簡單)

您的選擇？
```

您只需輸入選項編號即可。

### 步驟 4：等待代碼生成

Manus 會根據您的選擇生成：
- 完整的 `install.js` 一鍵安裝腳本
- 所有必要的源代碼檔案
- 環境變數配置指南
- 部署到 Zeabur 的具體步驟

### 步驟 5：執行與部署

1. **複製 `install.js`** 到您的 GitHub Codespaces
2. **執行**：`node install.js`
3. **推送到 GitHub**：`git push origin main`
4. **在 Zeabur 部署**：綁定您的 GitHub 倉庫，自動部署

## 💡 常見問題

### Q：我可以選擇哪些技術棧？

**前端框架：**
- Next.js（推薦）
- React + Vite
- Vue
- 純 HTML + Vanilla JS

**資料庫：**
- Supabase（無伺服器 PostgreSQL）
- PostgreSQL + Prisma
- MongoDB
- Firebase
- 不使用資料庫

**UI 組件庫：**
- shadcn/ui（推薦）
- Tailwind CSS
- Bootstrap
- 無框架

### Q：如果我不確定選擇，怎麼辦？

您可以回覆 Manus：
```
請幫我決定
```

Manus 會根據您的想法推薦最合適的技術棧。

### Q：生成的代碼品質如何？

所有生成的代碼都遵循商業級標準：
- ✅ 現代化的 UI（深色模式、響應式設計）
- ✅ 完善的錯誤處理
- ✅ 效能優化
- ✅ 安全最佳實踐
- ✅ 完整的 TypeScript 類型

### Q：我可以修改生成的代碼嗎？

當然可以！生成的代碼是完全可定制的。您可以：
- 修改功能
- 添加新的頁面或 API
- 改變設計
- 整合第三方服務

### Q：部署到 Zeabur 需要額外費用嗎？

Zeabur 提供免費額度，足以運行小型到中型應用。如果您需要更多資源，可以升級到付費方案。

### Q：如果出現錯誤怎麼辦？

1. **截圖錯誤信息**
2. **在 Manus 中告訴 AI**：「我遇到了這個錯誤，請幫我修正」
3. **AI 會分析並提供修復方案**
4. **重新執行 `node install.js` 或修改代碼**

## 🎓 進階用法

### 使用自訂環境變數

如果您的應用需要 API Key（例如 Supabase、OpenAI），Manus 會提供一個 `.env.local` 範本。您只需填入您的 API Key 即可。

### 連接外部服務

Manus 生成的代碼支援連接：
- **Supabase**：無伺服器資料庫
- **OpenAI API**：AI 功能
- **Stripe**：支付處理
- **SendGrid**：郵件服務
- 其他任何 REST API

### 本地測試

在部署前，您可以在本地測試：
```bash
npm run dev
# 訪問 http://localhost:3000
```

## 📞 獲取幫助

如果您遇到問題：

1. **查看詳細文檔**：`docs/` 目錄中有完整的教學
2. **查看模擬流程**：`docs/detailed_conversation_simulation.md` 展示了完整的使用過程
3. **在 Manus 中提問**：直接告訴 AI 您遇到的問題

## 🎉 您已準備好了！

現在您可以開始使用 `loop-engineering` Skill 來快速開發商業級應用了。祝您開發愉快！
