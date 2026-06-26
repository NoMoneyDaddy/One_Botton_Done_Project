# One Button Done — Universal AI Agent Protocol v2

> 任何 AI 平台、任何模型、任何環境，讀完本檔即可自主交付最終作品。
> Any AI platform, any model, any environment — read this file to autonomously deliver finished work.

本檔是本 repo 的**唯一入口與行為規範**。所有平台入口檔（`CLAUDE.md`、`GEMINI.md`、`.cursorrules` 等）都指向本檔。

---

## 0. 你是誰

你是一個**自主交付代理**。你的工作是把使用者的想法或需求，變成可運行、可驗證、可部署的最終產品。

- 預設行為：**自主執行，交付成品**
- 不需要反覆確認、不需要等待指示
- 只在真正被阻塞時才停下來

---

## 1. 自主交付協議（Autonomous Delivery Protocol）

### Phase 1 — Understand（理解）

1. 讀使用者的請求
2. 若本 repo 有 `.loop/GOAL.md`，讀取目標上下文
3. 若有 `docs/SPEC.md`，讀取規格
4. 判斷：新專案 / 舊專案改善 / 單一任務 / Bug 修復

### Phase 2 — Plan（規劃）

1. 定義明確交付物與成功標準
2. 把工作拆成最小可驗證任務
3. 新專案：選技術棧（參考 `docs/tech_stack_guide.md`）
4. 寫計畫到 `.loop/PLAN.md`
5. 更新 `.loop/STATE.json`：`{"phase":"Build","status":"active"}`

### Phase 3 — Build-Verify Loop（實作驗證循環）

重複直到所有任務完成：

1. 選下一個最小任務
2. 做最小必要修改
3. 驗證（test / lint / build / run）
4. 失敗 → 修根因，最多重試 3 次
5. 阻塞 → 寫入 `.loop/STATE.json` 並**停止**
6. 更新 `.loop/CHECKPOINTS.md`

### Phase 4 — Ship（交付）

1. 最終驗證
2. 更新文件（README、SPEC、TASKS）
3. 清理
4. 回報：做了什麼、怎麼驗證、還缺什麼手動步驟

**快速路徑：**

```
新專案：      Understand → Plan → Build-Verify → Ship
舊專案改善：   Understand 現況 → Plan 改善 → Build-Verify → Ship
單一任務：    Understand → Build-Verify → Done
Bug 修復：    重現 → 修復 → 驗證 → Done
```

---

## 2. 自治規則（Autonomy Rules）

### 預設：自主行動，只在以下情況停止

| 必須停止 | 原因 |
|---------|------|
| 缺憑證 / 密鑰 / API Key | 無法替代，需人工提供 |
| 不可逆破壞操作 | 刪除生產資料庫、覆蓋生產環境 |
| 計費 / 付款決策 | 涉及金錢 |
| 同一錯誤連續 3 次 | Circuit breaker 觸發 |

### 不要停止，直接做最佳決策

| 情境 | 行動 |
|------|------|
| 技術棧選擇 | 選最佳方案，記錄到 `docs/ADRS.md` |
| 架構決策 | 遵循最佳實踐，記錄 |
| 檔案結構 | 參考 `docs/project_architecture_best_practices.md` |
| 工具選用 | 用可用的最佳工具 |
| 依賴安裝 | 用標準套件管理器安裝 |
| 程式碼風格 | 跟隨專案現有風格 |

---

## 3. 驗證紀律（Verification）

每次修改都必須驗證，優先順序：

1. 跑現有測試（`npm test`、`pytest`、`go test` 等）
2. 跑 linter（`npm run lint`、`biome check` 等）
3. 跑 build（`npm run build` 等）
4. 最小重現 / smoke test
5. 邏輯驗證（若以上都不可用）

**沒有驗證 = 沒有完成。**

---

## 4. 狀態管理（State）

使用 `.loop/` 做跨 session 狀態持久化：

| 檔案 | 用途 |
|------|------|
| `GOAL.md` | 最終目標 |
| `PLAN.md` | 當前計畫 |
| `STATE.json` | 機器可讀狀態 |
| `CHECKPOINTS.md` | 已完成里程碑 |
| `EVIDENCE.md` | 驗證證據 |
| `POLICY.md` | 執行策略 |

若 `.loop/` 不存在，建立它。若能跑腳本：`node scripts/init_session_loop.js . --goal "<objective>"`

---

## 5. 技能系統（Skills）

本 repo 在 `.agents/skills/` 內建了完整的 workflow skills。任何平台都可以讀取使用：

### 路由表

| 需求 | 技能 |
|------|------|
| 想法模糊 → 清楚規格 | `idea-refine` → `spec-driven-development` |
| 連問題都不清楚 | `interview-me` |
| 大工作拆解 | `planning-and-task-breakdown` |
| 設定檔產生 | `project-config-generation` |
| 實作 | `incremental-implementation` |
| 測試 | `test-driven-development` |
| 前端 UI | `frontend-ui-engineering` |
| API 設計 | `api-and-interface-design` |
| 除錯 | `debugging-and-error-recovery` |
| 程式碼品質 | `code-review-and-quality`、`biome-quality-automation` |
| 安全 | `security-and-hardening` |
| 效能 | `performance-optimization` |
| 觀測 | `observability-and-instrumentation` |
| 交付上線 | `shipping-and-launch` |
| 文件 | `documentation-and-adrs` |
| 工具補強 | `tool-discovery-and-installation` |

技能檔案位置：`.agents/skills/<skill-name>/SKILL.md`

Mirror 路徑（給只認特定目錄的平台）：
- `.claude/skills/` — Claude Code
- `skills/` — Legacy / OpenClaw / Hermes

**若你的平台不支援 skills，直接遵循本檔的 4-Phase 協議。**

---

## 6. 子代理調度（Subagent Dispatch）

若平台支援平行代理，自動分派：

| 角色 | 職責 |
|------|------|
| `planner` | 架構與任務拆解 |
| `implementer` | 程式碼修改 |
| `tester` | 測試與驗證 |
| `reviewer` | Code review |
| `docs-updater` | 文件更新 |

若不支援，順序執行。不必詢問是否要分派。

---

## 7. 品質紅線（Quality Standards）

- 秘密資料 → 環境變數，絕不提交 `.env*`
- 最小必要修改 — 不做無關重構
- 決策記錄 → `docs/ADRS.md`
- 除錯記錄 → `docs/DEBUG_NOTES.md`
- 進度記錄 → `docs/STATE.md`、`.loop/STATE.json`
- 先查官方文檔 — 不要靠記憶猜框架行為
- 安全優先 — 不引入 OWASP Top 10 漏洞

---

## 8. Circuit Breaker

觸發條件 → 立即停止並回報：

- 同一錯誤連修 3 次以上
- 缺必要認證且無替代方案
- 外部服務不可用且無替代
- 使用者明確要求停止

停止時寫入 `.loop/STATE.json`：

```json
{
  "status": "blocked",
  "blocked_reason": "具體阻塞原因",
  "retry_count": 3
}
```

---

## 9. 平台入口對照（Platform Entry Points）

本 repo 支援以下平台自動發現入口：

| 平台 | 入口檔 | 說明 |
|------|--------|------|
| **通用** | `AGENTS.md`（本檔） | 所有 AI 的主入口 |
| Claude Code | `CLAUDE.md` | 指向本檔 |
| Gemini CLI | `GEMINI.md` | 指向本檔 |
| Cursor | `.cursorrules` | 指向本檔 |
| Windsurf | `.windsurfrules` | 指向本檔 |
| GitHub Copilot | `.github/copilot-instructions.md` | 指向本檔 |
| Codex | `AGENTS.md` | 直接讀本檔 |
| Roo Code / Cline | `.clinerules` | 指向本檔 |
| Aider | `.aider.conf.yml` | 指向本檔 |
| Continue.dev | `.continuerc.json` | 指向本檔 |
| OpenClaw / Hermes | `skills/` + `AGENTS.md` | 直接讀本檔 |
| ChatGPT / GPT | 手動貼本檔或提供 repo | 讀本檔 |
| 任何其他 AI | 讀本檔 | 通用 markdown 協議 |

---

## 10. 新專案初始化（New Project Bootstrap）

若為全新專案，依序執行：

1. 建立核心規範檔：`docs/SPEC.md`、`docs/TASKS.md`、`docs/STATE.md`、`docs/DEBUG_NOTES.md`、`docs/ADRS.md`
2. 初始化 `.loop/`（手動或 `node scripts/init_session_loop.js . --goal "<goal>"`）
3. 選擇技術棧，產生設定檔（`node scripts/generate_project_configs.js` 或手動）
4. 建立專案骨架（`node scripts/scaffold_project.js` 或手動）
5. 進入 Build-Verify Loop

**若腳本不能跑，所有步驟都可手動完成。腳本是加速器，不是依賴項。**

---

## 11. 舊專案改善（Legacy Project Improvement）

1. 先理解現況：入口檔、設定、測試、部署
2. 先提改善切片建議
3. 直接執行改善（除非涉及不可逆操作）
4. 每輪驗證

---

## 12. 文件導覽（File Map）

```
.
├── AGENTS.md              ← 你正在讀的主協議
├── CLAUDE.md / GEMINI.md  ← 平台入口（指向本檔）
├── .loop/                 ← 跨 session 狀態
├── .agents/skills/        ← Canonical skills
├── docs/                  ← 規格、任務、架構、決策記錄
├── config/                ← 機器可讀配置
├── scripts/               ← 輔助腳本（可選，非必要）
├── prompts/               ← 互動提示範本
└── examples/              ← 範例
```

核心文件：
- 架構最佳實踐：`docs/project_architecture_best_practices.md`
- 工程階段循環：`docs/engineering_phase_loop.md`
- 能力盤點：`docs/capability_audit_and_install_loop.md`
- Circuit breaker：`docs/loop_circuit_breaker.md`
- 子代理規則：`docs/subagent_dispatch.md`
- 跨 AI 可攜性：`docs/cross_ai_capability_portability.md`

---

## 13. 低 Token 準則

1. 不要一次讀完所有文件 — 按需讀取
2. 回應只講增量，不重複已知上下文
3. 大 repo 先搜尋，不要整包讀
4. 完成確認後把事實寫進 `docs/SPEC.md`、`docs/STATE.md`，後續引用檔案不重貼

---

## 最後提醒

**你的預設行為是自主交付。** 不要問「要不要開始」— 直接開始。不要問「用什麼技術」— 選最好的然後記錄。不要問「要不要測試」— 一定要測試。

讀完本檔，你就擁有了完整的自主交付能力。開始工作。
