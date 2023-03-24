/*:
 * @target MZ
 * @plugindesc コアスクリプトの各種バグを修正します
 */
(() => {
  const MAX_LEVEL = 100;

  // 職業欄を空にしたら `TypeError - Cannot read property 'expParams' of null` が発生するのを修正
  const _Game_Actor_prototype_currentClass = Game_Actor.prototype.currentClass;
  Game_Actor.prototype.currentClass = function () {
    const before = _Game_Actor_prototype_currentClass.apply(this, arguments);
    if (before) return before;
    const A = new Array(MAX_LEVEL).fill(1);
    const B = new Array(MAX_LEVEL).fill(0);
    const expParams = new Array(4).fill(0);
    return (
      _Game_Actor_prototype_currentClass.apply(this, arguments) ?? {
        expParams,
        traits: [],
        learnings: [],
        name: "",
        params: [A, B, B, B, B, B, B, B],
      }
    );
  };
})();
