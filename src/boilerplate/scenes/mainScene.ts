/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";

export class MainScene extends Phaser.Scene {
  player: Player;
  private playerBalls: Phaser.Physics.Arcade.Group;
  private block: number;
  private timedEvent: Phaser.Time.TimerEvent;
  private reloadsound: Phaser.Sound.BaseSound;
  private popsound: Phaser.Sound.BaseSound;

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
    this.input.mouse.disableContextMenu();
    this.block = 0;
    this.popsound = this.sound.add('pop');
    this.reloadsound = this.sound.add('reload');
  };

  update(time, delta): void {
    this.player.ballsUpdate(time, delta);
  }



}
