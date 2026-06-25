# Loop Circuit Breaker

本文件定義 loop 何時該停，避免燒 token 或反覆撞牆。

調研吸收：

- `lodekeeper/lodeloop`
- `Zhifeng-Niu/odyssey-engine`
- `Dryxio/auto-re-agent`

## States

| State | 條件 | 行為 |
| --- | --- | --- |
| `closed` | 正常前進 | 繼續 |
| `half_open` | 2 輪無進展 | 繼續，但加強觀察 |
| `open` | 3 輪無進展或同錯 5 次 | 停止並回報 |

## Progress Signal

以下任一成立才算有進展：

- 驗證數量增加
- bug / failing tests 減少
- diff 有效縮小問題
- evidence 新增且指向新資訊
- 任務 phase 往前

## Required Record

- `.loop/STATE.json`
- `.loop/EVIDENCE.md`
- `docs/DEBUG_NOTES.md`
