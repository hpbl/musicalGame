import Phaser from 'phaser'

import { Config } from '../config'

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor (game) {
    super(game)
    let randomTexture = Phaser.Math.Between(1, 4)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'enemy_' + randomTexture)
    this.damage = 10
    this.speed = Phaser.Math.GetSpeed(Config.width, 0.3)
  }

  // spawn dos monstros no canto esquerdo e alturas randomicas
  spawn () {
    let randomY = Phaser.Math.Between(0, Config.height)
    this.setScale(0.2, 0.2)
    this.setPosition(0, randomY)
    this.setActive(true)
    this.setVisible(true)
  }

  update () {
    this.x += this.speed
  }
}
