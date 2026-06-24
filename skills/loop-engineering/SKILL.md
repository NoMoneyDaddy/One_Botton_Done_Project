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

**If MCP is available:**
1. Guide the user to commit and push their code to GitHub.
2. Inform the user that you can deploy it for them directly using the Zeabur MCP server.
3. Once the code is pushed, use the Zeabur MCP tool to create a project, link the repository, set environment variables, and deploy.

**If MCP is NOT available (e.g., Mobile Web):**
1. Guide the user to commit and push their code to GitHub.
2. Instruct them to link their GitHub repository to Zeabur via the web dashboard for automatic, zero-config deployment.
3. Reference `references/zeabur_deployment_guide.md` for specific deployment details.

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
