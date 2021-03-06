import Phaser from 'phaser'

import { Config } from '../config'
import { BulletType, getOffsetFromBulletType } from './bulletType'

export class Bullet extends Phaser.GameObjects.Sprite {
  constructor (game) {
    super(game)
    this.speed = Phaser.Math.GetSpeed(Config.width, 0.2)
    this.setScale(0.4)
  }

  fire (bulletType) {
    let initialX = this.scene.player.x
    let initialY = this.scene.player.y - (this.scene.player.height / 2) + (getOffsetFromBulletType(this.bulletType) * this.scene.player.height)

    this.setPosition(initialX, initialY)
    this.setActive(true)
    this.setVisible(true)
  }

  update () {
    this.x -= this.speed

    if (this.x < 0) {
      this.setActive(false)
      this.setVisible(false)
      this.destroy()
    }
  }
}

export class TonicBullet extends Bullet {
  constructor (game) {
    super(game)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'bullet_TONIC')
  }

  fire () {
    this.bulletType = BulletType.TONIC
    super.fire(this.bulletType)
  }
}

export class ThirdBullet extends Bullet {
  constructor (game) {
    super(game)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'bullet_THIRD')
  }

  fire () {
    this.bulletType = BulletType.THIRD
    super.fire(this.bulletType)
  }
}

export class FifthBullet extends Bullet {
  constructor (game) {
    super(game)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'bullet_FIFTH')
  }

  fire () {
    this.bulletType = BulletType.FIFTH
    super.fire(this.bulletType)
  }
}

export class SeventhBullet extends Bullet {
  constructor (game) {
    super(game)
    Phaser.GameObjects.Image.call(this, game, 0, 0, 'bullet_SEVENTH')
  }

  fire () {
    this.bulletType = BulletType.SEVENTH
    super.fire(this.bulletType)
  }
}
