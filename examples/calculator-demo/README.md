# Calculator Demo — Protocol Validation

本專案是用 `AGENTS.md` v2 自主交付協議建立的端到端驗證範例。

## 驗證目標

證明任何 AI 讀完 `AGENTS.md` 後，能自主完成：
1. 理解需求
2. 規劃任務
3. 實作交付
4. 驗證可用

## 技術決策（ADR）

- **選擇純 HTML/CSS/JS**：零依賴，任何環境都能開啟
- **單一檔案**：降低驗證複雜度
- **原因記錄**：遵循 AGENTS.md 第 2 節「不要停下來問，直接做最佳決策」

## 使用方式

```bash
# 直接用瀏覽器開啟
open index.html

# 或用任何 HTTP server
npx serve .
python3 -m http.server 8080
```

## 驗證結果

- [x] Phase 1: Understand — 需求明確（計算機 web app）
- [x] Phase 2: Plan — 單一任務，零依賴
- [x] Phase 3: Build-Verify — 實作完成，可在瀏覽器運行
- [x] Phase 4: Ship — 文件完成

## 此範例證明了什麼

1. AI 不需要問「要不要開始」— 直接開始
2. AI 自主選擇技術棧（純 HTML）並記錄原因
3. AI 交付可運行的成品
4. 整個過程無需人工確認
