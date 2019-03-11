export class Ball extends Phaser.GameObjects.Sprite {
    private speed: number;
    private direction: number;
    private xSpeed: number;
    private ySpeed: number;
    private born: number;

    constructor (scene, x, y) {
        super(scene, x-25, y, 'balls', Phaser.Math.Between(0,3));
        this.speed = 0.6;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(47, 47);
//        this.body.isCircle = true;


    }

    fire(player, target): void {
            this.setPosition(player.x, player.y);
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
            this.setActive(false);
            this.setVisible(false);
            this.born = 0;
        }
    }
}