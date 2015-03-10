/* @flow */

var Entity = require('../Entity');
var math = require('coquette-common/lib/math');

class ArcShot extends Entity {
  width: number;
  angle: number;
  radius: number;
  height: number;
  initialRadius: number;

  init(settings: any) {
    this.center = {
      x: settings.center.x,
      y: settings.center.y
    };
    this.angle = settings.angle;
    this.width = settings.width;
    this.height = 20;

    this.initialRadius = 1;
    this.radius = 1;
  }

  update(dt: number) {
    var step = dt / 100;
    this.radius += 10 * step;
  }

  draw(ctx: any) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 20;

    ctx.save();

    ctx.translate(-this.initialRadius, 0);

    var radius = this.radius;
    var startAngle = -this.width/2 * (Math.PI / 180);
    var endAngle = this.width/2 * (Math.PI / 180);

    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, radius,
            startAngle, endAngle);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

    ctx.fillStyle = 'pink';
    ctx.fillRect(this.center.x - 2.5, this.center.y - 2.5, 5, 5);
  }
}

module.exports = ArcShot;
