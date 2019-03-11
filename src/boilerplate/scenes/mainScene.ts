/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";
import Vector2 = Phaser.Math.Vector2;

export class MainScene extends Phaser.Scene {

  public static ballsCount : integer;
  public static ballsCountCurrent : integer;
  private player: Player;
  private graphics: Phaser.GameObjects.Graphics;
  private path: Phaser.Curves.Path;
  private follower :Phaser.Physics.Arcade. Group;
  private tween : Phaser.Tweens.Tween[];
  private timedEvent: Phaser.Time.TimerEvent;
  public static checkColl:boolean;
  private static AllowToMove: boolean;

  constructor() {
    super({
      key: "MainScene"
    });
  };

  preload(): void {

  };

  create(): void {
    MainScene.ballsCount = 4;
    MainScene.ballsCountCurrent = 0;
   // this.player = new Player(this);
   // this.tween[0];

    this.input.keyboard.on('keydown_SPACE', function (event) {
      var r = this.follower.getChildren()
      for (let i = 0; i < r.length; i++) {
        if(MainScene.AllowToMove)
        {
          r[i].getData('tween').pause();
        }
        else
        {
          r[i].getData('tween').resume();
        }

      }
      MainScene.AllowToMove = !MainScene.AllowToMove;
     console.log('stop');
     console.log(r)


    },this );

     this.createField();
    MainScene.checkColl = false;
    var stat = this.physics.add.group();
    //var r =<Phaser.Physics.Arcade.Sprite> stat.create(50,200,'ball');
    //var r =<Phaser.Physics.Arcade.Sprite> stat.create(100,200,'ball');

    this.follower = stat;
    this.timedEvent = this.time.addEvent({ delay: 600, callback: function () {

        let r =<Phaser.Physics.Arcade.Sprite> stat.create(800,600,'ball');
        //r.setSize(r.width,r.height+4);
        r.setData('order',MainScene.ballsCountCurrent);
        MainScene.ballsCountCurrent+=1;
        MainScene.AllowToMove = true;
        r.setData('move',true);
        r.setData('vector',new Phaser.Math.Vector2());
        r.setData('scene',this);
        r.setInteractive();
        r.setImmovable(true);
        r.body.isCircle = true;
        // @ts-ignore
        r.body.allowGravity = false;
        r.on('pointerdown',function (e) {
          console.log('order is :'+' '+this.getData('order'));
          let scene = this.getData('scene');
          scene.setActiveBalls(this.getData('order'));
          MainScene.checkColl = true;
          // r.setCollideCallback(collide, this);


        })


        this.physics.add.collider(r, stat);
        this.physics.add.overlap(r, stat,this.collision, null, this);
        r.setData('tween',this.tweens.add({
          targets:r,
          z:1,
          ease:'Sine.EaseInOut',
          duration:12000,
          // yoyo :true,
          //repeat: -1
        }));

        if(MainScene.ballsCountCurrent==MainScene.ballsCount )
        {
          this.timedEvent.remove(false);
        }
      }, callbackScope: this, loop: true });




//
  };

  collision(ob1,ob2,ob3):void
  {
    if( MainScene.checkColl)
    {
      console.log(ob1.getData('order'));
      console.log(ob2.getData('order'));
      //console.log(ob3.getData('order'));
      console.log('collision');
      this.setActiveBalls(ob1.getData('order'),true);
      MainScene.checkColl = false;
    }

  }

  createPath():void
  {
    var vectors = [new Vector2( 0, 0, ),];
    this.tween = [];
    this.graphics = this.add.graphics();
    this.path = new Phaser.Curves.Path(800,600);
    this.path.splineTo(vectors);
   // this.path.lineTo(800, 600);
   // this.path.lineTo(600, 350);
    //this.path.ellipseTo(200, 100, 100, 250, false, 0);
    //this.path.cubicBezierTo(222, 119, 308, 107, 208, 368);
    //this.path.ellipseTo(60, 60, 0, 360, true);
  }

  createBalls():void
  {
    this.follower = this.physics.add.group();

    for (let i = 0; i < 10; i++) {

      let ball = this.follower.create(0,0,'ball');
      //let ball = this.make.sprite({x:-50,key:'ball'});
      ball.setData('order',i);
      ball.setData('move',true);



      //this.follower.add(ball);

      let rBall = <Phaser.GameObjects.Sprite>ball;
      rBall.setData('scene',this);
      ball.setInteractive();
      ball.on('pointerdown',function (ev,ff,ff2,ff3,ff4) {
        console.log("object order is: "+this.getData('order'));
        console.log("object move is : "+this.getData('move')+"NELLO");
        let scene = this.getData('scene');
        scene.setActiveBalls(this.getData('order'));

       // console.log(scene);



      });

      ball.setData('vector',new Phaser.Math.Vector2());
     //this.tween[i] = this.tweens.add({
     //  targets:ball,
     //  z:1,
     //  ease:'Sine.EaseInOut',
     //  duration:100,
     //  // yoyo :true,
     //  //repeat: -1
     //  delay:i*5200
     //});
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
  setActiveBalls(count:integer, active:boolean):void
  {
    console.log(count);
      let ch = this.follower.getChildren();
      console.log(ch.length);
      var ball =<Phaser.Physics.Arcade.Sprite> this.follower.getChildren()[count];

      if(active)
      {
        for (let i = count; i >=  0; i--) {
          ch[i].setData('move',true);
          console.log(i);
          // @ts-ignore
          //ch[i].z = ch[i].getData('lastT');
          //// @ts-ignore
          //console.log(ch[i].z);
          ch[i].getData('tween').resume();
        }
      }
      else {
        ball.disableBody(true,true);


        for (let i = 0; i <  count; i++) {
          ch[i].setData('move',false);
          // @ts-ignore
          //ch[i].setData('lastT',ch[i].z);
          //console.log(ch[i].getData('lastT'));
          ch[i].getData('tween').pause();
        }
      }


    console.log(ball);
   // console.log(count);


    //ch[count].setData('move',false);
      //console.log(ch.length);






  }

  drawGraphicsPath():void
  {
    this.graphics.clear();
    this.graphics.lineStyle(2, 0xffffff, 1);
    this.path.draw(this.graphics);

  }

  moveBalls():void
  {
    if(MainScene.AllowToMove){
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
       // sp.refreshBody();
        //sp.body.x = vec.x;
        //sp.body.y  = vec.y;
      }
    }).bind(this));
  }
  }

      update(time: number, delta: number): void
      {
        this.drawGraphicsPath();
         this.moveBalls();
      }

}
