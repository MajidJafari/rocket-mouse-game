import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import SceneKeys from '~/consts/SceneKeys';
import TextuerKeys from '~/consts/TextureKeys';

export default class Game extends Phaser.Scene {
    mouseHole!: Phaser.GameObjects.Image;
    background!: Phaser.GameObjects.TileSprite;
    constructor() {
        super(SceneKeys.Game);
    }

    create() {
        const { width, height } = this.scale;

        this.background = this.createBackground(width, height);
        this.mouseHole = this.createMouseHole();
        const mouse = this.createMouse(width, height);
        
        this.cameras.main.startFollow(mouse);

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);

        this.setBounds(height);
    }

    private createMouseHole() {
      return this.add.image(
            Phaser.Math.Between(900, 1500),
            501,
            TextuerKeys.MouseHole
        );
    }

    private setBounds(height: number) {
        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER,
            height - 30
        );

        this.cameras.main.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER,
            height
        );
    }

    private createBackground(width: number, height: number) {
        return this.add.tileSprite(0, 0, width, height, TextuerKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0);
    }

    private createMouse(width: number, height: number) {
        return this.physics.add.sprite(
            width * 0.5,
            height - 30,
            TextuerKeys.RocketMouse,  
            "rocketmouse_fly01.png"
        )
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun);
    }

    update(t: number, dt: number) {
        this.background.setTilePosition(this.cameras.main.scrollX);
        this.wrapMouseHole();
    }

    private wrapMouseHole() {
        const { scrollX } = this.cameras.main;
        const rightEdge = scrollX + this.scale.width;
        if(this.mouseHole.x + this.mouseHole.width < scrollX) {
            this.mouseHole.x = Phaser.Math.Between(rightEdge + 100, rightEdge + 1000);
        }
    }
}