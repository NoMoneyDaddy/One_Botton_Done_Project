---
name: api-and-interface-design
description: Design stable, explicit, hard-to-misuse interfaces across modules, APIs, services, and data contracts. Use when defining module boundaries, REST or GraphQL APIs, server actions, webhooks, or public function signatures.
---

# api-and-interface-design

讓對的事情容易，錯的事情困難。

## 要先定義

- 輸入
- 輸出
- 錯誤模型
- 權限邊界
- 相容性策略

## 介面設計原則

- 類型明確
- 命名一致
- 錯誤可預期
- 驗證靠邊界，不靠內部運氣
- 敏感操作要可追蹤、可重試、可回復

## 要寫進規格

- request / response 範例
- env 需求
- side effects
- idempotency 規則
- timeout / retry / rate limit 假設

## 規則

- 不把內部資料表直接暴露成公共介面
- 不用模糊的 `any`、`object`、`data`
- 破壞性變更要寫 `docs/ADRS.md` 或 migration note
