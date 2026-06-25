# STATE

- date: `2026-06-25`
- project: `Loop Engineering Framework`
- status: `active`
- phase: `Review`
- focus: `整理架構與文檔，對齊 repo 實際能力`

## Current Truth

- `AGENTS.md` 是共享核心入口
- `.agents/skills/` 是 canonical skill runtime
- `.loop/*` 是跨平台 session loop 狀態層
- `config/script_capabilities.json` 與 `docs/script_fallback_matrix.md` 已定義腳本降級規則
- `scripts/inspect_agent_capabilities.js` 已可列出腳本能力與 fallback
- `scripts/validate_repo_integrity.js` 已作為 repo 結構、mirror、JSON、文件連結品質閘門
- `docs/ultra_review_reports.md` 保存本輪 6 份正反論點審查摘要

## Open Gaps

- 更多技術棧 profile 尚未自動化
- 更多平台仍需真機或真 sandbox 實測
- 文件漂移已有自動 gate，但仍需隨平台實測持續更新
