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
    this.cameras.main.setBackgroundColor('#71626f');
    this.input.setDefaultCursor('url(assets/target.cur), pointer');

    // Add group for Bullet objects
    // @ts-ignore
    this.playerBalls = this.physics.add.group({classType: Ball, runChildUpdate: true});
    this.playerBalls.create()
    // Fires bullet from player on left click of mouse
    this.input.on('pointerdown', function (pointer) {
    console.log(this.playerBalls.children);
    // Get bullet from bullets group
      var ball =  this.playerBalls.get().setActive(true).setVisible(true);
      ball.fire(this.player, pointer);
    }, this);
    
  };
}
