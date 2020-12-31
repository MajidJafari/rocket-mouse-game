import Phaser from 'phaser'
import TextuerKeys from '~/consts/TextureKeys';
import AnimationKeys from '~/consts/AnimationKeys';

export default class RocketMouse extends Phaser.GameObjects.Container {
    mouse!: Phaser.GameObjects.Sprite;
    flames!: Phaser.GameObjects.Sprite;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        // create the flames and play the animation
        this.addFlames(scene);
        this.addMouse(scene);
        this.handlePhysics(scene);
        
    }

    private handlePhysics(scene: Phaser.Scene) {
        scene.physics.add.existing(this);
        const mouse = this.mouse;
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(mouse.width, mouse.height);
        body.setOffset(mouse.width * -0.5, -mouse.height);
    }

    private addFlames(scene: Phaser.Scene) {
        this.flames = scene.add.sprite(-63, -15, TextuerKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn);
        this.add(this.flames);
    }

    private addMouse(scene: Phaser.Scene) {
        this.mouse = scene.add.sprite(0, 0, TextuerKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun);

        this.add(this.mouse);
    }
}