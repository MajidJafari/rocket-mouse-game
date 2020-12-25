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
        this.add.sprite(
            width * 0.5,
            height * 0.5,
            GameImages.RocketMouse,
            "rocketmouse_fly01.png"
        );
    }
}