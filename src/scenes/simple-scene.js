import Phaser from 'phaser'

import { Config } from '../config'
import { Sound } from '../sound/sound'
import { TonicBullet, ThirdBullet, FifthBullet, SeventhBullet } from '../models/bullet'
import { BulletType } from '../models/bulletType'
import { Enemy } from '../models/enemy'
import { Planet } from '../models/planet'

export class SimpleScene extends Phaser.Scene {
  constructor () {
    super({ key: 'game' })
  }

  setupLoading () {
    let background = this.add.image(Config.width / 2, Config.height / 2, 'loadingBackground')

    let barHeight = 30
    let barWidth = 320
    let barX = (Config.width / 2) - (320 / 2)
    let barY = Config.height / 2

    // Progress bar
    var progressBox = this.add.graphics()
    progressBox.fillStyle(0x000000, 1)
    progressBox.fillRect(barX, barY, barWidth, barHeight)

    var progressBar = this.add.graphics()

    // loading text
    var loadingText = this.make.text({
      x: barX + barWidth / 2,
      y: barY + barHeight / 2,
      text: 'Loading',
      style: {
        font: '20px monospace',
        fill: '#FEFEFE'
      }
    })
    loadingText.setOrigin(0.5, 0.5)

    this.load.on('progress', function (value) {
      progressBar.clear()
      progressBar.fillStyle(0x49E1D1, 1)
      progressBar.fillRect(barX, barY, barWidth * value, barHeight)
    })

    this.load.on('complete', function () {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      background.destroy()
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
    this.load.image('bullet_TONIC', 'assets/bullet_TONIC.png')
    this.load.image('bullet_THIRD', 'assets/bullet_THIRD.png')
    this.load.image('bullet_FIFTH', 'assets/bullet_FIFTH.png')
    this.load.image('bullet_SEVENTH', 'assets/bullet_SEVENTH.png')
    this.load.spritesheet('enemyDeath', 'assets/enemyDeath.png', { frameWidth: 128, frameHeight: 128 })
    this.load.image('planet', 'assets/planet2.png')
    this.load.image('enemy_1', 'assets/invaders.001.png')
    this.load.image('enemy_2', 'assets/invaders.002.png')
    this.load.image('enemy_3', 'assets/invaders.003.png')
    this.load.image('enemy_4', 'assets/invaders.004.png')

    for (const t in BulletType) {
      this.load.spritesheet('enemyDeath_' + t, 'assets/enemyDeath_' + t + '.png', { frameWidth: 60, frameHeight: 60 })
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
    this.sound.volume = 0.1
    this.sound.play('backgroundMusic')

    // start screen texts
    this.scaleText = this.add.text(10, 10, '-', { font: 'bold 16px Arial' })
    this.noteText = this.add.text(10, 35, '-', { font: 'bold 16px Arial' })

    // start player object
    this.player = this.physics.add.sprite(Config.width * 0.8125, Config.height / 2, 'player')

    // start planet object
    this.planet = this.physics.add.group({ classType: Planet, runChildUpdate: false })
    this.planet.get().start()
    // this.planet = this.physics.add.sprite(Planet.positionX, Planet.positionY, 'planet')
    this.planetLifeBar = this.add.graphics({x: 270, y: 20})
    this.planetLifePercent = this.add.text(500, 20, '-', { font: 'bold 16px Arial', color: '#000' })
    this.updatePlanetLifeBar(100, 100)
    this.planetLifeBar.fillStyle(0x49E1D1, 1)
    this.planetLifeBar.fillRect(0, 0, 500, 20)
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

    // animation for enemy coliding with planet
    this.anims.create({
      key: 'enemyDeath',
      frames: this.anims.generateFrameNumbers('enemyDeath', {
        start: 0,
        end: 15
      }),
      frameRate: 16,
      repeat: 0,
      hideOnComplete: true
    })
    this.enemyDeathAnimations['planet'] = this.add.group({ defaultKey: 'enemyDeath' })

    this.lastYSpawn = Config.height / 2
    this.currentMinDelay = 100
    this.currentMaxDelay = 500
    // timer para spawn dos inimigos
    this.spawnEnemyTimer = this.time.addEvent({
      delay: this.currentMaxDelay,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true
    })

    // mudar timer com frequência
    this.increaseDelay = -1
    this.changeSpawnEnemyTimer = this.time.addEvent({
      delay: 1000,
      callback: this.changeSpawnEnemyDelay,
      callbackScope: this,
      loop: true
    })

    // tratamento de colisao dentre os tiros e inimigos
    this.physics.add.collider(this.bullets[BulletType.TONIC], this.enemies, (b, e) => { this.bulletHitEnemy(b, e) })
    this.physics.add.collider(this.bullets[BulletType.THIRD], this.enemies, (b, e) => { this.bulletHitEnemy(b, e) })
    this.physics.add.collider(this.bullets[BulletType.FIFTH], this.enemies, (b, e) => { this.bulletHitEnemy(b, e) })
    this.physics.add.collider(this.bullets[BulletType.SEVENTH], this.enemies, (b, e) => { this.bulletHitEnemy(b, e) })

    // tratamento de colisao entre inimigos e planeta
    this.physics.add.collider(this.planet, this.enemies, (p, e) => { this.enemyHitPlanet(p, e) })

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

  updatePlanetLifeBar (actualLife, totalLife) {
    let percent = actualLife / totalLife * 100
    this.planetLifePercent.setText(percent + '%')
    this.planetLifeBar.clear()
    this.planetLifeBar.fillStyle(0x49E1D1, 1)
    this.planetLifeBar.fillRect(0, 0, (500 * percent / 100), 20)
    if (percent <= 50) {
      this.planetLifePercent.style.color = '#49E1D1'
    } else {
      this.planetLifePercent.style.color = '#000'
    }
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
    this.lastYSpawn = this.enemies.get().spawn(this.lastYSpawn)
  }

  changeSpawnEnemyDelay () {
    this.spawnEnemyTimer.delay += (this.increaseDelay * 100)
    if (this.spawnEnemyTimer.delay <= this.currentMinDelay) {
      this.increaseDelay = 1
    }
    if (this.spawnEnemyTimer.delay >= this.currentMaxDelay) {
      this.increaseDelay = -1
      this.currentMaxDelay = (Math.max(100, this.currentMaxDelay - 10))
    }

    this.changeSpawnEnemyTimer.delay = this.spawnEnemyTimer.delay * 2
  }

  bulletHitEnemy (b, e) {
    // trigger enemy death animation, according to the type of bullet used
    let enemyDeathAnimation = this.enemyDeathAnimations[b.bulletType].get().setActive(true)
    enemyDeathAnimation.setOrigin(0.5, 0.5)
    enemyDeathAnimation.x = e.x
    enemyDeathAnimation.y = e.y
    enemyDeathAnimation.play('enemyDeath' + b.bulletType)

    // destroi objetos
    b.destroy()
    e.destroy()
  }

  enemyHitPlanet (p, e) {
    let enemyDeathAnimation = this.enemyDeathAnimations['planet'].get().setActive(true)
    enemyDeathAnimation.setOrigin(0.5, 0.5)
    enemyDeathAnimation.x = e.x
    enemyDeathAnimation.y = e.y
    enemyDeathAnimation.play('enemyDeath')

    if (p.enemyHit(e.damage)) {
      this.sound.pauseAll()
      this.scene.start('end')
    }
    e.destroy()
    this.updatePlanetLifeBar(p.actualLife, p.totalLife)
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
      this.currScaleIndex--
      if (this.currScaleIndex < 0) {
        this.currScaleIndex = this.notePlayer.scales.length - 1
      }
    } else if (direction === 'next') {
      this.currScaleIndex++
      if (this.currScaleIndex > this.notePlayer.scales.length - 1) {
        this.currScaleIndex = 0
      }
    }

    this.currScale = this.notePlayer.scales[this.currScaleIndex]
    this.numberOfIntervals = this.notePlayer.fullPianoWeak[this.currScale].length
  }

  selectNextScale () {

  }
}
