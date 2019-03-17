import {MainScene} from "./scenes/mainScene";

export class Ball extends Phaser.Physics.Arcade.Sprite {
    private speed: number;
    private direction: number;
    private xSpeed: number;
    private ySpeed: number;
    private playerX: number;
    private playerY: number;
    private born: number;

    constructor (scene: MainScene, x, y, i) {
        super(scene, x-50, y, 'balls', i);
        this.speed = 0.8;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.playerX = x;
        this.playerY = y;

    }

    fire(player, target): void {
            this.setPosition(player.x, player.y);
            this.born = 0;
            this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));
            if (target.y >= this.y)
            {
                this.xSpeed = this.speed*Math.sin(this.direction);
                this.ySpeed = this.speed*Math.cos(this.direction);
            }
            else
            {
                this.xSpeed = -this.speed*Math.sin(this.direction);
                this.ySpeed = -this.speed*Math.cos(this.direction);
            }
    }

    update(time, delta): void {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;
        if (this.born > 1200) {
            this.direction = 0;
            this.xSpeed = 0;
            this.ySpeed = 0;
            this.born = NaN;
            this.setPosition(-50,0);
        }
    }
}
