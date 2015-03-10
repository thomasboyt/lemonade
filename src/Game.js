/*
 * @flow
 */

var Coquette = require('coquette');

var StateMachine = require('javascript-state-machine');
var addRegister = require('coquette-common/lib/addRegister');
var AudioManager = require('coquette-common/lib/AudioManager');
var AssetPreloader = require('coquette-common/lib/AssetPreloader');
var setupFullscreen = require('coquette-common/lib/setupFullscreen');

var assets = require('./config/assets');
var config = require('./config/game');

var Entity = require('./entities/Entity');
var UI = require('./entities/UI');
var Adversary = require('./entities/Adversary');
var Player = require('./entities/Player');

type AssetMap = {
  images: {
    [key: string]: Image;
  };
  audio: {
    [key:string]: ArrayBuffer;
  };
}

class Game {
  c: Coquette;
  assets: AssetMap;
  width: number;
  height: number;
  ui: UI;

  constructor() {
    this.audioManager = new AudioManager();

    this.assets = assets;
    this.config = config;

    this.width = 640;
    this.height = 480;

    this.c = window.__coquette__ = new Coquette(this, 'game-canvas', this.width, this.height, 'black');
    // this.c.renderer.getCtx().imageSmoothingEnabled = false;

    setupFullscreen(this.c.inputter.F);
    addRegister(this.c);

    this.fsm = StateMachine.create({
      initial: 'loading',
      events: [
        { name: 'loaded', from: ['loading'], to: 'attract' },
        { name: 'start', from: ['attract', 'ended'], to: 'playing' },
        { name: 'end', from: 'playing', to: 'ended' }
      ]
    });

    this.preloader = new AssetPreloader(assets, this.audioManager.ctx);
    this.ui = this.createEntity(UI, {});

    this.preloader.load().done((assets) => {
      this.loaded(assets);
    });
  }

  // TODO: debustify type checking on the argument here :I
  createEntity(type, settings: Object): any {
    var entity = new type(this, settings);
    this.c.entities.register(entity);
    return entity;
  }


  // State changes

  loaded(assets: AssetMap) {
    this.fsm.loaded();

    this.assets = assets;
    this.audioManager.setAudioMap(assets.audio);

    if (document.location.search.indexOf('skiptitle') !== -1) {
      setTimeout(() => {
        this.start();
      }, 0);
    }
  }

  start() {
    this.fsm.start();

    this.createEntity(Adversary, {
      center: { x:320, y:75 },
    });

    this.createEntity(Player, {
    });
  }

  end() {
    this.fsm.end();
  }


  // Coquette hooks

  update(dt: number) {
    if (this.c.inputter.isPressed(this.c.inputter.M)) {
      this.audioManager.toggleMute();
    }

    if (this.fsm.is('attract') || this.fsm.is('ended')) {
      if (this.c.inputter.isPressed(this.c.inputter.SPACE)) {
        setTimeout(() => {
          this.start(this.fsm);
        }, 0);
      }
    }
  }
}

module.exports = Game;
