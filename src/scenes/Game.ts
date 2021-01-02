import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import SceneKeys from '~/consts/SceneKeys';
import TextuerKeys from '~/consts/TextureKeys';
import LaserObstacle from '~/game/LaserObstacle';
import RocketMouse from '~/game/RocketMouse';

export default class Game extends Phaser.Scene {
    lastDecorationX!: number;
    laserObstacle!: LaserObstacle;
    mouseHole!: Phaser.GameObjects.Image;
    window1!: Phaser.GameObjects.Image;
    window2!: Phaser.GameObjects.Image;
    bookcase1!: Phaser.GameObjects.Image;
    bookcase2!: Phaser.GameObjects.Image;
    background!: Phaser.GameObjects.TileSprite;
    private coins!: Phaser.Physics.Arcade.StaticGroup;
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

        this.laserObstacle = new LaserObstacle(this, 900, 100);
        this.add.existing(this.laserObstacle);

        const mouse = new RocketMouse(this, width * 0.5, height - 30);
        mouse.once("dead", () => {
            this.scene.run(SceneKeys.GameOver);
        });
        this.add.existing(mouse);
        this.cameras.main.startFollow(mouse);


        const body = mouse.body;
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);

        this.setBounds(height);

        this.physics.add.overlap(
            this.laserObstacle,
            mouse,
            this.handleOverlapLaser as any,
            undefined,
            this
        );

        this.coins = this.physics.add.staticGroup();
        this.spawCoins();

        this.physics.add.overlap(
            this.coins,
            mouse,
            this.handleOverlapCoin as any,
            undefined,
            this,
        );
    }

    handleOverlapCoin(obj1: Phaser.GameObjects.GameObject, coin: Phaser.Physics.Arcade.Sprite) {
        this.disableCoin(coin);
    }

    private spawCoins() {
        this.coins.children.each(coin => {
            this.disableCoin(coin as Phaser.Physics.Arcade.Sprite);
        });

        const rightEdge = this.cameras.main.scrollX + this.scale.width;
        let x = rightEdge + 100;
        const numCoins = Phaser.Math.Between(1, 20);

        for(let i = 0; i < numCoins; ++i) {
            const coin: Phaser.Physics.Arcade.Sprite = this.coins.get(
                x, 
                Phaser.Math.Between(100, this.scale.height - 100), 
                TextuerKeys.Coin
            );
            coin.setActive(true);
            coin.setVisible(true);

            const body = coin.body;
            body.setCircle(body.width * 0.5);
            body.enable = true;

            x += coin.width * 1.5;
        }
    }

    private disableCoin(coin: Phaser.Physics.Arcade.Sprite) {
        coin.body.enable = false;
        this.coins.killAndHide(coin);
    }

    private handleOverlapLaser(obj1: Phaser.GameObjects.GameObject, mouse: RocketMouse) {
        mouse.kill();
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

        this.wrapLaserObstacle();
    }

    private wrapDecoration(
        sprite: Phaser.GameObjects.Image | LaserObstacle,
        width: number,
        xLowerBound: number,
        xUpperBound: number
    ) {
        const { scrollX } = this.cameras.main;
        if (sprite.x + width < scrollX) {
            this.lastDecorationX += sprite.width + Phaser.Math.Between(xLowerBound, xUpperBound);
            sprite.x = this.lastDecorationX;
        }
    }

    private wrapLaserObstacle() {
        const scrollX = this.cameras.main.scrollX;
        const rightEdge = scrollX + this.scale.width;
        const body = this.laserObstacle.body;

        const width = body.width;
        if (this.laserObstacle.x + width < scrollX) {
            this.laserObstacle.x = Phaser.Math.Between(
                rightEdge + width,
                rightEdge + width + 1000
            );
            this.laserObstacle.y = Phaser.Math.Between(0, 300);

            // Manually reposition physics body as it is static 
            body.position.x = this.laserObstacle.x + body.offset.x;
            body.position.y = this.laserObstacle.y;
        }
    }
}