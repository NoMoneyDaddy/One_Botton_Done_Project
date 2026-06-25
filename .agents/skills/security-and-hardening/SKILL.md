---
name: security-and-hardening
description: Apply security-first engineering practices and hardening defaults. Use when handling user input, auth, secrets, storage, third-party integrations, webhooks, file uploads, or any untrusted external data.
---

# security-and-hardening

把所有外部輸入都當成敵意輸入。

## 必做

- 驗證所有輸入
- 秘密資料只走環境變數
- 權限最小化
- 日誌不要洩漏敏感資訊
- 敏感操作保留審計線索

## 常見檢查

- XSS
- CSRF
- SQL injection
- SSRF
- path traversal
- webhook 驗簽
- rate limit
- session / token 管理

## 資料層

- 預設最小權限
- 有 RLS 就用 RLS
- migration 要可回復

## 規則

- stack-specific 做法先查官方安全文檔
- 修安全問題時，不要順手放大功能範圍
