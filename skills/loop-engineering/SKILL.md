---
name: loop-engineering
description: Run the repository's end-to-end autonomous delivery loop from idea or legacy-project audit to plan, implementation, verification, documentation, and ship. Default L3 autonomous — execute without waiting for confirmation, stop only when blocked.
---

# loop-engineering

本 skill 是專案主工作流。預設 L3 自主交付模式。

## 讀取順序

1. `AGENTS.md`（通用自主交付協議）
2. `docs/session_loop_contract.md`
3. `docs/interactive_project_flow.md`
4. `docs/project_architecture_best_practices.md`

## 兩種模式

### A. 新專案

1. 用 `idea-refine` 收斂想法（若想法模糊）
2. 用 `spec-driven-development` 建 spec
3. 自主選擇技術棧並記錄到 `docs/ADRS.md`
4. 用 `project-config-generation` 落設定檔
5. 用 `planning-and-task-breakdown` 切 task
6. 進入 Build-Verify Loop

### B. 舊專案改善

1. 先看入口檔、設定、測試、部署
2. 直接執行改善（除非涉及不可逆操作）
3. 每輪驗證

## 自主交付流程

1. 判斷新專案 / 舊專案 / 單一任務
2. 自主決策技術棧與架構（記錄到 `docs/ADRS.md`）
3. 若有腳本環境，跑 `node scripts/inspect_agent_capabilities.js`
4. 若缺 `.loop/*`，直接建立或跑 `node scripts/init_session_loop.js`
5. 進入 Build-Verify Loop
6. JS/TS 專案有 Biome 時，每輪跑 `npx @biomejs/biome check --write <paths>`
7. 完成前跑 `code-review-and-quality`
8. 交付

## Build-Verify Loop

每輪都做：

1. 選一個最小 task
2. 最小必要修改
3. 跑對應驗證
4. 失敗就修根因（最多 3 次）
5. 看 circuit breaker 是否該停
6. 更新 `.loop/STATE.json`、`.loop/CHECKPOINTS.md`
7. 更新 `docs/TASKS.md`、`docs/STATE.md`

## 技能路由

| 需求 | 技能 |
|------|------|
| 想法模糊 | `idea-refine` |
| 跨平台 loop | `goal-loop` |
| 缺 spec | `spec-driven-development` |
| 工作太大 | `planning-and-task-breakdown` |
| 設定檔未落地 | `project-config-generation` |
| 開始實作 | `incremental-implementation` |
| 行為變動 | `test-driven-development` |
| Framework 問題 | `source-driven-development` |
| 前端 | `frontend-ui-engineering` |
| API 邊界 | `api-and-interface-design` |
| 除錯 | `debugging-and-error-recovery` |
| JS/TS 品質 | `biome-quality-automation` |
| 合併前 | `code-review-and-quality` |
| 觀測 | `observability-and-instrumentation` |
| 文件 | `documentation-and-adrs` |
| 發版 | `shipping-and-launch` |

## 子代理

平台支援 subagents 時，自動分派，不必詢問。
不支援時，順序執行。

## 停止條件

只有以下情況才停：

- 缺憑證、密鑰、API Key
- 不可逆破壞操作需確認
- 計費 / 付款決策
- 同一錯誤連修 3 次仍失敗

**不要停下來問「要不要繼續」— 直接繼續。**

## 自治等級

預設 **L3 autonomous**。自主規劃、實作、測試、修復、交付。
