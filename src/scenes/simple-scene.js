export class SimpleScene extends Phaser.Scene {
  preload() {
    this.load.image('pai', 'assets/pai.jpeg');
  }

  create() {
    this.add.text(100, 100, 'Para!', { fill: '#0f0' });
    this.add.image(100, 200, 'pai');
  }
}