export class Ball extends Phaser.GameObjects.Image {
    private speed: number;
    private direction: number;
    private xSpeed: number;
    private ySpeed: number;
    private born: number;

    constructor (scene, x, y) {
        super(scene, x, y, 'ball');

        this.speed = 0.2;
        this.direction = 0;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.setSize(20, 20);
        this.body.isCircle = true;

        this.scene.input.on('pointerdown', function (pointer) {
            this.fire(scene.player, pointer);
        }, this);
    }

    fire(player, target): void {
            this.setPosition(player.x, player.y); // Initial position
            this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

            // Calculate X and y velocity of bullet to moves it from player to target
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

            this.rotation = player.rotation; // angle bullet with shooters rotation
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