---
name: test-driven-development
description: Write a failing test or executable reproduction before implementation or bug fixing. Use for logic changes, regressions, bug fixes, refactors, and any behavior that should remain stable.
---

# test-driven-development

先證明會壞，再修到會過。

## 流程

1. 先找最小可重現
2. 寫一個會失敗的測試
3. 只寫足夠讓測試通過的實作
4. 重跑測試
5. 必要時再整理 code
6. 若是 JS / TS 專案且已配置 Biome，可補跑 `npx @biomejs/biome check --write <changed-paths>`

## 優先順序

- 先測使用者可感知行為
- 再測邊界與錯誤處理
- 最後才考慮實作細節

## Bug 修復

- 沒有重現，不算找到 bug
- 修完要留回歸測試
- 根因與修法記進 `docs/DEBUG_NOTES.md`

## 規則

- 不用測試取代思考
- 不為了過測試去改錯需求
- 測試過慢時，先縮小測試層級
- 若現有專案完全沒測試，至少建立最小保護網
