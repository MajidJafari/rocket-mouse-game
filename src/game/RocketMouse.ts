import Phaser from 'phaser'
import TextuerKeys from '~/consts/TextureKeys';
import AnimationKeys from '~/consts/AnimationKeys';

export default class RocketMouse extends Phaser.GameObjects.Container {
    body!: Phaser.Physics.Arcade.Body;
    mouse!: Phaser.GameObjects.Sprite;
    flames!: Phaser.GameObjects.Sprite;
    cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        // create the flames and play the animation
        this.addFlames(scene);
        this.addMouse(scene);
        this.handlePhysics(scene);
        this.handleSpaceKey(scene);
    }

    private handleSpaceKey(scene: Phaser.Scene) {
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.cursors.space.on("down", () => {
            this.body.setAccelerationY(-600);
            this.enableJetpack(true);
        });
        this.cursors.space.on("up", () => {
            this.body.setAccelerationY(0);
            this.enableJetpack(false);
        });
    }

    private handlePhysics(scene: Phaser.Scene) {
        scene.physics.add.existing(this);
        const mouse = this.mouse;
        this.body.setSize(mouse.width, mouse.height);
        this.body.setOffset(mouse.width * -0.5, -mouse.height);
    }

    private addFlames(scene: Phaser.Scene) {
        this.flames = scene.add.sprite(-63, -15, TextuerKeys.RocketMouse)
            .play(AnimationKeys.RocketFlamesOn);
        this.enableJetpack(false);    
        this.add(this.flames);
    }

    private addMouse(scene: Phaser.Scene) {
        this.mouse = scene.add.sprite(0, 0, TextuerKeys.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys.RocketMouseRun);

        this.add(this.mouse);
    }

    public enableJetpack(enabled: boolean) {
        this.flames.setVisible(enabled);
    }
}