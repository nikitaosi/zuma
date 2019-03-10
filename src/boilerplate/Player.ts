export class Player extends Phaser.GameObjects.Container {
    constructor (scene) {
        super (scene);
        let player = scene.make.sprite({x: 200, y: 300, key: 'player'}, true);
        let ball = scene.make.sprite({x: 350, y: 300, key: 'ball'}, true);
        this.add(player);
        this.add(ball);
    }

}