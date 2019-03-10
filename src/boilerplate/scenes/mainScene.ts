/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";

export class MainScene extends Phaser.Scene {
  private player: Player;

  constructor() {
    super({
      key: "MainScene"
    });
  };

  preload(): void {
  };

  create(): void {
    this.player = new Player(this);
    this.cameras.main.setBackgroundColor('#5d84a1');
    this.input.setDefaultCursor('url(assets/target.cur), pointer');
    console.log(this.player)
    this.rotatePlayer();
  };

  rotatePlayer(): void {
    this.input.on('pointermove', function (pointer) {
      this.player.rotation = Phaser.Math.Angle.Between(this.player.x, this.player.y, pointer.x, pointer.y);
    }, this);

    };

}
