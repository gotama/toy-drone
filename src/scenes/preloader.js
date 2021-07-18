import groundTiles from '../assets/ground_1x1.png';
import map from '../assets/rover_ground_map.json';
import blackDrone from '../assets/black_drone.png';
import yellowDrone from '../assets/yellow_drone.png';
import oval from '../assets/oval.png';
import redBullet from '../assets/red_bullet.png';
import placeIcon from '../assets/place_icon.png';
import placeCheck from '../assets/place_check.png';
import placeWarning from '../assets/place_warning.png';
import rotateLeft from '../assets/rotate_left.png';
import rotateRight from '../assets/rotate_right.png';
import forwardReady from '../assets/forward_ready.png';
import forwardBlock from '../assets/forward_block.png';
import attackButton from '../assets/attack_button.png';
import reportButton from '../assets/report_button.png';
import explosion from '../assets/explosion.png';

/**
 * Preloading assets
 */
export default class Preloader extends Phaser.Scene {
    /**
    * construct preloader
    */
    constructor() {
        super('preloader');
    }

    /**
    * preload assets
    */
    preload() {
        this.load.tilemapTiledJSON('map', map);
        this.load.image('tiles', groundTiles);
        this.load.image('black_drone', blackDrone);
        this.load.image('yellow_drone', yellowDrone);
        this.load.image('oval', oval);
        this.load.image('red_bullet', redBullet);
        this.load.image('place_icon', placeIcon);
        this.load.image('place_check', placeCheck);
        this.load.image('place_warning', placeWarning);
        this.load.image('rotate_left', rotateLeft);
        this.load.image('rotate_right', rotateRight);
        this.load.image('forward_ready', forwardReady);
        this.load.image('forward_block', forwardBlock);
        this.load.image('attack_button', attackButton);
        this.load.image('report_button', reportButton);
        this.load.spritesheet('boom', explosion, { frameWidth: 64, frameHeight: 64, endFrame: 23 });
    }

    /**
    * Finished preloading, start game.
    */
    create() {
        this.scene.start('game');
    }
}
