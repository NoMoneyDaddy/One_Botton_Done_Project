# Reference Repos By Domain

本文件按領域整理可借鏡的 GitHub repo。

調研日期：2026-06-25。

## Autonomous LLM / Agent Engineering

| Repo | 類型 | 可借鏡 |
| --- | --- | --- |
| `microsoft/autogen` | agent framework | 多代理對話、跨語言結構、docs / support / security 面齊全 |
| `langchain-ai/langgraph` | resilient agent framework | agent graph、examples、docs、repo 級 `AGENTS.md` / `CLAUDE.md` |
| `OpenHands/OpenHands` | AI-driven development | 大型自治開發系統的 productization、bench / eval / skills |
| `FarzamMohammadi/the-engineer` | orchestration layer | requirements → delivery phase、plugin contracts、audit trail |
| `Zhifeng-Niu/odyssey-engine` | autonomous iteration engine | tier / orientation / convergence / checkpoint loop |
| `lsdefine/GenericAgent` | self-evolving agent | skill tree、能力結晶化、原子工具 + 極小核心 |

## CI / Automation

| Repo | 類型 | 可借鏡 |
| --- | --- | --- |
| `reviewdog/reviewdog` | automated code review | 多 CI 平台整合、review gate、`CHANGELOG`、大量測試與 release tooling |
| `renovatebot/renovate` | dependency automation | 大規模自動化維護、策略化更新、嚴格設定面 |
| `google/osv-scanner` | vuln automation | CLI + actions + docs + release + config 標準化 |

## Frontend Engineering

| Repo | 類型 | 可借鏡 |
| --- | --- | --- |
| `vercel/next.js` | frontend platform | `bench`、`evals`、`examples`、monorepo、release 腳本、升級指南 |
| `microsoft/playwright` | web testing & automation | 跨瀏覽器驗證、examples、docs、穩定測試文化 |

## Backend Engineering

| Repo | 類型 | 可借鏡 |
| --- | --- | --- |
| `fastify/fastify` | backend framework | `GOVERNANCE.md`、`PROJECT_CHARTER.md`、`SECURITY.md`、examples、integration tests |
| `django/django` | mature web framework | 長期維護、嚴格文件 / release / compatibility discipline |
| `kubernetes/kubernetes` | large-scale infra | `OWNERS`、`SECURITY_CONTACTS`、多層目錄、測試與支援面完整 |

## Security Research / Hardening

| Repo | 類型 | 可借鏡 |
| --- | --- | --- |
| `semgrep/semgrep` | static analysis | rule-driven research、security docs、perf / tests / changelog discipline |
| `google/osv-scanner` | vuln scanning | SBOM / vulnerability scanning 自動化基線 |
| `FlyFission/nuclear-grade-context-engineering` | evidence-first governance | 高風險變更的審查與證據習慣 |

## Governance / Agent Safety

| Repo | 類型 | 可借鏡 |
| --- | --- | --- |
| `open-kya/kya-standard` | agent governance standard | 機器可讀 agent 邊界宣告 |
| `cobusgreyling/loop-engineering` | loop governance | maturity、patterns、operating loops |
| `cyberCharl/drydock` | workbench / state store | items、runs、audit trail、pause flag |

## Practical Reading Order

1. `cobusgreyling/loop-engineering`
2. `FarzamMohammadi/the-engineer`
3. `FlyFission/nuclear-grade-context-engineering`
4. `Zhifeng-Niu/odyssey-engine`
5. `lsdefine/GenericAgent`
6. `reviewdog/reviewdog`
7. `vercel/next.js`
8. `fastify/fastify`
9. `semgrep/semgrep`
10. `open-kya/kya-standard`
