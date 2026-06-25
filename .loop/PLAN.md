# PLAN

## Phases

- [x] Define
- [x] Plan
- [x] Build
- [x] Verify
- [x] Review
- [ ] Ship

## Current Slice

- 本地 review / validation 已完成，等待 commit / push / PR 確認

## Acceptance Criteria

- repo 自身有治理文件而不是只要求別人有
- `docs/architecture.md` 描述 repo 實際架構
- 技術棧文件明確區分已自動化與僅參考
- bootstrap 後的新專案可通過 `node scripts/validate_repo_integrity.js`
- CI 可擋下入口檔、skill mirror、JSON、script capability、Markdown link 漂移
