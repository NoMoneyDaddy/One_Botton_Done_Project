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

### 4. DESIGN.md — Persistent Design System for AI Agents

For projects that need a consistent visual identity across sessions, generate a `DESIGN.md` file in the project root. This is a Google-standard format that gives AI agents a persistent, structured understanding of the design system.

**Format**: YAML front matter (machine-readable tokens) + Markdown prose (design rationale).

```yaml
---
name: MyApp
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  accent: "#B8422E"
  neutral: "#F7F5F2"
typography:
  h1:
    fontFamily: Inter
    fontSize: 3rem
    fontWeight: 700
  body-md:
    fontFamily: Inter
    fontSize: 1rem
rounded:
  sm: 4px
  md: 8px
  lg: 16px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.sm}"
---

## Overview
[One paragraph describing the visual identity and design philosophy.]

## Colors
[Explain each color's role and emotional intent.]
```

**CLI tools** (validate, diff, export to Tailwind/DTCG):
```bash
npx @google/design.md lint DESIGN.md
npx @google/design.md export --format css-tailwind DESIGN.md > theme.css
```

When generating a `DESIGN.md`, run the linter to verify WCAG contrast ratios and broken token references before committing.

### 5. Advanced Development Workflows & Agent Collaboration

When managing complex development tasks or acting as a multi-agent system, apply these advanced engineering practices:

#### 5.1 Subagent-Driven Development (SADD)
- **Break down complex tasks**: Never tackle a massive feature in one go. Break it down into discrete, testable steps.
- **Dispatch specialized subagents**: For isolated tasks (e.g., "Write tests for AuthModule", "Analyze logs for race condition"), dispatch a specialized subagent with strict context.
- **Verification before completion**: Never claim a task is complete without running the verification command and checking the output. "Tests pass" means you ran `npm test` and saw 0 failures.

#### 5.2 Context Compression & Memory Management
- **Prevent context bloat**: Do not dump entire log files or irrelevant code into the context. Extract the stack trace or the specific failing function.
- **Write summary artifacts**: Before a context window gets too large or a session ends, write a `MEMORY.md` or `STATE.md` summarizing the current progress, decisions made, and next steps.

**Persistent Hierarchical Memory System** (for long-running projects):

Maintain a structured memory at `~/.claude/memory/` with these files:

```
~/.claude/memory/
├── core.md          # Key summaries + pointers (always loaded at session start)
├── me.md            # User preferences & context (always loaded)
├── topics/
│   └── <topic>.md   # Detailed entries by topic (debugging, patterns, tools)
└── projects/
    └── <project>.md # Project-specific knowledge
```

- **Session start**: Spawn a background agent to load `me.md`, `core.md`, and the current project file.
- **Save silently** when: user says "remember...", you solve a non-trivial problem, discover a user preference, or a pattern emerges.
- **Recall** when: starting unfamiliar work, stuck on a problem, or user asks "do you remember...".
- **Format**: Each memory entry = one `## Short title [YYYY-MM-DD]` block with 1-3 sentences. No dumping grounds.

#### 5.3 Code Review & Quality Gates
- **Requesting Code Review**: After a major feature or before merging, dispatch a "code reviewer" subagent to review the git diff (`BASE_SHA` to `HEAD_SHA`).
- **Receiving Code Review**: When receiving feedback, verify it technically before implementing. Do not performatively agree ("You're absolutely right!") if the suggestion breaks existing functionality or violates YAGNI (You Aren't Gonna Need It).

**Code Review Severity Labels** (use consistently in all reviews):
- 🔴 `[blocking]` — Must fix before merge
- 🟡 `[important]` — Should fix, discuss if disagree
- 🟢 `[nit]` — Nice to have, not blocking
- 💡 `[suggestion]` — Alternative approach to consider
- 📚 `[learning]` — Educational comment, no action needed
- 🎉 `[praise]` — Good work, keep it up!

**Effective Feedback Patterns**:
```
❌ Bad: "This is wrong."
✅ Good: "🔴 [blocking] This causes a race condition when multiple users access simultaneously. Consider using a mutex here."

❌ Bad: "You need error handling here."
✅ Good: "🟡 [important] How should this behave if the API call fails? Consider wrapping in try/catch."
```

**PR Size Rule**: If a PR is >400 lines, ask to split it before reviewing. Large PRs hide bugs.

**What NOT to review manually**: formatting, import order, linting violations — these belong to automated tools (Prettier, ESLint, Black).

#### 5.4 Safe Execution & Git Isolation
- **Use Git Worktrees**: When starting risky feature work or large refactors, use `git worktree add` to isolate the changes from the main branch. Verify the workspace starts clean before writing code.
- **Finishing a branch**: Provide clear options to the user: Merge locally, Create PR, Keep as-is, or Discard. Clean up the worktree safely after merge or discard.

#### 5.5 Data Structure Protocol (DSP)
- **Separate data from logic**: When generating code, define the core data structures and types *first*, before writing the algorithms that operate on them.

#### 5.6 Implementation Planning (writing-plans)

After brainstorming and design approval, write a structured implementation plan **before touching code**:

- **File structure first**: Map out which files will be created/modified and their responsibilities before defining tasks.
- **Bite-sized tasks**: Each task = one TDD cycle (write failing test → run to confirm fail → implement → run to confirm pass → commit). Each step is 2-5 minutes.
- **No placeholders**: Every step must contain actual code, exact file paths, and exact commands with expected output. Never write "TBD", "handle edge cases", or "similar to Task N".
- **Save to**: `docs/specs/YYYY-MM-DD-<feature>.md`
- **Plan header must include**: Goal, Architecture, Tech Stack, Global Constraints.
- **After writing**: Self-review for spec coverage, placeholder scan, and type consistency.
- **Execution choice**: Offer user two options — Subagent-Driven (recommended, one fresh subagent per task) or Inline Execution (batch with checkpoints).

#### 5.7 Parallel Agent Dispatch (dispatching-parallel-agents)

When facing 2+ **independent** problems (different test files, different subsystems, different bugs), dispatch parallel agents instead of working sequentially:

- **Identify independent domains**: Group failures by what's broken. Each domain must be fixable without context from others.
- **Craft focused prompts**: Each agent gets: specific scope, clear goal, constraints ("Do NOT change other files"), and expected output format.
- **Dispatch in one response**: Multiple subagent calls in the same response = parallel execution.
- **After agents return**: Review summaries, check for conflicts, run full test suite, integrate.

```
# Example: 6 failures across 3 files → 3 parallel agents
Agent 1 → Fix auth.test.ts (timing issues)
Agent 2 → Fix batch.test.ts (event structure bug)
Agent 3 → Fix race-conditions.test.ts (async wait missing)
# All three run concurrently → 3x speedup
```

**Do NOT use** when failures are related, need full system context, or agents would edit the same files.

#### 5.8 Brainstorming Before Building (HARD GATE)

> **HARD GATE**: Do NOT write any code, scaffold any project, or take any implementation action until you have presented a design and the user has approved it.

For any new feature or project, follow this sequence:

1. **Explore context first** — check existing files, docs, recent commits before asking questions.
2. **Ask clarifying questions one at a time** — prefer multiple-choice. Focus on: purpose, constraints, success criteria.
3. **Propose 2-3 approaches** with trade-offs and your recommendation.
4. **Present design sections** — get user approval after each section (architecture, components, data flow, error handling).
5. **Write design doc** — save to `docs/specs/YYYY-MM-DD-<topic>-design.md` and commit.
6. **Self-review the spec** — scan for TBDs, contradictions, ambiguity, scope issues. Fix inline.
7. **User reviews spec** — wait for approval before proceeding to implementation.

Key principles:
- **YAGNI ruthlessly** — remove unnecessary features from all designs.
- **One question per message** — never overwhelm with multiple questions at once.
- **Decompose large projects** — if a request spans multiple independent subsystems, flag it and decompose first.

#### 5.9 Core Principles from Antigravity Bundles

When using the Loop Engineering framework, apply these principles from the `antigravity-awesome-skills` bundles:

**Essentials Bundle (Planning & Debugging):**
- **Kaizen (Continuous Improvement)**: Design systems to prevent errors at compile/design time rather than runtime. Build only what is currently needed (YAGNI).
- **Systematic Debugging**: NEVER attempt a fix before finding the root cause. Symptom fixes are failures. If you attempt 3+ fixes without success, stop and question the architecture.

**Web Wizard Bundle (Frontend & React):**
- **Frontend Design**: Every output must have a clear aesthetic direction. Avoid generic fonts, colors, and layouts. Every design detail must serve the aesthetic thesis—no random decoration.
- **React Patterns**: Components must have a single responsibility. Data flows down (props), events flow up. Prefer composition over inheritance. Hooks must be called at the top level.
- **Next.js Best Practices**: Default to Server Components for data fetching, layouts, and static content. Only use Client Components when interactivity is strictly required.

**Full-Stack Developer Bundle (Backend & APIs):**
- **Layered Architecture**: Strict boundaries: Routes → Controllers → Services → Repositories → Database. No layer skipping.
- **Input Validation**: ALL external inputs MUST be strictly validated using Zod. Missing validation is a bug.
- **Error Handling**: All controllers must inherit a BaseController to standardize responses. No silent failures or plain `console.log` for errors in production.

#### 5.10 Semantic Duplicate Detection

For codebases that have grown organically (especially AI-generated code), periodically scan for **semantic duplicates** — functions with the same intent but different implementations. Use a two-phase approach:
1. Classical function extraction to identify candidates.
2. LLM-powered intent clustering to find semantic duplicates across different implementations.

This is especially important before major refactoring or when onboarding new contributors.

## Resources

- `references/interactive_tech_stack_prompt.md`: Full prompt structure for tech stack clarification.

### Recommended Skill Bundles by Role

When the user's project requires specialized expertise, recommend installing the matching bundle from `sickn33/antigravity-awesome-skills`:

| Role / Project Type | Recommended Bundle | Key Skills |
| :--- | :--- | :--- |
| Any project (start here) | Essentials | concise-planning, lint-and-validate, git-pushing, kaizen, systematic-debugging |
| Frontend / Next.js | Web Wizard | frontend-design, react-best-practices, nextjs-best-practices, tailwind-patterns, seo-audit |
| Full-Stack SaaS | Full-Stack Developer | senior-fullstack, backend-dev-guidelines, api-patterns, database-design, stripe-integration |
| AI / Agent systems | Agent Architect | agent-evaluation, langgraph, mcp-builder, prompt-engineering, rag-engineer |
| Python backend | Python Pro | python-pro, fastapi-pro, django-pro, python-testing-patterns, async-python-patterns |
| Startup / Product | Startup Founder | product-manager-toolkit, launch-strategy, copywriting, stripe-integration |
| Security | Security Developer | api-security-best-practices, auth-implementation-patterns, frontend-security-coder |
| Game dev | Indie Game Dev | game-design, unity-developer, godot-gdscript-patterns, algorithmic-art |

Install: `npx antigravity-awesome-skills` or `git clone https://github.com/sickn33/antigravity-awesome-skills.git .agent/skills`
- `templates/install_script_template.js`: Single-file installer template to follow.
- `references/zeabur_deployment_guide.md`: Zeabur deployment troubleshooting and setup guide.

## External Skill Libraries (Reference Only)

When the user's project requires specialized capabilities, recommend these external skill libraries:

| Library | Stars | Use Case |
| :--- | :--- | :--- |
| `mukul975/Anthropic-Cybersecurity-Skills` | Active | 817 cybersecurity skills across 29 domains (MITRE ATT&CK, NIST CSF 2.0, cloud security, DFIR, red team) |
| `ibelick/ui-skills` | 3.4k | UI baseline enforcement: `npx ui-skills start` routes agent to the right UI skill |
| `NoizAI/skills` | Active | TTS, voice cloning, video translation, podcast generation with Kokoro/Noiz API |
| `rameerez/claude-code-startup-skills` | Active | Startup utilities: image compression, video download/transcribe, X (Twitter) posting |
| `fvadicamo/dev-agent-skills` | Active | Git/GitHub workflow skills: Conventional Commits, PR creation/merge/review with severity ordering |
| `alinaqi/claude-bootstrap` | Active | 67 skills + TDD enforcement hooks + quality gates (max 20 lines/function, 3 params) |
| `obra/superpowers` | Active | Git worktrees, code review request/receive, branch finishing, verification-before-completion |
| `LambdaTest/agent-skills` | Active | Test automation skills: Selenium, Playwright, Cypress, Appium across 15+ languages and 10K+ real devices |
| `muratcankoylan/Agent-Skills-for-Context-Engineering` | Active | Tool design, context compression, multi-agent patterns for building robust agent systems |
| `mukul975/Anthropic-Cybersecurity-Skills` | 817 skills | 817 cybersecurity skills across 29 domains (MITRE ATT&CK, NIST CSF 2.0, cloud security, DFIR, red team) |
| `qdrant/skills` | Official | Vector search skills: scaling, search quality, model migration, deployment — fetch via `skills.qdrant.tech` |
| `obra/superpowers-lab` | Experimental | Semantic duplicate detection, MCP-CLI on-demand, tmux interactive CLI control, Windows VM in Docker |
| `redis/agent-skills` | Official | 8 Redis skills: core data structures, search/RAG, semantic cache, clustering, security, observability, Iris memory |
| `awesome-skills/code-review-skill` | Community | Comprehensive code review for 20+ languages (React, Vue, Rust, Go, Python, Java, etc.) with severity labels and PR templates |
| `sickn33/antigravity-awesome-skills` | Mega-library | 100+ skills organized into role-based bundles: Essentials, Web Wizard, Full-Stack, Agent Architect, Python Pro, Startup Founder, Security Engineer, etc. Install: `npx antigravity-awesome-skills` |

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
