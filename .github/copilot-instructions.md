# Loop Engineering for GitHub Copilot

使用本 repo 時，請先讀根目錄 `AGENTS.md`。

工作方式：

- 不要直接開始寫代碼，先完成技術棧釐清
- 若 repo 內有 `.loop/*`，先讀 `.loop/GOAL.md` 與 `.loop/STATE.json`
- 涉及框架、部署、第三方整合時先查官方文檔
- 只做最小必要修改，避免無關重構
- 修改後自行執行可用的驗證命令

驗證優先順序：

1. 專案內現有 `test` / `lint` / `build`
2. 若無標準腳本，做最小可重現驗證
3. 回報缺少的環境變數、金鑰、外部服務

主要參考：

- `AGENTS.md`
- `.agents/skills/loop-engineering/SKILL.md`
- `.agents/skills/using-agent-skills/SKILL.md`
- `docs/ai-tool-compatibility.md`
