# こぴぺぼっと
[discord.js](https://discord.js.org/) を利用した [Discord](https://discord.com/) ボット  
このボットの招待 URL は公開していない (ほぼ個人利用の為)


## 目次
1. [スラッシュコマンド一覧](#スラッシュコマンド一覧)
1. [ダウンロード・インストール・実行](#ダウンロード・インストール・実行)
1. [脚注](#脚注)


## スラッシュコマンド一覧
- `/emoji`
- `/dice`
- `/join`
- `/leave`
- `/help`
### `/emoji`
入力された文字列を絵文字に変換する  
![image](/uploads/74d5ff0eec782cad58bc923b66c5cb67/image.png)
#### フォーマット
/emoji message:<*文字列*>
#### オプション
- message (必須): 絵文字に変換するメッセージ
    - 以下の文字を絵文字に変換できる
        - A から Z までのアルファベット
        - 0 から 9 までの数字
        - 記号 (!, ?, #, *) と空白文字
### `/dice`
指定した面数と回 (個) 数のダイスを振った結果を表示する  
![image](/uploads/f4b9e37e564eaf1408ce9cb7988ba2a1/image.png)
#### フォーマット
/dice amount:\<*回 (個) 数*\> surface:\<*面数*\> \[secret\]:*真偽値*
#### オプション
- amount (必須): `1` から `100` の数値でダイスを振る回 (個) 数を指定する
- surface (必須): `2` から `100` の数値でダイスの面数を指定する
- secret: `True` を指定すると結果はコマンド使用者のみに通知される
(コマンドを使用したこと自体は周知される)
### `/join`
ボイスチャンネルに接続してテキストチャンネルのメッセージを読み上げる
- このコマンドの使用者はボイスチャンネルに接続している必要がある
- コマンド使用者がいるボイスチャンネルにこのボットが接続できる権限が必要
- ミュート状態のボイスチャンネル参加者のメッセージを読み上げる
    - ボイスチャンネル参加者のメッセージならどのテキストチャンネルのメッセージでも読み上げる
### `/leave`
接続中のボイスチャンネルから切断する
- このコマンドの使用者はこぴぺぼっとと同じボイスチャンネルに接続している必要がある
- このコマンドを使用しなくてもボイスチャンネル内がこぴぺぼっとのみの状態になると自動的に切断する
### `/help`
このボットのコマンド一覧とこのページへのリンクを表示する


## ダウンロード・インストール・実行
個人的に稼働させているボット自体の公開はしていないが、以下の手順を踏むことでこのボットを利用できる。
### 必要環境
- Node.js バージョン 16.9.0 以上
### 事前準備
- [Discord Developer Portal](https://discord.com/developers/applications)
    - ボットアカウント (アプリケーション) の作成
        - 作成したボットアカウントのトークン
        - 作成したボットアカウントのアプリケーション ID
        - 以下の `Privileged Gateway Intents` を有効化
            - PRESENCE INTENT
            - SERVER MEMBERS INTENT
            - MESSAGE CONTENT INTENT
- [VoiceText Web API](https://cloud.voicetext.jp/webapi)
    - [API無料利用登録](https://cloud.voicetext.jp/webapi/api_keys/new) にて利用登録
        - 登録したメール届く API キー
- こぴぺぼっとの入手
    - [リリースページ](https://gitlab.com/S-Del_discordbot/copipebot/-/releases) にて入手
        - またはソースコードを tsc にてビルド
### 環境変数
以下の環境変数とその値を登録
- `NODE_ENV`
    - 登録する値: `production`
- `COPIPE_BOT_TOKEN`
    - 登録する値: Discord Developer Potal から取得したボットのトークン
- `COPIPE_BOT_APP_ID`
    - 登録する値: Discord Developer Potal から取得したボットのアプリケーション ID
- `VOICETEXT_API_KEY`
    - 登録する値: VoiceText API から取得した API キー
### インストールと実行手順
1. ダウンロードした `copipebot.zip` を解凍
1. 解凍したディレクトリに `$ cd copipebot` で移動
1. `$ npm install` にて必要パッケージのインストール
    - インストールされるパッケージ一覧は [package.json](
        https://gitlab.com/S-Del_discordbot/copipebot/-/blob/develop/package.json
    ) 内の `dependencies` と `devDependencies` を参照
1. `$ npm run register` にてボットにスラッシュコマンドを登録
    - スラッシュコマンドはグローバルコマンド[^1]として登録される
    - このグローバルコマンドの登録は 1 度行えば良い
1. `$ npm start` にてボット実行


## 脚注
[^1]: ギルド (サーバー) に関係無くアプリケーションで使用できるコマンド。
詳しくは [公式ドキュメント](
    https://discord.com/developers/docs/interactions/application-commands#making-a-global-command
) を参照
