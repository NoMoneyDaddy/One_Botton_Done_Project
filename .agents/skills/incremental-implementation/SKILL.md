---
name: incremental-implementation
description: Implement work in thin vertical slices that keep the system runnable and testable after each step. Use when building any feature that touches multiple files, layers, or moving parts.
---

# incremental-implementation

一次做一小塊，永遠保持可跑。

## 流程

1. 從 `docs/TASKS.md` 選一個最小 task
2. 先定義這塊的完成條件
3. 只改必要檔案
4. 讓系統保持可執行
5. 立刻驗證
6. 回寫 `docs/STATE.md`

## 切片方式

- 先打通一條完整流程
- 再補強例外、驗證、邊角
- 先功能通，再做加值能力

## 規則

- 不一口氣開太多支線
- 不順手重寫無關模組
- 每次修改都要能說明對應哪個 task
- 若變更太大，退回 `planning-and-task-breakdown`
- 若行為改動，搭配 `test-driven-development`
