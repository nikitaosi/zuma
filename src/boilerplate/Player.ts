import {MainScene} from "./scenes/mainScene";
import {Ball} from "./Ball";

export class Player extends Phaser.GameObjects.Container {
    balls: Ball[];
    private ballCount:integer;
    private ballPoint: integer;
    public blockPlayer: boolean;
    public ballsUpdate(time, delta): void {
        this.balls.forEach(function (b) {
            b.update(time, delta);
        })
    }

    constructor (scene:MainScene, x, y) {
        super (scene, x, y);
        var player = scene.make.sprite({key: 'player'});
        this.add(player);
        this.rotate();

        this.ballCount = 8;
        this.balls = [];

        for (let i = 0; i < this.ballCount; i++) {
            if (i<4) {
                this.balls[i] = new Ball(scene, 0, 0, i);
                scene.physics.world.enable(this.balls[i]);
                this.balls[i].body.isCircle = true;
            } else if (i<8) {
                this.balls[i] = new Ball(scene, 0, 0, i-4);
                scene.physics.world.enable(this.balls[i]);
                this.balls[i].body.isCircle = true;
            } else {
                this.balls[i] = new Ball(scene, 0, 0, i-8);
                scene.physics.world.enable(this.balls[i]);
                this.balls[i].body.isCircle = true;
            }
        }

        this.balls[0].x+=50;
        this.add(this.balls[0]);
        this.add(this.balls[1]);

        scene.input.on('pointerdown', function (pointer) {

            if (pointer.leftButtonDown() && !this.blockPlayer) {
              this.scene.popsound.play();
              this.blockPlayer = true;
              this.scene.time.addEvent({ delay: 400, callback: function(){this.blockPlayer = false}, callbackScope: this});
              this.remove(this.balls[0], false);
              scene.add.existing(this.balls[0]);
              this.balls[0].fire(this,pointer);
              Phaser.Utils.Array.MoveTo(this.balls, this.balls[0], this.ballCount-1);
              this.balls[0].x = 0;
              this.add(this.balls[1]);
            }

            if (pointer.rightButtonDown()) {
                this.scene.reloadsound.play();
                this.ballPoint = this.balls[0].x;
                this.balls[0].x = this.balls[1].x;
                this.balls[1].x = this.ballPoint;
                Phaser.Utils.Array.Swap(this.balls, this.balls[0], this.balls[1])
                console.log(this.scene);
            }

            }, this);
    }

    rotate(): void {
        this.scene.input.on('pointermove', function (pointer) {
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
        }, this);
    }



}
