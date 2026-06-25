# CHECKPOINTS

每輪 loop 完成後追加：

- 做了什麼
- 怎麼驗證
- 下一輪做什麼

## Entries

- 2026-06-25
  - 做了什麼：新增 `scripts/evaluate_session_loop.js` 與 `docs/loop_evaluation_gate.md`，補齊自治治理的 machine-readable gate。
  - 怎麼驗證：`node scripts/evaluate_session_loop.js .`、`node scripts/validate_repo_integrity.js`、`node scripts/inspect_agent_capabilities.js`、`git diff --check`。
  - 下一輪做什麼：補 machine-readable learning ledger 或 approval / policy matrix。

- 2026-06-25
  - 做了什麼：補齊跨平台 `/GOAL` loop、腳本能力宣告、fallback 文件、入口文件同步。
  - 怎麼驗證：`node --check`、`node scripts/inspect_agent_capabilities.js`、bootstrap smoke test、`git diff --check`。
  - 下一輪做什麼：整理 repo 自身架構文件與治理文件，清理文件漂移。

- 2026-06-25
  - 做了什麼：把 `docs/architecture.md` 改成 repo architecture，補 `docs/SPEC.md`、`docs/TASKS.md`、`docs/STATE.md`、`docs/DEBUG_NOTES.md`、`docs/ADRS.md`。
  - 怎麼驗證：檢查引用路徑、對照腳本輸出與 README 主文件清單。
  - 下一輪做什麼：做最後驗證與 diff 梳理。

- 2026-06-25
  - 做了什麼：新增 6 份 ultra review 摘要與 repo integrity gate，並同步 CI、bootstrap、README、使用文件。
  - 怎麼驗證：`node --check scripts/validate_repo_integrity.js`、`node scripts/validate_repo_integrity.js`、`node scripts/inspect_agent_capabilities.js`、`git diff --check`。
  - 下一輪做什麼：三角色 review 後決定是否 commit / push / PR。
