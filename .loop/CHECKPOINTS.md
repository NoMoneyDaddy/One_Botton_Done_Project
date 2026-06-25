# CHECKPOINTS

每輪 loop 完成後追加：

- 做了什麼
- 怎麼驗證
- 下一輪做什麼

## Entries

- 2026-06-26
  - 做了什麼：新增 `config/platform_prerequisites.json`、`scripts/platform_prerequisite_doctor.js`、`docs/platform_prerequisite_doctor.md`，把 Expo / Capacitor / Flutter / Tauri / Electron / iOS / Android 的原生 prerequisite 變成 machine-readable doctor。
  - 怎麼驗證：`node scripts/run_repo_tests.js`、`node scripts/validate_repo_integrity.js`、`node scripts/platform_prerequisite_doctor.js --profile tauri-desktop`、`node scripts/platform_prerequisite_doctor.js --profile capacitor-mobile-app --json`、`git diff --check`。
  - 下一輪做什麼：開 PR、等 CI；若合併完成，再補 `Flutter` runnable scaffold 或把 prerequisite doctor 接 scaffold gate。

- 2026-06-26
  - 做了什麼：把 `capacitor-mobile-app`、`electron-desktop` 從 `plan-only` 升成 runnable scaffold；補 `generate_project_configs` 的 Capacitor / Electron baseline merge，並加入 `main.js` / `index.html` 與 profile 測試。
  - 怎麼驗證：`node scripts/run_repo_tests.js`、`node scripts/validate_repo_integrity.js`、`node scripts/scaffold_project.js /tmp/obd-capacitor-run2 --profile capacitor-mobile-app ... --run`、`node scripts/scaffold_project.js /tmp/obd-electron-run2 --profile electron-desktop ... --run`、`git diff --check`。
  - 下一輪做什麼：開 PR、等 CI；若合併完成，再補 `Flutter` 或 native prerequisite doctor。

- 2026-06-25
  - 做了什麼：把 `react-native-expo`、`tauri-desktop` 從 `plan-only` 升成 runnable scaffold；補 `generate_project_configs` 的 mobile / desktop baseline merge，並新增 `tests/mobile_desktop_profile_files.test.js`。
  - 怎麼驗證：`node scripts/run_repo_tests.js`、`node scripts/validate_repo_integrity.js`、`node scripts/evaluate_session_loop.js .`、`node scripts/scaffold_project.js /tmp/obd-expo-run --profile react-native-expo ... --skip-install --run`、`node scripts/scaffold_project.js /tmp/obd-tauri-run --profile tauri-desktop ... --run`、`git diff --check`。
  - 下一輪做什麼：開 PR、等 CI；若合併完成，再往 `Capacitor` / `Electron` 或真機驗證補齊。

- 2026-06-25
  - 做了什麼：新增 `recurring-monitoring` skill lane 與 docs lifecycle / official-doc research policy / env configuration loop，並新增 `config/task_bundle_schema.json`、`scripts/export_task_bundle.js`、`.loop/task_bundle.json`，把 `docs/SPEC.md` 匯出成 machine-readable task bundle；同時補 `config/official_doc_sources.json` 與 mobile / desktop `plan-only` profiles。
  - 怎麼驗證：`node scripts/export_task_bundle.js`、`node scripts/run_repo_tests.js`、`node scripts/validate_repo_integrity.js`、`node scripts/evaluate_session_loop.js .`、`git diff --check`。
  - 下一輪做什麼：push 到 PR #5，等 CI / review；若 green，直接 merge，之後再補真正可執行的 mobile / desktop scaffold。

- 2026-06-25
  - 做了什麼：新增 `text-to-lottie` skill lane、`examples/text-to-lottie/README.md`、`tests/*`、`scripts/run_repo_tests.js`、`scripts/summarize_learning_ledger.js`，並把它們接回 `skill_profiles`、CI、surface manifest。
  - 怎麼驗證：`node scripts/run_repo_tests.js`、`node scripts/validate_repo_integrity.js`、`node scripts/summarize_learning_ledger.js`、`git diff --check`。
  - 下一輪做什麼：等 PR review；若無新 comment，可準備合併，之後再補 learning ledger 自動回寫 review feedback。

- 2026-06-25
  - 做了什麼：新增 `config/repo_surface_manifest.json`，讓 `bootstrap` 與 `integrity` 共用同一份 surface 清單；補 `.github/CODEOWNERS`、`CHANGELOG.md`、`examples/minimal-workspace/README.md`。
  - 怎麼驗證：`node scripts/validate_repo_integrity.js`、`node scripts/evaluate_session_loop.js .`、`git diff --check`。
  - 下一輪做什麼：補 examples / tests，或把 learning ledger 接 review feedback 自動回寫。

- 2026-06-25
  - 做了什麼：新增 `.loop/LEARNINGS.json`、`config/learning_ledger_schema.json`、`docs/learning_ledger_loop.md`，並把 learning ledger 接回 `init_session_loop`、`evaluate_session_loop`、bootstrap、integrity gate。
  - 怎麼驗證：`node scripts/evaluate_session_loop.js .`、`node scripts/validate_repo_integrity.js`、`git diff --check`。
  - 下一輪做什麼：補 learning ledger 的 score aggregation / auto-summary，或接 PR review feedback 自動回寫。

- 2026-06-25
  - 做了什麼：新增 `scripts/evaluate_session_loop.js` 與 `docs/loop_evaluation_gate.md`，補齊自治治理的 machine-readable gate。
  - 怎麼驗證：`node scripts/evaluate_session_loop.js .`、`node scripts/validate_repo_integrity.js`、`node scripts/inspect_agent_capabilities.js`、`git diff --check`。
  - 下一輪做什麼：補 machine-readable learning ledger 或 approval / policy matrix。

- 2026-06-25
  - 做了什麼：補齊跨平台 `/GOAL` loop、腳本能力宣告、fallback 文件、入口文件同步。
  - 怎麼驗證：`node --check`、`node scripts/inspect_agent_capabilities.js`、bootstrap smoke test、`git diff --check`。
  - 下一輪做什麼：整理 repo 自身架構文件與治理文件，清理文件漂移。

- 2026-06-25
  - 做了什麼：把 `docs/architecture.md` 改成 repo architecture，補 `docs/SPEC.md`、`docs/TASKS.md`、`docs/STATE.md`、`docs/DEBUG_NOTES.md`、`docs/ADRS.md`。
  - 怎麼驗證：檢查引用路徑、對照腳本輸出與 README 主文件清單。
  - 下一輪做什麼：做最後驗證與 diff 梳理。

- 2026-06-25
  - 做了什麼：新增 6 份 ultra review 摘要與 repo integrity gate，並同步 CI、bootstrap、README、使用文件。
  - 怎麼驗證：`node --check scripts/validate_repo_integrity.js`、`node scripts/validate_repo_integrity.js`、`node scripts/inspect_agent_capabilities.js`、`git diff --check`。
  - 下一輪做什麼：三角色 review 後決定是否 commit / push / PR。
