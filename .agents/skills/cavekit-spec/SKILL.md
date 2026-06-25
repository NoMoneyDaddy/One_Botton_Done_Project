---
name: cavekit-spec
description: Maintain `docs/SPEC.md` as the structured spec source of truth. Use when turning an idea into a spec, distilling a spec from code, amending spec sections, or recording a bug back into the spec.
---

# cavekit-spec

上游靈感來自 `JuliusBrussee/cavekit` 的 `spec` skill，已本地化到本 repo。

## 讀取順序

1. 讀 `docs/SPEC_FORMAT.md`
2. 讀 `docs/SPEC.md`；若不存在，再進入 NEW 或 DISTILL

## DISPATCH

依使用者請求與 repo 狀態決定模式：

1. `docs/SPEC.md` 不存在，且輸入是想法：`NEW`
2. `docs/SPEC.md` 不存在，且輸入要求從現有程式碼整理：`DISTILL`
3. 請求以 `bug:` 開頭：`BACKPROP`
4. 請求以 `amend` 開頭：`AMEND`
5. 其他：先詢問要改哪一段

## NEW

把想法寫成結構化規格：

- `§G Goal`：一句話目標
- `§C Constraints`：限制、假設、非功能需求
- `§I Interfaces`：UI、API、資料、環境變數、第三方整合
- `§V Invariants`：先列可測試規則
- `§T Tasks`：拆成最小可驗證任務
- `§B Bugs`：先保留表頭

## DISTILL

從既有 repo 推導出規格：

- 先讀 `README.md`
- 再看入口檔、路由、資料層、測試
- 不確定的地方加 `待確認`

## BACKPROP

輸入：`bug: <description>`

做法：

1. 找 root cause
2. 在 `§B` 加一列
3. 若此 bug 代表一類可重複錯誤，補新的 `§V`
4. 若此 bug 影響範圍或功能邊界，補 `§T` 或 `§I`

## AMEND

只改被點名的區段，例如：

- `amend §V`
- `amend §T`
- `amend §I.api`

不要偷改其他段。

## OUTPUT RULES

- `docs/SPEC.md` 是結構化事實來源。
- `docs/TASKS.md` 只是人類易讀看板，不取代 `§T`。
- 任務狀態只用 `.`, `~`, `x`。
- `§V` 只寫可測試規則，不寫空話。
- 規格大改前，先顯示 diff 或變更摘要。
