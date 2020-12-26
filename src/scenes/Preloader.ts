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
        this.scene.start(SceneKeys.Game);
    }
}