import Phaser from 'phaser';
import groundTiles from '../assets/ground_1x1.png';
import map from '../assets/rover_ground_map.json';
import blackDrone from '../assets/black_drone.png';
import yellowDrone from '../assets/yellow_drone.png';
import oval from '../assets/oval.png';
import redBullet from '../assets/red_bullet.png';

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        this.load.tilemapTiledJSON('map', map);
        this.load.image('tiles', groundTiles);
        this.load.image('black_drone', blackDrone);
        this.load.image('yellow_drone', yellowDrone);
        this.load.image('oval', oval);
        this.load.image('red_bullet', redBullet);
    }

    create() {
        this.scene.start('game');
    }
}