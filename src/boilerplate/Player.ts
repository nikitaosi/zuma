import {MainScene} from "./scenes/mainScene";
import {Ball} from "./Ball";
import {Category} from "typescript-logging";

export const pDp = new Category("p");
export const pD = new Category("player",pDp);

export class Player extends Phaser.GameObjects.Container {

    private timedEventBlock: Phaser.Time.TimerEvent;

    private static ballForward:integer = 0;
    private static ballBack:integer = 1;
    balls: Ball[];
    private ballCount:integer;
    private BallPoint: integer;
    private BallSwap: Ball;
    private static lock: boolean;
    public ballsUpdate(time, delta): void {
        this.balls.forEach(function (b) {
            b.update(time, delta);
        })
    }

    constructor (scene:MainScene, x, y)
    {
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
            this.balls[i].name="ball "+i;
        }

        this.balls[0].x+=50;
        this.add(this.balls[0]);
        this.add(this.balls[1]);
        console.log(this.list);
        scene.input.on('pointerdown', function (pointer)
        {


            if (pointer.leftButtonDown()&&!Player.lock)
            {
                Player.lock = true;
                this.timedEvent = this.scene.time.addEvent({ delay: 500, callback: function () {Player.lock = false},callbackScope: this, loop: false });

                this.remove(this.balls[Player.ballForward], false);
              scene.add.existing(this.balls[Player.ballForward]);
                this.balls[Player.ballForward].setActive(true);
                this.balls[Player.ballForward].visible=true;
              this.balls[Player.ballForward].fire(this,pointer);
             // this.balls[1].x += 110;
              this.checkMaxBallCount()

              this.balls[Player.ballForward].setPosition(0,0);
              this.add(this.balls[Player.ballBack]);
                this.balls[Player.ballBack].x=-50;

            }

//          if (pointer.leftButtonDown()) {
//              this.remove(this.balls[0], false);
//              scene.add.existing(this.balls[0]);
//              this.balls[0].fire(this,pointer);
//              setTimeout((function (){console.log(this.balls[0].x, ', ', this.balls[0].x); console.log(this.balls);}).bind(this), 200);
//              Phaser.Utils.Array.RotateRight(this.balls);
//              this.balls[0].x = 0;
//              //this.balls[1].setPosition(-50,0);
            //          }

                if (pointer.rightButtonDown()) {
                    this.ballPoint = this.balls[0].x;
                    this.balls[0].x = this.balls[1].x;
                    this.balls[1].x = this.ballPoint;
                    Phaser.Utils.Array.Swap(this.balls, this.balls[0], this.balls[1])
                }

        }
        , this);
    }

    checkMaxBallCount():void
    {
        ++Player.ballForward;
        ++Player.ballBack;

        Player.ballForward>this.ballCount-1?Player.ballForward=0:Player.ballForward;
        Player.ballBack>this.ballCount-1?Player.ballBack=0:Player.ballBack;
        console.log(Player.ballForward);
        console.log(Player.ballBack);

    }

    rotate(): void {
        this.scene.input.on('pointermove', function (pointer) {
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
        }, this);
    }



}
