---
name: using-agent-skills
description: Meta skill entrypoint. Select the right workflow skill for the current project phase, initialize required docs, and keep execution aligned with the project lifecycle.
---

# using-agent-skills

這是本 repo 的入口 skill。

## 目標

在任務開始時，判斷現在屬於哪個階段，然後啟用對應 workflow：

1. 想法模糊：`idea-refine`
2. 需求更模糊、連問題都還沒問對：先 `interview-me`
3. 需求未定：`spec-driven-development`
4. spec 已有但太大：`planning-and-task-breakdown`
5. 要 `/goal` 類效果但又要跨平台：`goal-loop`
6. 技術棧已定、設定檔還沒落地：`project-config-generation`
7. 開始實作：`incremental-implementation` + `test-driven-development`
7. 有 framework / library 問題：`source-driven-development`
8. 前端 UI：`frontend-ui-engineering`
9. API 邊界：`api-and-interface-design`
10. TypeScript：`typescript-best-practices`
11. JS / TS 品質自動化：`biome-quality-automation`
12. Supabase：`supabase-best-practices`
13. 網站基線：`website-best-practices`
14. RWD / 行動端：`responsive-design-best-practices`
15. 測試 / runtime 問題：`browser-testing-with-devtools` 或 `debugging-and-error-recovery`
16. 準備合併：`code-review-and-quality`
17. 上線前缺觀測：`observability-and-instrumentation`
18. 準備部署：`ci-cd-and-automation` + `shipping-and-launch`

## 兩種模式

### A. 新專案

- 想法還模糊：先 `idea-refine`
- 連該問什麼都還不清楚：先 `interview-me`
- 需求成形後：進 `spec-driven-development`
- 確認技術棧與能力盤點後：先 `project-config-generation`
- 設定檔落地後：進 `planning-and-task-breakdown`

### B. 舊專案改善 / 重構

- 先看入口檔、設定、測試與部署腳本
- 先用 `code-review-and-quality` 找風險
- 再用 `code-simplification` 規劃可分段重構
- 若涉及框架升級、資料層、API 邊界，再補 `source-driven-development`、`api-and-interface-design`
- 未經使用者確認，不要直接做大重構

## 工具選用規則

- 大型 repo、token 緊、需要先找脈絡：先用 `Semble`
- 要快速確認頁面能不能用、畫面有沒有壞：先用 `agent-browser`
- 要正式可重現的瀏覽器測試、錄製、selector 檢查：用 `playwright-cli`
- 要用 shell 方式低 token 探查 / 呼叫 MCP：用 `mcp-cli`
- JS / TS 專案有 Biome：每輪切片後跑 `npx @biomejs/biome check --write <paths>`
- 若上述工具不存在，再退回 `browser-testing-with-devtools`

## 子代理規則

- 平台支援 subagents 時，預設自動分派，不必先問
- 能平行的 task 就平行
- 建議固定角色：
  - `planner`
  - `repo-auditor`
  - `implementer`
  - `tester`
  - `reviewer`
  - `docs-updater`

## 啟動順序

1. 讀 `AGENTS.md`
2. 讀 `docs/interactive_project_flow.md`
3. 讀 `docs/project_usage_guide.md`
4. 讀 `docs/example_sessions.md`
5. 讀 `docs/agent_skill_catalog.md`
6. 先執行：
   - `node scripts/inspect_agent_capabilities.js`
7. 若缺 `.loop/*`，執行：
   - `node scripts/init_session_loop.js . --goal "<objective>"`
8. 若為新專案，執行：
   - `node scripts/init_project_workspace.js <targetDir> --name <projectName> --idea "<idea>"`
9. 根據專案類型執行：
   - `node scripts/auto_skill_setup.js --project-type <type> --ui-style <style> --deployment <target> --language <lang> --database <db>`
10. 若技術棧已確認，執行：
   - `node scripts/generate_project_configs.js --profile <profile> --name <projectName> --language <lang> --styling <style> --database <db> --quality-tool <tool>`
11. 填寫或更新：
   - `.loop/GOAL.md`
   - `.loop/PLAN.md`
   - `.loop/STATE.json`
   - `.loop/CHECKPOINTS.md`
   - `.loop/EVIDENCE.md`
12. 填寫或更新：
   - `docs/SPEC.md`
   - `docs/TASKS.md`
   - `docs/STATE.md`

## 強制規則

- 不確定該用哪個 skill，就先用這個。
- 先給短版初步方案，等確認後再給完整版計畫。
- 舊專案先提改善建議與重構切片，再動手。
- 沒有 `SPEC.md`，不要直接實作大功能。
- 沒有 `TASKS.md`，不要一次做完整包。
- 沒有驗證，不算完成。
- 有 bug，先重現再修。
