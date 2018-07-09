import Phaser from 'phaser'

import { SimpleScene } from './scenes/simple-scene'
import { HomeScene } from './scenes/home'
import { Config } from './config'

const gameConfig = {
  width: Config.width,
  height: Config.height,
  physics: Config.physics,
  scene: [HomeScene, SimpleScene]
}

window.game = new Phaser.Game(gameConfig)
