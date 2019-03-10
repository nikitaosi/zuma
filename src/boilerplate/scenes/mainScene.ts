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
  private follower :Phaser.Physics.Arcade.StaticGroup;
  private tween : Phaser.Tweens.Tween[];


  constructor() {
    super({
      key: "MainScene"
    });
  };

  preload(): void {

  };

  create(): void {

   // this.player = new Player(this);




     this.createField();

    var stat = this.physics.add.staticGroup();
    //var r =<Phaser.Physics.Arcade.Sprite> stat.create(50,200,'ball');
    //var r =<Phaser.Physics.Arcade.Sprite> stat.create(100,200,'ball');
    for (let i = 0; i < 10; i++) {

     let r =<Phaser.Physics.Arcade.Sprite> stat.create(50*i,200,'ball');
      r.setData('order',i);
      r.setData('move',true);
      r.setData('vector',new Phaser.Math.Vector2());
      r.setInteractive();
      r.setImmovable(true);
      r.body.isCircle = true;
      // @ts-ignore
      r.body.allowGravity = false;
      r.on('pointerdown',function (e) {
        console.log('order is :'+' '+this.getData('order'));




       })
      this.tweens.add({
        targets:r,
        z:1,
        ease:'Sine.EaseInOut',
        duration:12000,
        // yoyo :true,
        //repeat: -1
        delay:i*400
      });

    }
    this.follower = stat;




    //stat.remove(r);
    //console.log(stat);


//
  };

  createPath():void
  {
    var vectors = [new Vector2( 164, 446, ),];
    this.tween = [];
    this.graphics = this.add.graphics();
    this.path = new Phaser.Curves.Path(50,500);
    this.path.splineTo(vectors);
    this.path.lineTo(700, 300);
    this.path.lineTo(600, 350);
    this.path.ellipseTo(200, 100, 100, 250, false, 0);
    this.path.cubicBezierTo(222, 119, 308, 107, 208, 368);
    //this.path.ellipseTo(60, 60, 0, 360, true);
  }

  createBalls():void
  {
    this.follower = this.physics.add.staticGroup();

    for (let i = 0; i < 10; i++) {

      let ball = this.follower.create(-50,0,'ball');
      //let ball = this.make.sprite({x:-50,key:'ball'});
      ball.setData('order',i);
      ball.setData('move',true);


      //this.follower.add(ball);

      let rBall = <Phaser.GameObjects.Sprite>ball;
      rBall.setData('scene',this);
      ball.setInteractive();
      ball.on('pointerdown',function (ev,ff,ff2,ff3,ff4) {
        console.log("object order is: "+this.getData('order'));
        console.log("object move is : "+this.getData('move'));
        let scene = this.getData('scene');
        scene.stopOthersBalls(this.getData('order'));

       // console.log(scene);



      });

      ball.setData('vector',new Phaser.Math.Vector2());
      this.tween[i] = this.tweens.add({
        targets:ball,
        z:1,
        ease:'Sine.EaseInOut',
        duration:12000,
        // yoyo :true,
        //repeat: -1
        delay:i*400
      });
    }
  }


  private createField(): void
  {
   this.createPath();
   //this.createBalls();
  }

  /**
   * Останавливает шары идушие после уничноженного шара.
   * @param count С какого по счету шара останавливается очередь
   */
  stopOthersBalls(count:integer):void
  {
    console.log(count);
      let ch = this.follower.getChildren();
       //ch[count].setData('move',false);
      //console.log(ch.length);

       for (let i2 = ch.length-1; i2 > count; i2--) {
         ch[i2].setData('move',false);
       }
//
      //for (let i = 0; i < ch.length; i++) {
      //  console.log(ch);
      //}

  }

  drawGraphicsPath():void
  {
    this.graphics.clear();
    this.graphics.lineStyle(2, 0xffffff, 1);
    this.path.draw(this.graphics);

  }

  moveBalls():void
  {
    this.follower.getChildren().forEach((function (ch) {

      var allowMove = ch.getData('move');

      if(allowMove)
      {
        var vec = ch.getData('vector');
        var sp = <Phaser.Physics.Arcade.Sprite>ch;
        var t = sp.z;
        this.path.getPoint(t,vec);
        sp.setPosition(vec.x,vec.y);
        sp.setDepth(ch.y);
        sp.refreshBody();
        //sp.body.x = vec.x;
        //sp.body.y  = vec.y;
      }
    }).bind(this));
  }

      update(time: number, delta: number): void
      {
        this.drawGraphicsPath();
         this.moveBalls();
      }

}
