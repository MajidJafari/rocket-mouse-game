import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import SceneKeys from '~/consts/SceneKeys';
import TextuerKeys from '~/consts/TextureKeys';

export default class Game extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Game);
    }

    create() {
        const { width, height } = this.scale;
        this.add.tileSprite(0, 0, width, height, TextuerKeys.Background)
            .setOrigin(0);
  
        const mouse = this.physics.add.sprite(
            width * 0.5,
            height * 0.5,
            TextuerKeys.RocketMouse,
            "rocketmouse_fly01.png"
        )
        .play(AnimationKeys.RocketMouseRun);

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);

        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER,
            height - 30
        );
    }
}