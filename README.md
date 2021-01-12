# GASSnipet
- GoogleAppsScriptで使ったコードの個人的なスニペット集
- ディレクトリ構成はgoogleのAPIのジャンルで分けてる
    - `〇〇W.js`の"W"はWrapperの略、GASのAPIのラッパーという意味
    - `value/`はgas特有の処理を値オブジェクトとして保持したいもの集(=ナレッジ集)
    - 他は未分類のものだが、Googleの何かしらのAPIと通信したりするもの

# SetUp
```
npm run build
```
- `./dist/main.gs`に各スニペットが使える状態で吐き出されてる
- ライブラリの追加方法は`gas ライブラリ`とかでググればおｋ
- ↑だけ使えば利用可能、依存関係や事前準備は不要

# How-to

- `create*()`関数で欲しいモジュールを呼び出して利用

```
// `GASSnipet`という名前でライブラリ作成し事前設定する
const driveAppW = GASSnipet.createDriveAppW();
const fileId = driveAppW.getFileId(`〇〇PRJ ▲▲機能 納品報告書`);

const documentAppW = GASSnipet.createDocumentAppW();
console.log(documentAppW.getContent(fileId));
```
