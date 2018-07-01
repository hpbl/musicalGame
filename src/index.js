import Phaser from 'phaser'

import { SimpleScene } from './scenes/simple-scene'
import { Config } from './config'

const gameConfig = {
  width: Config.width,
  height: Config.height,
  // physics: Config.physics,
  scene: SimpleScene
}

window.game = new Phaser.Game(gameConfig)
