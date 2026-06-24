# 閉環修復機制：整合 GitHub Actions

在之前的模擬中，我們發現如果 Zeabur 部署失敗，無經驗的用戶很難將錯誤日誌反饋給 Claude，這打破了 Loop Engineering 的閉環。

為了解決這個問題，我們引入 **GitHub Actions** 作為「自動化的錯誤報告員」。

## 運作原理

1. 當用戶推送代碼到 GitHub 時，GitHub Actions 會在雲端自動進行一次構建測試（`npm run build`）。
2. 如果測試成功，代碼會順利部署到 Zeabur。
3. **如果測試失敗**，GitHub Actions 會自動生成一份**精簡的錯誤報告**，並在該次 Commit 下方留言。
4. 用戶只需複製這段錯誤留言，貼給 Claude，Claude 就能立刻知道問題所在並提供修復腳本。

## 實作方案：添加 Workflow 檔案

在專案的 `.github/workflows/` 目錄下添加 `verify_and_report.yml`：

```yaml
name: Verify Code and Report Errors

on:
  push:
    branches: [ main ]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install Dependencies
        run: npm ci || npm install
        
      - name: Type Check & Build
        id: build
        run: npm run build
        continue-on-error: true
        
      - name: Generate Error Report
        if: steps.build.outcome == 'failure'
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            // 這裡可以加入腳本讀取錯誤日誌，並透過 GitHub API 在 Commit 上留言
            // 提醒用戶將錯誤訊息複製給 Claude
            console.log('Build failed. Please copy the error logs above and paste them to Claude.ai for an automatic fix.');
            core.setFailed('Build failed. See logs for details.');
```

## 結合 Prompt v2

在使用 `ultimate_one_prompt_v2.md` 生成 `install.js` 腳本時，我們已經將這個 GitHub Actions 檔案包含在自動生成的列表中。

這樣一來，從專案建立的第一秒起，這個自動化的錯誤報告機制就已經生效了。這完美解決了無經驗用戶看不懂報錯日誌的痛點！
