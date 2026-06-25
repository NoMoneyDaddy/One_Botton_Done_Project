---
name: interview-me
description: Run a one-question-at-a-time interview to extract what the user actually needs before planning or implementation. Use when the ask is underspecified, conflicting, high-stakes, or the user only has a loose idea.
---

# interview-me

一題一題問。不要一次倒整份問卷。

## 目標

- 用最少問題補足關鍵決策
- 避免把模糊需求直接搬進 spec
- 問到可進 `idea-refine` 或 `spec-driven-development`

## 流程

1. 先判斷缺的是哪一類資訊：
   - 使用者 / 受眾
   - 問題 / 痛點
   - 成功定義
   - 限制：時間、預算、平台、權限、資料來源
2. 一次只問 1 個最能降低不確定性的問題
3. 收到答案後：
   - 更新目前理解
   - 決定下一題是否還需要問
4. 信心足夠後，停

## 停止條件

- 已能明確說出：
  - 誰要用
  - 要解什麼
  - 什麼叫成功
  - 目前最重要限制
- 或使用者要求先進下一步

## 規則

- 不連發 5-10 題
- 每題都允許：
  - 多選
  - 跳過
  - 沿用現況
  - 請 AI 決定
- 若答案仍發散，轉 `idea-refine`
- 若答案已夠清楚，轉 `spec-driven-development`
