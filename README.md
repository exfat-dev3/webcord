# WebCord

Vercelで動く、Discord Bot用の小さなチャットクライアントです。Discordの利用者アカウントのトークンによるログインには対応していません。

## Vercelへのデプロイ手順

### 1. GitHubにプロジェクトを用意する

1. このフォルダのファイルをGitHubリポジトリに登録します。
2. `index.html`、`vercel.json`、`api/v10/[...path].js` がリポジトリに含まれていることを確認します。

### 2. Vercelにインポートする

1. [Vercel](https://vercel.com/)にログインします。
2. ダッシュボードで **Add New… → Project** を選びます。
3. GitHubリポジトリの一覧からWebCordのリポジトリを選び、**Import**を押します。
4. Framework Presetは **Other** を選択します。ビルドコマンド、インストールコマンド、出力ディレクトリの指定は不要です。
5. **Deploy**を押します。

Vercelはルートの`index.html`を静的ページとして配信し、`api/v10/[...path].js`をDiscord API中継用のFunctionとして実行します。環境変数の設定は不要です。

### 3. Botをサーバーに追加する

Discord Developer Portalで作成したBotを、利用するDiscordサーバーに追加してください。Botには少なくとも次の権限が必要です。

- チャンネルを閲覧
- メッセージ履歴を閲覧
- メッセージを送信

メッセージ本文を読み取るには、Botの設定やサーバーの状態によって **Message Content Intent** の有効化が必要です。

### 4. WebCordを使う

1. デプロイ完了後に表示される`*.vercel.app`のURLを開きます。
2. 左側の入力欄にDiscord **Botトークン**を入力し、**接続する**を押します。
3. サーバーとテキストチャンネルを選ぶと、最近のメッセージが表示されます。入力欄からメッセージを送信できます。

## トークンの取り扱い

トークンはブラウザからHTTPSでVercel Functionへ送られ、Discord APIへのリクエストに使われます。ページやFunctionはトークンを保存しません。トークンはパスワードと同じように扱い、他人に共有しないでください。WebCordのURLを公開すると、訪問者はそれぞれ自分のBotトークンを入力して利用できます。

利用者アカウントのトークンでログインする「self-bot」には対応していません。Discordが認めるBot APIを利用してください。
