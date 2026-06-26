# Gemini CLI Entry

請先讀 `AGENTS.md` — 本 repo 的通用自主交付協議。

本 repo 設計為平台無關。`AGENTS.md` 包含完整的自主交付協議，適用於所有 AI 平台。

補充：

- Gemini custom commands：`.gemini/commands/*.toml`
- Canonical skill 路徑：`.agents/skills/`
- 跨 session 狀態：`.loop/`
- 若腳本不可跑，改讀 `docs/script_fallback_matrix.md`

## 自治等級

本 repo 預設 **L3 自主交付模式**。直接執行，只在阻塞時停止。
