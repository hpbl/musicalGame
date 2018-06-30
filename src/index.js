import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import { Config } from './config';

const gameConfig = {
  width: Config.width,
  height: Config.height,
  // physics: Config.physics,
  scene: SimpleScene
};

new Phaser.Game(gameConfig);