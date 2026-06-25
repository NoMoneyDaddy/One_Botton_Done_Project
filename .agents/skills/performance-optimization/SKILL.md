---
name: performance-optimization
description: Optimize performance only after measuring and locating the bottleneck. Use when there are explicit latency, throughput, bundle-size, or Core Web Vitals goals, or when regressions are suspected.
---

# performance-optimization

先量，再優化。

## 流程

1. 定義指標
2. 量測現況
3. 找瓶頸
4. 只修瓶頸
5. 再量一次

## Web 常見指標

- LCP
- INP
- CLS
- bundle size
- query latency
- cold start

## 規則

- 沒數據，不下優化結論
- 不為了假想問題增加複雜度
- 若是前端，優先看圖片、JS 體積、資料抓取與快取
