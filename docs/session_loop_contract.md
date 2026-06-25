# Session Loop Contract

這份文件定義本 repo 的「session 內通用 loop 協定」。

目標：

- 不依賴單一平台的 `/goal`、`/loop`、custom command
- 讓不同 AI 都能在同一個 session 內跑出相近效果
- 讓 loop 狀態落到 repo，而不是只留在聊天記憶

## 核心檔案

```text
.loop/
  GOAL.md
  PLAN.md
  STATE.json
  CHECKPOINTS.md
  EVIDENCE.md
  POLICY.md
```

## 檔案責任

| 檔案 | 用途 |
| --- | --- |
| `.loop/GOAL.md` | 寫 objective、done definition、限制 |
| `.loop/PLAN.md` | 寫 phase、目前切片、acceptance criteria |
| `.loop/STATE.json` | 給 agent / script 讀的結構化狀態 |
| `.loop/CHECKPOINTS.md` | 每輪做了什麼、下一輪做什麼 |
| `.loop/EVIDENCE.md` | test / lint / build / runtime 證據 |
| `.loop/POLICY.md` | 什麼情況可自動繼續，什麼情況該停 |

## 初始化

一般專案：

```bash
node scripts/init_session_loop.js . --goal "你的目標"
```

新專案工作區：

```bash
node scripts/init_project_workspace.js ../your-project --name your-project --idea "你的想法"
```

## 每輪 loop

1. 讀 `GOAL.md`
2. 看 `STATE.json`
3. 選下一個最小切片
4. 修改 / 驗證
5. 回寫 `CHECKPOINTS.md`
6. 回寫 `EVIDENCE.md`
7. 更新 `STATE.json`

## 狀態模型

### `phase`

- `Define`
- `Plan`
- `Build`
- `Verify`
- `Review`
- `Ship`

### `current_state`

- `intake`
- `clarify`
- `capability-check`
- `stack-and-deps`
- `spec-and-architecture`
- `task-slicing`
- `implementation-loop`
- `review-gate`
- `ship-prep`

### `status`

- `active`
- `blocked`
- `complete`

## 原則

- session 內 loop 可以很強，但不吹噓背景常駐能力
- 每輪都要有證據
- 可以自動持續，但停止條件要明確
- repo 檔案優先於聊天記憶
- 腳本只是加速器；若跑不了，改走 `docs/script_fallback_matrix.md`
