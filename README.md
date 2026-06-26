# One Button Done — Universal AI Agent Framework

繁中優先。English quick guide: [README.en.md](README.en.md)

**任何 AI 平台、任何模型、任何環境 → 讀取本專案 → 自主交付最終作品。**

這個 repo 是給 AI agent 讀的**通用自主交付框架**。不依賴特定平台，不依賴特定模型。任何能讀 markdown 的 AI，讀完 `AGENTS.md` 後就能自主規劃、實作、測試、交付。

## 核心理念

- **自主交付**：預設 L3 自治等級，AI 直接做最佳決策並執行
- **平台無關**：支援 Claude、Codex、Cursor、Windsurf、Gemini、Copilot、Roo Code、Aider 等 10+ 平台
- **模型無關**：任何能讀 markdown 的 LLM 都能使用
- **環境無關**：本地、雲端、sandbox、CI/CD 都可運行
- **只在阻塞時停止**：缺憑證、不可逆操作、計費決策、重複錯誤

## 快速開始 / Quick Start

1. 用任一 AI 工具開啟本 repo
2. AI 自動讀取對應入口檔 → 導向 `AGENTS.md`
3. AI 依 `AGENTS.md` 的 4-Phase Protocol 自主交付

手動開始：

```bash
# 告訴 AI 讀取主協議
讀取 AGENTS.md 並開始工作
```

輔助腳本（可選，非必要）：

```bash
node scripts/inspect_agent_capabilities.js    # 盤點能力
node scripts/init_session_loop.js . --goal "目標"  # 初始化 session
node scripts/auto_skill_setup.js --project-type web-app  # 推薦技能
```

## 支援平台

| 平台 | 入口檔 | 自動發現 |
|------|--------|---------|
| Claude Code | `CLAUDE.md` | ✅ |
| Codex | `AGENTS.md` | ✅ |
| Cursor | `.cursorrules` | ✅ |
| Windsurf | `.windsurfrules` | ✅ |
| Gemini CLI | `GEMINI.md` | ✅ |
| GitHub Copilot | `.github/copilot-instructions.md` | ✅ |
| Roo Code / Cline | `.clinerules` | ✅ |
| Aider | `.aider.conf.yml` | ✅ |
| Continue.dev | `.continuerc.json` | ✅ |
| ChatGPT / GPT | 手動提供 `AGENTS.md` | 📋 |
| 其他 LLM | 手動提供 `AGENTS.md` | 📋 |

所有入口檔都指向同一個協議：`AGENTS.md`

## 專案結構

```
.
├── AGENTS.md              ← 通用自主交付協議（核心）
├── CLAUDE.md / GEMINI.md  ← 平台入口（指向 AGENTS.md）
├── .cursorrules           ← Cursor 入口
├── .windsurfrules         ← Windsurf 入口
├── .clinerules            ← Roo Code / Cline 入口
├── .loop/                 ← 跨 session 狀態持久化
├── .agents/skills/        ← Canonical workflow skills
├── .claude/skills/        ← Claude mirror
├── skills/                ← Legacy mirror
├── docs/                  ← 規格、任務、架構、決策記錄
├── config/                ← 機器可讀配置
├── scripts/               ← 輔助腳本（可選加速器）
├── prompts/               ← 互動提示範本
└── examples/              ← 範例
```

## 4-Phase 自主交付協議

```
Phase 1: Understand — 理解需求
Phase 2: Plan      — 規劃任務
Phase 3: Build     — 實作驗證循環
Phase 4: Ship      — 交付成品
```

詳見 `AGENTS.md`。

## 內建技能

30+ 個 workflow skills 涵蓋完整開發生命週期：

- **定義階段**：`idea-refine`、`interview-me`、`spec-driven-development`
- **規劃階段**：`planning-and-task-breakdown`、`project-config-generation`
- **實作階段**：`incremental-implementation`、`test-driven-development`、`source-driven-development`
- **驗證階段**：`browser-testing-with-devtools`、`debugging-and-error-recovery`
- **品質階段**：`code-review-and-quality`、`biome-quality-automation`、`security-and-hardening`
- **交付階段**：`shipping-and-launch`、`ci-cd-and-automation`、`documentation-and-adrs`

## 原則

- 自主交付，只在阻塞時停止
- 先 spec，後 code
- 先官方文檔，後實作
- 最小必要修改
- 每輪都驗證
- 腳本是加速器，不是依賴項
- 純 markdown 協議，任何 LLM 都能理解
