import Phaser from 'phaser'

import { Config } from '../config'
import { Sound } from '../sound/sound'
import { TonicBullet, ThirdBullet, FifthBullet, SeventhBullet } from '../models/bullet'
import { BulletType } from '../models/bulletType'
import { Enemy } from '../models/enemy'
import { Planet } from '../models/planet'

export class SimpleScene extends Phaser.Scene {

  setupLoading () {
    // Progress bar
    var progressBar = this.add.graphics()
    var progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(240, 270, 320, 50)

    // loading text
    var width = this.cameras.main.width
    var height = this.cameras.main.height
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    // loading percentage
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    })
    percentText.setOrigin(0.5, 0.5)

    this.load.on('progress', function (value) {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(250, 280, 300 * value, 30)
      percentText.setText(parseInt(value * 100) + '%')
    })

    this.load.on('complete', function () {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
    })
  }

  preload () {
    this.setupLoading()

    // piano sound variables
    this.notePlayer = new Sound()
    this.currScaleIndex = 0
    this.currScale = this.notePlayer.scales[this.currScaleIndex]
    this.numberOfIntervals = this.notePlayer.fullPianoWeak[this.currScale].length
    // this.currNoteIndex

    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/buba.png')
    this.load.image('bullet', 'assets/bullet.png')
    this.load.image('enemy', 'assets/buba.png')
    this.load.image('planet', 'assets/planet.png')

    this.load.audio('backgroundMusic', 'assets/background_jazz_am7.mp3')
  }

  create () {
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

    // start planet object
    this.planet = this.physics.add.sprite(Planet.positionX, Planet.positionY, 'planet')

    // start player bullets
    this.bullets = {
      [BulletType.TONIC]: this.physics.add.group({ classType: TonicBullet, runChildUpdate: true }),
      [BulletType.THIRD]: this.physics.add.group({ classType: ThirdBullet, runChildUpdate: true }),
      [BulletType.FIFTH]: this.physics.add.group({ classType: FifthBullet, runChildUpdate: true }),
      [BulletType.SEVENTH]: this.physics.add.group({ classType: SeventhBullet, runChildUpdate: true })
    }

    this.enemies = this.physics.add.group({classType: Enemy, runChildUpdate: true})

    // timer para spawn dos inimigos
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    })
    // tratamento de colisao dentre os tiros e inimigos
    this.physics.add.collider(this.bullets[BulletType.TONIC], this.enemies, (b, e) => { this.hitEnemy(b, e) })
    this.physics.add.collider(this.bullets[BulletType.THIRD], this.enemies, (b, e) => { this.hitEnemy(b, e) })
    this.physics.add.collider(this.bullets[BulletType.FIFTH], this.enemies, (b, e) => { this.hitEnemy(b, e) })
    this.physics.add.collider(this.bullets[BulletType.SEVENTH], this.enemies, (b, e) => { this.hitEnemy(b, e) })
    // this.physics.add.overlap(this.bullets, this.letters, this.colisao, null, this)

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

  spawnEnemy () {
    this.enemies.get().spawn()
  }

  hitEnemy (b, e) {
    // Animacao de destruicao
    switch (b.bulletType) {
      case (BulletType.TONIC): {
        // animacao tonic
        break
      }
      case (BulletType.THIRD): {
        // animacao third
        break
      }
      case (BulletType.FIFTH): {
        // animacao fifth
        break
      }
      case (BulletType.SEVENTH): {
        // animacao seventh
        break
      }
    }
    // destroi objetos
    b.destroy()
    e.destroy()
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
