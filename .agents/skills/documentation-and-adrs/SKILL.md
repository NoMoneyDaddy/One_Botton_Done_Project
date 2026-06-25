---
name: documentation-and-adrs
description: Capture important decisions, project state, and maintenance-facing documentation as part of delivery. Use when making architectural choices, changing public behavior, completing milestones, or handing work to another agent or human.
---

# documentation-and-adrs

記錄為什麼，不只記錄做了什麼。

## 必更新

- `README.md`
- `docs/SPEC.md`
- `docs/TASKS.md`
- `docs/STATE.md`
- `docs/DEBUG_NOTES.md`
- `docs/ADRS.md`

## ADR 寫法

- Context
- Options
- Decision
- Consequences

## 何時寫 ADR

- 架構邊界改變
- 公開介面改變
- 技術棧改變
- 高風險預設決策

## 規則

- 文件只寫仍然有用的事
- 階段完成就補，不要拖到最後
- 若只是 bug 修正，至少更新 `DEBUG_NOTES.md`
