/*:
 * @target MZ
 * @plugindesc シーンに直接、図形描画できるようにする
 *
 * @param shouldResetOnSceneChange
 * @text シーン切替時リセット
 * @desc シーンの切り替わり時に Bitmap をリセットするかどうか
 * @default true
 * @type boolean
 *   @on リセットする
 *   @off 描画状態を維持
 *
 * @help
 * シーンに直接、図形を描画できるようにします。
 *
 *
 * Copyright (c) 2023 Had2Apps
 * This software is released under the MIT License.
 *
 * Version: v1.0.0
 * RPG Maker MZ Version: v1.6.1
 */
(() => {
  const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const params = PluginManager.parameters(PLUGIN_NAME);

  class ChalkSprite extends Sprite {
    /**
     * 初期処理
     * @param {object} arg
     * @param {Bitmap} arg.bitmap 描画状態が保持された Bitmap
     * @param {number} arg.width bitmap を指定しない場合の幅
     * @param {number} arg.height bitmap を指定しない場合の高さ
     * @param {Bitmap} arg.shouldResetOnSceneChange シーンの切り替わり時に Bitmap をリセットするかどうか
     */
    initialize({
      bitmap = null,
      width = 0,
      height = width,
      shouldResetOnSceneChange = false,
    }) {
      super.initialize();

      this._context = null;
      this._shouldResetOnSceneChange = shouldResetOnSceneChange;
      this._handleSceneChange = null;

      const initBitmap = bitmap || new Bitmap(width, height);
      this.createBitmap(initBitmap);
    }

    /** 常に反映するように変更 */
    update() {
      super.update();
      this.onUpdate();
      this.bitmap.baseTexture.update();
    }

    /** 編集用ビットマップの定義 */
    createBitmap(bitmap) {
      this.bitmap = bitmap;
    }

    /**
     * コンテキストの取得
     * @returns {CanvasRenderingContext2D}
     */
    getContext() {
      return this.bitmap._context;
    }

    /**
     * 描画
     * @param {(ctx: CanvasRenderingContext2D) => void} fn
     */
    draw(fn) {
      fn(this.getContext());
    }

    /** 描画状態をリセット */
    clear() {
      const { width, height } = this.bitmap;
      this.getContext().clearRect(0, 0, width, height);
    }

    /** 画像の Bitmap を描画する */
    drawImageBitmap(bitmap, ...rest) {
      /** 描画処理 */
      const drawImage = (img) =>
        this.draw((ctx) => ctx.drawImage(img, ...rest));
      // Bitmap が作成済
      bitmap.addLoadListener((b) => {
        const image = b._image;
        // 画像が読み込み済
        if (image.complete) {
          drawImage(image);
        } else {
          // 画像が読み込み終わってない
          const _image_onload = image.onload;
          image.onload = function () {
            // 画像が読み込み終わった
            _image_onload.apply(this, arguments);
            drawImage(image);
          };
        }
      });
    }

    /** 毎フレームの処理（上書き用） */
    onUpdate() {}
    /** シーン切り替え時の処理（上書き用） */
    onChangeScene() {}

    /**
     * 制御文字が使用可能な文字列を描画
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} text
     * @param {number} maxWidth
     */
    static drawTextEx(ctx, text, x, y, maxWidth = Graphics.app.screen.width) {
      const win = new Window_Base(new Rectangle());
      const size = win.textSizeEx(text);
      win.padding = 0;
      win.move(0, 0, size.width, size.height);
      win.createContents();
      win.drawTextEx(text, 0, 0, maxWidth);
      const canvas = win.contents.canvas;
      win.contents = undefined;
      win.destroy();
      ctx.drawImage(canvas, x, y);
    }
  }
  window.ChalkSprite = ChalkSprite;

  // メンバとして定義する
  SceneManager._chalkSprite = null;

  // シーン切り替え時の処理
  const _SceneManager_onSceneStart = SceneManager.onSceneStart;
  SceneManager.onSceneStart = function () {
    _SceneManager_onSceneStart.apply(this, arguments);
    if (!this._chalkSprite) {
      // 初回実行
      this._chalkSprite = new ChalkSprite({
        width: Graphics.width,
        height: Graphics.height,
        shouldResetOnSceneChange: params.shouldResetOnSceneChange === "true",
      });
    } else if (this._chalkSprite._shouldResetOnSceneChange) {
      // シーンチェンジ時にリセットする設定の場合
      const { bitmap } = this._chalkSprite;
      this._chalkSprite = new ChalkSprite({
        width: bitmap.width,
        height: bitmap.height,
        shouldResetOnSceneChange: this._chalkSprite._shouldResetOnSceneChange,
      });
    } else {
      // bitmap の結果を継承する
      this._chalkSprite = new ChalkSprite({
        bitmap: this._chalkSprite.bitmap,
      });
    }
    this._chalkSprite.onChangeScene();
    this._scene.addChild(this._chalkSprite);
  };
})();
