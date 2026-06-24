---
name: loop-engineering
description: Execute the Loop Engineering framework to autonomously plan, build, test, fix, and deploy commercial-grade web applications from a simple user idea. Use this skill when the user asks to create a project, app, or website from scratch, especially when they want a fully automated deployment to platforms like Zeabur. Supports Zeabur MCP for direct AI-driven deployment.
---

# Loop Engineering Skill

This skill enables you to act as an autonomous software architect and engineer, taking a user's idea and executing a complete "Plan → Build → Test → Fix → Deploy" loop to deliver a production-ready application.

## Core Workflow

When invoked to create a project, follow this exact sequence:

### 1. Interactive Tech Stack Clarification

Do NOT start writing code immediately. First, read `references/interactive_tech_stack_prompt.md` to guide the user in selecting their preferred tech stack. Ask the user 3-5 multiple-choice questions:

- **Frontend**: Next.js (recommended) / React (Vite) / Vue / Pure HTML
- **Database**: Supabase (recommended) / PostgreSQL+Prisma / MongoDB / Firebase / None
- **UI Library**: shadcn/ui (recommended) / Tailwind CSS / Bootstrap / None
- **Third-party services**: OpenAI API / Stripe / SendGrid / None

Also ask about **Deployment Strategy** — this determines how the database is handled:

> **部署策略選擇：**
> - [A] **Zeabur 一站式**（推薦）：前端 + 後端 + 資料庫全部部署在 Zeabur，服務間自動注入連線變數，零手動配置。
> - [B] **混合部署**：前後端部署到 Zeabur，資料庫使用外部雲端服務（如 Supabase Cloud、MongoDB Atlas、PlanetScale），需手動填入連線 URL。
> - [C] **自行決定**：我只需要代碼，部署的事我自己處理。

If user picks **[A] Zeabur All-in-One**: generate code that reads DB connection from Zeabur auto-injected env vars (e.g. `${POSTGRES_HOST}`, `${POSTGRES_PASSWORD}`). No external API keys needed for the database.

If user picks **[B] Hybrid**: generate code that reads DB connection from a standard `DATABASE_URL` env var, and ask for the external service's connection string in Step 2.

If user picks **[C] Self-managed**: generate a standard `.env.local` template with placeholder values only.

### 2. Interactive API Key Inquiry

Before generating code, ask about required API keys for the chosen stack. For each required key:

> "您是否已有 [Service Name] 的 API Key?
> - 有 → 請提供（我會加入環境變數模板）
> - 沒有 → 我可以提供獲取指南，稍後再配置
> - 跳過 → 略過此服務"

Do NOT block progress if the user skips. Generate placeholder values in `.env.local` and note what needs to be filled in later.

### 3. Generate the Single Install Script

Once the user confirms the tech stack, generate a single, comprehensive `install.js` script that will:
- Create all necessary directories and source code files
- Install all required npm dependencies via `npm install`

**Important**: The script MUST be self-contained — `node install.js` sets up the entire project. Use the template pattern in `templates/install_script_template.js`.

Also generate a `.env.local` template with all required environment variables (filled with user-provided keys or placeholder comments).

### 4. Provide Clear Setup Instructions

Provide exact, copy-pasteable instructions for:
1. Creating `install.js` in GitHub Codespaces (or local terminal).
2. Running `node install.js`.
3. Editing `.env.local` with actual API keys.
4. Running `npm run dev` to test locally.

### 5. Deploy — Three Paths Based on Strategy Choice

**First, check if Zeabur MCP is available** (Claude Desktop, Cursor, or Manus AI with Zeabur MCP enabled).

#### Strategy A: Zeabur All-in-One

Zeabur automatically injects database connection variables when services are in the same project. No manual env var setup needed for the DB.

- **With MCP**: After git push, ask "我可以直接幫您在 Zeabur 建立專案、部署前後端並新增資料庫服務，需要我現在執行嗎？" Then use MCP to: create project → deploy app service → add database service (PostgreSQL/MySQL/Redis/MongoDB) → Zeabur auto-wires the connection → bind domain.
- **Without MCP**: Guide user to Zeabur Dashboard → Create Project → Import from GitHub → Add Service → Marketplace → select the database. Zeabur auto-injects all connection env vars.

#### Strategy B: Hybrid (External DB)

The app is on Zeabur, but the database is an external cloud service.

- Remind user to set `DATABASE_URL` (or equivalent) in Zeabur's Environment Variables panel with the external service's connection string.
- **With MCP**: Use MCP to create project, deploy app, then set the env vars the user provided.
- **Without MCP**: Guide user to Zeabur Dashboard → Service → Environment Variables → paste the connection string.

#### Strategy C: Self-Managed

Deliver the code and `.env.local` template only. Do not provide deployment instructions unless asked.

Reference `references/zeabur_deployment_guide.md` for any troubleshooting.

## Framework-Specific Deployment Notes

When generating code for deployment on Zeabur, follow these framework-specific requirements:

### Next.js
- Push to GitHub → Zeabur auto-detects and deploys. No extra config needed.
- Zeabur auto-detects Next.js and runs `next build` + `next start`.

### NestJS
- Must listen on `process.env.PORT || 3000`.
- Must install `@nestjs/config` and call `ConfigModule.forRoot()` in `app.module.ts`.

### Flask / Django (Python)
- Must include `requirements.txt` (run `pip freeze > requirements.txt`).
- Must listen on `os.getenv("PORT", 5000)` with `host='0.0.0.0'`.
- Django: set `ALLOWED_HOSTS = ['*']` in `settings.py`.
- Zeabur uses **Gunicorn** as the WSGI production server automatically.

### Go
- Must have `main.go` in root (or under `cmd/` directory).
- Must listen on `os.Getenv("PORT")` — Zeabur auto-injects this.
- Optional `zbpack.json` for custom build entry: `{"go": {"entry": "cmd/server/main.go"}}`.

### Universal Rule
- **Always listen on `process.env.PORT` (or `$PORT`)** — Zeabur injects this automatically. Never hardcode a port.
- **Never commit `.env.local`** — set secrets in Zeabur's Environment Variables panel.

---

## Quality Standards & Design Intelligence

When generating code inside `install.js`, elevate the output from "functional" to "professional and distinctive" by applying these principles:

### 1. Code Simplification & Elegance
- **Preserve Functionality**: Never change what the code does, only how it does it.
- **Clarity over Brevity**: Avoid nested ternary operators; prefer switch statements or if/else chains. Explicit code is better than overly compact "clever" code.
- **Modern Standards**: Use ES modules, prefer `function` keyword over arrow functions for top-level declarations, and use explicit return types.

### 2. Frontend Design & Aesthetics
- **Avoid AI Defaults**: Do not default to the generic "AI look" (e.g., warm cream background with terracotta accent, or near-black with acid-green). Ground the design in the subject's specific world and materials.
- **Typography as Personality**: Pair display and body faces deliberately. Set a clear type scale with intentional weights and spacing.
- **Intentional Structure**: Use structural devices (numbering, dividers) only when they encode true information, not just for decoration.
- **Restraint**: Spend your boldness in one place (a signature element). Keep everything else quiet and disciplined.
- **Copywriting**: Write from the user's side. Use active voice ("Save changes" not "Submit"). Treat empty states as invitations to act, and errors as clear directions to fix.

### 3. UI/UX Pro Max Guidelines
- **Accessibility (CRITICAL)**: Ensure 4.5:1 contrast, visible focus rings, `aria-labels` for icon-only buttons, and full keyboard navigation.
- **Touch & Interaction**: Minimum 44x44px touch targets, 8px spacing, and clear loading/error feedback. Do not rely on hover alone.
- **Performance**: Reserve space for images/fonts to prevent Cumulative Layout Shift (CLS).
- **Responsive Layout**: Mobile-first design, 16px minimum body text on mobile (prevents iOS zoom), and no horizontal scrolling.

## Resources

- `references/interactive_tech_stack_prompt.md`: Full prompt structure for tech stack clarification.
- `templates/install_script_template.js`: Single-file installer template to follow.
- `references/zeabur_deployment_guide.md`: Zeabur deployment troubleshooting and setup guide.

## Zeabur Developer Tools Quick Reference

### CLI（終端部署，適合 CI/CD）

```bash
# 登入
npx zeabur@latest auth login
# Token 登入（CI/CD 環境）
npx zeabur@latest auth login --token <your-token>

# 在專案目錄中部署（自動偵測框架）
npx zeabur@latest deploy

# 查看日誌
npx zeabur@latest deployment log -t=runtime
npx zeabur@latest deployment log -t=build

# 重啟服務
npx zeabur@latest service restart

# Non-Interactive 模式（腳本中使用）
npx zeabur@latest context set project --name <project-name>
npx zeabur@latest context set service --name <service-name>
```

### GraphQL API

```bash
# 端點：https://api.zeabur.com/graphql
# 認證：Bearer Token（在 Dashboard > 設定 > API 金鑰 產生）
curl -X POST https://api.zeabur.com/graphql \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"query { me { username } }"}'
```

線上測試工具：[Apollo Explorer](https://studio.apollographql.com/public/zeabur/variant/main/explorer)

### WebSocket 即時訂閱（串流日誌）

- 全球端點：`wss://api.zeabur.com/graphql`
- 協議：[graphql-ws](https://github.com/enisdenjo/graphql-ws)

---

## Zeabur AI Integration Quick Reference

**Option 1 — MCP Server** (Claude Desktop / Cursor / Manus AI):
```json
{
  "mcpServers": {
    "zeabur": {
      "command": "npx",
      "args": ["-y", "@zeabur/mcp-server"],
      "env": { "ZEABUR_TOKEN": "sk-xxxxxx" }
    }
  }
}
```

**Option 2 — Claude Code Skills** (Claude Code environment):
```bash
claude plugin marketplace add zeabur/agent-skills
claude plugin install zeabur@zeabur
```
Supports: deploy services, manage DB, set env vars, bind domains, debug logs, purchase VPS, configure email.

**Option 3 — Cursor Extension**: Install Zeabur extension in Cursor IDE for in-editor deployment.

All three options support natural language: "請在 Zeabur 建立專案並部署這個 GitHub 倉庫".
