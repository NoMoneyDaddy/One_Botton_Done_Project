# Changelog

本檔記錄對使用者或 AI workflow 有影響的變更。

格式基線：

- 日期：`YYYY-MM-DD`
- 類型：`Added`、`Changed`、`Fixed`、`Removed`
- 只記有實際影響的變更，不記純噪音

## 2026-06-26

### Changed — v2 Universal Autonomous Protocol

- **`AGENTS.md` 全面重寫為 v2 通用自主交付協議**
  - 預設自治等級從 L1 report-only 升級為 **L3 autonomous**
  - 4-Phase 自主交付協議：Understand → Plan → Build-Verify → Ship
  - 自主行動規則：只在缺憑證、不可逆操作、計費、重複錯誤時停止
  - 單一檔案即可引導任何 AI 自主交付，不需先讀 10+ 文件
  - v1 內容存檔於 `docs/agent_contract_v1_reference.md`

- **平台支援從 5 個擴展到 12+**
  - 新增：`.windsurfrules`（Windsurf）
  - 新增：`.clinerules`（Roo Code / Cline）
  - 新增：`.aider.conf.yml`（Aider）
  - 新增：`.continuerc.json`（Continue.dev）
  - 所有入口檔統一指向 `AGENTS.md`

- **核心 skills 更新為自主優先**
  - `loop-engineering`：預設 L3，不問「要不要繼續」
  - `using-agent-skills`：自動路由、自動分派 subagents

- **配置更新**
  - `config/execution_policy_matrix.json`：schema v2，預設 L3
  - `config/agent_manifest.json`：schema v2，12+ 平台支援
  - `config/repo_surface_manifest.json`：納入新增平台入口檔
  - `.loop/POLICY.md`：自主優先策略
  - `.loop/STATE.json`：L3 maturity

- **文件更新**
  - `README.md`、`README.en.md`：重寫為自主交付框架介紹
  - `docs/cross_ai_capability_portability.md`：v2 對照表
  - `CLAUDE.md`、`GEMINI.md`、`.cursorrules`、`.github/copilot-instructions.md`：統一指向 AGENTS.md

## 2026-06-25

### Added

- 新增 machine-readable execution policy：`config/execution_policy_matrix.json`
- 新增 machine-readable learning ledger：`.loop/LEARNINGS.json`
- 新增 learning ledger schema：`config/learning_ledger_schema.json`
- 新增 `docs/learning_ledger_loop.md`
- 新增 `.github/CODEOWNERS`
- 新增 `examples/minimal-workspace/README.md`

### Changed

- `scripts/evaluate_session_loop.js` 現在把 `LEARNINGS.json` 納入 gate
- `scripts/init_session_loop.js` 現在初始化 `LEARNINGS.json`
- `bootstrap` 與 `integrity` 改以 `config/repo_surface_manifest.json` 作為單一 surface 清單來源
