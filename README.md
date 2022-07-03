# こぴぺぼっと
[discord.js](https://discord.js.org/) を利用した
[Discord](https://discord.com/) ボット  
このボットの招待 URL は公開していない (ほぼ個人利用の為)


## スラッシュコマンド一覧
- `/dice`
- `/join`
- `/leave`


## `/dice`
指定した面数と回 (個) 数のダイスを振った結果をリプライする  
`/dice amount:1-100 surface:2-100`
### オプション
- `amount`: ダイスを振る回 (個) 数
- `surface`: ダイスの面数
- `secret`: シークレットダイスの場合は `True` を指定


## `/join`
- ボイスチャンネルに接続してテキストチャットのメッセージを読み上げる
- このコマンドの使用者はボイスチャットに接続している必要がある


## `/leave`
- 接続中のボイスチャンネルから切断する
- このコマンドの使用者は
こぴぺぼっとと同じボイスチャンネルに接続している必要がある
- ボイスチャンネル内がこぴぺぼっとのみの状態になると自動的に切断する
