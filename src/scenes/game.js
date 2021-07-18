import Phaser from 'phaser';
import Bullets from '../objects/bullet';
import Drone from '../objects/drone';
import PlaceOverlay from '../objects/placeoverlay';
import World from '../objects/world';
import Console from '../objects/console';

/**
 * The Toy Drone main game scene.
 */
export default class Game extends Phaser.Scene {
    /**
     * constructor game with
     * @alias bullets.Bullets
     * @alias bulletscore.DataManager
     * @alias drone.Drone
     * @alias overylay.PlaceOverlay
     * @alias world.Phaser.Tilemaps.TilemapLayer
     * @alias console.Phaser.GameObjects.Text
     */
    constructor() {
        super('game');
        this.bullets;
        this.bulletscore;
        this.drone;
        this.overylay;
        this.world;
        this.console;
        this.animationComplete = true;
        this.targetOffset = 24;
        this.tileSize = 32;
    }

    /**
     * Create tile map with
     * @alias Phaser.Tilemaps.Tilemap
     * @alias Phaser.Tilemaps.Tileset
     * @alias Phaser.Tilemaps.TilemapLayer
     */
    create() {
        this.world = new World(this, 8, 8);
        this.bullets = new Bullets(this);
        this.drone = new Drone(this, 0, 0, 'black_drone');
        this.overlay = new PlaceOverlay(this, 200, 200);
        this.console = new Console(this, 200, 450,
            'Hello pilot.\nSelect the place button and find a suitable landing site for the drone.',
            50, 600, 40);
    }
}
