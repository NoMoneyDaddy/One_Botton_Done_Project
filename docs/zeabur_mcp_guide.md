# Zeabur MCP Guide

這份文件只保留高層原則。

## 先說清楚

Zeabur MCP 是可選補強，不是本 repo 的必要前提。

有沒有用，取決於：

- 目前平台是否支援 MCP
- 目前 session 是否允許對外操作
- 您是否已提供可用的 Zeabur token

## 能做什麼

若平台與權限都到位，AI 可以協助：

- 建立或查看 Zeabur project / service
- 協助設定環境變數
- 協助查看部署狀態或日誌

實際可做範圍，以當下平台工具能力為準。

## 和本 repo 的關係

本 repo 的主流程是：

1. 規劃
2. 實作
3. 驗證
4. 文件更新
5. 若平台支援，再做部署協助

也就是說：

- 沒有 Zeabur MCP，repo 仍可正常工作
- 有 Zeabur MCP，只是多一條部署協助路徑

## 使用建議

1. 先跑 `node scripts/inspect_agent_capabilities.js`
2. 確認是否偵測到相關 MCP / CLI 能力
3. 再決定走：
   - MCP 協助部署
   - 一般 Git / dashboard 部署

## 官方優先

若要實際配置 Zeabur MCP，請以 Zeabur 官方文件為準：

- `https://zeabur.com/docs`
