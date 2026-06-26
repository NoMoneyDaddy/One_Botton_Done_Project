# Claude Code Entry

請先讀 `AGENTS.md` — 本 repo 的通用自主交付協議。

本 repo 設計為平台無關。`AGENTS.md` 包含完整的自主交付協議，適用於所有 AI 平台。

補充：

- Claude Code 的 skill 路徑：`.claude/skills/`（mirror of `.agents/skills/`）
- 核心 workflow skill：`.agents/skills/loop-engineering/SKILL.md`
- 技能路由入口：`.agents/skills/using-agent-skills/SKILL.md`
- 跨 session 狀態：`.loop/`
- 若腳本不可跑，改讀 `docs/script_fallback_matrix.md`

## 自治等級

本 repo 預設 **L3 自主交付模式**。你無需等待確認即可：

- 選擇技術棧並記錄決策
- 建立檔案結構
- 安裝依賴
- 實作、測試、修復
- 更新文件

只在 `AGENTS.md` 第 2 節列出的阻塞條件下才停止。
