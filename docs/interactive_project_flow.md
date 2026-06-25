# Interactive Project Flow

這份文件描述本 repo 的**自適應工作流**。

不是固定 9 步。
也不是只有一條線。

真正結構是：

1. 六階段生命週期
2. 階段內的可跳轉 state
3. 品質 gate 與自動迭代 loop
4. `.loop/*` 作為 session 內共用狀態

## 六階段生命週期

參考 Giga AI Studio 與 addyosmani/agent-skills 的共同核心，本 repo 以這六階段為骨架：

| Phase | 中文 | 目標 | 常用 skills |
| --- | --- | --- | --- |
| Define | 定義 | 把模糊需求變成清楚問題 | `using-agent-skills` `interview-me` `idea-refine` `spec-driven-development` |
| Plan | 規劃 | 把 spec 變成可執行任務 | `planning-and-task-breakdown` |
| Build | 實作 | 小切片持續交付 | `incremental-implementation` `test-driven-development` `source-driven-development` |
| Verify | 驗證 | 用真實證據證明可行 | `browser-testing-with-devtools` `debugging-and-error-recovery` |
| Review | 審查 | 合併前品質門檻 | `code-review-and-quality` `code-simplification` `security-and-hardening` `performance-optimization` `biome-quality-automation` |
| Ship | 交付 | 可逆、可觀測、可維護 | `git-workflow-and-versioning` `ci-cd-and-automation` `observability-and-instrumentation` `documentation-and-adrs` `shipping-and-launch` |

## State Machine

每個 session 不一定走完全部 phase。

常見 state：

1. `intake`
2. `clarify`
3. `capability-check`
4. `stack-and-deps`
5. `spec-and-architecture`
6. `task-slicing`
7. `implementation-loop`
8. `review-gate`
9. `ship-prep`

規則：

- 小任務可直接從 `intake` → `task-slicing` → `implementation-loop`
- 舊專案可從 `intake` → `capability-check` → `review-gate`
- 新資訊出現時，可以回退到前一個 state
- 外部阻塞解除後，從最近 state 繼續

## Define 階段細化

### 什麼時候用 `interview-me`

- 使用者只有一句模糊描述
- AI 不確定真正要解的是什麼問題
- 問題是高風險或成本高

### 什麼時候用 `idea-refine`

- 已知道題目，但方向很多
- 需要收斂成 1 個主方案與少量備選

### 什麼時候進 `spec-driven-development`

- 已經能說清楚：
  - 誰要用
  - 要解什麼
  - 什麼叫完成
  - 有哪些限制

## Default Session Shapes

### A. 新專案

1. `intake`
2. `interview-me` 或 `idea-refine`
3. `capability-check`
4. `stack-and-deps`
5. `spec-and-architecture`
6. `task-slicing`
7. `implementation-loop`
8. `review-gate`
9. `ship-prep`

### B. 舊專案改善

1. `intake`
2. `capability-check`
3. `review-gate`
4. `task-slicing`
5. `implementation-loop`
6. `review-gate`
7. `ship-prep`

## Quality Loop

這是本 repo 的強制增強，不只是流程步驟。

每次實作切片後，都應進一輪 quality loop：

1. 最小必要修改
2. 自動修正可安全修正的品質問題
3. 跑測試或最小驗證
4. 失敗就 triage
5. 更新文件

若是 JS / TS 專案且已配置 Biome：

```bash
npx @biomejs/biome check --write <changed-paths>
```

CI / merge gate：

```bash
npx @biomejs/biome ci .
```

## Session Loop Contract

若平台沒有內建 `/goal`，就用 repo 內：

- `.loop/GOAL.md`
- `.loop/PLAN.md`
- `.loop/STATE.json`
- `.loop/CHECKPOINTS.md`
- `.loop/EVIDENCE.md`
- `.loop/POLICY.md`

初始化：

```bash
node scripts/init_session_loop.js . --goal "你的目標"
```

## Confirm Gates

確認不是固定兩次。

原則：

- 小任務：一次確認即可
- 中大型任務：建議兩次確認
- 高風險任務：必要時可再加 gate

常見 gate：

- `direction gate`：短版方向確認
- `plan gate`：完整計畫與 task 切片確認
- `risk gate`：不可逆、成本高、外部依賴重時額外確認

## Stop Conditions

只有這些情況才停：

- 缺憑證、權限、付款、登入
- 需要使用者做不可逆選擇
- 外部服務不可用且無替代方案
- 同一錯誤連修 3 次仍失敗

## Commands

```bash
node scripts/inspect_agent_capabilities.js
node scripts/auto_skill_setup.js --project-type web-app --ui-style modern --deployment zeabur --language typescript --database supabase
node scripts/init_project_workspace.js ../your-project --name your-project --idea "你的想法"
```
