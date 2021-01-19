# こぴぺボット
[discord.js](https://discord.js.org/) を利用した [Discord](https://discord.com/) ボット  
このボットの招待 URL は公開していない (ほぼ個人利用の為)


## 使い方
`cb <サブコマンド> <メッセージ>`


## サブコマンド一覧
- emoji
- dice
- survey
- help


## emoji
半角英数字を対応した絵文字に変換して送信する  
`cb emoji <半角英数字>`  
例 1) `cb emoji hello!?`  
![emoji hello!?](https://gitlab.com/S-Del_discordbot/copipebot/uploads/4815289101884cc5d40fe41b45fe7d43/image.png)  
例 2) `cb emoji 01234 56789`  
![emoji 01234 56789](https://gitlab.com/S-Del_discordbot/copipebot/uploads/58e5636506874f8357d7373e2556cb60/image.png)  

- 変換できる文字は \[a-zA-Z0-9!?\] (小文字は大文字に変換される)
- 変換を受け付ける文字数は 1 ~ 80 文字まで


## dice
### `cb dice <振る回数>D<面の数>`  
指定された面数を持つサイコロを指定された回数振りその結果を表示する  
例 1) `cb dice 1D100`  
![dice 1D100](https://gitlab.com/S-Del_discordbot/copipebot/uploads/d6b894528f814295c2c4dedeec8304b5/image.png)  
例 2) `cb dice 10D6`  
![dice 10D6](https://gitlab.com/S-Del_discordbot/copipebot/uploads/2bf60a4a065bf7460885e49ffb64b54c/image.png)  
- `D` は `d` でも良い (`1D6` と `1d6` は同じ)
- 振る回数に指定できる最小数は `1`
- 振る回数に指定できる最大数は `100`
- 面数に指定できる最小数は `2`
- 面数に指定できる最大数は `100`
- 面数が `100` で `2` 回以上振った場合は `100` を `0` として扱う場合の結果も表示する  
    例 ) `cb dice 100D100`  
    ![dice 100D100](https://gitlab.com/S-Del_discordbot/copipebot/uploads/e627cdf89bd0ff3682a58ea4469e038b/image.png)  
### `cb dice <面の数><面の数>`  
指定された面数を持つサイコロを2個振り小さい値が出たほうを十の位として結果を表示する  
例 1) `cb dice 66`  
![dice 66](https://gitlab.com/S-Del_discordbot/copipebot/uploads/cadd75076fcf988faba9f5d0d9c7e5ae/image.png)  
例 2) `cb dice 92`  
![dice 92](https://gitlab.com/S-Del_discordbot/copipebot/uploads/b251ca7bd710074f8af56369d5883466/image.png)  


## survey
`cb survey <アンケートタイトル> <選択肢1>,,,<選択肢8>`  
アンケートを作成し回答用リアクション付きのメッセージを送信する  
例) `cb survey あなたは何色が好き？ 赤 緑 青`  
![survey](https://gitlab.com/S-Del_discordbot/copipebot/uploads/32c73cf99de167691d650a9063b3da3f/image.png)  

- 選択肢は `8` つまで
- 選択肢の末尾に `これら以外` が自動で付加される


## help
`cb help`  
使用できるサブコマンド一覧とこの README へのリンクが書かれたメッセージを送信する
