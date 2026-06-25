# AI 專案啟動與規範檔建立

本文件只描述目前 repo 內真實存在的啟動方式。

## 核心概念

不要把能力塞在單一超長 prompt。
把能力拆成三層：

1. 入口檔
2. 本地 skills
3. 可執行 bootstrap / init 腳本

## 入口檔

根目錄保留：

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.github/copilot-instructions.md`
- `.cursorrules`
- `.cursor/rules/00-project.mdc`

## 本地 skill runtime

Canonical：

- `.agents/skills/`

Mirrors：

- `.claude/skills/`
- `skills/`

## 可執行腳本

複製規範檔到另一個專案：

```bash
node scripts/bootstrap_agent_files.js ../your-project
```

初始化新專案工作區：

```bash
node scripts/init_project_workspace.js ../your-project --name your-project --idea "你的想法"
```

盤點能力：

```bash
node scripts/inspect_agent_capabilities.js
node scripts/validate_repo_integrity.js
```

推薦 skills / tools：

```bash
node scripts/auto_skill_setup.js --project-type web-app --ui-style modern --deployment zeabur --language typescript --database supabase
```

## AI 開場順序

1. 讀 `AGENTS.md`
2. 讀 `.agents/skills/using-agent-skills/SKILL.md`
3. 讀 `docs/interactive_project_flow.md`
4. 讀 `docs/project_usage_guide.md`
5. 若缺 `.loop/*`，跑 `node scripts/init_session_loop.js . --goal "<objective>"`
   - 若平台不能跑腳本，改讀 `docs/script_fallback_matrix.md`
6. 若是 JS / TS 專案，讀 `docs/biome_quality_loop.md`
7. 跑 `node scripts/inspect_agent_capabilities.js`
8. 跑 `node scripts/validate_repo_integrity.js`
9. 若要先建立官方骨架，跑 `node scripts/scaffold_project.js ../your-project --profile <profile>`
10. 技術棧已確認時，跑 `node scripts/generate_project_configs.js --profile <profile> --name <projectName>`
11. 視情境決定是否初始化或直接進舊專案審查

## 規則

- 不再依賴舊式一次性 `install.js` 工作流
- 新腳本預設優先用 Node.js；shell script 只做環境導向工作
- 若新增 skill，必須同步更新：
  - `.agents/skills/`
  - `.claude/skills/`
  - `skills/`
  - `docs/agent_skill_catalog.md`
  - `scripts/bootstrap_agent_files.js`
