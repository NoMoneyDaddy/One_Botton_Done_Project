---
name: website-best-practices
description: Build websites with strong semantic HTML, accessibility, performance, content structure, and predictable frontend behavior. Use for landing pages, marketing sites, dashboards, and general web UI work.
---

# website-best-practices

## 核心原則

- 先語意，再樣式，再互動
- 先可達，再炫技
- 先內容層級，再版面裝飾
- 先快，再加重 JS

## HTML / Content

- 用正確語意元素：`header` `main` `nav` `section` `article` `footer`
- 按內容層級用 heading，不跳層
- button 用 `button`，連結用 `a`
- form 要有 label、錯誤訊息與可聚焦路徑

## Accessibility

- 鍵盤可操作
- focus visible
- 色彩對比達標
- 圖片、icon、控制元件有替代文字或 aria 說明

## Performance

- 避免不必要的 client JS
- 先壓圖片、字型、第三方 script
- 大型元件 lazy load
- 互動前先確認是否真的需要 hydration

## 與其他 skill 的搭配

- 視覺與 UX：`ui-ux-designer`
- TypeScript：`typescript-best-practices`
- RWD：`responsive-design-best-practices`
- React / Next：再搭配官方 React best practices
