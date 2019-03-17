import {MainScene} from "./scenes/mainScene";
import {Ball} from "./Ball";

export class Player extends Phaser.GameObjects.Container {
    balls: Ball[];
    private ballCount:integer;
    private BallPoint: integer;
    private BallSwap: Ball;
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
            } else if (i<8) {
                this.balls[i] = new Ball(scene, 0, 0, i-4);
                scene.physics.world.enable(this.balls[i]);
            } else {
                this.balls[i] = new Ball(scene, 0, 0, i-8);
                scene.physics.world.enable(this.balls[i]);
            }
        }

        this.balls[0].x+=50;
        this.add(this.balls[0]);
        this.add(this.balls[1]);

        scene.input.on('pointerdown', function (pointer) {

            if (pointer.leftButtonDown()) {
              this.remove(this.balls[0], false);
              scene.add.existing(this.balls[0]);
              this.balls[0].fire(this,pointer);
              Phaser.Utils.Array.MoveTo(this.balls, this.balls[0], this.ballCount-1);
              this.balls[0].x = 0;
              this.add(this.balls[1]);
            }

//          if (pointer.leftButtonDown()) {
//              this.remove(this.balls[0], false);
//              scene.add.existing(this.balls[0]);
//              this.balls[0].fire(this,pointer);
//              setTimeout((function (){console.log(this.balls[0].x, ', ', this.balls[0].x); console.log(this.balls);}).bind(this), 200);
//              Phaser.Utils.Array.RotateRight(this.balls);
//              this.balls[0].x = 0;
//              //this.balls[1].setPosition(-50,0);
//              this.balls.forEach(function (ball){
//                  console.log(ball.x, ', ', ball.y);
//              }, this.balls);
//              console.log(' ');
            //          }

            if (pointer.rightButtonDown()) {
                this.ballPoint = this.balls[0].x;
                this.balls[0].x = this.balls[1].x;
                this.balls[1].x = this.ballPoint;
                Phaser.Utils.Array.Swap(this.balls, this.balls[0], this.balls[1])
            }

            }, this);
    }

    rotate(): void {
        this.scene.input.on('pointermove', function (pointer) {
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
        }, this);
    }



}
