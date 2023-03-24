/*:
 * @target MZ
 * @plugindesc プラグインコマンドでしかオートセーブさせない
 * @command save
 * @text オートセーブを実行
 */
(() => {
  const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
  PluginManager.registerCommand(PLUGIN_NAME, "save", () => {
    SceneManager._scene.requestAutosave();
  });
  Scene_Map.prototype.shouldAutosave = () => false;
  Scene_Battle.prototype.shouldAutosave = () => false;
})();
