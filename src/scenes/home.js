import Phaser from 'phaser'

import { Config } from '../config'

export class HomeScene extends Phaser.Scene {
  constructor () {
    super({ key: 'home' })
  }

  preload () {
    this.load.image('homeBackground', 'assets/homeBackground.png')
    this.load.image('button', 'assets/playButton.png')
    this.load.image('loadingBackground', 'assets/loadingBackground.png')
  }

  create () {
    // add background image
    this.add.image(Config.width / 2, Config.height / 2, 'homeBackground')

    this.setupButton()
  }

  setupButton () {
    let buttonX = Config.width / 2
    let buttonY = Config.height * 0.75
    this.startBtn = this.add.sprite(buttonX, buttonY, 'button').setInteractive()

    this.startBtn.on('pointerover', (e) => {
      this.input.setDefaultCursor('pointer')
    })
    this.startBtn.on('pointerout', (e) => {
      this.input.setDefaultCursor('default')
    })
    this.startBtn.on('pointerdown', () => {
      this.input.setDefaultCursor('default')
      this.pressStart()
    })
  }

  pressStart () {
    this.scene.start('game')
  }
}
