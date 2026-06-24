---
name: loop-engineering
description: Execute the Loop Engineering framework to autonomously plan, build, test, fix, and deploy commercial-grade web applications from a simple user idea. Use this skill when the user asks to create a project, app, or website from scratch, especially when they want a fully automated deployment to platforms like Zeabur.
---

# Loop Engineering Skill

This skill enables you to act as an autonomous software architect and engineer, taking a user's idea and executing a complete "Plan → Build → Test → Fix → Deploy" loop to deliver a production-ready application.

## Core Workflow

When invoked to create a project, follow this exact sequence:

### 1. Interactive Tech Stack Clarification

Do NOT start writing code immediately. First, read the interactive prompt template at `references/interactive_tech_stack_prompt.md` to understand how to guide the user in selecting their preferred tech stack (Frontend, Database, UI Library, etc.). Ask the user 3-5 multiple-choice questions based on their idea.

Also ask about **Deployment Strategy** — this determines how the database is handled:

> **部署策略選擇：**
> - [A] **Zeabur 一站式**（推薦）：前端 + 後端 + 資料庫全部部署在 Zeabur，服務間自動注入連線變數，零手動配置。
> - [B] **混合部署**：前後端部署到 Zeabur，資料庫使用外部雲端服務（如 Supabase Cloud、MongoDB Atlas），需手動填入連線 URL。
> - [C] **自行決定**：我只需要代碼，部署的事我自己處理。

If user picks **[A]**: generate code reading DB from Zeabur auto-injected vars (e.g. `${POSTGRES_HOST}`). No DB API keys needed.
If user picks **[B]**: generate code reading from `DATABASE_URL`, ask for external connection string in Step 2.
If user picks **[C]**: generate standard `.env.local` template with placeholder values only.

### 2. Generate the Single Install Script

Once the user confirms the tech stack, generate a single, comprehensive `install.js` script that will:
- Create all necessary directories
- Write all source code files (Next.js pages, API routes, database schemas, etc.)
- Install all required npm dependencies

**Important**: The script MUST be self-contained. The user should only need to run `node install.js` to set up the entire project. Use the template pattern shown in `templates/install_script_template.js`.

### 3. Provide Clear Setup Instructions

After generating the script, provide the user with exact, copy-pasteable instructions for:
1. Creating the `install.js` file in their environment (e.g., GitHub Codespaces).
2. Running the script.
3. Setting up required environment variables (e.g., Supabase API keys).
4. Testing locally.

### 4. Guide the Deployment (Zeabur MCP + GitHub)

Explain the automated deployment workflow. **Crucially, check if the user is using an MCP-enabled environment (like Claude Desktop, Cursor, or Manus AI with Zeabur MCP enabled).**

**Strategy A — Zeabur All-in-One:**
- Zeabur auto-injects DB connection vars when services share the same project. No manual env var setup for the DB.
- **With MCP**: After git push, ask "我可以直接幫您在 Zeabur 建立專案、部署前後端並新增資料庫服務，需要我現在執行嗎？" Use MCP: create project → deploy app → add DB service from Marketplace → Zeabur auto-wires connection → bind domain.
- **Without MCP**: Zeabur Dashboard → Create Project → Import from GitHub → Add Service → Marketplace → select DB. Zeabur auto-injects all connection env vars.

**Strategy B — Hybrid (External DB):**
- App on Zeabur, DB on external cloud (Supabase Cloud, MongoDB Atlas, etc.).
- Remind user to paste `DATABASE_URL` into Zeabur's Environment Variables panel.
- **With MCP**: Create project, deploy app, then set the env vars via MCP.
- **Without MCP**: Zeabur Dashboard → Service → Environment Variables → paste connection string.

**Strategy C — Self-Managed:**
- Deliver code and `.env.local` template only. Do not provide deployment instructions unless asked.

Reference `references/zeabur_deployment_guide.md` for troubleshooting.

## Quality Standards

When generating the code within the `install.js` script, ensure:
- **Commercial Grade UI**: Use modern libraries like shadcn/ui and Tailwind CSS.
- **Robustness**: Include proper error handling, loading states, and Toast notifications.
- **Best Practices**: Follow the official documentation for the chosen framework (e.g., Next.js App Router conventions).

## Resources

- `references/interactive_tech_stack_prompt.md`: The exact prompt structure to use for clarifying the tech stack.
- `templates/install_script_template.js`: The structure of the single-file installer you must generate.
- `references/zeabur_deployment_guide.md`: Troubleshooting and setup guide for Zeabur deployment.
- `../../docs/zeabur_mcp_guide.md`: Comprehensive guide on setting up and using the Zeabur MCP server for direct AI deployments.
