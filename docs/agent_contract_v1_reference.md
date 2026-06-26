# Agent Contract V1 Reference

> 本檔為 AGENTS.md v1 的存檔參考，已被 v2 universal autonomous protocol 取代。

# Loop Engineering Agent Contract

本檔是本 repo 的單一代理指令來源。
支援優先順序：

- `AGENTS.md`：Codex、Cursor、GitHub Copilot Agent
- `CLAUDE.md`：Claude Code
- `GEMINI.md`：Gemini CLI

如果你的工具同時支援多個檔名，以本檔為準。

## 目標

把「一個想法」收斂成可驗證、可部署的 app 或網站。
先規劃，後實作。先查官方文檔，後寫代碼。

## 預設互動流程

每次新 session，預設走這些階段。

- 這不是固定 9 步。
- 可以跳步、合併、回退。
- 小任務可把規劃與確認合併。
- 中大型任務仍建議保留「短版確認 → 完整計畫確認」雙確認。

預設階段：

1. intake：確認是新專案還是舊專案改善
2. clarify：補齊想法、限制、成功定義
3. capability-check：盤點已安裝 skills、工具、MCP、repo 現況
4. stack-and-deps：技術棧、外部服務、API key / fallback
5. spec-and-architecture：規格、目錄、分層、驗證策略
6. task-slicing：切成最小可驗證工作
7. implementation-loop：實作、測試、修正、記錄
8. review-and-ship：review、文件、上線準備

舊專案模式：

- 先理解現況與痛點
- 先提改善切片
- 再決定沿用、局部重構、或遷移
- 未經確認，不做大規模重構

## 必守規則

1. 不要直接開寫。先讀 `.agents/skills/loop-engineering/SKILL.md`。
2. 生成專案前，先讀 `docs/project_architecture_best_practices.md`，先定目錄與分層。
3. 若是新專案，先執行專案初始化流程：建立資料夾、核心規範檔、`docs/SPEC.md`、`docs/TASKS.md`、`docs/DEBUG_NOTES.md`、`docs/STATE.md`、`docs/ADRS.md`。
4. 若缺 `.loop/*`，先初始化 session loop：`node scripts/init_session_loop.js . --goal "<objective>"`。
   - 若平台不能跑腳本，改讀 `docs/script_fallback_matrix.md`，手動建立 `.loop/*`。
5. 若缺工具、缺 skill、缺 MCP、缺搜尋能力、缺瀏覽器驗證能力，或使用者要求「補能力 / 裝工具 / 自己找辦法」，先讀 `.agents/skills/tool-discovery-and-installation/SKILL.md`。
6. 先讀：
   - `docs/loop_maturity_model.md`
   - `docs/engineering_phase_loop.md`
   - `docs/capability_audit_and_install_loop.md`
   - `docs/loop_circuit_breaker.md`
   - `docs/agent_manifest_spec.md`
7. 再根據專案類型自動搜尋需要的 skill；使用者已明確授權安裝時，可執行 repo 內安全安裝腳本；不能自動安裝時明確提示。
8. 先問 3-5 個關鍵問題，至少包含：
   - 專案類型：`web app` / `landing page` / `mobile app` / `api service`
   - 前端或執行環境
   - 資料庫
   - UI 庫
   - 部署策略：`Zeabur All-in-One` / `Hybrid` / `Self-managed`
9. 先產出簡短架構計畫：目錄草圖、分層、驗證、錯誤處理、env 表。
10. 第三方整合、框架行為、部署步驟有不確定性時，先查官方文檔。不要靠記憶亂做。
11. 只做最小必要修改。不要整包重寫。
12. 所有秘密資料都走環境變數。不得提交 `.env*`。
13. 產出後一定要驗證。至少執行對應的 `test`、`lint`、`build` 或最小重現。
14. 除錯經驗要寫入 `docs/DEBUG_NOTES.md`，當前進度要寫入 `docs/STATE.md`，session loop 進度要寫入 `.loop/*`。
15. 階段結束時更新 `README.md`、`docs/TASKS.md`、`docs/ADRS.md`。
16. 同一錯誤連修 3 次還沒過，停止並回報錯誤與阻塞點。
17. 複雜任務預設拆成可平行子任務；若平台支援 subagents，主動自動分派。

## 低 Token 準則

1. 問題只問決策相關，不問可由 repo 或工具自動推導的事。
2. 一次只問 1-3 組題目；每題都允許多選、跳過、沿用現況、請 AI 決定。
3. 回應只講增量，不重複整段既有上下文。
4. 大 repo 先用 `Semble`、`rg`、`fd`，不要整包讀檔。
5. 完成一輪確認後，把事實寫進 `docs/SPEC.md`、`docs/STATE.md`，後續引用檔案，不重貼長摘要。
6. 提計畫時先短版，確認後再展開完整版。

## 交付流程

1. 讀取 `.agents/skills/loop-engineering/SKILL.md` 與相關 `references/`。
2. 若新專案缺少規範檔，先建立 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、`.github/copilot-instructions.md`、`.cursorrules`、`.cursor/rules/00-project.mdc`。
3. 建立 `docs/SPEC.md`、`docs/SPEC_FORMAT.md`、`docs/TASKS.md`、`docs/DEBUG_NOTES.md`、`docs/STATE.md`、`docs/ADRS.md`。
4. 執行 `node scripts/inspect_agent_capabilities.js`，先盤點 skills、MCP、工具。
5. 執行 `node scripts/validate_repo_integrity.js`，確認入口、mirror、設定與文件連結未漂移。
6. 若缺工具、缺 skill、缺 MCP、缺搜尋能力或缺瀏覽器驗證能力，讀 `.agents/skills/tool-discovery-and-installation/SKILL.md`，再跑 `bash scripts/setup_sandbox_tools.sh --plan`。
7. 依專案類型搜尋並安裝需要的 skills。
8. 產出初步規劃與技術棧總結，等使用者確認。
9. 中大型任務：確認短版方向後，再產出完整計畫與 task 切片。
10. 小任務：可直接合併進單次確認後開工。
11. 生成最小可行版本：
   - 優先可跑、可測、可部署
   - 再做加值功能
12. 若環境支援 MCP，檢查是否可直接使用部署或外部工具。
13. 回報：
   - 做了什麼
   - 怎麼驗證
   - 還缺什麼金鑰或手動步驟

## 檔案導覽

- 核心技能：`.agents/skills/loop-engineering/SKILL.md`
- 技能路由：`.agents/skills/using-agent-skills/SKILL.md`
- 工具補強：`.agents/skills/tool-discovery-and-installation/SKILL.md`
- maturity：`docs/loop_maturity_model.md`
- phase loop：`docs/engineering_phase_loop.md`
- capability audit：`docs/capability_audit_and_install_loop.md`
- circuit breaker：`docs/loop_circuit_breaker.md`
- skill crystallization：`docs/skill_crystallization_loop.md`
- agent manifest：`docs/agent_manifest_spec.md`
- GitHub 參考地圖：`docs/reference_repos_by_domain.md`
- 大型專案面向與分工：`docs/large_project_dimensions_and_roles.md`
- 互動流程：`docs/interactive_project_flow.md`
- session loop 協定：`docs/session_loop_contract.md`
- 腳本降級矩陣：`docs/script_fallback_matrix.md`
- 使用教學：`docs/project_usage_guide.md`
- 互動範例：`docs/example_sessions.md`
- JS / TS 品質 loop：`docs/biome_quality_loop.md`
- 子代理規則：`docs/subagent_dispatch.md`
- 技術棧最佳實踐：`.agents/skills/*-best-practices/SKILL.md`
- 架構規範：`docs/project_architecture_best_practices.md`
- bootstrap 流程：`docs/agent_bootstrap_workflow.md`
- 市集與開源 readiness：`docs/marketplace_open_source_readiness.md`
- 發版規則：`docs/release_version_policy.md`
- 專案生命週期：`docs/project_lifecycle_automation.md`
- 技術棧提示：`prompts/interactive_tech_stack_prompt.md`
- Prompt 範本：`prompts/`
- 部署文檔：`docs/zeabur_*.md`
- 設定模板：`config/`
- 腳本：`scripts/`

## 腳本可移植性規則

- 新腳本預設優先用 Node.js，因為比 `.sh` 更易跨平台
- `.sh` 只留給 sandbox 安裝、CLI 包裝、環境導向工作
- 每支新腳本都要補：
  - `config/script_capabilities.json`
  - `docs/script_fallback_matrix.md`
  - 必要時 `scripts/bootstrap_agent_files.js`
- 腳本不可跑時，不得把 workflow 判定為失敗；先走 fallback

## 官方優先

查文檔時優先使用：

- OpenAI Codex / API：`developers.openai.com`
- Claude Code：`code.claude.com`、`docs.anthropic.com`
- Cursor：`cursor.com/docs`
- Gemini CLI：`github.com/google-gemini/gemini-cli`
- GitHub Copilot：`docs.github.com`
- Zeabur：`zeabur.com/docs`

社群 skill 目錄（如 `awesomeclaude.ai`、`awesomeskill.ai`）只用來發現候選項。
真正要導入、安裝、寫入規範或做技術決策前，必須回官方文檔、Context7 或已驗證最佳實踐再確認。
