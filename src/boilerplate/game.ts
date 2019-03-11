/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import "phaser";
import { MainScene } from "./scenes/mainScene";
import {PreloadScene} from "./scenes/PreloadScene";

// main game configuration
const config: GameConfig = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: "game",
  zoom:2,
//  pixelArt : true,
  scene: [PreloadScene, MainScene],
  physics: {
    default: "arcade",
    arcade: {
      debug:true,
      gravity: { y: 200 }
    }
  },

};

// game class
export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var game = new Game(config);
});
