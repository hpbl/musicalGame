import Phaser from 'phaser'

import { Config } from '../config'

export class Planet extends Phaser.GameObjects.Sprite {
  constructor (game) {
    super(game)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'planet')
    this.life = 100
  }

  // static get positionX () {
  //   return Config.width * 0.9
  // }

  // static get positionY () {
  //   return Config.height / 2
  // }

  start () {
    this.setPosition(Config.width * 1.15, Config.height / 2)
    this.setActive(true)
    this.setVisible(true)
  }

  enemyHit (damage) {
    this.life -= damage
    if (this.life <= 0) {
      // game over
      return true
    }

    return false
  }
}
