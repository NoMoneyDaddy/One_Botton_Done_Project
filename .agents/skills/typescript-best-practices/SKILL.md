---
name: typescript-best-practices
description: Apply TypeScript best practices for strict mode, safe narrowing, tsconfig safety, robust error handling, and maintainable React/frontend code. Use whenever the stack includes TypeScript.
---

# typescript-best-practices

本 skill 綜合：

- `typescript-rules` 社群 skill 的高價值規則
- TypeScript 官方文檔的 durable guidance

## 核心原則

- `strict: true`
- 禁用無意義的 `any`
- 外部輸入先當 `unknown`
- 用 narrowing、discriminated unions、type guards 收斂型別
- `satisfies` 優先於粗暴 assertion

## 型別規則

- API 回應、URL params、storage、第三方資料：先 `unknown`
- 進業務邏輯前要驗證型別
- 聯合型別優先用 discriminant 欄位
- 大量 assertion 代表設計有問題，先重構再硬 cast

## tsconfig 基線

- `strict: true`
- 保留 `noEmit` / build 設定與專案需求一致
- 不為了省事關掉關鍵安全選項
- 變更 `tsconfig` 前，先說明 tradeoff

## 前端實作

- props 明確定型
- state 保持單一事實來源
- 不把錯誤吞掉
- async 流程用 `try/catch` 或明確 result pattern
- 對外 I/O 邊界加 runtime validation

## React / UI 補充

- handler、state、effect 依賴要型別清楚
- component 太大先拆，不靠型別把壞設計撐住
- 共用資料結構優先抽成 domain type
