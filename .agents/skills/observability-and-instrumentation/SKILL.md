---
name: observability-and-instrumentation
description: Add logs, metrics, tracing, and runtime signals so shipped systems are diagnosable and rollback decisions are evidence-based. Use before production launches, when adding critical flows, or when debugging incidents without enough runtime visibility.
---

# observability-and-instrumentation

看得到，才能安全上線。

## 目標

- 讓錯誤可看見
- 讓核心流程有訊號
- 讓 rollback 有依據

## 最小觀測集

- 結構化 log
- 錯誤追蹤
- 核心成功 / 失敗指標
- 外部依賴錯誤
- 發版後 smoke signal

## 優先順序

1. 登入 / 認證
2. 支付 / 寫入資料
3. 背景任務
4. 第三方 API
5. 高流量頁面或端點

## 輸出

- 觀測點列表
- 指標與成功門檻
- 發版後要看哪些數字

## 規則

- 不把敏感資料打進 log
- 不追所有東西，先追關鍵路徑
- 沒有足夠 runtime 訊號時，不宣稱「可安全上線」
