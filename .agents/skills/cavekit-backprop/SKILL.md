---
name: cavekit-backprop
description: Turn bugs and failed tests into durable fixes by updating code, tests, and `docs/SPEC.md`. Use when a bug, regression, or invariant violation must be traced and prevented from recurring.
---

# cavekit-backprop

上游靈感來自 `JuliusBrussee/cavekit` 的 `backprop` skill，已本地化到本 repo。

## 何時用

- 測試失敗
- 使用者回報 bug
- build / runtime 出現回歸
- `cavekit-check` 發現 drift 或 invariant violation

## 六步

1. `TRACE`
   - 找到錯誤位置與根因
2. `ANALYZE`
   - 這是 code 問題、spec 問題、還是 task 拆解問題
3. `PROPOSE`
   - 決定要補 `§B`、`§V`、`§I`、`§T` 哪些段
4. `GENERATE TEST`
   - 沒有重現或防回歸測試，不算完成
5. `VERIFY`
   - 修 code、跑測試、確認沒有新回歸
6. `LOG`
   - 更新 `docs/DEBUG_NOTES.md`、`docs/STATE.md`

## 強制規則

- 每個 bug 至少追加一筆 `§B`
- 若可抽象成規則，補新的 `§V`
- 外部輸入、權限、RLS、環境變數問題，優先補規範，不只補實作
- 若根因只是一次性資料修補，也要記 `§B`，但不必硬塞 `§V`
