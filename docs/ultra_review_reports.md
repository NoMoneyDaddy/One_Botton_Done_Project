# Ultra Review Reports

日期：`2026-06-25`

本文件保存本輪 6 份正反論點審查摘要。用途是讓後續 AI 不只看到結論，也看到取捨。

## R1 - 多 AI 入口層

正方：

- `AGENTS.md` 作為共享核心，`CLAUDE.md`、`GEMINI.md`、Cursor、Copilot 入口都能導回同一套規則。
- 入口檔短而集中，降低不同平台讀到互相矛盾規則的機率。

反方：

- 各平台支援能力不等，不能把「可讀入口」誤寫成「完整功能等價」。
- 若入口檔新增規則但未同步 README 與 docs，AI 仍會走偏。

本輪處理：

- 保留 `AGENTS.md` 單一事實來源定位。
- 增加 repo integrity gate，檢查核心入口檔存在。

## R2 - Skill Runtime 與 Mirror

正方：

- `.agents/skills/` 是 canonical，`.claude/skills/` 與 `skills/` 是 wrapper，結構清楚。
- 35 個 skill 名稱在三個入口一致，利於 Codex、Claude、OpenClaw、Hermes 類工具讀取。

反方：

- mirror 一旦手動維護，容易出現數量或名稱漂移。
- wrapper 路徑若失效，AI 會以為 skill 存在但讀不到內容。

本輪處理：

- 新增 mirror 一致性檢查。
- CI 會擋下 skill 名稱漂移。

## R3 - 自動化腳本與跨平台降級

正方：

- Node.js 腳本比 shell 更跨平台，適合 sandbox、remote runner、桌面工具。
- `config/script_capabilities.json` 與 `docs/script_fallback_matrix.md` 已把「跑不了怎麼辦」文件化。

反方：

- 腳本新增後若沒登記 fallback，跨平台承諾會失真。
- shell 腳本仍依賴 package manager、network、平台權限。

本輪處理：

- 新增 `scripts/validate_repo_integrity.js`。
- 檢查所有 `scripts/*.js` / `scripts/*.sh` 都有 capability declaration。

## R4 - 文件架構與真實性

正方：

- `docs/architecture.md` 已對齊本 repo 真實定位：治理層、skill runtime、文件層、自動化層、session state。
- `docs/SPEC.md`、`docs/TASKS.md`、`docs/STATE.md`、`docs/DEBUG_NOTES.md`、`docs/ADRS.md` 讓 repo 自己也遵守它要求新專案遵守的規範。

反方：

- 文件數量多，若缺自動驗證，容易再次留下過時引用。
- 使用者只讀 README 時，可能不知道哪些文件是核心、哪些是參考。

本輪處理：

- 新增 Markdown 本地連結檢查。
- README 補上 integrity gate。

## R5 - 品質閘門與 CI

正方：

- 既有 CI 已檢查 Node 語法、shell 語法、JSON、初始化 smoke test。
- 這類 repo 不需要完整 app build，但需要文件與治理結構驗證。

反方：

- 原 CI 只解析部分 JSON，漏掉新增 config。
- 原 CI 沒擋缺檔、壞連結、script capability 漏登記。

本輪處理：

- CI 改為解析所有 `config/*.json`。
- CI 新增 `node scripts/validate_repo_integrity.js`。

## R6 - 無人值守 Loop 與交付邊界

正方：

- `.loop/*`、`docs/subagent_dispatch.md`、`docs/session_loop_contract.md` 已提供跨平台 loop 協定。
- 支援平台有 subagents 時可平行分派；沒有時可用單代理順序執行，效果可接近。

反方：

- GitHub push、PR ready、merge 需要遠端權限、分支策略與審查狀態，不能偽裝成一定能自動完成。
- 高風險決策可採可逆預設，但外部憑證、審查批准、付款、登入仍是硬阻塞。

本輪處理：

- 保留自動 loop 原則。
- 交付前以本地驗證與 diff 為 gate；遠端 commit / push / PR 依 repo 規則在確認後執行。

## 三審查員 Gate

### Reviewer A - 架構 / 跨平台

結論：通過。

- 入口層、skill runtime、docs、automation、session state 分層清楚。
- `.agents/skills`、`.claude/skills`、`skills` 名稱一致，已由 validator 檢查。
- 限制已寫清楚：不是所有平台都有同等 MCP、subagent、部署能力。

### Reviewer B - 品質 / 測試

結論：通過。

- CI 已新增 repo integrity gate。
- bootstrap 產生的新專案已實測可通過 `node scripts/validate_repo_integrity.js`。
- `scaffold_project.js` 的 plan mode 已檢查三個 profile。

### Reviewer C - 安全 / 交付

結論：有條件通過。

- API key / token 原則仍是環境變數，不進 repo。
- shell / network / package-manager 腳本已標為 environment-bound，不再假設全平台可跑。
- commit / push / PR / merge 屬遠端狀態變更，依 repo 規則需在本地 diff 後確認範圍再執行。
