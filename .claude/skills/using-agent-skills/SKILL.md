---
name: using-agent-skills
description: Meta skill entrypoint. Select the right workflow skill for the current phase and execute autonomously. Default L3 — no confirmation needed, stop only when blocked.
---

# using-agent-skills

本 repo 的技能路由入口。預設 L3 自主交付模式。

## 目標

在任務開始時，判斷現在屬於哪個階段，然後自主啟用對應 workflow：

| # | 情境 | 技能 |
|---|------|------|
| 1 | 想法模糊 | `idea-refine` |
| 2 | 連問題都不清楚 | `interview-me` |
| 3 | 需求未定 | `spec-driven-development` |
| 4 | Spec 太大 | `planning-and-task-breakdown` |
| 5 | 跨平台 loop | `goal-loop` |
| 6 | 設定檔未落地 | `project-config-generation` |
| 7 | 開始實作 | `incremental-implementation` + `test-driven-development` |
| 8 | 缺工具/能力 | `tool-discovery-and-installation` |
| 9 | Framework 問題 | `source-driven-development` |
| 10 | 前端 UI | `frontend-ui-engineering` |
| 11 | API 邊界 | `api-and-interface-design` |
| 12 | TypeScript | `typescript-best-practices` |
| 13 | JS/TS 品質 | `biome-quality-automation` |
| 14 | Supabase | `supabase-best-practices` |
| 15 | 網站基線 | `website-best-practices` |
| 16 | RWD | `responsive-design-best-practices` |
| 17 | Lottie/Motion | `text-to-lottie` |
| 18 | 長時監控 | `recurring-monitoring` |
| 19 | 測試/除錯 | `browser-testing-with-devtools` / `debugging-and-error-recovery` |
| 20 | 合併前 | `code-review-and-quality` |
| 21 | 觀測 | `observability-and-instrumentation` |
| 22 | 部署 | `ci-cd-and-automation` + `shipping-and-launch` |

## 新專案路徑

`idea-refine` → `spec-driven-development` → `project-config-generation` → `planning-and-task-breakdown` → Build-Verify Loop

## 舊專案路徑

理解現況 → `code-review-and-quality` → 直接執行改善 → 驗證

## 子代理

平台支援 subagents 時自動分派：
- `planner` — 架構與任務拆解
- `implementer` — 程式碼修改
- `tester` — 測試與驗證
- `reviewer` — Code review
- `docs-updater` — 文件更新

## 啟動順序

1. 讀 `AGENTS.md`
2. 若有 `.loop/GOAL.md`，讀取目標
3. 若有 `docs/SPEC.md`，讀取規格
4. 判斷階段，啟用對應技能
5. 進入 Build-Verify Loop

## 強制規則

- 不確定該用哪個 skill，就先用這個
- 直接自主執行，不要問「要不要開始」
- 沒有 `SPEC.md` 就先建一個
- 沒有 `TASKS.md` 就先建一個
- 沒有驗證，不算完成
