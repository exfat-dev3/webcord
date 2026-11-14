# WebCord

Vercelで動く、Discord Bot用の小さなチャットクライアントです。Discordの利用者アカウントのトークンによるログインには対応していません。

## Vercelへのデプロイ手順

### 1. GitHubにプロジェクトを用意する

1. このフォルダのファイルをGitHubリポジトリに登録します。
2. `index.html`、`vercel.json`、`api/discord.js` がリポジトリに含まれていることを確認します。

### 2. Vercelにインポートする

1. [Vercel](https://vercel.com/)にログインします。
2. ダッシュボードで **Add New… → Project** を選びます。
3. GitHubリポジトリの一覧からWebCordのリポジトリを選び、**Import**を押します。
4. Framework Presetは **Other** を選択します。ビルドコマンド、インストールコマンド、出力ディレクトリの指定は不要です。
5. **Deploy**を押します。

Vercelはルートの`index.html`を静的ページとして配信し、`api/discord.js`をDiscord API中継用のFunctionとして実行します。環境変数の設定は不要です。

### 3. Botをサーバーに追加する

Discord Developer Portalで作成したBotを、利用するDiscordサーバーに追加してください。Botには少なくとも次の権限が必要です。

- チャンネルを閲覧
- メッセージ履歴を閲覧
- メッセージを送信

Guildの新着メッセージは`GUILD_MESSAGES`、DMの新着メッセージは`DIRECT_MESSAGES`を使ってDiscord Gatewayからリアルタイムで受信します。メッセージ本文を表示するには、Discord Developer PortalのBot設定で **Message Content Intent** を有効にしてください。BotにこのIntentが許可されていない場合、Gateway接続が拒否されます。

### 4. WebCordを使う

1. デプロイ完了後に表示される`*.vercel.app`のURLを開きます。
2. 左側の入力欄にDiscord **Botトークン**を入力し、**接続する**を押します。
3. サーバーとテキストチャンネルを選ぶと、最近のメッセージが表示されます。入力欄からメッセージを送信できます。
4. DMを始めるには、サイドバーの「ダイレクトメッセージ」横にある **＋** を押し、相手のDiscordユーザーIDを入力して **DMを開く** を押します。WebCordで開いたDMは、そのタブの接続中に一覧へ表示されます。
5. Botのオンライン状態やRich Presenceは、画面上部の **設定** から変更できます。ステータスはオンライン、離席中、取り組み中、オフライン表示、アクティビティはプレイ中、配信中、聴いている、視聴中、カスタムステータス、参加中を選べます。

## トークンの取り扱い

トークンはブラウザからHTTPSでVercel Functionへ送られ、Discord APIへのリクエストに使われます。ページやFunctionはトークンを保存しません。トークンはパスワードと同じように扱い、他人に共有しないでください。WebCordのURLを公開すると、訪問者はそれぞれ自分のBotトークンを入力して利用できます。

BotアカウントのRich Presenceは、Discord APIがBot向けに許可している表示名・種類・補足テキスト・配信URLを設定できます。画像、ボタン、タイマーなどのゲーム向けRich Presence項目はBot APIから設定できません。またVR／Mobile／PC（Web）などの接続端末表示はBot設定から指定できません。

利用者アカウントのトークンでログインする「self-bot」には対応していません。Discordが認めるBot APIを利用してください。
