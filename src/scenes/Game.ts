import Phaser from 'phaser'

enum GameImages {
    Background = "background"
}

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }

    preload() {
        this.load.image(GameImages.Background, "house/bg_repeat_340x640.png")
    }

    create() {
        const { width, height } = this.scale;
        this.add.tileSprite(0, 0, width, height, GameImages.Background).setOrigin(0);
    }
}