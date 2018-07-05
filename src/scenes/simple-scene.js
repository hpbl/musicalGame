import Phaser from 'phaser'

import { Config } from '../config'
import { Sound } from '../sound/sound'
import { TonicBullet, ThirdBullet, FifthBullet, SeventhBullet } from '../models/bullet'
import { BulletType } from '../models/bulletType'
import { Enemy } from '../models/enemy'

export class SimpleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'game' })
  }

  setupLoading () {
    // Progress bar
    var progressBar = this.add.graphics()
    var progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect((Config.width / 2) - (320 / 2), Config.height / 2, 320, 50)

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
      y: height / 2 - 20,
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
      progressBar.fillRect((Config.width / 2) - (320 / 2) + 10, (Config.height / 2) + 10, 300 * value, 30)
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

    this.load.image('background', 'assets/background.png')
    this.load.image('player', 'assets/ship.png')
    this.load.image('bullet', 'assets/bullet.png')
    this.load.image('enemy', 'assets/invaders.001.png')

    for (const t in BulletType) {
      this.load.spritesheet('enemyDeath_' + t, 'assets/enemyDeath_' + t + '.png', { frameWidth: 128, frameHeight: 128 })
    }

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
    this.scaleText = this.add.text(10, 10, '-', { font: 'bold 16px Arial' })
    this.noteText = this.add.text(10, 35, '-', { font: 'bold 16px Arial' })

    // start player object
    this.player = this.physics.add.sprite(Config.width * 0.8125, Config.height / 2, 'player')

    // start player bullets
    this.bullets = {
      [BulletType.TONIC]: this.physics.add.group({ classType: TonicBullet, runChildUpdate: true }),
      [BulletType.THIRD]: this.physics.add.group({ classType: ThirdBullet, runChildUpdate: true }),
      [BulletType.FIFTH]: this.physics.add.group({ classType: FifthBullet, runChildUpdate: true }),
      [BulletType.SEVENTH]: this.physics.add.group({ classType: SeventhBullet, runChildUpdate: true })
    }

    // start enemies
    this.enemies = this.physics.add.group({classType: Enemy, runChildUpdate: true})

    // add animations for each of the bullet types when colliding with enemies
    this.enemyDeathAnimations = {}
    for (const t in BulletType) {
      this.anims.create({
        key: 'enemyDeath' + BulletType[t],
        frames: this.anims.generateFrameNumbers('enemyDeath_' + t, {
          start: 0,
          end: 15
        }),
        frameRate: 16,
        repeat: 0,
        hideOnComplete: true
      })
      this.enemyDeathAnimations[BulletType[t]] = this.add.group({ defaultKey: 'enemyDeath' + BulletType[t] })
    }
    
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
    this.noteText.setText('Note: ' + this.currNote)
  }

  updatePlayerPosition () {
    // update player's position
    this.player.y = this.mouse.position.y
    this.updateCurrentNoteIndex()
  }

  updateCurrentNoteIndex () {
    // update the current piano note, accordingly to player's position
    this.currNoteIndex = Math.floor((Config.height - this.player.y) / (Config.height / this.numberOfIntervals))
    this.currNote = this.notePlayer.fullPianoWeak[this.currScale][this.currNoteIndex]
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
    // trigger enemy death animation, according to the type of bullet used
    console.log('hitEnemy')
    let enemyDeathAnimation = this.enemyDeathAnimations[b.bulletType].get().setActive(true)
    enemyDeathAnimation.setOrigin(0.5, 0.5);
    enemyDeathAnimation.x = e.x;
    enemyDeathAnimation.y = e.y;
    enemyDeathAnimation.play('enemyDeath' + b.bulletType);

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
    this.notePlayer.playNote(noteToBePlayed, 'piano-weak', this.currScale)
  }

  changeScale (direction) {
    if (direction === 'prev') {
      this.currScaleIndex--;
      if (this.currScaleIndex < 0) {
        this.currScaleIndex = this.notePlayer.scales.length - 1
      }

    } else if (direction === 'next') {
      this.currScaleIndex++;
      if (this.currScaleIndex > this.notePlayer.scales.length - 1) {
        this.currScaleIndex = 0
      }
    }
    
    this.currScale = this.notePlayer.scales[this.currScaleIndex];
    this.numberOfIntervals = this.notePlayer.fullPianoWeak[this.currScale].length;
  }

  selectNextScale () {

  }
}
