# 跨 AI 平台端到端工作流指南

本指南詳細說明了如何在不同的 AI 平台（包含雲端沙箱環境）上實現「一個想法到正式上線」的完整閉環。

## 核心挑戰：沙箱隔離

Claude Code Web 和 Cursor Web 運行在各自的雲端沙箱中，這些沙箱與您的 GitHub 倉庫是隔離的。為了解決這個問題，我們採用了 **「GitHub API 直接推送」** 策略。

## 🚀 跨平台通用流程

### 步驟 1：準備 GitHub PAT
1. 前往 GitHub Settings -> Developer settings -> Personal access tokens
2. 創建一個具有 `repo` 權限的 Token。
3. 準備好您的 GitHub 使用者名稱和目標倉庫名稱。

### 步驟 2：選擇 AI 平台並觸發指令

根據您使用的平台，提供以下資訊給 AI：

> 「我想做一個 [您的想法]。
> 請使用我的 GitHub 資訊將生成的代碼直接推送到倉庫：
> GITHUB_TOKEN: [您的 Token]
> REPO_OWNER: [您的使用者名稱]
> REPO_NAME: [您的倉庫名稱]」

### 步驟 3：AI 在沙箱內執行 (自動化)

AI 會在它的雲端沙箱中執行以下操作：
1. **生成代碼**：創建所有前端、後端和配置文件。
2. **執行 API 推送腳本**：AI 執行 `scripts/push_to_github.js`，將沙箱中的代碼打包並透過 GitHub API 推送到您的倉庫。

### 步驟 4：Zeabur 自動部署

1. 您的代碼已成功到達 GitHub。
2. Zeabur 檢測到更新，自動開始構建並部署。
3. 獲得正式上線的 URL！

## 平台特定說明

### 🟢 Manus AI (推薦)
- **優勢**：最強大的沙箱環境，支援複雜的文件操作。
- **流程**：直接使用 `loop-engineering` Skill，體驗最流暢。

### 🟡 Cursor Web
- **優勢**：內建終端機，可視化編輯器。
- **流程**：AI 生成代碼後，可以在 Cursor 終端機中執行推送腳本。

### 🟡 Claude Code Web
- **優勢**：強大的推理能力。
- **流程**：AI 在背景執行腳本，透過 API 完成推送。

### 🔴 Claude.ai / ChatGPT (純網頁對話版)
- **限制**：無法執行腳本。
- **流程**：AI 只能輸出代碼，您需要手動將代碼複製到 GitHub Codespaces 中執行推送。
