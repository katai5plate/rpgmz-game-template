# rpgmz-game-template

自分用のツクール MZ ゲームテンプレート

- スタイル
  - ツクール 2000 風仕様
  - 戦闘・立ち絵を使用しない前提
- 機能
  - 各種前提プラグイン搭載
  - 画面描画プラグイン搭載
  - 仮想ゲームパッドプラグイン搭載
  - ZZFX 搭載
  - EasyRPG 製 RTP 素材同梱
    - https://github.com/EasyRPG/RTP

## 制作上の注意

- コモンイベントは SuperCommonEvent を使用する
- 変数は OneVariable を使用する
- 画面描画処理は customChalk に書く

## リリース時の作業

- リントエラーが出てないか確認
- 使っていないタイルセットをデータベースから削除
- サーバー RTP で使用する場合、音声素材・画像素材を削除
