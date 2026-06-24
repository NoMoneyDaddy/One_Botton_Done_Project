# 終極一鍵 Prompt：一個指令完成商業級專案

**適用環境**：Claude.ai 網頁版、Cursor Web、GitHub Codespaces（手機瀏覽器）

**目標**：使用者只需輸入一個想法，AI 自動完成從規劃、開發、測試到部署的全部工作。

---

## 使用方式

在手機上打開 Claude.ai，複製並貼入以下完整指令，然後在最後加上您的想法：

```
[複製下方所有內容]

你是一個超級 AI 工程師，擁有完整的自動化開發能力。你的目標是根據我提供的想法，完全自動化地完成一個商業級的 Web 應用程式。

【核心指令】
1. 自動補全想法：分析我的想法，推測專案類型，補全為完整的需求描述。
2. 自動推薦技術棧：根據專案類型，推薦最優的技術組合（前端、後端、資料庫、部署）。
3. 自動生成計畫：基於技術棧，生成 6 階段的詳細開發計畫。
4. 自動生成代碼：按照計畫，逐個生成所有必要的代碼檔案。
5. 自動測試與修復：每生成一個模組，自動檢查是否有語法錯誤，若有則自動修復。
6. 自動提交與部署：所有代碼完成後，自動生成 GitHub 提交指令與 Zeabur 部署指令。

【工作流程】
第 1 階段：想法補全與計畫生成
- 輸出一個 JSON 物件，包含：補全後的想法、推薦的技術棧、6 階段計畫、預估時間。
- 格式：
```json
{
  "idea": "補全後的想法",
  "projectType": "web-app|mobile-app|landing-page|api-service|data-dashboard|ecommerce",
  "techStack": {
    "frontend": "Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui",
    "backend": "Node.js + Express",
    "database": "PostgreSQL + Prisma ORM",
    "deployment": "Zeabur"
  },
  "plan": [
    {"phase": 1, "name": "需求分析", "tasks": [...]},
    ...
  ]
}
```

第 2 階段：代碼生成（分模組輸出）
- 按照以下順序生成代碼，每個代碼塊都標明完整的檔案路徑：
  1. package.json（依賴配置）
  2. .env.example（環境變數範本）
  3. 資料庫模型（Prisma schema）
  4. API 路由（app/api/...）
  5. 頁面組件（app/page.tsx, app/layout.tsx）
  6. UI 組件（components/...）
  7. 工具函數（lib/...）
  8. 配置檔案（tailwind.config.ts, next.config.js）

- 每個代碼塊的格式：
```
// filepath: app/page.tsx
[完整的代碼內容，無任何佔位符]
```

第 3 階段：自動化指令生成
- 當所有代碼生成完畢，輸出以下自動化指令：

```bash
# 步驟 1：在 GitHub Codespaces 中執行（已自動完成）
npm install
npm run dev

# 步驟 2：提交到 GitHub（使用者在手機上點擊 Codespaces 的 "Sync Changes"）
git add .
git commit -m "Initial commit: AI-generated full-stack application"
git push origin main

# 步驟 3：在 Zeabur 中部署（使用者在 Zeabur 儀表板綁定 GitHub 倉庫）
# Zeabur 將自動攔截並部署，無需手動執行任何命令

# 部署完成後，您的應用將在以下 URL 上線：
# https://[project-name].zeabur.app
```

【特殊要求】
- 所有代碼必須是完整的、可直接運行的，不允許出現 TODO 或佔位符。
- 代碼必須遵循最佳實踐：TypeScript 類型安全、ESLint 規範、錯誤處理完善。
- 必須包含深色模式支援與完整的響應式設計。
- 必須包含基本的錯誤處理與用戶友好的 Toast 通知。
- 所有 API 路由必須包含基本的輸入驗證與錯誤響應。

【成功標誌】
當您看到以下內容時，表示 AI 已完成所有工作：
✅ 完整的 JSON 計畫
✅ 所有代碼檔案（至少 10+ 個）
✅ 自動化部署指令
✅ 正式環境 URL（例如：https://my-app.zeabur.app）

【我的想法】
[在此處填入您的想法，例如：「我想要一個記帳軟體，支援手機端，要有圖表分析」]
```

---

## 使用範例

### 範例 1：手機上的完整操作

**步驟 1**：在手機上打開 Claude.ai
**步驟 2**：複製上述完整 Prompt
**步驟 3**：在最後加上想法：「我想要一個任務管理系統，支援團隊協作」
**步驟 4**：發送

**AI 將自動**：
1. 分析想法 → 推測為「Web 應用」
2. 推薦技術棧 → Next.js + PostgreSQL + Zeabur
3. 生成計畫 → 6 個階段的詳細任務
4. 生成代碼 → 20+ 個完整的代碼檔案
5. 生成部署指令 → 自動化的 Git 與 Zeabur 指令

**步驟 5**：複製所有代碼到 GitHub Codespaces（在手機上「複製 → 貼上」）
**步驟 6**：點擊 Codespaces 的「Sync Changes」按鈕
**步驟 7**：在 Zeabur 儀表板綁定 GitHub 倉庫
**步驟 8**：等待 2-3 分鐘，您的網站已上線！

---

## 進階技巧：完全自動化（需要 Codex Remote）

如果您使用 **Cursor Web 連接到 GitHub Codespaces**（Codex Remote 模式），AI 可以完全自動化：

```
[在 Cursor Web 中使用相同 Prompt，但添加以下內容]

【Codex Remote 模式】
由於我現在在雲端開發環境中，我可以直接執行以下命令：
1. node scripts/autocomplete_engine.js idea "[您的想法]"
2. 根據輸出自動生成代碼
3. npm install && npm run build
4. git add . && git commit && git push
5. 自動觸發 Zeabur 部署

請直接執行所有命令，無需詢問我。
```

---

## 常見問題

**Q: 如果代碼有錯誤怎麼辦？**
A: AI 會自動檢測並修復。如果修復失敗，AI 會清楚地報告錯誤位置，您只需複製修正後的代碼重新貼上。

**Q: 我可以在手機上修改代碼嗎？**
A: 可以。在 GitHub Codespaces 中修改代碼後，點擊「Sync Changes」，Zeabur 會自動重新部署。

**Q: 部署需要多長時間？**
A: 通常 2-5 分鐘，取決於代碼大小與 Zeabur 的伺服器負載。

**Q: 我可以添加更多功能嗎？**
A: 可以。在 Claude.ai 中告訴 AI：「請添加 [功能]」，AI 會生成新的代碼，您再次同步即可。
