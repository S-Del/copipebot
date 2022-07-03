# こぴぺぼっと
[discord.js](https://discord.js.org/) を利用した
[Discord](https://discord.com/) ボット  
このボットの招待 URL は公開していない (ほぼ個人利用の為)


## スラッシュコマンド一覧
- `/dice`
- `/join`
- `/leave`


## `/dice`
![image](/uploads/f4b9e37e564eaf1408ce9cb7988ba2a1/image.png)  
指定した面数と回 (個) 数のダイスを振った結果をリプライする
### フォーマット
/dice amount:\<*回 (個) 数*\> surface:\<*面数*\> \[secret\]:*真偽値*
### オプション
- `amount` (必須): 1 - 100 の範囲でダイスを振る回 (個) 数を指定する
- `surface` (必須): 2 - 100 の範囲でダイスの面数を指定する
- `secret`: True を指定すると結果はコマンド使用者のみに通知される
(コマンドを使用したこと自体は周知される)


## `/join`
ボイスチャンネルに接続してテキストチャットのメッセージを読み上げる
- このコマンドの使用者はボイスチャットに接続している必要がある


## `/leave`
接続中のボイスチャンネルから切断する
- このコマンドの使用者は
こぴぺぼっとと同じボイスチャンネルに接続している必要がある
- このコマンドを使用しなくても
ボイスチャンネル内がこぴぺぼっとのみの状態になると自動的に切断する
