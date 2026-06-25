---
name: code-review-and-quality
description: Review changes across correctness, readability, architecture, security, and performance before merge. Use for pull requests, risky diffs, generated code, refactors, or any change approaching integration.
---

# code-review-and-quality

每次合併前都過五道門。

## 檢查面向

1. 正確性
2. 可讀性
3. 架構邊界
4. 安全性
5. 效能

## Review 方式

- 先看需求與 spec 有沒有對齊
- 再看 diff 是否有副作用
- 再看測試與文件是否跟上
- 若是 JS / TS 專案且已配置 Biome，先跑 `npx @biomejs/biome ci .`

## 輸出格式

- 先列 findings
- 每筆都要有：
  - 嚴重度
  - 位置
  - 問題
  - 影響
- 沒有 finding 才說無重大問題

## 規則

- 找 bug 與風險優先
- 不用長篇總結蓋過問題
- 有行為改動卻沒驗證，要擋下
- 自動格式化 / safe fix 不取代 review 本身
