# Agent Manifest Spec

本文件是 repo-level agent disclosure 草案。

調研吸收：

- `open-kya/kya-standard`
- `Fair-Grade`

## Goal

讓 agent 可機器可讀地宣告：

- 身分與版本
- 能力
- 邊界
- 需要的人類授權
- 停機條件

## Suggested Fields

- `agent_name`
- `version`
- `primary_entry`
- `supported_surfaces`
- `skills_runtime_paths`
- `autonomy_default_level`
- `allowed_actions`
- `restricted_actions`
- `requires_human_gate`
- `verification_gates`
- `audit_surfaces`
- `secret_handling`
- `kill_switch_conditions`

## Current Repo Mapping

目前 machine-readable 草案落在：

- `config/agent_manifest.json`
