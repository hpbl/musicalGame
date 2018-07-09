import Phaser from 'phaser'

import { Config } from '../config'
import { Planet } from './planet'

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
    // if (this.x > Planet.positionX) {
    //   // diminuir life da terra
    //   console.log(Planet.positionX)
    //   Planet.enemyHit(10)
    //   // destruir objeto
    //   this.destroy()
    // }
  }
}
