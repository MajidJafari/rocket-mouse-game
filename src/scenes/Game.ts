import Phaser from 'phaser'

enum GameImages {
    Background = "background",
    RocketMouse = "rocket-mouse"
}

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {
        this.load.image(GameImages.Background, "house/bg_repeat_340x640.png");
        this.load.atlas(GameImages.RocketMouse, "characters/rocket-mouse.png", "characters/rocket-mouse.json");
    }

    create() {
        const { width, height } = this.scale;
        this.add.tileSprite(0, 0, width, height, GameImages.Background)
            .setOrigin(0);

        this.anims.create({
            key: "rocket-mouse-run",
            frames: this.anims.generateFrameNames(GameImages.RocketMouse, {
                start: 1,
                end: 4,
                prefix: "rocketmouse_run",
                zeroPad: 2,
                suffix: ".png",
            }),
            frameRate: 10,
            repeat: -1,
        });
  
        this.add.sprite(
            width * 0.5,
            height * 0.5,
            GameImages.RocketMouse,
            "rocketmouse_fly01.png"
        )
        .play("rocket-mouse-run");
    }
}