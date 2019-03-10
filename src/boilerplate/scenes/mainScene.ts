/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";
import Vector2 = Phaser.Math.Vector2;

export class MainScene extends Phaser.Scene {

  private player: Player;
  private graphics: Phaser.GameObjects.Graphics;
  private path: Phaser.Curves.Path;
  private follower :Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "MainScene"
    });
  };

  preload(): void {

  };

  create(): void {

    this.player = new Player(this);




    this.createField();
  };

  private createField(): void
  {
    var vectors = [new Vector2( 164, 446, ),
                   ];
    this.graphics = this.add.graphics();
    this.path = new Phaser.Curves.Path(50,500);
   //this.path.splineTo(vectors);
   // this.path.lineTo(700, 300);
      this.path.lineTo(600, 350);
     this.path.ellipseTo(200, 100, 100, 250, false, 0);
     this.path.cubicBezierTo(222, 119, 308, 107, 208, 368);
     //this.path.ellipseTo(60, 60, 0, 360, true)

    this.follower = this.add.group();

    for (let i = 0; i < 32; i++) {
      let ball = this.follower.create(0,-50,'ball');

      ball.setData('vector',new Phaser.Math.Vector2());
      this.tweens.add({
        targets:ball,
        z:1,
        ease:'Sine.EaseInOut',
        duration:12000,
        // yoyo :true,
        //repeat: -1
        delay:i*100
      });
    }




  }

  update(time: number, delta: number): void {
    this.graphics.clear();
    this.graphics.lineStyle(2, 0xffffff, 1);
    this.path.draw(this.graphics);

    this.follower.getChildren().forEach((function (ch) {
      var vec = ch.getData('vector');
      var sp = <Phaser.GameObjects.Sprite>ch;
      var t = sp.z;

     this.path.getPoint(t,vec);
     sp.setPosition(vec.x,vec.y);

     sp.setDepth(ch.y);




    }).bind(this));

   //this.path.getPoint(this.follower.t,this.follower.vec);
   //this.graphics.fillStyle(0xff0000,1);
   //this.graphics.fillCircle(this.follower.vec.x,this.follower.vec.y,12);



  }

}
