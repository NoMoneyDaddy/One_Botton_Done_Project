#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const failures = [];

const requiredFiles = [
  'AGENTS.md',
  'CLAUDE.md',
  'GEMINI.md',
  'README.md',
  'README.en.md',
  '.cursorrules',
  '.cursor/rules/00-project.mdc',
  '.github/copilot-instructions.md',
  '.github/workflows/ci.yml',
  '.gemini/commands/goal.toml',
  '.loop/GOAL.md',
  '.loop/PLAN.md',
  '.loop/STATE.json',
  '.loop/CHECKPOINTS.md',
  '.loop/EVIDENCE.md',
  '.loop/POLICY.md',
  'docs/SPEC.md',
  'docs/TASKS.md',
  'docs/STATE.md',
  'docs/DEBUG_NOTES.md',
  'docs/ADRS.md',
  'docs/architecture.md',
  'docs/script_fallback_matrix.md',
  'docs/loop_maturity_model.md',
  'docs/engineering_phase_loop.md',
  'docs/capability_audit_and_install_loop.md',
  'docs/loop_circuit_breaker.md',
  'docs/skill_crystallization_loop.md',
  'docs/agent_manifest_spec.md',
  'docs/reference_repos_by_domain.md',
  'docs/large_project_dimensions_and_roles.md',
  'config/env_templates.json',
  'config/agent_manifest.json',
  'config/project_config_profiles.json',
  'config/script_capabilities.json',
  'config/skill_profiles.json',
  'config/tooling_profiles.json'
];

const requiredDirs = [
  '.agents/skills',
  '.claude/skills',
  'skills',
  'docs',
  'scripts',
  'config'
];

function toRepoPath(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join('/');
}

function repoPath(relativePath) {
  return path.join(repoRoot, relativePath);
}

function isInsideRepo(filePath) {
  const relative = path.relative(repoRoot, filePath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function assertExists(relativePath) {
  if (!fs.existsSync(repoPath(relativePath))) {
    failures.push(`missing: ${relativePath}`);
  }
}

function walk(dirPath, predicate, found = []) {
  if (!fs.existsSync(dirPath)) return found;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'dist', 'build', 'coverage'].includes(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, predicate, found);
      continue;
    }

    if (!predicate || predicate(fullPath)) found.push(fullPath);
  }

  return found;
}

function parseJson(relativePath) {
  try {
    return JSON.parse(fs.readFileSync(repoPath(relativePath), 'utf8'));
  } catch (error) {
    failures.push(`invalid json: ${relativePath} | ${error.message}`);
    return null;
  }
}

function listSkillNames(root) {
  const rootPath = repoPath(root);
  if (!fs.existsSync(rootPath)) return [];

  return fs
    .readdirSync(rootPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => fs.existsSync(path.join(rootPath, name, 'SKILL.md')))
    .sort();
}

function diffArrays(source, target) {
  const targetSet = new Set(target);
  return source.filter((item) => !targetSet.has(item));
}

function validateRequiredSurface() {
  for (const relativePath of requiredFiles) assertExists(relativePath);

  for (const relativePath of requiredDirs) {
    const fullPath = repoPath(relativePath);
    if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
      failures.push(`missing dir: ${relativePath}`);
    }
  }
}

function validateJsonConfigs() {
  const configDir = repoPath('config');
  for (const filePath of fs.readdirSync(configDir).filter((name) => name.endsWith('.json')).sort()) {
    parseJson(`config/${filePath}`);
  }
}

function validateScriptCapabilities() {
  const parsed = parseJson('config/script_capabilities.json');
  if (!parsed) return;

  const declared = new Set();
  for (const item of Array.isArray(parsed.scripts) ? parsed.scripts : []) {
    if (!item.path) {
      failures.push('script capabilities: item missing path');
      continue;
    }
    declared.add(item.path);
    if (!fs.existsSync(repoPath(item.path))) {
      failures.push(`script capabilities points to missing file: ${item.path}`);
    }
    if (!item.fallback_mode || !Array.isArray(item.fallback_steps) || item.fallback_steps.length === 0) {
      failures.push(`script capabilities missing fallback: ${item.path}`);
    }
  }

  const actualScripts = walk(repoPath('scripts'), (filePath) => /\.(js|sh)$/.test(filePath)).map(toRepoPath).sort();
  for (const scriptPath of actualScripts) {
    if (!declared.has(scriptPath)) {
      failures.push(`script missing capability declaration: ${scriptPath}`);
    }
  }
}

function validateSkillMirrors() {
  const canonical = listSkillNames('.agents/skills');
  const claude = listSkillNames('.claude/skills');
  const legacy = listSkillNames('skills');

  for (const [name, mirror] of [
    ['.claude/skills', claude],
    ['skills', legacy]
  ]) {
    const missing = diffArrays(canonical, mirror);
    const extra = diffArrays(mirror, canonical);
    if (missing.length > 0) failures.push(`${name} missing skills: ${missing.join(', ')}`);
    if (extra.length > 0) failures.push(`${name} has extra skills: ${extra.join(', ')}`);
  }
}

function normalizeMarkdownHref(rawHref) {
  let href = rawHref.trim();
  if (!href || href.startsWith('#')) return '';
  if (/^(https?:|mailto:|tel:|data:)/.test(href)) return '';
  if (href.startsWith('<') && href.endsWith('>')) href = href.slice(1, -1);
  href = href.split('#')[0].trim();
  if (!href) return '';
  return href.split(/\s+/)[0];
}

function validateMarkdownLinks() {
  const markdownFiles = walk(repoRoot, (filePath) => filePath.endsWith('.md'));
  const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;

  for (const filePath of markdownFiles) {
    const content = fs.readFileSync(filePath, 'utf8');
    let match;
    while ((match = linkPattern.exec(content))) {
      const href = normalizeMarkdownHref(match[1]);
      if (!href) continue;

      const targetPath = path.resolve(path.dirname(filePath), href);
      if (!isInsideRepo(targetPath)) continue;

      if (!fs.existsSync(targetPath)) {
        failures.push(`${toRepoPath(filePath)} links missing file: ${match[1]}`);
      }
    }
  }
}

function main() {
  validateRequiredSurface();
  validateJsonConfigs();
  validateScriptCapabilities();
  validateSkillMirrors();
  validateMarkdownLinks();

  if (failures.length > 0) {
    console.error('Repo integrity failed:');
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  const skillCount = listSkillNames('.agents/skills').length;
  const markdownCount = walk(repoRoot, (filePath) => filePath.endsWith('.md')).length;
  console.log(`repo integrity ok | skills=${skillCount} markdown=${markdownCount}`);
}

main();
