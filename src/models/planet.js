import Phaser from 'phaser'

import { Config } from '../config'

export class Planet extends Phaser.GameObjects.Sprite {
  constructor (game) {
    super(game)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'planet')
    this.life = 3
  }

  static get positionX () {
    return Config.width * 0.95
  }

  static get positionY () {
    return Config.height / 2
  }

  enemyHit (damage) {
    this.life -= damage
    if (this.life <= 0) {
      // game over
      console.log('game over')
    }
  }
}
