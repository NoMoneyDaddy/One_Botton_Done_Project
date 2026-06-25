# Comparable Project Analysis

本文件比較同類 agent skills / plugin / workflow 專案，用來決定本 repo 後續調整方向。

調研時間：2026-06-25。

快照基線：除非另有標示，以下比較都以 `2026-06-25` 查詢時的 default-branch HEAD 為準。

## Summary

本 repo 的定位不應只是 skill collection，而應是 repo-first agent operating layer：

- AGENTS.md 給入口契約。
- .agents/skills 給可觸發 workflow。
- scripts 給可驗證自動化。
- docs 給規格、fallback、readiness。
- .codex-plugin/plugin.json 給未來 marketplace distribution。

## Projects Compared

| Project | 優點 | 缺點 / 風險 | 本 repo 可借鏡 |
| --- | --- | --- | --- |
| OpenAI plugins | 官方結構清楚；plugin.json、skills、MCP、apps、hooks 可一起打包；marketplace.json 模式明確 | 範例偏插件發佈，不是完整專案治理；需要跟隨官方格式變動 | 採 plugin manifest、本地 marketplace 測試入口、skills path 明確化 |
| Anthropic skills | spec、template、skills 分層清楚；README 有示範與 disclaimer；適合學 SKILL.md 基本結構 | 偏展示與教育；不是跨工具治理 repo；部分範例 source-available 非開源 | 保留 template 思維；強化 disclaimer、安全與測試要求 |
| Vercel agent-skills | use when 寫法清楚；每個 skill 有明確觸發條件與分類；工程規則具體 | 聚焦 Vercel / React ecosystem；覆蓋面專精但不通用 | 改善每個 skill 的 description 與 use when 前置關鍵字 |
| Addy Osmani agent-skills | lifecycle map 很清楚；slash command 對應 define / plan / build / verify / review / ship；跨工具安裝文件完整 | scope 大，入口多，可能讓新使用者不知道先用哪條路 | 保留 lifecycle map，但維持本 repo 的低 token、單一入口原則 |
| Superpowers | 方法論完整；多平台 distribution；有 codex plugin、hooks、tests、release notes；自動化程度高 | 重量級；subagent-driven workflow 對不支援 subagent 的平台會退化 | 借鏡 plugin-first distribution、tests、release notes；避免過度強制 subagents |
| Composio awesome-codex-skills | catalog 量大；安裝指令明確；分類多，適合找候選 skill | awesome list 容易品質不均；商業整合導向較強；不等同安全可信來源 | 作為候選發現來源；導入前仍需 provenance、license、script review |

## Direction

### Keep

- Repo-first AGENTS.md contract。
- Canonical .agents/skills，mirror 給 Claude / legacy。
- validate_repo_integrity 作為品質閘門。
- scripts as accelerators, docs fallback。

### Add

- MIT LICENSE。
- Codex plugin manifest。
- Local marketplace entry。
- Comparable project analysis。
- Fresh install smoke test。
- Loop maturity model。
- Engineering phase loop。
- Capability audit / install loop。
- Loop circuit breaker。
- Skill crystallization loop。
- Agent manifest spec。
- High-star reference snapshot，避免只看小型實驗 repo。

### Avoid

- 把所有知識塞進 AGENTS.md。
- 無差別收錄第三方 skills。
- 靜默安裝 marketplace 來源。
- 沒有驗證就宣稱支援某平台。

## Next Work

1. 建立 fresh clone install smoke test。
2. 補 plugin manifest schema check。
3. 將 high-value skills 的 description 改成更明確的 trigger-first 句型。
4. 補 release notes / changelog。
5. 若要公開提交到 marketplace，先跑一次本地 marketplace install 測試。

## Additional High-Value Repos

| Project | 可借鏡 | 本 repo 採納方式 |
| --- | --- | --- |
| `cobusgreyling/loop-engineering` | `L1 -> L3`、patterns、operating loops | `docs/loop_maturity_model.md` |
| `FlyFission/nuclear-grade-context-engineering` | evidence-first、review gate | `Verify` / `Review` 不可省略 |
| `FarzamMohammadi/the-engineer` | requirements → delivery、blocked / retry / audit | `docs/engineering_phase_loop.md` |
| `Shmayro/singularity-claude` | gap detection、score / repair | `docs/capability_audit_and_install_loop.md` |
| `Dryxio/auto-re-agent` | bounded loop、objective verifier | bounded retries、verifier 必要性 |
| `Zhifeng-Niu/odyssey-engine` | tier / orientation / convergence | `.loop` 狀態欄位與 circuit thinking |
| `lsdefine/GenericAgent` | skill tree、自我結晶化 | `docs/skill_crystallization_loop.md` |
| `lodekeeper/lodeloop` | circuit breaker、verify loop | `docs/loop_circuit_breaker.md` |
| `open-kya/kya-standard` | machine-readable governance disclosure | `docs/agent_manifest_spec.md` |
| `cyberCharl/drydock` | run registry、audit surface | 後續 state store / daemon 方向參考 |
| `OpenHands/OpenHands` | 大型自治開發產品化、runtime / eval / docs 三面齊備 | 後續若擴成 product，可補 eval 與 runtime 邊界文件 |
| `abi/screenshot-to-code` | 視覺輸入轉前端程式碼 | 後續可加 `design-to-code` skill，而不是把設計能力硬塞進主 loop |
| `earendil-works/pi` | loop runtime、TUI、統一 provider 介面 | 若未來做 daemon / local runtime，可參考 runtime 分層 |
| `snarktank/ralph` | 目標導向反覆 loop 到完成 | 可補 `goal -> verify -> repeat` 的任務模板 |
| `microsoft/agent-governance-toolkit` | policy enforcement、zero-trust、sandbox | 後續安全章節可補 agent execution policy matrix |

## Adoption Map

### Directly Adopt

- loop maturity levels
- evidence-first verify gate
- bounded retries
- blocked / escalation states
- capability gap classification
- circuit breaker
- machine-readable manifest
- fresh-clone smoke test

### Adapt With Repo Context

- long-lived daemon orchestration
- plugin opacity / adapter contracts
- self-evolving skill scoring
- task / run registry
- design-to-code as optional skill lane
- reviewer-enforced convergence

### Avoid For Now

- heavy always-on runtime assumptions
- unclear-license implementation borrowing
- design-specific orchestration當核心路徑

## Sources

- https://github.com/openai/plugins
- https://github.com/anthropics/skills
- https://github.com/vercel-labs/agent-skills
- https://github.com/addyosmani/agent-skills
- https://github.com/obra/superpowers
- https://github.com/ComposioHQ/awesome-codex-skills
- https://github.com/lsdefine/GenericAgent
- https://github.com/modelscope/AgentEvolver
- https://github.com/lodekeeper/lodeloop
- https://github.com/open-kya/kya-standard
- https://github.com/cyberCharl/drydock
- https://github.com/OpenHands/OpenHands
- https://github.com/abi/screenshot-to-code
- https://github.com/earendil-works/pi
- https://github.com/snarktank/ralph
- https://github.com/microsoft/agent-governance-toolkit
