export class Ball extends Phaser.GameObjects.Sprite {
    private speed: number;
    private direction: number;
    private xSpeed: number;
    private ySpeed: number;
    private born: number;

    constructor (scene, x, y) {
        super(scene, x-30, y, 'balls', Phaser.Math.Between(0,3));
        this.speed = 0.3;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
    }

    fire(target): void {
            this.setPosition(70, 0);
            this.direction = Math.atan( (target.x-this.x) / (target.y-this.y-60));
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
