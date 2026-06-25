# STATE

- date: `2026-06-25`
- project: `Loop Engineering Framework`
- status: `active`
- phase: `Review`
- focus: `吸收同類專案治理與自治實踐，落成 repo 規範`

## Current Truth

- `AGENTS.md` 是共享核心入口
- `.agents/skills/` 是 canonical skill runtime
- `.loop/*` 是跨平台 session loop 狀態層
- `config/script_capabilities.json` 與 `docs/script_fallback_matrix.md` 已定義腳本降級規則
- `scripts/inspect_agent_capabilities.js` 已可列出腳本能力與 fallback
- `scripts/validate_repo_integrity.js` 已作為 repo 結構、mirror、JSON、文件連結品質閘門
- `docs/ultra_review_reports.md` 保存本輪 6 份正反論點審查摘要
- `tool-discovery-and-installation` 已補上，用於缺工具、缺 skill、缺 MCP 時的安全安裝與引導流程
- `docs/marketplace_open_source_readiness.md` 已補上，用於開源與 skill/plugin marketplace 前的缺口檢查
- `SECURITY.md`、`CONTRIBUTING.md`、`docs/release_version_policy.md` 已補上
- `docs/loop_maturity_model.md` 已補上
- `docs/engineering_phase_loop.md` 已補上
- `docs/capability_audit_and_install_loop.md` 已補上
- `docs/loop_circuit_breaker.md` 已補上
- `docs/skill_crystallization_loop.md` 已補上
- `docs/agent_manifest_spec.md` 已補上
- `docs/reference_repos_by_domain.md` 已補上
- `docs/large_project_dimensions_and_roles.md` 已補上

## Open Gaps

- 更多技術棧 profile 尚未自動化
- 更多平台仍需真機或真 sandbox 實測
- 文件漂移已有自動 gate，但仍需隨平台實測持續更新
- 本地 marketplace 與 plugin manifest 已補，但還缺 fresh install smoke test
