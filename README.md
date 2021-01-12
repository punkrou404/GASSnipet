# GASUtility
- GoogleAppsScriptで使ったコードの個人的なスニペット集
- ディレクトリ構成はgoogleのAPIのジャンルで分けてる
    - `〇〇W.js`の"W"はWrapperの略、GASのAPIのラッパーという意味
    - `value/`はgas特有の処理を値オブジェクトとして保持したいもの集(=ナレッジ集)
    - 他は未分類のものだが、Googleの何かしらのAPIと通信したりするもの

# SetUp
```
npm run build
```
- `./dist/*.gs`に各スニペットが使える状態で吐き出されてる
- `./dist/*.gs`毎にライブラリとして追加しておけば、関数として他のスクリプトに利用可能
- ライブラリの追加方法は`gas ライブラリ`とかでググればおｋ
- ↑だけ使えば利用可能、依存関係や事前準備は不要