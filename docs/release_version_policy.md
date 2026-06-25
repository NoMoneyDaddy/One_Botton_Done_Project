# Release and Version Policy

本 repo 目前仍是 pre-plugin readiness 階段。版本政策先採保守規則，避免使用者誤以為已可穩定 marketplace 安裝。

## Versioning

建議採 Semantic Versioning：

- MAJOR：入口契約、skill 路由、目錄結構有破壞性變更
- MINOR：新增 skill、script、profile、平台支援
- PATCH：文件修正、bug fix、fallback 補強

## Release Gate

每次 release 前至少跑：

    node scripts/inspect_agent_capabilities.js --json
    node scripts/validate_repo_integrity.js
    git diff --check

若新增或修改 scripts，再跑對應 syntax check。

## Marketplace Gate

準備上架 Codex plugin / skill marketplace 前，還需要：

1. LICENSE
2. SECURITY.md
3. CONTRIBUTING.md
4. .codex-plugin/plugin.json
5. marketplace test entry
6. fresh clone install smoke test
7. restart agent 後確認 skill 可被觸發

建議也補：

8. `config/agent_manifest.json`

## Changelog

每次 release 應記錄：

- 新增能力
- 行為改變
- 安全或權限變更
- 已知缺口
- 驗證命令
