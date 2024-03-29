export class PreloadScene extends Phaser.Scene{

    constructor () {
        super({
            key: "PreloadScene"
        });
    }

    preload(): void {
        this.load.image('player', './assets/player.png');
        this.load.spritesheet('balls', './assets/ball.png', {frameWidth: 47, frameHeight: 46});
        this.load.audio('pop', './assets/pop.mp3');
        this.load.audio('reload', './assets/reload.mp3');
    };

    create(): void {
        this.scene.start('MainScene')
    }
}