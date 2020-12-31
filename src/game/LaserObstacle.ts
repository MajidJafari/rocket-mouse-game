import Phaser from 'phaser'
import TextuerKeys from '~/consts/TextureKeys';

export default class LaserObstacle extends Phaser.GameObjects.Container {
    body!: Phaser.Physics.Arcade.StaticBody;
    top!: Phaser.GameObjects.Image;
    middle!: Phaser.GameObjects.Image;
    bottom!: Phaser.GameObjects.Image;

    constructor(public scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.addParts();
        this.handlePhysics();
    }

    private handlePhysics() {
        this.scene.physics.add.existing(this, true);
        const { body, top, middle, bottom } = this;
        const width = top.displayWidth;
        const height = top.displayHeight + middle.displayHeight + bottom.displayHeight;

        body.setSize(width, height);
        body.setOffset(width * -0.5, 0);

        // reposition body
        body.position.x = this.x + body.offset.x;
        body.position.y = this.y;
    }

    private addParts() {
        this.top = this.addPartImage(TextuerKeys.LaserEnd, { y:0, displayHeight: 0 });
        this.middle = this.addPartImage(TextuerKeys.LaserMiddle, this.top);
        this.middle.setDisplaySize(this.middle.width, 200);
        this.bottom = this.addPartImage(TextuerKeys.LaserEnd, this.middle, true);

        this.add(this.top);
        this.add(this.middle);
        this.add(this.bottom);    
    }

    private addPartImage(key: TextuerKeys, gameObject: {y: number, displayHeight: number}, flip = false) {
        return this.scene.add.image(0, gameObject.y + gameObject.displayHeight, key)
        .setOrigin(0.5, 0)
        .setFlipY(flip);
    }
}