# POLICY

## Default Autonomy: L3 Autonomous

本 repo 預設自主交付模式。AI agent 讀取 `AGENTS.md` 後即可自主執行完整交付流程，無需人工確認。

## Auto-continue（直接做，不要問）

- 技術棧選擇 → 選最佳方案並記錄到 `docs/ADRS.md`
- 架構決策 → 遵循最佳實踐並記錄
- 依賴安裝 → 用標準套件管理器
- 檔案結構建立 → 參考 `docs/project_architecture_best_practices.md`
- 程式碼實作 → 最小必要修改
- 測試失敗 → 修根因
- 文件更新 → 每輪同步
- 設定檔補齊 → 直接完成
- PR 建立 → 驗證通過後自動建立

## Stop Conditions（只有這些情況才停）

- 缺憑證 / 密鑰 / API Key → 無法替代
- 不可逆破壞操作 → 刪除生產資料
- 計費 / 付款決策 → 涉及金錢
- 同一錯誤連續 3 次 → Circuit breaker

## 驗證紀律

- 每次修改都必須驗證
- 沒有驗證 = 沒有完成
- 每輪都要更新 `.loop/STATE.json`
