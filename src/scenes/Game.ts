import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import SceneKeys from '~/consts/SceneKeys';
import TextuerKeys from '~/consts/TextureKeys';

export default class Game extends Phaser.Scene {
    background!: Phaser.GameObjects.TileSprite;
    constructor() {
        super(SceneKeys.Game);
    }

    create() {
        const { width, height } = this.scale;
        this.background = this.add.tileSprite(0, 0, width, height, TextuerKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0);
  
        const mouse = this.physics.add.sprite(
            width * 0.5,
            height * 0.5,
            TextuerKeys.RocketMouse,
            "rocketmouse_fly01.png"
        )
        .play(AnimationKeys.RocketMouseRun);

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);

        body.setVelocityX(200);

        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER,
            height - 30
        );

        this.cameras.main.startFollow(mouse);
        this.cameras.main.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER,
            height
        );
    }

    update(t: number, dt: number) {
        this.background.setTilePosition(this.cameras.main.scrollX);
    }
}