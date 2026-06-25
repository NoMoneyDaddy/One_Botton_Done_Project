# Engineering Phase Loop

本文件把任務型工程工作固定成 phase loop。

調研吸收：

- `FarzamMohammadi/the-engineer`
- `agenticloops-ai/agentic-ai-engineering`
- `Dryxio/auto-re-agent`

## Core Phases

```text
Requirements
-> Research
-> Planning
-> Execution
-> Verify
-> Review
-> Delivery
```

## Phase Outputs

| Phase | 產出 | 回退 |
| --- | --- | --- |
| Requirements | 成功條件、限制、風險 | intake / clarify |
| Research | 現況、來源、依賴 | Requirements |
| Planning | 切片、順序、邊界 | Research |
| Execution | 最小必要修改 | Planning |
| Verify | test / lint / smoke / evidence | Execution |
| Review | quality / security / maintainability gate | Planning / Execution |
| Delivery | docs / release / handoff | Review |

## Invariants

- `Verify` 不可省略
- `Review` 可縮小，不可假裝不存在
- 無法自證就改 `blocked`
- 同根因連修 3 次失敗就熔斷

## Task States

- `queued`
- `active`
- `blocked`
- `retrying`
- `complete`
- `failed`
