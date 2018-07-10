import Phaser from 'phaser'

import { Config } from '../config'

export class EndScene extends Phaser.Scene {
  constructor () {
    super({ key: 'end' })
  }

  preload () {
    this.load.image('retryButton', 'assets/retryButton.png')
  }

  create () {
    // add background image
    this.add.image(Config.width / 2, Config.height / 2, 'background')

    this.setupButton()
    this.setupText()
  }

  setupButton () {
    let buttonX = Config.width / 2
    let buttonY = Config.height * 0.75
    this.startBtn = this.add.sprite(buttonX, buttonY, 'retryButton').setInteractive()

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

  setupText () {
    var endText = this.make.text({
      x: Config.width / 2,
      y: Config.height * 0.50,
      text: 'Music is heard on your planet no more!!',
      style: {
        font: '30px monospace',
        fill: '#49E1D1'
      }
    })
    endText.setOrigin(0.5, 0.5)
  }
}
