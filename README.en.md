# One Button Done — Universal AI Agent Framework

**Any AI platform, any model, any environment → read this project → autonomously deliver finished work.**

This repo is a **universal autonomous delivery framework** for AI agents. It doesn't depend on any specific platform or model. Any AI that can read markdown can follow the `AGENTS.md` protocol to autonomously plan, implement, test, and deliver.

## Core Principles

- **Autonomous Delivery**: Default L3 autonomy — AI makes best decisions and executes
- **Platform Agnostic**: Supports Claude, Codex, Cursor, Windsurf, Gemini, Copilot, Roo Code, Aider, and 10+ platforms
- **Model Agnostic**: Any LLM that reads markdown can use it
- **Environment Agnostic**: Local, cloud, sandbox, CI/CD all work
- **Stop Only When Blocked**: Missing credentials, irreversible ops, billing, repeated errors

## Quick Start

1. Open this repo with any AI tool
2. The AI auto-reads the platform entry file → redirects to `AGENTS.md`
3. The AI follows the 4-Phase Protocol to deliver autonomously

## 4-Phase Autonomous Delivery Protocol

```
Phase 1: Understand — Grasp the requirement
Phase 2: Plan      — Break into verifiable tasks
Phase 3: Build     — Implement-verify loop
Phase 4: Ship      — Deliver the finished product
```

See `AGENTS.md` for the full protocol.

## Supported Platforms

| Platform | Entry File | Auto-Discovery |
|----------|-----------|----------------|
| Claude Code | `CLAUDE.md` | Auto |
| Codex | `AGENTS.md` | Auto |
| Cursor | `.cursorrules` | Auto |
| Windsurf | `.windsurfrules` | Auto |
| Gemini CLI | `GEMINI.md` | Auto |
| GitHub Copilot | `.github/copilot-instructions.md` | Auto |
| Roo Code / Cline | `.clinerules` | Auto |
| Aider | `.aider.conf.yml` | Auto |
| Continue.dev | `.continuerc.json` | Auto |
| ChatGPT / GPT | Provide `AGENTS.md` manually | Manual |
| Any LLM | Provide `AGENTS.md` manually | Manual |

All entry files point to the same protocol: `AGENTS.md`

## What "Support" Means

- The repo provides a platform-compatible entry file that auto-loads
- The entry file redirects to the universal `AGENTS.md` protocol
- Skills, state, and docs are in platform-neutral markdown format

It does NOT mean every platform has identical MCP, browser, deployment, or subagent capabilities. The protocol adapts to what's available.

## Built-in Skills

30+ workflow skills covering the full development lifecycle in `.agents/skills/`:

- **Define**: `idea-refine`, `interview-me`, `spec-driven-development`
- **Plan**: `planning-and-task-breakdown`, `project-config-generation`
- **Build**: `incremental-implementation`, `test-driven-development`, `source-driven-development`
- **Verify**: `browser-testing-with-devtools`, `debugging-and-error-recovery`
- **Review**: `code-review-and-quality`, `biome-quality-automation`, `security-and-hardening`
- **Ship**: `shipping-and-launch`, `ci-cd-and-automation`, `documentation-and-adrs`

## Helper Scripts (Optional)

Scripts accelerate the workflow but are NOT required. Everything can be done manually.

```bash
node scripts/inspect_agent_capabilities.js     # Audit capabilities
node scripts/init_session_loop.js . --goal "X" # Initialize session
node scripts/auto_skill_setup.js --project-type web-app  # Recommend skills
node scripts/validate_repo_integrity.js        # Check repo integrity
```

If scripts can't run, read `docs/script_fallback_matrix.md` for manual alternatives.

## Principles

- Autonomous delivery — stop only when blocked
- Spec first, code second
- Official docs first, implementation second
- Minimal necessary changes
- Verify every change
- Scripts accelerate, they don't gate
- Pure markdown protocol — any LLM can understand
