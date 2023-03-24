/*:
 * @target MZ
 * @plugindesc 各種事前チェック
 *
 * @param startMapId
 * @text 初期マップ ID
 * @type number
 *
 * @param startMapX
 * @text 初期マップ X 座標
 * @type number
 *
 * @param startMapY
 * @text 初期マップ Y 座標
 * @type number
 */

(() => {
  const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  const params = PluginManager.parameters(PLUGIN_NAME);

  const lint = () => {
    // 初期位置チェック
    if (
      $dataSystem.startMapId !== Number(params.startMapId) &&
      $dataSystem.startMapX !== Number(params.startMapX) &&
      $dataSystem.startMapY !== Number(params.startMapY)
    )
      return console.warn("[LINT] 初期位置が違います！");
    console.log("[LINT] 問題なし");
  };

  if (
    (Utils.isNwjs() && Utils.isOptionValid("test")) ||
    location.href.match(/\/\/localhost/)
  )
    setTimeout(() => lint(), 1000);
})();
