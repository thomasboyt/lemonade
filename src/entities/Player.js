/* @flow */

var Entity = require('./Entity');


function bounded(n: number, min: number, max: number): number {
  if (n < min) {
    return min;
  } else if (n > max) {
    return max;
  }

  return n;
}

class Player extends Entity {
  pivotX: number;
  pivotY: number;
  pivotR: number;

  minRadius: number;
  maxRadius: number;
  startAngle: number;
  maxAngle: number;

  init(settings: any) {
    this.size = {
      x: 20,
      y: 20
    };

    this.pivotX = 320;
    this.pivotY = 75;
    this.pivotR = 325;

    this.minRadius = 55;
    this.maxRadius = settings.maxRadius;
    this.maxAngle = settings.maxAngle;

    this.startAngle = -270;
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
    var step = dt / 100;
    var xSpd = 5;
    var ySpd = 20;

    if (this.game.c.inputter.isDown(this.game.c.inputter.SHIFT)) {
      xSpd = xSpd / 3;
      ySpd = ySpd / 3;
    }

    if (this.game.c.inputter.isDown(this.game.c.inputter.LEFT_ARROW)) {
      this.angle += step * xSpd;
    }
    if (this.game.c.inputter.isDown(this.game.c.inputter.RIGHT_ARROW)) {
      this.angle -= step * xSpd;
    }
    if (this.game.c.inputter.isDown(this.game.c.inputter.UP_ARROW)) {
      this.pivotR -= step * ySpd;
    }
    if (this.game.c.inputter.isDown(this.game.c.inputter.DOWN_ARROW)) {
      this.pivotR += step * ySpd;
    }

    var arcAngle = this._getArcAngle() / 2;
    this.angle = bounded(this.angle,
                         this.startAngle - this.maxAngle + arcAngle,
                         this.startAngle + this.maxAngle - arcAngle);

    this.pivotR = bounded(this.pivotR,
                          this.minRadius + this.size.y / 2,
                          this.maxRadius - this.size.y / 2);

    this._setCenter();
  }

  /**
   * Get the angle of the arc through the bottom edge of this thing
   */
  _getArcAngle(): number {
    var p1x = this.center.x - this.size.x / 2;
    var p1y = this.center.y + this.size.y / 2;
    var p2x = this.center.x + this.size.x / 2;
    var p2y = this.center.y + this.size.y / 2;

    var distance = Math.sqrt(Math.pow((p2x - p1x), 2) + Math.pow((p2y - p1y), 2)); 
    var diameter = (this.pivotR) * 2;
    var angle = Math.asin(distance/diameter) * 2;

    return angle * (180 / Math.PI);
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
