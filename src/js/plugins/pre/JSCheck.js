/*:
 * @target MZ
 * @plugindesc 新しい構文が動く環境かテスト
 */

(() => {
  var currentCode;
  try {
    [
      // 変数宣言
      "const a = 1; let b = 1;",
      // 分割代入・スプレッド演算子
      "const { a: { b } } = { a: {b: [1, 2, 3] }, c: { ...document } }, [d, ...e] = b;",
      // アロー関数・オブジェクト引数
      "const f = ({ x, y = x }) => x + y; f({ x: 2 });",
      // NULL 合体
      "const x = (null)?.a?.b ?? c;",
      // クラス・Private メンバ
      "class A {}; class B extends A { #x = 1 }; new B();",
      // try-catch-finally
      "try { throw 1; } catch {} finally {};",
      // async/await
      "(async () => await Promise.resolve(1))().finally(() => {});",
    ].forEach(function (code) {
      currentCode = code;
      (function () {
        return new Function(code);
      })();
    });
  } catch (error) {
    console.error(error, currentCode);
    throw new Error(
      "あなたの環境ではゲームを起動することができませんでした。<br/>最新のブラウザに更新してください。<br/><pre>" +
        currentCode +
        "</pre>"
    );
  }
})();
