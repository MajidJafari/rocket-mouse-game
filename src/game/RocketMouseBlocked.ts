import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';
import MouseState from '~/consts/MouseState';
import RocketMouse from './RocketMouse';

export default class RocketMouseBlocked {
    public up!: boolean;
    public none!: boolean;
    public left!: boolean;
    public right!: boolean;
    private _down!: boolean;

    set down(value: boolean) {
        this._down = value;
        if(value && this.rocketMouse?.mouseState === MouseState.Running) {
            this.rocketMouse?.mouse.play(AnimationKeys.RocketMouseRun, true);
        }
    }
    get down(): boolean {
        return this._down;
    }
    
    constructor(private rocketMouse: RocketMouse){}
}