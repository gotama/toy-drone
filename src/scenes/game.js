import Phaser from 'phaser';
import Bullets from '../objects/bullet';
import Drone from '../objects/drone';
import PlaceOverlay from '../objects/placeoverlay';

/**
 * The Toy Drone main game scene.
 */
export default class Game extends Phaser.Scene {
    /**
     * constructor game with
     * @alias Bullets
     * @alias DataManager
     * @alias Drone
     * @alias PlaceOverlay
     */
    constructor() {
        super('game');
        this.bullets;
        this.bulletscore;
        this.drone;
        this.overylay;
    }

    /**
     * Create tile map with
     * @alias Phaser.Tilemaps.Tilemap
     * @alias Phaser.Tilemaps.Tileset
     * @alias Phaser.Tilemaps.TilemapLayer
     */
    create() {
        // TODO Animate drone
        // var oval = this.add.image(32 + 16, 32 + 16, 'oval');
        let tweenComplete = true;

        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('rover_ground', 'tiles');
        const layer = map.createLayer('Tile Layer 1', tileset, 8, 8);
        layer.setCollisionByProperty({ collidable: true });

        this.bullets = new Bullets(this);
        this.drone = new Drone(this, 0, 0, 'black_drone');
        this.overlay = new PlaceOverlay(this, 200, 200);

        const padSize = 40;
        const padX = 50;
        const padY = 550;

        const dPadLeft = this.add.rectangle(padX, padY, padSize, padSize, 0x000000);
        dPadLeft.setInteractive();
        dPadLeft.on('pointerdown', () => {
            if (tweenComplete && !this.overlay.placingDrone) {
                this.tweens.add({
                    targets: this.drone,
                    angle: this.drone.getRotateAngle(-90),
                    ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 800,
                    repeat: 0,
                    yoyo: false,
                    onStart: () => {
                        tweenComplete = false;
                    },
                    onComplete: () => {
                        tweenComplete = true;
                    },
                });
            }
        }, this);

        const dPadRight = this.add.rectangle(padX * 3, padY, padSize, padSize, 0x000000);
        dPadRight.setInteractive();
        dPadRight.on('pointerdown', () => {
            if (tweenComplete && !this.overlay.placingDrone) {
                this.tweens.add({
                    targets: this.drone,
                    angle: this.drone.getRotateAngle(90),
                    ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 800,
                    repeat: 0,
                    yoyo: false,
                    onStart: () => {
                        tweenComplete = false;
                    },
                    onComplete: () => {
                        tweenComplete = true;
                    },
                });
            }
        }, this);

        const dPadTop = this.add.rectangle(padX * 2, padY - padX, padSize, padSize, 0x000000);
        dPadTop.setInteractive();
        dPadTop.on('pointerdown', () => {
            if (tweenComplete && !this.overlay.placingDrone) {
                let tile;
                let xMove = this.drone.x;
                let yMove = this.drone.y;
                switch (this.drone.angle) {
                case 0:
                    tile = layer.getTileAtWorldXY(xMove, yMove - 32, true);
                    yMove -= 32;
                    break;
                case 90:
                    tile = layer.getTileAtWorldXY(xMove + 32, yMove, true);
                    xMove += 32;
                    break;
                case -180:
                    tile = layer.getTileAtWorldXY(xMove, yMove + 32, true);
                    yMove += 32;
                    break;
                case -90:
                    tile = layer.getTileAtWorldXY(xMove - 32, yMove, true);
                    xMove -= 32;
                    break;
                }

                if (tile.canCollide) {
                    //  Blocked, we can't move
                    // TODO ANIMATION JUICE
                } else {
                    this.tweens.add({
                        targets: this.drone,
                        x: xMove,
                        y: yMove,
                        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: 800,
                        repeat: 0,
                        yoyo: false,
                        onStart: () => {
                            tweenComplete = false;
                        },
                        onComplete: () => {
                            tweenComplete = true;
                        },
                    });
                }
            }
        }, this);

        const dPadBottom = this.add.rectangle(padX * 2, padY + padX, padSize, padSize, 0x000000);
        dPadBottom.setInteractive();
        dPadBottom.on('pointerdown', () => {
            if (!this.overlay.placingDrone) {
                this.overlay.activateOverlay(true);
                this.overlay.drone.activateDrone(true);
                this.drone.activateDrone(false);
                this.overlay.drone.x = this.drone.x;
                this.overlay.drone.y = this.drone.y;
            } else {
                const tile = layer.getTileAtWorldXY(this.overlay.drone.x, this.overlay.drone.y, true);
                if (tile && !tile.canCollide) {
                    this.overlay.activateOverlay(false);
                    this.overlay.drone.activateDrone(false);
                    this.drone.x = tile.pixelX + 24;
                    this.drone.y = tile.pixelY + 24;
                    this.drone.activateDrone(true);
                }
            }
        }, this);

        const attackButton = this.add.circle(300, 480, 20, 0x000000);
        attackButton.setInteractive();
        attackButton.on('pointerdown', () => {
            this.bullets.fireBullet(this.drone.x, this.drone.y);
        }, this);

        const reportButton = this.add.circle(270, 530, 20, 0x000000);
        reportButton.setInteractive();
        reportButton.on('pointerdown', () => {
            console.log('reportButton pointerdown');

            // const debugGraphics = this.add.graphics().setAlpha(0.7);
            // layer.renderDebug(debugGraphics, {
            //     tileColor: null,
            //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
            // });
        }, this);

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }
}
