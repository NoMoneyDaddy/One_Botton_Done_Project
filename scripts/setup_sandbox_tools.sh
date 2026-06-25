#!/usr/bin/env bash
set -euo pipefail

MODE="plan"

usage() {
  cat <<'EOF'
用法:
  bash scripts/setup_sandbox_tools.sh --plan
  bash scripts/setup_sandbox_tools.sh --install-core
  bash scripts/setup_sandbox_tools.sh --install-ai
  bash scripts/setup_sandbox_tools.sh --install-all

說明:
  --plan         顯示建議工具與安裝方式
  --install-core 安裝 shell / bash 核心工具
  --install-ai   安裝 AI repo / browser 補強工具
  --install-all  先裝 core，再裝 AI 補強工具
EOF
}

has() {
  command -v "$1" >/dev/null 2>&1
}

detect_package_manager() {
  if has brew; then
    echo "brew"
    return
  fi

  if has apt-get; then
    echo "apt"
    return
  fi

  echo "unknown"
}

print_plan() {
  cat <<'EOF'
必裝 core:
  - ripgrep   : 快速全文搜尋
  - fd        : 快速找檔案
  - fzf       : 模糊搜尋
  - zoxide    : 智慧跳目錄
  - bat       : 語法高亮看檔案
  - jq        : JSON 處理
  - hyperfine : 指令效能基準測試
  - delta     : Git diff 強化

AI / sandbox 補強:
  - semble          : repo 語意搜尋 / 索引
  - mcp-cli         : 低 token 列出 / 搜尋 / 呼叫 MCP
  - playwright-cli  : 可重現瀏覽器 E2E / 錄製 / 截圖
  - agent-browser   : 快速 smoke test / 視覺驗證

JS / TS 專案品質 loop:
  - Biome           : formatter + linter + import sorting + safe fix + CI gate
  - 安裝            : npm install --save-dev --save-exact @biomejs/biome
  - 初始化          : npx @biomejs/biome init
  - 切片後          : npx @biomejs/biome check --write <changed-paths>
  - CI / merge gate : npx @biomejs/biome ci .

macOS:
  brew install ripgrep fd fzf zoxide bat jq git-delta hyperfine

Debian / Ubuntu sandbox:
  sudo apt-get update
  sudo apt-get install -y ripgrep fd-find fzf zoxide bat jq hyperfine
  cargo install git-delta

AI 補強工具:
  uv tool install semble && semble install
  npm install -g @willh/mcp-cli
  npm install -g @playwright/cli@latest && playwright-cli install --skills
  npm install -g agent-browser && agent-browser install

JS / TS 專案內建議:
  npm install --save-dev --save-exact @biomejs/biome
  npx @biomejs/biome init

Debian / Ubuntu 常見別名:
  alias fd='fdfind'
  alias bat='batcat'

避免使用:
  grep -R / find . -type f / cat 巨檔
  rm -rf / git reset --hard / git clean -fd / git checkout --
  未看官方文檔就直接執行來源不明的 curl | sh
EOF
}

install_core() {
  local manager
  manager="$(detect_package_manager)"

  case "$manager" in
    brew)
      brew install ripgrep fd fzf zoxide bat jq git-delta hyperfine
      ;;
    apt)
      sudo apt-get update
      sudo apt-get install -y ripgrep fd-find fzf zoxide bat jq hyperfine
      if has cargo; then
        cargo install git-delta
      else
        echo "⚠️ 缺少 cargo，略過 git-delta。可先安裝 Rust toolchain 後再執行: cargo install git-delta"
      fi
      ;;
    *)
      echo "❌ 找不到支援的套件管理器。請改看 docs/sandbox_tooling_guide.md"
      exit 1
      ;;
  esac

  echo
  echo "Linux sandbox 若沒有 fd / bat 指令，可加入："
  echo "alias fd='fdfind'"
  echo "alias bat='batcat'"
}

install_ai_tools() {
  if has uv; then
    uv tool install semble
    semble install
  else
    echo "⚠️ 缺少 uv，先安裝後再執行: https://docs.astral.sh/uv/"
  fi

  if has npm; then
    npm install -g @willh/mcp-cli
    npm install -g @playwright/cli@latest
    playwright-cli install --skills
    npm install -g agent-browser
    agent-browser install
  else
    echo "⚠️ 缺少 npm，先安裝 Node.js 後再執行 Playwright CLI / agent-browser"
  fi
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --plan)
      MODE="plan"
      ;;
    --install-core)
      MODE="install-core"
      ;;
    --install-ai)
      MODE="install-ai"
      ;;
    --install-all)
      MODE="install-all"
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "❌ 未知參數: $1"
      usage
      exit 1
      ;;
  esac
  shift
done

case "$MODE" in
  plan)
    print_plan
    ;;
  install-core)
    install_core
    ;;
  install-ai)
    install_ai_tools
    ;;
  install-all)
    install_core
    install_ai_tools
    ;;
esac
