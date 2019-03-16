/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import {Player} from "../Player";
import Vector2 = Phaser.Math.Vector2;
import {Category,CategoryLogger,CategoryServiceFactory,CategoryConfiguration,LogLevel} from "typescript-logging";
export const catService = new Category("service");
export const beadsLog = new Category("BEADS",catService);
export const generalLog = new Category("GENERAL");


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
      generalLog.warn('-----------');
      generalLog.warn('---START---');
      generalLog.warn('-----------');
     this.createField();
     this.createBalls();
     this.debugStopSpace();
    //this.physics.world.
      this.textures.addSpriteSheetFromAtlas(
          'balls1',
          {
              atlas: 'balls',
              frame: '1/0001.png',
              frameWidth: 100,
              frameHeight: 100,
              endFrame: 9
          });
      var config = {
          key: 'ballsanim',
          frames: this.anims.generateFrameNumbers('balls1',{start:2,end:8,first:1}),
          frameRate: 16,
          //yoyo: true,
          repeat: -1
      };

//
      var t =  this.anims.create(config);
      console.log(t);

      this.add.sprite(300,300,'balls1').play('ballsanim');

  };

  collision(ob1,ob2):void
  {
    if( MainScene.checkColl)
    {
        let order = ob1.getData('order');
        let order2 = ob2.getData('order');
        beadsLog.debug("Столкновение "+order+" и "+order2 + ' шара');
        this.setActiveBalls(ob1.getData('order'),true);
        MainScene.checkColl = false;
    }

  }

  debugStopSpace():void
  {
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
  }

  createPath():void
  {
    var vectors = [new Vector2( 0, 0, ),];
    this.tween = [];
    this.graphics = this.add.graphics();
    this.path = new Phaser.Curves.Path(50,550);

    this.path.cubicBezierTo(750, 550, 1, 1, 800, 1);

  }

  createBalls():void
  {
    MainScene.ballsCount = 10;
    MainScene.ballsCountCurrent = 0;
    MainScene.checkColl = false;


    var stat = this.physics.add.group();

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

        r.body.isCircle=true;
        // @ts-ignore
        r.body.allowGravity = false;
        r.on('pointerdown',function (e) {
         // console.log('order is :'+' '+this.getData('order'));

            beadsLog.debug("Уничтожение "+this.getData('order') + ' шара');
            let scene = this.getData('scene');
          scene.setActiveBalls(this.getData('order'));
          MainScene.checkColl = true;
          // r.setCollideCallback(collide, this);


        })

        //this.physics.add.collider(r, stat);
        this.physics.add.overlap(r, stat,this.collision, null, this);
        r.z = 1;
        r.setData('tween',this.tweens.add({
          targets:r,
            z:{value:{getEnd:function (target, key, value) {
                        return 1;
                    },
                getStart:function (target, key, value) {
                    return 0;
                }}},
          ease:'Sine.EaseInOut',
          duration:15000,
          // yoyo :true,
          //repeat: -1
          rotation:  -Math.atan2(this.path.getPoint(0).y - r.y, this.path.getPoint(0).x - r.x)
        }));

           //var z = this.add.zone(300,300,20,20);
           //this.physics.world.enable(z);
           //z.body.isCircle = true;

           //stat.add(z);
           //this.tweens.add({
           //    targets:z,
           //    z:1,
           //    ease:'Sine.EaseInOut',
           //    duration:15500,
           //    // yoyo :true,
           //    //repeat: -1
           //})


        if(MainScene.ballsCountCurrent==MainScene.ballsCount )
        {
          this.timedEvent.remove(false);
        }
      }, callbackScope: this, loop: true });
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
    //  var a =
      let ch = this.follower.getChildren();
      var ball =<Phaser.Physics.Arcade.Sprite> this.follower.getChildren()[count];
      if(active)
      {
        for (let i = count; i >=  0; i--) {
            //ch[i].getData('tween').resume();
            ch[i].setData('move',true);
            var pos = ch[i].getData('z');
            console.log("now is "+i);
            ch[i].setData('tween2',this.tweens.add({
                targets:ch[i],
                z:{value:{getEnd:function (target, key, value) {
                            return 0;
                        },
                        getStart:function (target, key, value) {
                            return pos;
                        }}},
                ease:'Sine.EaseInOut',
                duration:15000/2,
                // yoyo :true,
                //repeat: -1
                rotateToPath:true,
                // @ts-ignore
                rotation :Math.atan2(this.path.getPoint(ch[i].getData('tween').progress).y - ch[i].y, this.path.getPoint(ch[i].getData('tween').progress).x - ch[i].x)
            }));

        }
      }
      else {
        ball.disableBody(true,true);
        for (let i = 0; i <  count; i++) {

            var tw :Phaser.Tweens.Tween =  ch[i].getData('tween');

            // @ts-ignore
           ch[i].setData('z',tw.progress);
          ch[i].setData('move',false);
          ch[i].getData('tween').stop();
        }
      }
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
        var t = sp.z;;
        if(t==0)return;
        this.path.getPoint(t,vec);
        sp.setPosition(vec.x,vec.y);
        //sp.setDepth(ch.y);
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
