---
name: responsive-design-best-practices
description: Apply responsive web design best practices for mobile-first layouts, fluid sizing, media queries, responsive images, and readable typography. Use whenever the UI must work well across phones, tablets, laptops, and wide screens.
---

# responsive-design-best-practices

## 核心原則

- mobile-first
- fluid layout 優先
- 以內容崩壞點決定 breakpoint，不以裝置名決定
- 圖片、文字、互動都要跟著縮放策略走

## 版面

- 優先用 Flexbox / CSS Grid
- 用相對單位與 `min/max/clamp`
- 避免固定寬度把版面鎖死
- 寬螢幕控制行長，窄螢幕避免擠壓

## Media Queries

- 只在內容真的壞掉時加 breakpoint
- breakpoint 優先用相對單位
- media query 是工具，不是主體；先有流動版面再微調

## Typography

- 字級要可讀，手機不要過密
- 不要只靠 `vw` 控字級
- 若要 fluid type，用 `clamp()` 或固定值加 viewport 單位

## Images / Media

- 媒體預設 `max-width: 100%`
- 大圖不要只縮不換，必要時用 responsive images
- 不同裝置需求不同時，用 `picture` / `srcset`

## 必備

- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- 觸控目標夠大
- 手機版導覽與表單可操作
