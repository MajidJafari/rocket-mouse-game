import Phaser from 'phaser'
import TextuerKeys from '~/consts/TextureKeys';

export default class LaserObstacle extends Phaser.GameObjects.Container {
    top!: Phaser.GameObjects.Image;
    middle!: Phaser.GameObjects.Image;
    bottom!: Phaser.GameObjects.Image;

    constructor(public scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.addParts();
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