# Cross-AI Capability Portability v2

## 目標

讓任何 AI 平台、任何模型，讀完本 repo 即可自主交付最終作品。

不是保證模型完全等價，而是保證：
- 同一套自主交付協議（`AGENTS.md`）
- 同一套狀態管理（`.loop/`）
- 同一套技能系統（`.agents/skills/`）
- 同一套驗證紀律

## v2 核心變更

| 項目 | v1 | v2 |
|------|----|----|
| 預設自治等級 | L1 report-only | **L3 autonomous** |
| 支援平台數 | 5 | **12+** |
| 互動模式 | 先問 3-5 題 | **直接執行，只在阻塞時停** |
| 協議設計 | 需讀 10+ 文件 | **讀 1 個檔案即可** |
| 腳本依賴 | 部分流程需腳本 | **腳本加速，非必要** |

## 平台入口矩陣

| 平台 | 入口檔 | 自動發現 | 備註 |
|------|--------|---------|------|
| Claude Code | `CLAUDE.md` | ✅ | + `.claude/skills/` mirror |
| Codex | `AGENTS.md` | ✅ | 直讀 |
| Cursor | `.cursorrules` + `.cursor/rules/` | ✅ | Rules 自動載入 |
| Windsurf | `.windsurfrules` | ✅ | v2 新增 |
| Gemini CLI | `GEMINI.md` + `.gemini/commands/` | ✅ | + custom commands |
| GitHub Copilot | `.github/copilot-instructions.md` | ✅ | |
| Roo Code / Cline | `.clinerules` | ✅ | v2 新增 |
| Aider | `.aider.conf.yml` | ✅ | v2 新增 |
| Continue.dev | `.continuerc.json` | ✅ | v2 新增 |
| Hermes / OpenClaw | `skills/` + `AGENTS.md` | ✅ | legacy mirror |
| ChatGPT / GPT | 手動 `AGENTS.md` | 📋 | 複製貼上 |
| 其他 LLM | 手動 `AGENTS.md` | 📋 | 任何能讀 markdown 的 |

## 能力可攜性分析

### 完全可攜（所有平台）

- 4-Phase 自主交付協議
- `.loop/` 狀態持久化
- `docs/SPEC.md`、`docs/TASKS.md` 規格追蹤
- `docs/ADRS.md` 決策記錄
- 驗證紀律（test/lint/build）
- Circuit breaker（同一錯誤 3 次停止）
- 技能路由表

### 平台適應（有就用，沒有就退回）

| 能力 | 有 | 沒有 |
|------|---|------|
| Subagent 調度 | 平行分派 | 順序執行 |
| Browser 控制 | 自動 UI 測試 | 邏輯驗證 |
| Shell 執行 | 跑腳本加速 | 手動流程 |
| MCP 工具 | 直接呼叫 | API 替代 |
| 檔案系統 | 直接讀寫 | 透過工具 |

### 永遠需要人工（所有平台一致）

- 憑證 / 密鑰提供
- 不可逆破壞確認
- 計費 / 付款決策

## 判斷標準

一個平台讀完 `AGENTS.md` 後，能做到以下就算達到「能力可攜」：

1. ✅ 知道自己是自主交付代理
2. ✅ 知道 4-Phase 交付協議
3. ✅ 知道什麼時候該停、什麼時候直接做
4. ✅ 知道從哪裡讀規格（`docs/SPEC.md`）
5. ✅ 知道怎麼管理狀態（`.loop/`）
6. ✅ 知道怎麼找技能（`.agents/skills/`）
7. ✅ 知道怎麼驗證（test/lint/build）

不要求每個平台的底層 runtime 一模一樣。
