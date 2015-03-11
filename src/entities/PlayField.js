/* @flow */

var Entity = require('./Entity');

class PlayField extends Entity {
  pivotX: number;
  pivotY: number;
  radius: number;
  width: number;

  init(settings: any) {
    this.center = {
      x: settings.center.x,
      y: settings.center.y
    };

    this.zindex = 100;

    this.radius = settings.radius;

    this.width = settings.maxAngle * 2;
    this.angle = -270;
  }

  draw(ctx: any) {
    ctx.strokeStyle = 'gray';
    ctx.fillStyle = 'black';
    ctx.lineWidth = 2;

    var startAngle = -this.width/2 * (Math.PI / 180);
    var endAngle = this.width/2 * (Math.PI / 180);

    ctx.beginPath();
    ctx.moveTo(this.center.x, this.center.y);
    ctx.arc(this.center.x, this.center.y, this.radius,
            startAngle, endAngle);
    ctx.lineTo(this.center.x, this.center.y);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(this.center.x, this.center.y);
    ctx.arc(this.center.x, this.center.y, this.game.width,
            endAngle, startAngle);
    ctx.lineTo(this.center.x, this.center.y);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius,
            startAngle, endAngle);
    ctx.arc(this.center.x, this.center.y, this.game.width,
            endAngle, startAngle, true);
    ctx.fill();
    ctx.closePath();
  }
}

module.exports = PlayField;
