/* @flow */

var Coquette = require('coquette');
var Person = require('./Person');
var Entity = require('./Entity');

class Player extends Person {
  update(dt: number) {
    if ((this.center.y + this.size.y / 2) < 0) {
      this.game.end();
    }

    if (this.game.c.inputter.isDown(this.game.c.inputter.UP_ARROW)) {
      this.center.y -= this.game.config.playerSpeed * dt/100;
    }
  }

  collision(other: Entity) {
    if (other instanceof Person) {
      other.center.y = this.center.y; // follow the player
    }
  }
}

module.exports = Player;
