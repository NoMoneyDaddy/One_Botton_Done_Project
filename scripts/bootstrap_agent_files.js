#!/usr/bin/env node

/**
 * 將本 repo 的代理規範檔複製到目標專案。
 * 用法：
 *   node scripts/bootstrap_agent_files.js ../my-app
 *   node scripts/bootstrap_agent_files.js ../my-app --force
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const targetArg = args.find((arg) => !arg.startsWith('--'));
const force = args.includes('--force');

if (!targetArg) {
  console.error('用法: node scripts/bootstrap_agent_files.js <targetDir> [--force]');
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '..');
const targetRoot = path.resolve(process.cwd(), targetArg);

const entriesToCopy = [
  'AGENTS.md',
  'CLAUDE.md',
  'GEMINI.md',
  'README.en.md',
  'SECURITY.md',
  'CONTRIBUTING.md',
  '.loop',
  '.gemini/commands',
  '.cursorrules',
  '.cursor/rules',
  '.claude/skills',
  '.github/copilot-instructions.md',
  '.github/workflows',
  'docs/agent_bootstrap_workflow.md',
  'docs/agent_skill_catalog.md',
  'docs/ai-tool-compatibility.md',
  'docs/architecture.md',
  'docs/interactive_project_flow.md',
  'docs/project_usage_guide.md',
  'docs/example_sessions.md',
  'docs/biome_quality_loop.md',
  'docs/project_config_generation.md',
  'docs/scaffold_project.md',
  'docs/session_loop_contract.md',
  'docs/loop_evaluation_gate.md',
  'docs/agent_execution_policy_matrix.md',
  'docs/script_fallback_matrix.md',
  'docs/loop_maturity_model.md',
  'docs/engineering_phase_loop.md',
  'docs/capability_audit_and_install_loop.md',
  'docs/loop_circuit_breaker.md',
  'docs/skill_crystallization_loop.md',
  'docs/agent_manifest_spec.md',
  'docs/external_install_provenance_checklist.md',
  'docs/marketplace_open_source_readiness.md',
  'docs/release_version_policy.md',
  'docs/platform_support_matrix.md',
  'docs/project_lifecycle_automation.md',
  'docs/project_architecture_best_practices.md',
  'docs/SPEC_FORMAT.md',
  'docs/subagent_dispatch.md',
  'docs/sandbox_tooling_guide.md',
  'docs/third_party_skills.md',
  'docs/reference_repos_by_domain.md',
  'docs/large_project_dimensions_and_roles.md',
  'config/env_templates.json',
  'config/agent_manifest.json',
  'config/execution_policy_matrix.json',
  'config/project_config_profiles.json',
  'config/script_capabilities.json',
  'config/skill_profiles.json',
  'config/tooling_profiles.json',
  'scripts/inspect_agent_capabilities.js',
  'scripts/evaluate_session_loop.js',
  'scripts/init_session_loop.js',
  'scripts/init_project_workspace.js',
  'scripts/fresh_clone_smoke_test.js',
  'scripts/marketplace_install_smoke_test.js',
  'scripts/generate_project_configs.js',
  'scripts/scaffold_project.js',
  'scripts/auto_skill_setup.js',
  'scripts/bootstrap_agent_files.js',
  'scripts/validate_repo_integrity.js',
  'scripts/export_skills_for_hermes_openclaw.sh',
  'scripts/setup_sandbox_tools.sh',
  'prompts/interactive_api_key_prompt.md',
  'prompts/interactive_tech_stack_prompt.md',
  'prompts/legacy_project_improvement_prompt.md',
  '.agents/skills',
  'skills'
];

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyEntry(relativePath) {
  const sourcePath = path.join(repoRoot, relativePath);
  const targetPath = path.join(targetRoot, relativePath);

  if (!fs.existsSync(sourcePath)) {
    throw new Error(`找不到來源檔案: ${relativePath}`);
  }

  const sourceStat = fs.statSync(sourcePath);

  if (sourceStat.isDirectory()) {
    copyDirectory(sourcePath, targetPath, relativePath);
    return;
  }

  ensureDir(path.dirname(targetPath));

  if (!force && fs.existsSync(targetPath)) {
    console.log(`⏭️ 跳過既有檔案: ${relativePath}`);
    return;
  }

  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✅ 已建立: ${relativePath}`);
}

function copyDirectory(sourceDir, targetDir, relativePath) {
  ensureDir(targetDir);

  for (const entry of fs.readdirSync(sourceDir, { withFileTypes: true })) {
    const childRelativePath = path.join(relativePath, entry.name);
    const childSource = path.join(sourceDir, entry.name);
    const childTarget = path.join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(childSource, childTarget, childRelativePath);
      continue;
    }

    ensureDir(path.dirname(childTarget));
    if (!force && fs.existsSync(childTarget)) {
      console.log(`⏭️ 跳過既有檔案: ${childRelativePath}`);
      continue;
    }

    fs.copyFileSync(childSource, childTarget);
    console.log(`✅ 已建立: ${childRelativePath}`);
  }
}

function main() {
  ensureDir(targetRoot);

  console.log(`📁 目標目錄: ${targetRoot}`);
  console.log(`🧠 複製代理規範檔...`);

  for (const relativePath of entriesToCopy) {
    copyEntry(relativePath);
  }

  console.log('\n完成。');
  console.log('下一步:');
  console.log('1. 讓 AI 先讀取 AGENTS.md');
  console.log('2. 需要英文入口時，可同步閱讀 README.en.md');
  console.log('3. 若在 GitHub / sandbox / remote，先跑 bash scripts/setup_sandbox_tools.sh --doctor');
  console.log('4. 先跑 node scripts/inspect_agent_capabilities.js');
  console.log('5. 再跑 node scripts/validate_repo_integrity.js');
  console.log('6. 若已有 .loop/*，跑 node scripts/evaluate_session_loop.js .');
  console.log('7. 讀 docs/loop_maturity_model.md、docs/engineering_phase_loop.md、docs/loop_evaluation_gate.md');
  console.log('8. 若缺 .loop/*，先跑 node scripts/init_session_loop.js . --goal "<objective>"');
  console.log('9. 新專案若要先建官方骨架，可跑 node scripts/scaffold_project.js ../my-app --profile <profile>');
  console.log('10. 技術棧確認後，可先跑 node scripts/generate_project_configs.js --profile <profile> --name <projectName>');
  console.log('11. 若要給 Hermes / OpenClaw 共用 skills，跑 bash scripts/export_skills_for_hermes_openclaw.sh --plan');
  console.log('12. 再讀 .agents/skills/using-agent-skills/SKILL.md');
  console.log('13. 視情境讀取 .agents/skills/loop-engineering/SKILL.md 與技術棧 best practices');
}

try {
  main();
} catch (error) {
  console.error(`❌ 失敗: ${error.message}`);
  process.exit(1);
}
