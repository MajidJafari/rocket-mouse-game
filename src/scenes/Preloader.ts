import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import SceneKeys from '~/consts/SceneKeys';
import TextuerKeys from '~/consts/TextureKeys';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader);
    }

    preload() {
        this.load.image(
            TextuerKeys.Background, 
            "house/bg_repeat_340x640.png"
        );
        this.load.atlas(
            TextuerKeys.RocketMouse, 
            "characters/rocket-mouse.png", 
            "characters/rocket-mouse.json"
        );
        this.load.image(
            TextuerKeys.MouseHole,
            "house/object_mousehole.png",
        );
        this.load.image(
            TextuerKeys.Window1,
            "house/object_window1.png",
        );
        this.load.image(
            TextuerKeys.Window2,
            "house/object_window2.png",
        );
        this.load.image(
            TextuerKeys.Bookcase1,
            "house/object_bookcase1.png",
        );
        this.load.image(
            TextuerKeys.Bookcase2,
            "house/object_bookcase2.png",
        );
        this.load.image(
            TextuerKeys.LaserEnd,
            "house/object_laser_end.png",
        );
        this.load.image(
            TextuerKeys.LaserMiddle,
            "house/object_laser.png",
        );
        this.load.image(
            TextuerKeys.Coin,
            "house/object_coin.png",
        );
    }

    create() {
        this.anims.create({
            key: AnimationKeys.RocketMouseRun,
            frames: this.anims.generateFrameNames(TextuerKeys.RocketMouse, {
                start: 1,
                end: 4,
                prefix: "rocketmouse_run",
                zeroPad: 2,
                suffix: ".png",
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: AnimationKeys.RocketFlamesOn,
            frames: this.anims.generateFrameNames(TextuerKeys.RocketMouse, {
                start: 1,
                end: 2,
                prefix: "flame",
                suffix: ".png",
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: AnimationKeys.RocketMouseFly,
            frames: [{
                key: TextuerKeys.RocketMouse,
                frame: "rocketmouse_fly01.png",
            }],
        });
        this.anims.create({
            key: AnimationKeys.RocketMouseFall,
            frames: [{
                key: TextuerKeys.RocketMouse,
                frame: "rocketmouse_fall01.png"
            }],
        });
        this.anims.create({
            key: AnimationKeys.RocketMouseDead,
            frames: this.anims.generateFrameNames(TextuerKeys.RocketMouse, {
                start: 1,
                end: 2,
                prefix: "rocketmouse_dead",
                zeroPad: 2,
                suffix: ".png",
            }),
            frameRate: 10,
        });

        this.scene.start(SceneKeys.Game);
    }
}