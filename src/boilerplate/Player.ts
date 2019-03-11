import {MainScene} from "./scenes/mainScene";
import {Ball} from "./Ball";

export class Player extends Phaser.GameObjects.Container {
    private ball: Ball[];
    private ballCount:integer;


    constructor (scene:MainScene, x, y) {
        super (scene, x, y);
        var player = scene.make.sprite({key: 'player'});

        this.add(player);
        this.rotate();

        this.ballCount = 10;
        this.ball = [];

        for (let i = 0; i < this.ballCount; i++) {
            this.ball[i] = new Ball(scene, 0, 0);
            scene.physics.world.enable(this.ball[i]);
        }

        console.log(this.ball);
        this.ball[0].x+=70;
        this.add(this.ball[0]);
        this.add(this.ball[1]);


        scene.input.on('pointerdown', function (pointer) {
            this.ball[0].fire(this, pointer);
        }, this);

    }

    rotate(): void {
        this.scene.input.on('pointermove', function (pointer) {
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
        }, this);
    }

    update(delta): void {

    }
}
