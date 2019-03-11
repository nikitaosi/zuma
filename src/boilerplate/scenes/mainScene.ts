/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";

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

  };

  update(time, delta): void {
    this.player.ballsUpdate(time, delta);
  }

}
