/* @flow */

var Entity = require('./Entity');
var ArcShot = require('./projectiles/ArcShot');

class Adversary extends Entity {
  radius: number;

  init(settings: any) {
    this.center = {
      x: settings.center.x,
      y: settings.center.y
    };

    this.zindex = 101;

    this.radius = 40;
    this.shootArc(90, 60);
  }

  draw(ctx: any) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 360);
    ctx.fill();
    ctx.closePath();
  }

  shootArc(width: number, centerAngle: number) {
    var radAngle = Math.PI/180 * centerAngle;

    var cx = this.center.x;
    var cy = this.center.y;

    var cxa = cx + this.radius * Math.cos(radAngle);
    var cya = cy + this.radius * Math.sin(radAngle);

    this.game.createEntity(ArcShot, {
      width: width,
      center: {
        x: cxa,
        y: cya
      },
      angle: centerAngle
    });
  }
}

module.exports = Adversary;
