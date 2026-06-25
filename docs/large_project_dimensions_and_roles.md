# Large Project Dimensions And Roles

本文件回答兩件事：

1. 大型嚴謹專案要具備什麼面向
2. 這些面向通常對應什麼角色 / 分工

## Core Dimensions

| 面向 | 說明 | 參考 repo |
| --- | --- | --- |
| Product / Requirements | 成功條件、非目標、roadmap、需求優先級 | `the-engineer`、`django/django` |
| Architecture | 分層、模組邊界、介面契約、可替換性 | `fastify/fastify`、`langgraph` |
| Agent Runtime | loop、state、retry、blocked、budget、policy | `loop-engineering`、`odyssey-engine`、`drydock` |
| Frontend | design system、accessibility、story / example、browser verification | `next.js`、`playwright` |
| Backend | API discipline、integration tests、migration / compatibility | `fastify`、`django` |
| CI / Delivery | lint、test、build、release、dependency automation | `reviewdog`、`renovate`、`osv-scanner` |
| Security | secret hygiene、SAST、dependency scan、security policy | `semgrep`、`osv-scanner`、`SECURITY.md` 型 repo |
| Observability | logs、metrics、traces、audit trail、incident clues | `the-engineer`、`drydock` |
| Documentation | README、usage guides、contribution、ADR、upgrade notes | `next.js`、`fastify`、`autogen` |
| Governance | CODEOWNERS / OWNERS、charter、review path、support path | `kubernetes`、`fastify` |
| Evaluation | benchmark、regression、quality gates、human review | `AgentEvolver`、`OpenHands`、`next.js` |

## Suggested Roles

| 角色 | 主要責任 |
| --- | --- |
| Product owner | 需求、優先級、成功定義 |
| Architect | 邊界、模組化、非功能需求 |
| Agent / Workflow owner | loop、state、policy、automation rollout |
| Frontend owner | UI、RWD、a11y、design verification |
| Backend owner | API、資料流、資料一致性 |
| QA / Verification owner | test plan、smoke、regression、review gate |
| Security owner | threat model、secret / vuln / policy 管理 |
| DevOps / CI owner | pipeline、release、infra automation |
| Observability owner | logs、metrics、alerts、postmortem signals |
| Docs / DX owner | README、guides、examples、upgrade path |

## Minimum Surfaces A Serious Repo Should Have

- `README`
- `LICENSE`
- `CONTRIBUTING`
- `SECURITY`
- `docs/`
- `examples/` or runnable demos
- `test` / `tests`
- CI workflow
- release / changelog strategy
- issue / review / escalation path

## Agent-Native Additions

若專案要給 AI 長期使用，還應該補：

- `AGENTS.md`
- repo-level skills
- cross-session state
- capability audit
- maturity model
- circuit breaker
- evidence log
- machine-readable manifest

## Adoption Rule For This Repo

本 repo 目前最該優先補強的不是更多花樣，而是：

1. state 標準化
2. verification / review gate
3. capability expansion discipline
4. role / ownership clarity
5. fresh install / smoke path
