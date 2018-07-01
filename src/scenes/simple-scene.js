import Phaser from 'phaser'

import { Config } from '../config'
import { Sound } from '../sound'

export class SimpleScene extends Phaser.Scene {
  preload () {
    // screen texts
    // this.scaleText, this.noteText

    // player object
    // this.player

    // piano sound variables
    this.notePlayer = new Sound()
    this.currScaleIndex = 0
    this.currScale = this.notePlayer.scales[this.currScaleIndex]
    this.numberOfIntervals = this.notePlayer.fullPianoWeak[this.currScale].length
    // this.currNoteIndex

    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/buba.png')

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
    this.player = this.add.sprite(Config.width * 0.8125, Config.height / 2, 'player')
    // this.physics.arcade.enable(player)

    // start enemies object looping
    this.enemies = this.add.group()
    // this.time.events.loop(400, this.addEnemy)

    // start keyboard listeners
    this.keyboard.on('keydown_A', e => { this.playPianoNote(0) })
    this.keyboard.on('keydown_S', e => { this.playPianoNote(2) })
    this.keyboard.on('keydown_D', e => { this.playPianoNote(4) })
    this.keyboard.on('keydown_F', e => { this.playPianoNote(6) })
    this.keyboard.on('keydown_Q', e => { this.selectPrevScale() })
    this.keyboard.on('keydown_E', e => { this.selectNextScale() })
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

  selectPrevScale () {

  }

  selectNextScale () {

  }

  addEnemy () {

  }
}
