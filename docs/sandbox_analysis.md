# 雲端沙箱環境分析與解決方案 (已更新)

當使用 Claude Code Web 或 Cursor Web 時，AI 運行在它們各自的雲端沙箱中。

## 1. 核心突破：官方 Git 支援

根據官方文檔 [1]，Claude Code 和 Cursor Web 都**內建了 Git 功能**。

> **「Create commits and pull requests」**
> 
> Claude Code works directly with git. It stages changes, writes commit messages, creates branches, and opens pull requests.

這意味著我們不需要使用複雜的 GitHub API 推送腳本，AI 可以直接在沙箱中執行：

```bash
git add .
git commit -m "feat: initial commit"
git push
```

## 2. 全自動化工作流

有了原生 Git 支援，我們的跨平台工作流變得極其簡單：

| 平台 | Git 支援 | 自動化程度 | 推薦度 |
| :--- | :--- | :--- | :--- |
| **Manus AI** | ✅ 是 | 100% | ⭐⭐⭐⭐⭐ |
| **Claude Code Web** | ✅ 是 | 100% | ⭐⭐⭐⭐⭐ |
| **Cursor Web** | ✅ 是 | 100% | ⭐⭐⭐⭐⭐ |
| **Claude.ai Web (純對話)** | ❌ 否 | 50% | ⭐⭐⭐ |

## 3. 解決方案：如何授權？

雖然 AI 可以執行 `git push`，但它需要授權。我們建議使用 **GitHub Personal Access Token (PAT)** 來配置 Git 憑證。

AI 可以在沙箱中執行以下命令來配置授權：

```bash
git config --global credential.helper store
git remote set-url origin https://<YOUR_GITHUB_USERNAME>:<YOUR_PAT>@github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
```

這樣，AI 就可以直接將代碼推送到您的 GitHub 倉庫，進而觸發 Zeabur 部署。

## 參考文獻
[1] https://code.claude.com/docs - Claude Code Documentation
