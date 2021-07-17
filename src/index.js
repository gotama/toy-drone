import Phaser from 'phaser';

import Boot from './scenes/boot';
import Preloader from './scenes/preloader';
import Game from './scenes/game';

const config = {
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravitiy: { y: 0 }
        }
    },
    backgroundColor: '#FFDB6B',
    scene: [Boot, Preloader, Game],
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'toy-drone',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 400,
        height: 720
    },
};

const game = new Phaser.Game(config);
