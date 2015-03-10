/*
 * Maps of the audio and images included in your game. Webpack resolves the require statements
 * here to being URLs to your assets. These URLs are then loaded into the game through the
 * `AssetPreloader` class.
 *
 * This file is purposely not type-checked! Flow does not like non-JS imports.
 */

module.exports = {
  audio: {
    // Example:
    // 'enemy_explosion': require('../assets/sound/enemy_explosion.wav')
  },
  images: {
    // Example:
    // 'ship': require('../assets/images/ship.png')
  }
};
