export class Player extends Phaser.GameObjects.Group {
    constructor (scene) {
        super (scene);
        this.create(200, 300, 'player');
        this.create(350, 300, 'ball');
    }

}