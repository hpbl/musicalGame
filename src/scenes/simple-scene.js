import { Config } from '../config';

export class SimpleScene extends Phaser.Scene {
  preload() {
    // screen texts
    this.scaleText, this.noteText;

    // player object
    this.player;

    // piano sound variables
    // this.currScaleIndex = 0;
    // this.currScale = scales[currScaleIndex];
    // this.numberOfIntervals = fullPianoWeak[currScale].length;

    this.load.image("background", "assets/background.png");
    this.load.image("player", "assets/buba.png");

    this.load.audio("backgroundMusic", "assets/background_jazz_am7.mp3");
  }

  create() {
    // start physics
    //

    // start keyboard and mouse input
    this.mouse = this.input.mousePointer;
    this.keyboard = this.input.keyboard;

    // load background image
    this.add.image(Config.width / 2, Config.height / 2, "background");

    // load background music
    this.sound.volume = 0.1;
    this.sound.play("backgroundMusic");

    // start screen texts
    this.scaleText = this.add.text(10, 60, "-", { font: "bold 16px Arial" });
    this.noteText = this.add.text(10, 85, "-", { font: "bold 16px Arial" });

    // start player object
    this.player = this.add.sprite(650, Config.height / 2, "player");
    // this.physics.arcade.enable(player);

    // start keyboard listeners
    this.keyboard.on("keydown_A", e => { this.playPianoNote(0); });
    this.keyboard.on("keydown_S", e => { this.playPianoNote(2); });
    this.keyboard.on("keydown_D", e => { this.playPianoNote(4); });
    this.keyboard.on("keydown_F", e => { this.playPianoNote(6); });
    // this.keyQ.onDown.add(prevScale, this);
    // this.keyE.onDown.add(nextScale, this);
    //a
  }

  update() {
    this.movePlayer();
  }

  movePlayer() {
    this.player.y = this.mouse.position.y;
  }

  playPianoNote(increment) {
    console.log(increment)
  }

  eae(s) {
    console.log(s);
  }

}