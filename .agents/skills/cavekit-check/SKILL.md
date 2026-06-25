---
name: cavekit-check
description: Read-only drift checker for `docs/SPEC.md` versus code. Use before merge, before shipping, or when checking whether invariants, interfaces, and task status still match reality.
---

# cavekit-check

上游靈感來自 `JuliusBrussee/cavekit` 的 `check` skill，已本地化到本 repo。

## 原則

- 只報告，不寫檔
- `docs/SPEC.md` 沒有就停止
- 先檢查最可能壞掉的 `§V` 與 `§I`

## 檢查範圍

- `§V`：規則是否仍成立
- `§I`：介面是否 drift / missing / extra
- `§T`：已打勾的任務是否真的落地

## 輸出分類

- `HOLD`
- `VIOLATE`
- `UNVERIFIABLE`
- `MATCH`
- `DRIFT`
- `MISSING`
- `EXTRA`
- `STALE`

## 報告格式

- 先列高風險違反
- 每條都附 `file:line` 或明確證據
- 最後給下一步建議：
  - 規格錯：走 `cavekit-spec`
  - 程式錯：修 code + 測試
  - 任務狀態錯：改 `§T`
