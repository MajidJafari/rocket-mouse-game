import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import MouseState from '~/consts/MouseState';
import SceneKeys from '~/consts/SceneKeys';
import RocketMouse from './RocketMouse';
export default class RocketMouseVelocity extends Phaser.Math.Vector2 {
    private _x!: number;
    // @ts-ignore
    set x(value: number) {
        this._x = value;
        if(value <= 5 && this.rocketMouse?.mouseState === MouseState.Killed) {
            this.rocketMouse.emit("dead");
        }
    }
    get x() {
        return this._x;
    }

    private _y!: number;
    // @ts-ignore
    set y(value: number) {
        this._y = value;
        if(value > 5 && this.rocketMouse?.mouseState === MouseState.Running) {
            this.rocketMouse?.mouse.play(AnimationKeys.RocketMouseFall, true);
        }
    }
    get y() {
        return this._y;
    }
    constructor(private rocketMouse: RocketMouse) {
        super();
    }
}