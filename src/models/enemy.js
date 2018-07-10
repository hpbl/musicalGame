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
  spawn (lastYSpawn) {
    let newYSpawn = Phaser.Math.Between(Math.max(60, lastYSpawn - 50), Math.min(Config.height - 60, lastYSpawn + 50))
    let outlierYSpawn = Phaser.Math.Between(0, 10)
    if (outlierYSpawn === 0) {
      newYSpawn = Math.max(60, lastYSpawn - 200)
    }
    if (outlierYSpawn === 1) {
      newYSpawn = Math.min(Config.height - 60, lastYSpawn + 200)
    }

    this.setScale(0.2, 0.2)
    this.setPosition(0, newYSpawn)
    this.setActive(true)
    this.setVisible(true)

    return newYSpawn
  }

  update () {
    this.x += this.speed
  }
}
