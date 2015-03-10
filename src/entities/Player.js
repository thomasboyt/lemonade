/* @flow */

var Entity = require('./Entity');
var math = require('coquette-common/lib/math');

class Player extends Entity {
  pivotX: number;
  pivotY: number;
  pivotR: number;

  init(settings: any) {
    this.size = {
      x: 20,
      y: 20
    };

    this.pivotX = 320;
    this.pivotY = 75;
    this.pivotR = 325;

    this.angle = -270;

    this._setCenter();
  }

  _setCenter() {
    var angle = this.angle * (Math.PI/180);
    var x = this.pivotX + this.pivotR * Math.cos(angle);
    var y = this.pivotY + this.pivotR * Math.sin(angle);
    this.center = {x, y};
  }

  update(dt: number) {
    var spd = dt / 100 * 10;

    if (this.game.c.inputter.isDown(this.game.c.inputter.LEFT_ARROW)) {
      this.angle += spd;
    }
    if (this.game.c.inputter.isDown(this.game.c.inputter.RIGHT_ARROW)) {
      this.angle -= spd;
    }

    this._setCenter();
  }

  draw(ctx: any) {
    ctx.fillStyle = 'white';

    var hw = this.size.x / 2;
    var hh = this.size.y / 2;

    ctx.beginPath();
    ctx.moveTo(this.center.x - hw, this.center.y);
    ctx.lineTo(this.center.x + hw, this.center.y + hh);
    ctx.lineTo(this.center.x + hw, this.center.y - hh);
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = Player;
