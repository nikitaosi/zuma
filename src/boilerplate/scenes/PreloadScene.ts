export class PreloadScene extends Phaser.Scene{

    constructor () {
        super({
            key: "PreloadScene"
        });
    }

    preload(): void {
        this.load.image('player', './assets/player.png');
        this.load.image('ball', './assets/ball.png');
    };

    create(): void {
        this.scene.start('mainScene')
    }
}