---
name: spec-driven-development
description: Write or update a structured spec before implementation. Use for new projects, new features, major refactors, ambiguous requests, or any task that needs a shared source of truth.
---

# spec-driven-development

先寫 spec，再寫 code。

## 讀取順序

1. 讀 `docs/SPEC_FORMAT.md`
2. 讀 `docs/SPEC.md`
3. 若有舊程式，補看入口檔、設定、測試

## 必做

- 把需求寫進 `docs/SPEC.md`
- 補齊：
  - `§G Goal`
  - `§C Constraints`
  - `§I Interfaces`
  - `§V Invariants`
  - `§T Tasks`
  - `§B Bugs`

## 寫法

- `§G` 只寫要達成什麼
- `§C` 寫限制、假設、非功能需求
- `§I` 寫 UI、API、資料、環境變數、外部整合
- `§V` 只寫可測試規則
- `§T` 拆成可驗證工作
- `§B` 保留 bug 與根因

## 規則

- 沒有 spec，不做大功能。
- 規格與現況矛盾時，先指出，不偷改行為。
- 大改前先給變更摘要。
- 若需求仍模糊，先退回 `idea-refine`。
- 若規格已成形，下一步進 `planning-and-task-breakdown`。
