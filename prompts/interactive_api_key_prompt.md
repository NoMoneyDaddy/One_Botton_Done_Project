# 互動式 API Key 詢問指令

當 AI 需要為用戶配置環境變數時，應該使用此指令來詢問用戶是否有必要的 API Key。

## 使用場景

當用戶選擇的技術棧需要以下服務時：
- Supabase API Key
- Firebase 認證信息
- OpenAI API Key
- Stripe API Key
- 其他第三方服務的 API Key

## 指令框架

```
根據用戶選擇的技術棧，執行以下互動式流程：

【第一步】識別必要的 API Key
檢查選定的技術棧需要哪些 API Key（例如 Supabase、Firebase 等）。

【第二步】詢問用戶
對於每個需要的 API Key，詢問用戶：

"我發現您選擇的技術棧需要以下 API Key。請告訴我您是否已經擁有：

1. ✅ 我已經有 [Service Name] 的 API Key
2. ❌ 我沒有，請幫我跳過這個服務
3. ❓ 我不確定，請解釋一下

請選擇 1、2 或 3，或直接提供 API Key。"

【第三步】根據用戶回答進行操作

如果用戶回答 "1 - 我已經有"：
  → 請求用戶提供 API Key
  → 驗證 API Key 格式是否正確
  → 將其添加到環境變數配置中

如果用戶回答 "2 - 我沒有"：
  → 提供該服務的註冊/獲取指南
  → 詢問用戶是否需要幫助
  → 如果用戶同意，提供詳細的獲取步驟

如果用戶回答 "3 - 我不確定"：
  → 解釋該服務的用途
  → 提供該服務的優勢與劣勢
  → 詢問用戶是否想要使用

【第四步】生成最終配置
根據用戶的選擇，生成完整的 .env.local 文件。
```

## 具體的 API Key 詢問範例

### Supabase API Key
```
您選擇了 Supabase 作為數據庫。Supabase 需要以下信息：

1. ✅ 我已經有 Supabase 項目
   → 請提供您的 Supabase URL 和 Anon Key
   
2. ❌ 我沒有 Supabase 項目
   → 我可以為您提供快速設置指南
   
3. ❓ 我不確定
   → Supabase 是一個開源的 Firebase 替代品，提供免費的 PostgreSQL 數據庫

請選擇 (1/2/3) 或直接提供您的 Supabase URL。
```

### Firebase 認證信息
```
您選擇了 Firebase。Firebase 需要以下信息：

1. ✅ 我已經有 Firebase 項目
   → 請提供您的 Firebase 配置信息
   
2. ❌ 我沒有 Firebase 項目
   → 我可以為您提供快速設置指南
   
3. ❓ 我不確定
   → Firebase 是 Google 提供的 BaaS 平台，提供免費的認證和數據庫服務

請選擇 (1/2/3) 或直接提供您的 Firebase Project ID。
```

### OpenAI API Key
```
您的應用需要 OpenAI API Key 來使用 GPT 模型。

1. ✅ 我已經有 OpenAI API Key
   → 請提供您的 API Key
   
2. ❌ 我沒有 OpenAI 帳號
   → 我可以為您提供快速設置指南
   
3. ❓ 我不確定
   → OpenAI API Key 是調用 ChatGPT、GPT-4 等模型所必需的

請選擇 (1/2/3) 或直接提供您的 API Key。
```

## 安全提示

⚠️ **重要安全提示**：
- 不要在公開的對話中直接貼上 API Key
- API Key 應該只在私密的環境中配置（如 Zeabur Dashboard）
- 永遠不要將 API Key 提交到 GitHub
- 使用環境變數來存儲敏感信息

## 自動化配置流程

如果用戶提供了所有必要的 API Key，AI 應該：

1. 生成 `.env.local` 文件（包含用戶提供的 API Key）
2. 生成 `.env.zeabur.guide.md` 文件（說明如何在 Zeabur 中配置）
3. 提醒用戶不要將 `.env.local` 提交到 GitHub
4. 提供在 Zeabur Dashboard 中配置環境變數的具體步驟

## 跳過 API Key 配置

如果用戶選擇跳過某個服務的 API Key：

1. 從環境變數配置中移除該服務的相關變數
2. 更新代碼以使用備選方案（如果有）
3. 提醒用戶如果後續想要使用該服務，可以隨時添加 API Key
