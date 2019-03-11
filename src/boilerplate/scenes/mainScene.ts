/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";
import {Ball} from "../Ball";

export class MainScene extends Phaser.Scene {
  private player: Player;
  private playerBalls: Phaser.Physics.Arcade.Group;

  constructor() {
    super({
      key: "MainScene"
    });
  };

  create(): void {

    this.player = new Player(this, 400, 300);
    this.add.existing(this.player);
    this.cameras.main.setBackgroundColor('#5d84a1');
    this.input.setDefaultCursor('url(assets/target.cur), pointer');

    // Add group for Bullet objects
    // @ts-ignore
    this.playerBalls = this.physics.add.group({classType: Ball, runChildUpdate: true});
    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer) {

    // Get bullet from bullets group
      var bullet =  this.playerBalls.get().setActive(true).setVisible(true);
      bullet.fire(this.player, pointer);
    }, this);
    
  };
}
