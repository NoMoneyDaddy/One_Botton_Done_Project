---
name: goal-loop
description: Run a cross-platform session loop using repo files instead of platform-specific slash commands. Use when the user wants `/goal`-like behaviour but the workflow must stay portable across Codex, Claude Code, Cursor, Gemini CLI, Copilot, Hermes, or OpenClaw.
---

# goal-loop

這個 skill 把 `/goal` 類體驗降落到 repo 檔案。

## 先讀

1. `AGENTS.md`
2. `docs/session_loop_contract.md`
3. `docs/interactive_project_flow.md`
4. `docs/project_lifecycle_automation.md`
5. `docs/subagent_dispatch.md`

## 核心觀念

- 不依賴單一平台內建 `/goal`
- 用 `.loop/*` 當 session 內共用狀態
- 每輪都回寫狀態與驗證證據

## 啟動

若 `.loop/` 不存在，先執行：

```bash
node scripts/init_session_loop.js . --goal "<objective>"
```

若是新專案工作區，`scripts/init_project_workspace.js` 已會一起建立 `.loop/*`

## 必填檔案

- `.loop/GOAL.md`
- `.loop/PLAN.md`
- `.loop/STATE.json`
- `.loop/CHECKPOINTS.md`
- `.loop/EVIDENCE.md`
- `.loop/POLICY.md`

## 每輪 loop 必做

1. 讀 `.loop/GOAL.md`
2. 讀 `.loop/STATE.json`
3. 決定下一個最小切片
4. 實作或驗證
5. 更新：
   - `.loop/PLAN.md`
   - `.loop/STATE.json`
   - `.loop/CHECKPOINTS.md`
   - `.loop/EVIDENCE.md`
   - 必要時 `docs/STATE.md`、`docs/TASKS.md`、`README.md`

## 狀態規則

- `phase`: `Define` / `Plan` / `Build` / `Verify` / `Review` / `Ship`
- `current_state`: `intake` / `clarify` / `capability-check` / `stack-and-deps` / `spec-and-architecture` / `task-slicing` / `implementation-loop` / `review-gate` / `ship-prep`
- `status`: `active` / `blocked` / `complete`

## 何時用

- 使用者明確要 `/goal` 類效果
- 平台沒有內建 `/goal`
- 想讓多平台 session 看同一份 loop 狀態

## 配合 skill

- 規劃：`using-agent-skills`、`spec-driven-development`、`planning-and-task-breakdown`
- 設定檔：`project-config-generation`
- 實作：`loop-engineering`
- 驗證：`biome-quality-automation`、`browser-testing-with-devtools`、`debugging-and-error-recovery`
