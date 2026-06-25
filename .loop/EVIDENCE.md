# EVIDENCE

記錄真實驗證證據：

- test
- lint
- build
- runtime
- browser

## Entries

- 2026-06-26
  - `node scripts/run_repo_tests.js`
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/platform_prerequisite_doctor.js --profile tauri-desktop`
  - `node scripts/platform_prerequisite_doctor.js --profile capacitor-mobile-app --json`
  - `git diff --check`

- 2026-06-26
  - `node scripts/run_repo_tests.js`
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/scaffold_project.js /tmp/obd-capacitor-run2 --profile capacitor-mobile-app --name obd-capacitor-run2 --idea "capacitor smoke" --database supabase --quality-tool biome --run`
  - `node scripts/scaffold_project.js /tmp/obd-electron-run2 --profile electron-desktop --name obd-electron-run2 --idea "electron smoke" --database supabase --quality-tool biome --run`
  - `git diff --check`

- 2026-06-25
  - `node scripts/run_repo_tests.js`
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/evaluate_session_loop.js .`
  - `node scripts/scaffold_project.js /tmp/obd-expo-run --profile react-native-expo --name obd-expo-run --idea "expo smoke" --database supabase --quality-tool biome --skip-install --run`
  - `node scripts/scaffold_project.js /tmp/obd-tauri-run --profile tauri-desktop --name obd-tauri-run --idea "tauri smoke" --quality-tool biome --run`
  - `git diff --check`

- 2026-06-25
  - `node scripts/export_task_bundle.js`
  - `node scripts/run_repo_tests.js`
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/evaluate_session_loop.js .`
  - `git diff --check`

- 2026-06-25
  - `node scripts/run_repo_tests.js`
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/summarize_learning_ledger.js`
  - `git diff --check`

- 2026-06-25
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/evaluate_session_loop.js .`
  - `git diff --check`

- 2026-06-25
  - `node scripts/evaluate_session_loop.js .`
  - `node scripts/validate_repo_integrity.js`
  - `git diff --check`

- 2026-06-25
  - `node scripts/evaluate_session_loop.js .`
  - `node scripts/evaluate_session_loop.js . --json`
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/inspect_agent_capabilities.js`
  - `git diff --check`

- 2026-06-25
  - `node --check scripts/inspect_agent_capabilities.js`
  - `node --check scripts/bootstrap_agent_files.js`
  - `node --check scripts/init_project_workspace.js`
  - `node --check scripts/init_session_loop.js`
  - `node --check scripts/generate_project_configs.js`
  - `node --check scripts/scaffold_project.js`
  - `node --check scripts/validate_repo_integrity.js`
  - `bash -n scripts/export_skills_for_hermes_openclaw.sh`
  - `bash -n scripts/setup_sandbox_tools.sh`
  - `node scripts/inspect_agent_capabilities.js`
  - `node scripts/validate_repo_integrity.js`
  - `node scripts/init_session_loop.js "$tmp" --goal "ci smoke"` smoke test
  - `node scripts/generate_project_configs.js --profile nextjs-app-router ... --write` smoke test
  - `node scripts/init_project_workspace.js "$tmp" --name smoke-app --idea "ci smoke" --force` smoke test
  - `cd "$tmp" && node scripts/validate_repo_integrity.js` bootstrap integrity smoke test
  - `node scripts/scaffold_project.js "$tmp/app-next" --profile nextjs-app-router ...` plan smoke test
  - `node scripts/scaffold_project.js "$tmp/app-vite" --profile vite-react ...` plan smoke test
  - `node scripts/scaffold_project.js "$tmp/app-api" --profile node-express-api ...` plan smoke test
  - `git diff --check`
  - `node scripts/inspect_agent_capabilities.js --json`
  - `node scripts/validate_repo_integrity.js`
  - `opencli doctor`
  - `agent-reach doctor --json`
