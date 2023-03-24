/*:
 * @target MZ
 * @base H2A_ChalkSprite
 * @plugindesc H2A_ChalkSprite のカスタム
 */
(() => {
  ChalkSprite.prototype.onUpdate = function () {
    // this.clear();
    // this.draw(
    //   /** @param {CanvasRenderingContext2D} ctx */
    //   (ctx) => {
    //     ctx.fillStyle = "black";
    //     ctx.fillRect(TouchInput.x, TouchInput.y, 100, 100);
    //     ChalkSprite.drawTextEx(
    //       ctx,
    //       `${TouchInput.x},${TouchInput.y}`,
    //       TouchInput.x,
    //       TouchInput.y
    //     );
    //   }
    // );
  };
})();
