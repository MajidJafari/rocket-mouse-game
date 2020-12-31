import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
export default class RocketMouseVelocity extends Phaser.Math.Vector2 {
    private _y!: number;
    // @ts-ignore
    set y(value: number) {
        this._y = value;
        if(value > 5) {
            this.mouse.play(AnimationKeys.RocketMouseFall, true);
        }
    }
    get y() {
        return this._y;
    }
    constructor(private mouse: Phaser.GameObjects.Sprite) {
        super();
    }
}