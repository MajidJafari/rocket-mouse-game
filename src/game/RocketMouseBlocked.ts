import Phaser from 'phaser'
import AnimationKeys from '~/consts/AnimationKeys';

export default class RocketMouseBlocked {
    public up!: boolean;
    public none!: boolean;
    public left!: boolean;
    public right!: boolean;
    private _down!: boolean;

    set down(value: boolean) {
        this._down = value;
        if(value) {
            this.mouse.play(AnimationKeys.RocketMouseRun, true);
        }
    }
    get down(): boolean {
        return this._down;
    }
    
    constructor(private mouse: Phaser.GameObjects.Sprite){}
}