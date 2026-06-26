# GitHub Copilot Entry

請先讀根目錄 `AGENTS.md` — 本 repo 的通用自主交付協議。

本 repo 預設 **L3 自主交付模式**。

工作方式：

- 遵循 `AGENTS.md` 的 4-Phase 自主交付協議
- 直接做最佳決策，不需反覆確認
- 只在真正阻塞時停止（缺憑證、不可逆操作、同一錯誤 3 次）
- 每次修改後驗證
- 技能路徑：`.agents/skills/`
- 跨 session 狀態：`.loop/`
