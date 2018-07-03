import Phaser from 'phaser'

import { Config } from '../config'

export class Enemy extends Phaser.GameObjects.Sprite {
  constructor (game) {
    super(game)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'enemy')

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
    if (this.x > (this.scene.player.x)) {
      // diminuir life da terra
      // destruir objeto
      this.destroy()
    }
  }
}
