import Phaser from 'phaser';
import Bullets from '../objects/bullet';

export default class Game extends Phaser.Scene {
    constructor() {
        super('game');
        this.bullets;
    }

    preload() { }

    create() {


        var placingDrone = false;
        var tweenComplete = true;

        var map = this.make.tilemap({ key: 'map' });
        var tileset = map.addTilesetImage('rover_ground', 'tiles');
        var layer = map.createLayer('Tile Layer 1', tileset, 8, 8);
        layer.setCollisionByProperty({ collidable: true });

        var droneX = 8 + 16 + 32;
        var droneY = 8 + 16 + 32;
        var overlay = this.add.rectangle(200, 200, 384, 384, 0x000000, 0.8).setActive(false).setVisible(false);
        var blackDrone = this.add.image(droneX, droneY, 'black_drone').setActive(false).setVisible(false);
        var yellowDrone = this.add.image(droneX, droneY, 'yellow_drone').setActive(false).setVisible(false);
        yellowDrone.setInteractive();
        this.input.setDraggable(yellowDrone);

        this.add.group
        // var oval = this.add.image(32 + 16, 32 + 16, 'oval');


        var padSize = 40;
        var padX = 50;
        var padY = 550;

        var dPadLeft = this.add.rectangle(padX, padY, padSize, padSize, 0x000000);
        dPadLeft.setInteractive();
        dPadLeft.on('pointerdown', function () {
            if (tweenComplete && !placingDrone) {
                this.tweens.add({
                    targets: blackDrone,
                    angle: blackDrone.angle + -90,
                    ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 800,
                    repeat: 0,
                    yoyo: false,
                    onStart: function () {
                        tweenComplete = false;
                    },
                    onComplete: function () {
                        tweenComplete = true;
                    },
                });
            }
        }, this);

        var dPadRight = this.add.rectangle(padX * 3, padY, padSize, padSize, 0x000000);
        dPadRight.setInteractive();
        dPadRight.on('pointerdown', function () {
            if (tweenComplete && !placingDrone) {
                this.tweens.add({
                    targets: blackDrone,
                    angle: blackDrone.angle + 90,
                    ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 800,
                    repeat: 0,
                    yoyo: false,
                    onStart: function () {
                        tweenComplete = false;
                    },
                    onComplete: function () {
                        tweenComplete = true;
                    },
                });
            }
        }, this);

        var dPadTop = this.add.rectangle(padX * 2, padY - padX, padSize, padSize, 0x000000);
        dPadTop.setInteractive();
        dPadTop.on('pointerdown', function () {
            if (tweenComplete && !placingDrone) {
                var tile;
                var xMove = blackDrone.x;
                var yMove = blackDrone.y;
                switch (blackDrone.angle) {
                    case 0:
                        tile = layer.getTileAtWorldXY(blackDrone.x, blackDrone.y - 32, true);
                        yMove -= 32;
                        break;
                    case 90:
                        tile = layer.getTileAtWorldXY(blackDrone.x + 32, blackDrone.y, true);
                        xMove += 32;
                        break;
                    case -180:
                        tile = layer.getTileAtWorldXY(blackDrone.x, blackDrone.y + 32, true);
                        yMove += 32;
                        break;
                    case -90:
                        tile = layer.getTileAtWorldXY(blackDrone.x - 32, blackDrone.y, true);
                        xMove -= 32;
                        break;
                }

                if (tile.canCollide) {
                    //  Blocked, we can't move
                    // TODO ANIMATION JUICE
                } else {
                    this.tweens.add({
                        targets: blackDrone,
                        x: xMove,
                        y: yMove,
                        ease: "Linear", // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: 800,
                        repeat: 0,
                        yoyo: false,
                        onStart: function () {
                            tweenComplete = false;
                        },
                        onComplete: function () {
                            tweenComplete = true;
                        },
                    });
                }
            }
        }, this);

        var dPadBottom = this.add.rectangle(padX * 2, padY + padX, padSize, padSize, 0x000000);
        dPadBottom.setInteractive();
        dPadBottom.on('pointerdown', function (pointer) {
            if (!placingDrone) {
                overlay.setActive(true).setVisible(true);
                yellowDrone.setActive(true).setVisible(true);
                blackDrone.setActive(false).setVisible(false);
                yellowDrone.x = blackDrone.x;
                yellowDrone.y = blackDrone.y;
                placingDrone = true;
            } else {
                console.log(`Yellow Drone - x: ${yellowDrone.x} - y: ${yellowDrone.y}`);
                var tile = layer.getTileAtWorldXY(yellowDrone.x, yellowDrone.y, true);
                if (tile && !tile.canCollide) {
                    overlay.setActive(false).setVisible(false);
                    yellowDrone.setActive(false).setVisible(false);
                    placingDrone = false;
                    console.log(`Tile - pixelX: ${tile.pixelX} - pixelY: ${tile.pixelY}`);
                    blackDrone.x = tile.pixelX + 24;
                    blackDrone.y = tile.pixelY + 24;
                    console.log(`Black Drone - x: ${blackDrone.x} - y: ${blackDrone.y}`);
                    blackDrone.setActive(true).setVisible(true);
                }
            }
        }, this);

        this.bullets = new Bullets(this);
        var attackButton = this.add.circle(300, 480, 20, 0x000000);
        attackButton.setInteractive();
        attackButton.on('pointerdown', function () {
            var tile;
            var xMove = blackDrone.x;
            var yMove = blackDrone.y;
            switch (blackDrone.angle) {
                case 0:
                    tile = layer.getTileAtWorldXY(blackDrone.x, blackDrone.y - 32, true);
                    yMove -= 32;
                    break;
                case 90:
                    tile = layer.getTileAtWorldXY(blackDrone.x + 32, blackDrone.y, true);
                    xMove += 32;
                    break;
                case -180:
                    tile = layer.getTileAtWorldXY(blackDrone.x, blackDrone.y + 32, true);
                    yMove += 32;
                    break;
                case -90:
                    tile = layer.getTileAtWorldXY(blackDrone.x - 32, blackDrone.y, true);
                    xMove -= 32;
                    break;
            }
            if (!tile.canCollide) {
                this.bullets.fireBullet(blackDrone.x, blackDrone.y);
            }

            
        }, this);

        var reportButton = this.add.circle(270, 530, 20, 0x000000);
        reportButton.setInteractive();
        reportButton.on('pointerdown', function () {
            console.log('reportButton pointerdown');

            // const debugGraphics = this.add.graphics().setAlpha(0.7);
            // layer.renderDebug(debugGraphics, {
            //     tileColor: null,
            //     collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
            // });


        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;

        });
    }
}
