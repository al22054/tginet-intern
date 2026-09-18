## Markdown公開環境セットアップマニュアル

### 1. 目的

本プロジェクトでは、Markdownで作成したドキュメントをHugoでWebコンテンツに変換し、
GitHub Pagesで公開します。

開発者ごとにローカル環境やHugoのバージョンが異なる場合、
ビルド時にエラーが発生したり、生成されるWebページのデザインが変わる可能性があります。

これを防ぐため、本プロジェクトでは以下の仕組みを利用します。

- Docker（Dev Container）による開発環境の統一
- GitHub Actionsによるビルド・デプロイの自動化
- GitHub PagesによるWebサイトの公開

---

### 2. なぜDockerを使用するのか

各開発者がそれぞれのPCにHugoなどのツールをインストールして作業すると、
使用しているバージョンや設定が異なる場合があります。

その結果、同じMarkdownファイルを使用していても、

- ビルドに成功する人と失敗する人がいる
- Webページのデザインが異なる
- Hugoテーマが正しく反映されない
- ローカルでは動作するが、別のPCではエラーになる

といった問題が発生する可能性があります。

そこでDocker（Dev Container）を使用し、
全員が同じHugo・ツール・設定を使用できる環境を用意します。

これにより、開発者ごとの環境差によるビルドエラーや表示差異を防ぎます。

---

### 3. 開発環境のセットアップ

#### ① WSL2を起動する

Windows端末でWSL2を起動します。

#### ② Dockerを起動する

Docker Desktopを起動します。

#### ③ リポジトリをCloneする

以下のコマンドを実行します。

```bash
git clone --recursive git@github.com:al22054/tginet-intern.git
```

`--recursive` を指定することで、
Hugoのテーマなどサブモジュールとして管理されているファイルも同時に取得します。

Clone後、リポジトリへ移動します。

```bash
cd tginet-intern
```

#### ④ Dev Containerで開く

VS CodeでCloneしたリポジトリを開きます。

`F1` を押し、

`Dev Containers: Reopen in Container`

を選択します。

コンテナの構築が完了すると、
全員が同じ開発環境で作業できる状態になります。

---

### 4. Markdownをローカルで確認する

Markdownファイルを修正した後、
以下のコマンドでHugoを起動します。

```bash
hugo server
```

ブラウザで `localhost:1313` を開き、
以下を確認します。

- Markdownの内容が正しく表示されているか
- レイアウトが崩れていないか
- 画像やリンクが正しく表示されているか
- ビルドエラーが発生していないか

---

### 5. GitHub Actionsによる自動ビルド

ローカルPCごとにWebコンテンツを生成してアップロードすると、
環境差によって生成結果が異なる可能性があります。

そのため、本プロジェクトではGitHub Actionsを利用し、
GitHub上の共通環境でHugoのビルドを実行します。

Markdownの変更をGitHubへPushすると、

```text
Markdownを修正
↓
GitHubへPush
↓
GitHub Actionsを実行
↓
HugoでWebコンテンツをビルド
↓
レビュー・承認
↓
mainブランチへMerge
↓
GitHub Pagesへデプロイ
↓
Webサイトを公開
```

という流れで自動的に公開します。

これにより、各開発者のローカル環境に依存せず、
同じ環境・同じ手順でWebコンテンツを生成できます。

---

### 6. ビルドエラーが発生した場合

GitHub Actionsでエラーが発生した場合は、
GitHubの「Actions」タブから実行結果を確認します。

主に以下を確認します。

- Markdownの記述に誤りがないか
- Hugoの設定ファイルに誤りがないか
- テーマが正しく取得されているか
- ファイルや画像のパスが正しいか
- GitHub Actionsの処理でエラーが発生していないか

ローカル環境だけで判断せず、
GitHub Actionsのビルド結果も確認してから公開します。

---

### 7. 運用時の注意事項

環境差によるエラーやデザイン変更を防ぐため、
以下のルールで作業します。

- HugoをPCへ個別にインストールして使用せず、Dev Container上で作業する
- リポジトリは `--recursive` を付けてCloneする
- Markdown修正後は `hugo server` で表示を確認する
- GitHub Actionsのビルド結果を確認する
- GitHub Actionsが成功した状態でGitHub Pagesへ公開する

これにより、開発者が変わった場合でも、
同じ環境・同じビルド方法でMarkdownドキュメントを公開できます。