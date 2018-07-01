import Phaser from 'phaser'

import { Config } from '../config'
import { Sound } from '../sound'
import { TonicBullet, ThirdBullet, FifthBullet, SeventhBullet } from '../models/bullet'
import { BulletType } from '../models/bulletType'

export class SimpleScene extends Phaser.Scene {
  preload () {
    // piano sound variables
    this.notePlayer = new Sound()
    this.currScaleIndex = 0
    this.currScale = this.notePlayer.scales[this.currScaleIndex]
    this.numberOfIntervals = this.notePlayer.fullPianoWeak[this.currScale].length
    // this.currNoteIndex

    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/buba.png')
    this.load.image('bullet', 'assets/bullet.png')

    this.load.audio('backgroundMusic', 'assets/background_jazz_am7.mp3')
  }

  create () {
    // start physics

    // start keyboard and mouse input
    this.mouse = this.input.mousePointer
    this.keyboard = this.input.keyboard

    // load background image
    this.add.image(Config.width / 2, Config.height / 2, 'background')

    // load background music
    this.sound.volume = 0.2
    this.sound.play('backgroundMusic')

    // start screen texts
    this.scaleText = this.add.text(10, 60, '-', { font: 'bold 16px Arial' })
    this.noteText = this.add.text(10, 85, '-', { font: 'bold 16px Arial' })

    // start player object
    this.player = this.physics.add.sprite(Config.width * 0.8125, Config.height / 2, 'player')

    // start player bullets
    this.bullets = {
      [BulletType.TONIC]: this.add.group({ classType: TonicBullet, runChildUpdate: true }),
      [BulletType.THIRD]: this.add.group({ classType: ThirdBullet, runChildUpdate: true }),
      [BulletType.FIFTH]: this.add.group({ classType: FifthBullet, runChildUpdate: true }),
      [BulletType.SEVENTH]: this.add.group({ classType: SeventhBullet, runChildUpdate: true })
    }
    // this.tonicBullets = this.add.group({ classType: TonicBullet, runChildUpdate: true })
    // this.thirdBullets = this.add.group({ classType: ThirdBullet, runChildUpdate: true })
    // this.fifthBullets = this.add.group({ classType: FifthBullet, runChildUpdate: true })
    // this.seventhBullets = this.add.group({ classType: SeventhBullet, runChildUpdate: true })

    // start keyboard listeners
    this.keyboard.on('keydown_A', e => { this.shootBullet(BulletType.TONIC) })
    this.keyboard.on('keydown_S', e => { this.shootBullet(BulletType.THIRD) })
    this.keyboard.on('keydown_D', e => { this.shootBullet(BulletType.FIFTH) })
    this.keyboard.on('keydown_F', e => { this.shootBullet(BulletType.SEVENTH) })
    this.keyboard.on('keydown_Q', e => { this.changeScale('prev') })
    this.keyboard.on('keydown_E', e => { this.changeScale('next') })
  }

  update () {
    this.updateScreenTexts()

    this.updatePlayerPosition()
  }

  updateScreenTexts () {
    this.scaleText.setText('Scale: ' + this.currScale)
    this.noteText.setText('Scale: ' + this.currScale)
  }

  updatePlayerPosition () {
    // update player's position
    this.player.y = this.mouse.position.y
    this.updateCurrentNoteIndex()
  }

  updateCurrentNoteIndex () {
    // update the current piano note, accordingly to player's position
    this.currNoteIndex = Math.floor((Config.height - this.player.y) / (Config.height / this.numberOfIntervals))
  }

  shootBullet (bulletType) {
    // add a new bullet
    let bullet = this.bullets[bulletType].get()

    if (bullet) {
      bullet.fire()
    }

    // play sound when the player shoots
    this.playPianoNote(bulletType)
  }

  playPianoNote (increment) {
    // calculate note to be played, accordingly to the given increment (tonic, third, fifth or seventh)
    let noteToBePlayed = this.currNoteIndex
    noteToBePlayed += increment

    // avoid note to be out of boundaries
    noteToBePlayed = Math.max(noteToBePlayed, 0)
    noteToBePlayed = Math.min(noteToBePlayed, this.numberOfIntervals - 1)

    // play the piano note
    // notePlayer.playNote
    this.notePlayer.playNote(noteToBePlayed, 'piano-weak', this.currScale)
  }

  changeScale (direction) {
    if (direction === 'prev') {

    } else if (direction === 'next') {

    }
  }

  selectNextScale () {

  }
}
