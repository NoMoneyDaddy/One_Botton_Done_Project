# 純 Web 端 AI Agent 架構設計

為了實現「純手機端可執行」且支援 Claude Code Web 等無終端環境，我們需要將原本依賴本地 CLI 工具（如 `gh`, `zeabur`, `npm`）的工作流，轉變為**純 API 驅動**與**雲端執行**的架構。

## 1. 核心架構轉變

| 傳統終端架構 | 純 Web 端架構 |
| :--- | :--- |
| 本地 Shell 腳本 (`.sh`) | 雲端 Node.js 腳本 / GitHub Actions |
| 本地 CLI 工具 (`gh`, `zeabur`) | REST API 調用 (GitHub API, Zeabur API) |
| 本地文件系統 | 雲端代碼庫 (GitHub) + 記憶體內處理 |
| 終端互動 (Terminal) | Web 聊天介面 (Claude Code Web) |

## 2. 雲端工作流設計

在純 Web 端，AI Agent 的工作流將完全在雲端進行，使用者只需透過聊天介面下達指令：

1. **需求釐清**：Agent 透過聊天介面進行多選問答。
2. **專案初始化**：Agent 透過 GitHub API 創建倉庫，並寫入初始代碼。
3. **雲端開發**：Agent 透過 GitHub API 提交代碼變更。
4. **自動化測試**：Agent 觸發 GitHub Actions 執行測試。
5. **雲端部署**：Agent 透過 Zeabur API 或 GitHub Actions 觸發部署。

## 3. Web 端 API 腳本 (Node.js)

我們將原本的 Shell 腳本重寫為可在雲端或 WebContainer 中執行的 Node.js 腳本。

### 3.1 專案初始化與代碼提交 (GitHub API)

```javascript
// scripts/github_api.js
const { Octokit } = require("@octokit/rest");

class GitHubManager {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
  }

  async createRepo(name, description) {
    const { data } = await this.octokit.repos.createForAuthenticatedUser({
      name,
      description,
      private: true,
      auto_init: true
    });
    return data;
  }

  async commitFiles(owner, repo, files, message) {
    // 獲取 main 分支的最新 commit
    const { data: ref } = await this.octokit.git.getRef({
      owner, repo, ref: "heads/main"
    });
    
    // 創建 tree
    const tree = await Promise.all(files.map(async file => {
      const { data: blob } = await this.octokit.git.createBlob({
        owner, repo, content: file.content, encoding: "utf-8"
      });
      return { path: file.path, mode: "100644", type: "blob", sha: blob.sha };
    }));

    const { data: newTree } = await this.octokit.git.createTree({
      owner, repo, tree, base_tree: ref.object.sha
    });

    // 創建 commit
    const { data: commit } = await this.octokit.git.createCommit({
      owner, repo, message, tree: newTree.sha, parents: [ref.object.sha]
    });

    // 更新引用
    await this.octokit.git.updateRef({
      owner, repo, ref: "heads/main", sha: commit.sha
    });
    
    return commit;
  }
}
```

### 3.2 雲端部署 (Zeabur API)

```javascript
// scripts/zeabur_api.js
const axios = require('axios');

class ZeaburManager {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://gateway.zeabur.com/api/v1';
  }

  async deployProject(projectId, environmentId) {
    const response = await axios.post(`${this.baseURL}/projects/${projectId}/deploy`, {
      environmentID: environmentId
    }, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return response.data;
  }
}
```

## 4. MCP 雲端化配置

在純 Web 環境中，我們依賴 MCP 伺服器來處理外部 API 調用。我們需要確保這些 MCP 伺服器是雲端託管的，或者由 Claude Code Web 原生支援。

### GitHub MCP (雲端版)
透過 GitHub API 提供完整的倉庫管理、PR 創建和 Actions 觸發能力。

### Zeabur MCP (自定義)
如果 Claude Code Web 支援自定義 MCP，我們可以提供一個簡單的 Zeabur MCP 配置：

```json
{
  "mcpServers": {
    "zeabur": {
      "command": "npx",
      "args": ["-y", "@zeabur/mcp-server"],
      "env": {
        "ZEABUR_API_TOKEN": "your_token"
      }
    }
  }
}
```

## 5. 總結

透過將所有本地操作轉移到雲端 API 調用，我們徹底擺脫了對本地終端的依賴。這使得在手機瀏覽器或 Claude Code Web 中進行完整的 Loop Engineering 成為可能。
