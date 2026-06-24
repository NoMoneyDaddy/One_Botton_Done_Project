# Loop Engineering Framework (一鍵搞定專案)

> **「一台手機 + 一個想法，就能構建生產級應用。」**

這是一個專為 AI 代理（如 Manus、Claude、Cursor）設計的**自動化開發框架**。透過標準化的互動流程、一鍵環境配置，以及深度整合超過 30 個頂級開源 Skill 庫的工程知識，讓 AI 能以「資深全端工程師」的標準為您開發專案。

---

## 🌟 核心特色

### 1. 真正的「一鍵部署」 (Zeabur MCP 整合)
- **MCP 自動偵測**：若您的 AI 助理支援 MCP（如 Manus, Claude Desktop, Cursor），AI 會直接呼叫 `@zeabur/mcp-server` 完成建立專案、綁定資料庫、設定環境變數到上線的全自動流程。
- **一站式後端**：支援 Zeabur 一站式部署，PostgreSQL/Redis 服務會自動注入連線變數，達到**零手動配置**。
- **Claude Code 支援**：支援官方 `zeabur/agent-skills` 外掛，涵蓋 14 種進階 DevOps 操作。

### 2. 智慧環境配置 (互動式 API Key 處理)
- **不阻斷流程**：在生成代碼前，AI 會主動詢問您是否具備所需的 API Key（如 OpenAI、Supabase）。
- **`.env.local` 模板**：自動生成結構化的環境變數模板。
- **自動化腳本**：透過 `install.js` 與 `scripts/auto_env_config.js`，以互動式 CLI 幫助您填寫金鑰，無需手動建立檔案。

### 3. 持久化設計與記憶系統
- **`DESIGN.md` 系統**：導入 Google Labs 的 AI 設計系統標準，使用 YAML + Markdown 確保 AI 在多次對話中保持 UI/UX 風格完全一致。
- **`MEMORY.md` 階層記憶**：導入 `claude-memory-skill` 模式，在 `~/.claude/memory/` 中靜默保存核心摘要、用戶偏好與主題知識，讓 AI 越用越懂您的專案。

### 4. 進階 AI 開發工作流
- **Subagent-Driven Development (SADD)**：遇到複雜任務時，主 AI 會派遣專門的 Subagent 處理，完成前必須通過嚴格驗證。
- **Parallel Agent Dispatch**：當面對多個獨立的 Bug（如不同的測試失敗）時，AI 會同時派遣多個 Subagent 並行修復，大幅縮短除錯時間。
- **Data Structure Protocol (DSP)**：強制 AI 在撰寫演算法前，先定義核心資料結構。
- **Brainstorming HARD GATE**：在獲得您的設計批准前，AI 絕對不會寫任何一行實作代碼，徹底貫徹 YAGNI 原則。

---

## 📚 整合的頂級工程知識庫

本框架的 `SKILL.md` 汲取了超過 30 個頂級開源 AI Skill 庫的精華，包含：

| 領域 | 知識來源與核心原則 |
| :--- | :--- |
| **前端與 UI/UX** | 整合 `nextlevelbuilder/ui-ux-pro-max-skill` (95k⭐)、`ibelick/ui-skills`。強制無障礙標準、觸控目標大小，並避免 AI 預設的「暖米色」泛濫風格。 |
| **全端架構** | 整合 `antigravity-awesome-skills` 核心 Bundle。強制實施嚴格的分層架構（Routes → Controllers → Services），並要求所有外部輸入必須通過 Zod 驗證。 |
| **Code Review** | 整合 `awesome-skills/code-review-skill`。導入 `[blocking]`, `[important]`, `[nit]` 等嚴重性標籤系統，並規定大於 400 行的 PR 必須拆分。 |
| **Git 與安全** | 整合 `obra/superpowers`。高風險重構強制使用 Git Worktree 隔離，並具備安全的 Code Review 接收機制。 |
| **Redis 專家** | 整合官方 `redis/agent-skills`。涵蓋資料結構優化、向量搜尋 (RAG)、語意快取與叢集管理。 |

---

## 🚀 如何使用

1. **載入 Skill**：請您的 AI 助理讀取本專案的 `skills/loop-engineering/SKILL.md`。
2. **啟動框架**：對 AI 說：「**請使用 loop-engineering skill 幫我建立一個 [你的想法]**」。
3. **互動問答**：AI 會問您 3-5 個關於技術棧與 API Key 的選擇題。
4. **一鍵執行**：AI 會生成一個 `install.js`，您只需在終端機執行它。
5. **自動部署**：代碼推送後，若有 Zeabur MCP，AI 會直接幫您部署上線！

---

## 📂 專案結構

```
One_Botton_Done_Project/
├── skills/
│   └── loop-engineering/
│       ├── SKILL.md                  # 核心代理技能指令（30+ 庫精華整合）
│       └── references/               # 互動式 Prompt 與部署指南
├── config/
│   └── env_templates.json            # 支援各技術棧的環境變數模板
├── scripts/
│   └── auto_env_config.js            # 互動式環境變數配置腳本
├── prompts/
│   ├── ultimate_one_prompt_v2.md     # 終極一鍵 Prompt (含 MCP 支援)
│   └── interactive_api_key_prompt.md # API Key 詢問標準化指令
└── docs/
    ├── zeabur_mcp_guide.md           # Zeabur MCP 設定與使用指南
    └── zeabur_deployment_guide.md    # Zeabur 官方部署最佳實踐
```

## 🤝 貢獻與社群

本專案旨在探索 AI 輔助開發的極限。我們將持續追蹤並整合全球最優秀的 AI Agent Skills。歡迎提交 PR 或 Issue！
