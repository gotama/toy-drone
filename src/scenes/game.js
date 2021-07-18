import Phaser from 'phaser';
import Bullets from '../objects/bullet';
import Drone from '../objects/drone';
import PlaceOverlay from '../objects/placeoverlay';
import World from '../objects/world';

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
     */
    constructor() {
        super('game');
        this.bullets;
        this.bulletscore;
        this.drone;
        this.overylay;
        this.world;
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

        this.world = new World(this, 8, 8);
        this.bullets = new Bullets(this);
        this.drone = new Drone(this, 0, 0, 'black_drone');
        // TODO red overlay when error place
        this.overlay = new PlaceOverlay(this, 200, 200);

        const tileSize = 32;
        const padSize = 40;
        const padX = 50;
        const padY = 550;

        const placeDronePad = this.add.rectangle(padX * 2, padY + padX, padSize, padSize, 0x000000);
        placeDronePad.setInteractive();
        placeDronePad.on('pointerdown', () => {
            if (tweenComplete) {
                if (!this.overlay.placingDrone) {
                    this.overlay.activateOverlay(true);
                    this.overlay.drone.activateDrone(true);
                    this.drone.activateDrone(false);
                    this.overlay.drone.x = this.drone.x;
                    this.overlay.drone.y = this.drone.y;
                    this.overlay.drone.angle = this.drone.angle;
                    this.overlay.drone.heading = this.drone.heading;
                } else {
                    const tile = this.world.getTileAtXY(this.overlay.drone.x, this.overlay.drone.y);
                    if (tile && !tile.canCollide) {
                        this.overlay.activateOverlay(false);
                        this.overlay.drone.activateDrone(false);
                        this.drone.x = tile.pixelX + 24;
                        this.drone.y = tile.pixelY + 24;
                        this.drone.angle = this.overlay.drone.angle;
                        this.drone.heading = this.overlay.drone.heading;
                        this.drone.activateDrone(true);
                    }
                }
            }
        }, this);

        const rotateLeftPad = this.add.rectangle(padX, padY, padSize, padSize, 0x000000);
        rotateLeftPad.setInteractive();
        rotateLeftPad.on('pointerdown', () => {
            if (tweenComplete) {
                if (this.overlay.placingDrone) {
                    this.overlay.drone.angle = this.overlay.drone.getRotateAngle(-90);
                } else {
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
            }
        }, this);

        const rotateRightPad = this.add.rectangle(padX * 3, padY, padSize, padSize, 0x000000);
        rotateRightPad.setInteractive();
        rotateRightPad.on('pointerdown', () => {
            if (tweenComplete) {
                if (this.overlay.placingDrone) {
                    this.overlay.drone.angle = this.overlay.drone.getRotateAngle(90);
                } else {
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
            }
        }, this);

        const moveForwardPad = this.add.rectangle(padX * 2, padY - padX, padSize, padSize, 0x000000);
        moveForwardPad.setInteractive();
        moveForwardPad.on('pointerdown', () => {
            if (tweenComplete && !this.overlay.placingDrone) {
                let xMove = this.drone.x;
                let yMove = this.drone.y;
                switch (this.drone.angle) {
                case 0:
                    yMove -= tileSize;
                    break;
                case 90:
                    xMove += tileSize;
                    break;
                case -180:
                    yMove += tileSize;
                    break;
                case -90:
                    xMove -= tileSize;
                    break;
                }

                if (this.world.getTileAtXY(xMove, yMove).canCollide) {
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

        const attackButton = this.add.circle(300, 480, 20, 0x000000);
        attackButton.setInteractive();
        attackButton.on('pointerdown', () => {
            if (tweenComplete) {
                let xMove = this.drone.x;
                let yMove = this.drone.y;
                switch (this.drone.angle) {
                case 0:
                    yMove -= tileSize * 2;
                    break;
                case 90:
                    xMove += tileSize * 2;
                    break;
                case -180:
                    yMove += tileSize * 2;
                    break;
                case -90:
                    xMove -= tileSize * 2;
                    break;
                }
                const targetTile = this.world.getTileAtXY(xMove, yMove);
                if (targetTile && !targetTile.canCollide) {
                    console.log(`TargetTileX: ${targetTile.pixelX} TargetTIleY: ${targetTile.pixelY}`);
                    console.log(`TargetTileX: ${targetTile.x} TargetTIleY: ${targetTile.y}`);
                    this.bullets.fireBullet(
                        this.drone.x, this.drone.y,
                        this.drone.angle,
                        targetTile.pixelX, targetTile.pixelY);
                }
            }
        }, this);

        const reportButton = this.add.circle(270, 530, 20, 0x000000);
        reportButton.setInteractive();
        reportButton.on('pointerdown', () => {
            const tile = this.world.getTileAtXY(this.drone.x, this.drone.y);
            const reportCard = {
                direction: this.drone.heading,
                x: tile.x,
                y: tile.y,
            };

            console.log('reportButton: ', reportCard);
            // const debugGraphics = this.add.graphics().setAlpha(0.7);
            // layer.renderDebug(debugGraphics, {
            //     tileColor: null,
            //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
            // });
        }, this);
    }
}
