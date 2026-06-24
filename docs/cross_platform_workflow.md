# 跨 AI 平台端到端工作流指南 (已更新)

本指南詳細說明了如何在不同的 AI 平台上實現「一個想法到正式上線」的完整閉環。

## 🚀 核心突破：全平台 100% 自動化

根據官方文檔 [1]，Claude Code (包含 `claude.ai/code` 網頁版) 和 Cursor Web 都**內建了完整的 Git 支援**。

這意味著：**無論您使用哪個平台，都可以實現 100% 的自動化閉環，無需手動複製貼上代碼！**

## 🌐 平台選擇指南

### 1. Claude Code Web (`claude.ai/code`) ⭐ 最推薦 (無代碼用戶)
- **優勢**：純網頁操作，無需安裝任何東西，強大的推理能力。
- **流程**：打開網頁 → 貼入 Prompt → AI 自動生成、提交並推送。

### 2. Cursor Web ⭐ 最推薦 (開發者)
- **優勢**：內建終端機，可視化編輯器，強大的 Composer 功能。
- **流程**：打開網頁 → 使用 Composer 生成代碼 → 一鍵推送。

### 3. Manus AI
- **優勢**：最強大的沙箱環境，支援複雜的文件操作。
- **流程**：直接使用 `loop-engineering` Skill，體驗最流暢。

## ⚙️ 統一的工作流 (所有平台通用)

### 步驟 1：準備 GitHub PAT
1. 前往 GitHub Settings -> Developer settings -> Personal access tokens
2. 創建一個具有 `repo` 權限的 Token。

### 步驟 2：觸發指令

將以下資訊提供給 AI（Claude Web / Cursor Web / Manus）：

> 「我想做一個 [您的想法]。
> 請生成所有代碼，並直接將代碼推送到我的 GitHub 倉庫。
> 
> GitHub 授權資訊：
> GITHUB_TOKEN: [您的 Token]
> REPO_OWNER: [您的使用者名稱]
> REPO_NAME: [您的倉庫名稱]
> 
> 請使用 `git remote set-url` 配置授權，然後執行 `git push`。」

### 步驟 3：AI 自動執行

AI 會在它的雲端沙箱中自動執行：
1. **生成代碼**：創建所有文件。
2. **配置 Git**：使用您的 Token 設置遠端倉庫。
3. **推送代碼**：執行 `git add .`, `git commit`, `git push`。

### 步驟 4：Zeabur 自動部署

1. 您的代碼已成功到達 GitHub。
2. Zeabur 檢測到更新，自動開始構建並部署。
3. 獲得正式上線的 URL！🎉

## 參考文獻
[1] https://code.claude.com/docs - Claude Code Documentation
