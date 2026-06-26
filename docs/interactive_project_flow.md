# Autonomous Project Flow v2

本文件描述本 repo 的**自主交付工作流**。

## 核心變更（v1 → v2）

| 項目 | v1 | v2 |
|------|----|----|
| 預設行為 | 互動式，先問 3-5 題 | **自主執行，只在阻塞時停** |
| 自治等級 | L1 report-only | **L3 autonomous** |
| 確認 gate | 至少 2 次確認 | **只在不可逆操作時確認** |

## 4-Phase 自主交付協議

```
Phase 1: Understand → 讀需求、目標、現況
Phase 2: Plan      → 拆任務、選技術棧、寫計畫
Phase 3: Build     → 實作-驗證循環
Phase 4: Ship      → 最終驗證、文件、交付
```

## 六階段生命週期

| Phase | 中文 | 目標 | 常用 skills |
| --- | --- | --- | --- |
| Define | 定義 | 把模糊需求變成清楚問題 | `idea-refine` `interview-me` `spec-driven-development` |
| Plan | 規劃 | 把 spec 變成可執行任務 | `planning-and-task-breakdown` |
| Build | 實作 | 小切片持續交付 | `incremental-implementation` `test-driven-development` `source-driven-development` |
| Verify | 驗證 | 用真實證據證明可行 | `browser-testing-with-devtools` `debugging-and-error-recovery` |
| Review | 審查 | 合併前品質門檻 | `code-review-and-quality` `security-and-hardening` `biome-quality-automation` |
| Ship | 交付 | 可逆、可觀測、可維護 | `shipping-and-launch` `ci-cd-and-automation` `documentation-and-adrs` |

## State Machine

常見路徑：

```
新專案：     intake → plan → build-verify-loop → ship
舊專案改善：  intake → capability-check → build-verify-loop → ship
單一任務：   intake → build-verify → done
Bug 修復：   reproduce → fix → verify → done
```

規則：

- 小任務可直接 `intake` → `build-verify` → `done`
- 新資訊出現時可回退
- **不要停下來問「要不要繼續」**

## Quality Loop

每次實作切片後：

1. 最小必要修改
2. 自動修正可安全修正的品質問題
3. 跑測試或最小驗證
4. 失敗就修根因
5. 更新文件與狀態

JS/TS 專案有 Biome 時：`npx @biomejs/biome check --write <paths>`

## Session Loop State

使用 `.loop/` 做跨 session 狀態持久化：

- `GOAL.md` — 最終目標
- `PLAN.md` — 當前計畫
- `STATE.json` — 機器可讀狀態
- `CHECKPOINTS.md` — 已完成里程碑
- `EVIDENCE.md` — 驗證證據
- `POLICY.md` — 執行策略

初始化：`node scripts/init_session_loop.js . --goal "目標"` 或手動建立

## Stop Conditions

只有這些情況才停：

- 缺憑證 / 密鑰 / API Key
- 不可逆破壞操作需確認
- 計費 / 付款決策
- 同一錯誤連修 3 次仍失敗
