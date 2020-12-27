import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import SceneKeys from '~/consts/SceneKeys';
import TextuerKeys from '~/consts/TextureKeys';

export default class Game extends Phaser.Scene {
    lastDecorationX!: number;
    mouseHole!: Phaser.GameObjects.Image;
    window1!: Phaser.GameObjects.Image;
    window2!: Phaser.GameObjects.Image;
    bookcase1!: Phaser.GameObjects.Image;
    bookcase2!: Phaser.GameObjects.Image;
    background!: Phaser.GameObjects.TileSprite;
    constructor() {
        super(SceneKeys.Game);
    }

    create() {
        const { width, height } = this.scale;

        this.background = this.createBackground(width, height);
        this.mouseHole = this.createDecoration(TextuerKeys.MouseHole, 900, 1500, 501);
        this.lastDecorationX = this.mouseHole.x;
        this.window1 = this.createDecoration(TextuerKeys.Window1, 900, 1300, 200);
        this.window2 = this.createDecoration(TextuerKeys.Window2, 1600, 2000, 200);
        this.bookcase1 = this.createDecoration(TextuerKeys.Bookcase1, 2200, 2700, 580).setOrigin(0.5, 1);
        this.bookcase2 = this.createDecoration(TextuerKeys.Bookcase2, 2900, 3400, 580).setOrigin(0.5, 1);
        const mouse = this.createMouse(width, height);

        this.cameras.main.startFollow(mouse);

        const body = mouse.body as Phaser.Physics.Arcade.Body;
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);

        this.setBounds(height);
    }

    private createDecoration(textureKey: TextuerKeys, xLowerBound: number, xUpperBound: number, y: number) {
        return this.add.image(
            Phaser.Math.Between(xLowerBound, xUpperBound),
            y,
            textureKey
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
        const { scrollX } = this.cameras.main;
        this.background.setTilePosition(scrollX);

        this.wrapDecoration(
            this.mouseHole,
            this.mouseHole.width,
            100,
            1000
        );

        // multiply by 2 to add some more padding 
        const window1Padding = this.window1.width * 2;
        this.wrapDecoration(
            this.window1,
            window1Padding,
            window1Padding,
            window1Padding + 800
        );

        const window2Padding = this.window2.width;
        this.wrapDecoration(
            this.window2,
            window2Padding,
            window2Padding,
            window2Padding + 800
        );

        const bookcase1Padding = this.bookcase1.width * 2;
        this.wrapDecoration(
            this.bookcase1,
            bookcase1Padding,
            bookcase1Padding,
            bookcase1Padding + 800
        );

        const bookcase2Padding = this.bookcase2.width;
        this.wrapDecoration(
            this.bookcase2,
            bookcase2Padding,
            bookcase2Padding,
            bookcase2Padding + 800
        );
    }

    private wrapDecoration(
        sprite: Phaser.GameObjects.Image,
        width: number,
        xLowerBound: number,
        xUpperBound: number
    ) {
        const { scrollX } = this.cameras.main;
        if (sprite.x + width < scrollX) {
            this.lastDecorationX = sprite.x = this.lastDecorationX + sprite.width + Phaser.Math.Between(xLowerBound, xUpperBound);
        }
    }
}