/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;
  private player: Player;

  constructor() {
    super({
      key: "MainScene"
    });
  };

  preload(): void {
    this.load.image("logo", "./src/boilerplate/assets/phaser.png");
  };

  create(): void {
    this.phaserSprite = this.add.sprite(400, 300, "logo");
    this.player = new Player(this);
  };
}
