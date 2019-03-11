export class Player extends Phaser.GameObjects.Container {
    private ball: Phaser.Physics.Arcade.Sprite;

    constructor (scene, x, y) {
        super (scene, x, y);
        var player = scene.make.sprite({key: 'player'});

        this.add(player);
        this.rotate();
    }

    rotate(): void {
        this.scene.input.on('pointermove', function (pointer) {
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
        }, this);
    }

    update(delta): void {

    }
}