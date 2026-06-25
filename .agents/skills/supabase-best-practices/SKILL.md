---
name: supabase-best-practices
description: Apply current Supabase best practices for auth, RLS, schema changes, client/server separation, and production safety. Use whenever the stack includes Supabase database, auth, storage, edge functions, or SSR clients.
---

# supabase-best-practices

本 skill 綜合：

- 官方 Supabase skill
- 官方 Supabase 文檔
- repo 內可攜要求

## 先做什麼

1. 先查 Supabase 官方文檔與 changelog
2. 先確認這次碰的是哪層：
   - Database / schema
   - Auth / session
   - RLS / policies
   - Client SDK
   - Server / SSR / Edge Functions

## 強制規則

- 公開客戶端只用 publishable / anon key，不放 `service_role`
- `service_role` 只留在 server、worker、secure function
- 暴露 schema 的 table 預設開 RLS
- policy 不只寫 `TO authenticated`，還要加 ownership / access predicate
- 不用 `user_metadata` 做授權判斷；授權資料放 `app_metadata`
- schema 變更走 migration / CLI，不手改 production
- schema、RLS、function 改完後要驗證，不算做完

## Auth / SSR 邊界

- Browser client：只做使用者互動與受限資料查詢
- Server client：處理敏感流程、cookie、session 驗證、privileged action
- 不把秘密金鑰放到 `NEXT_PUBLIC_*` 或任何 public env

## RLS / Security

- `UPDATE` policy 要同時考慮 `USING` 與 `WITH CHECK`
- 小心 `SECURITY DEFINER`；若真的要用，明確限制 `search_path`
- view 預設可能繞過 RLS；需要 `security_invoker` 或限制暴露

## Schema / Delivery

- migration 名稱要可讀
- 每次 schema 變更都跑 advisor / lint / 最小 SQL 驗證
- 進 production 前，先分清 local、staging、production 環境

## 驗證

- auth：登入、登出、session refresh
- RLS：自己的資料可讀寫，他人的不可
- schema：migration 可重放，型別可生成
- server/client：public bundle 沒有敏感 key
