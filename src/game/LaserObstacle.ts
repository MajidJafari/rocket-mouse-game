import Phaser from 'phaser'
import TextuerKeys from '~/consts/TextureKeys';

export default class LaserObstacle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        const top = scene.add.image(0, 0, TextuerKeys.LaserEnd)
            .setOrigin(0.5, 0);
        const middle = scene.add.image(0, top.y + top.displayHeight, TextuerKeys.LaserMiddle)
            .setOrigin(0.5, 0);
        middle.setDisplaySize(middle.width, 200);
        const bottom = scene.add.image(0, middle.y + middle.displayHeight, TextuerKeys.LaserEnd)
            .setOrigin(0.5, 0)
            .setFlipY(true);
            
        this.add(top);
        this.add(middle);
        this.add(bottom);    
    }
}