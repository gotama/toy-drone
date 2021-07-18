/**
 * Console
 */
export default class Console extends Phaser.GameObjects.Container {
    /**
     * @param  {Phaser.Scene} scene
     * @param  {number} consoleX
     * @param  {number} consoleY
     * @param  {string} initialText
     * @param  {number} padX
     * @param  {number} padY
     * @param  {number} padSize
     */
    constructor(scene, consoleX, consoleY, initialText, padX, padY, padSize) {
        super(scene, consoleX, consoleY);

        this.consoleWindow = this.scene.add.rectangle(consoleX, consoleY, 350, 100, 0x000000);
        const consoleTextConfig = {
            x: 40,
            y: 415,
            text: initialText,
            style: {
                fontSize: '15px',
                fontFamily: 'Arial',
                color: '#00FF00',
                align: 'left',
                fontStyle: 'bold',
                maxLines: 4,
            },
        };
        this.consoleText = this.scene.make.text(consoleTextConfig);
        this.consoleText.setWordWrapWidth(325, false);

        this.placeDronePad = this.scene.add.image(padX *2, padY + padX, 'place_icon');
        this.placeDronePad.setInteractive();
        this.placeDronePad.on('pointerdown', () => {
            if (scene.animationComplete) {
                if (!scene.overlay.placingDrone) {
                    this.updateForwardButton(scene, true);
                    this.updatePlaceButton(0);
                    this.activateDroneControls(false);
                    scene.overlay.activateOverlay(true);
                    scene.overlay.drone.activateDrone(true);
                    scene.drone.activateDrone(false);
                    scene.overlay.drone.x = scene.drone.x;
                    scene.overlay.drone.y = scene.drone.y;
                    scene.overlay.drone.angle = scene.drone.angle;
                    scene.overlay.drone.heading = scene.drone.heading;
                } else {
                    const tile = scene.world.getTileAtXY(scene.overlay.drone.x, scene.overlay.drone.y);
                    if (tile && !tile.canCollide) {
                        this.updatePlaceButton(2);
                        this.activateDroneControls(true);
                        scene.overlay.activateOverlay(false);
                        scene.overlay.drone.activateDrone(false);
                        scene.drone.x = tile.pixelX + scene.targetOffset;
                        scene.drone.y = tile.pixelY + scene.targetOffset;
                        scene.drone.angle = scene.overlay.drone.angle;
                        scene.drone.heading = scene.overlay.drone.heading;
                        scene.drone.activateDrone(true);
                        this.updateForwardButton(scene, false);
                    } else {
                        this.updatePlaceButton(1);
                    }
                }
            }
        }, this.scene);

        this.rotateLeftPad = this.scene.add.image(padX, padY, 'rotate_left');
        this.rotateLeftPad.setAlpha(0.5, 0.5, 0.5, 0.5);
        this.rotateLeftPad.on('pointerdown', () => {
            if (scene.animationComplete) {
                if (scene.overlay.placingDrone) {
                    scene.overlay.drone.angle = scene.overlay.drone.getRotateAngle(-90);
                    this.updateForwardButton(scene, true);
                } else {
                    scene.tweens.add({
                        targets: scene.drone,
                        angle: scene.drone.getRotateAngle(-90),
                        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: 800,
                        repeat: 0,
                        yoyo: false,
                        onStart: () => {
                            scene.animationComplete = false;
                        },
                        onComplete: () => {
                            scene.animationComplete = true;
                            this.updateForwardButton(scene, false);
                        },
                    });
                }
            }
        }, this.scene);

        this.rotateRightPad = this.scene.add.image(padX * 3, padY, 'rotate_right');
        this.rotateRightPad.setAlpha(0.5, 0.5, 0.5, 0.5);
        this.rotateRightPad.on('pointerdown', () => {
            if (scene.animationComplete) {
                console.log('placingDrone: ', scene.overlay.placingDrone);
                if (scene.overlay.placingDrone) {
                    scene.overlay.drone.angle = scene.overlay.drone.getRotateAngle(90);
                    this.updateForwardButton(scene, true);
                } else {
                    scene.tweens.add({
                        targets: scene.drone,
                        angle: scene.drone.getRotateAngle(90),
                        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: 800,
                        repeat: 0,
                        yoyo: false,
                        onStart: () => {
                            scene.animationComplete = false;
                        },
                        onComplete: () => {
                            scene.animationComplete = true;
                            this.updateForwardButton(scene, false);
                        },
                    });
                }
            }
        }, this.scene);

        this.moveForwardPad = this.scene.add.image(padX * 2, padY - padX, 'forward_block');
        this.moveForwardPad.setAlpha(0.5, 0.5, 0.5, 0.5);
        this.moveForward = false;
        this.moveForwardPad.on('pointerdown', () => {
            if (scene.animationComplete) {
                if (this.moveForward) {
                    this.updateText('Rogerwilco.');
                    let xMove = scene.drone.x;
                    let yMove = scene.drone.y;
                    switch (scene.drone.angle) {
                    case 0:
                        yMove -= scene.tileSize;
                        break;
                    case 90:
                        xMove += scene.tileSize;
                        break;
                    case -180:
                        yMove += scene.tileSize;
                        break;
                    case -90:
                        xMove -= scene.tileSize;
                        break;
                    }

                    scene.tweens.add({
                        targets: scene.drone,
                        x: xMove,
                        y: yMove,
                        ease: 'Linear', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        duration: 800,
                        repeat: 0,
                        yoyo: false,
                        onStart: () => {
                            scene.animationComplete = false;
                        },
                        onComplete: () => {
                            scene.animationComplete = true;
                            this.updateForwardButton(scene, false);
                        },
                    });
                }
            }
        }, this.scene);

        this.attackButton = this.scene.add.image(320, 570, 'attack_button');
        this.attackButton.setAlpha(0.5, 0.5, 0.5, 0.5);
        this.attackButton.on('pointerdown', () => {
            if (scene.animationComplete) {
                let xMove = scene.drone.x;
                let yMove = scene.drone.y;
                switch (scene.drone.angle) {
                case 0:
                    yMove -= scene.tileSize * 2;
                    break;
                case 90:
                    xMove += scene.tileSize * 2;
                    break;
                case -180:
                    yMove += scene.tileSize * 2;
                    break;
                case -90:
                    xMove -= scene.tileSize * 2;
                    break;
                }
                const targetTile = scene.world.getTileAtXY(xMove, yMove);
                if (targetTile && !targetTile.canCollide) {
                    this.updateText('BOMBS AWAY!!');
                    scene.bullets.fireBullet(
                        scene.drone.x, scene.drone.y,
                        scene.drone.angle,
                        targetTile.pixelX, targetTile.pixelY);
                }
            }
        }, this.scene);

        this.reportButton = this.scene.add.image(270, 640, 'report_button');
        this.reportButton.setAlpha(0.5, 0.5, 0.5, 0.5);
        this.reportButton.on('pointerdown', () => {
            const tile = scene.world.getTileAtXY(this.scene.drone.x, this.scene.drone.y);
            this.updateText(`Drone Report\nHeading: ${scene.drone.heading}\nCoordinates: x${tile.x} y${tile.y}`);
        }, this.scene);
    }

    /**
     * Sets the text on the users console output
     * @param  {string} text
     */
    updateText(text) {
        this.consoleText.setText(text);
    }

    /**
     * Specific control over the buttons to ensure business requirement is met.
     * @param  {boolean} on
     */
    activateDroneControls(on) {
        if (on) {
            this.rotateLeftPad.setAlpha(1, 1, 1, 1);
            this.rotateLeftPad.setInteractive();

            this.rotateRightPad.setAlpha(1, 1, 1, 1);
            this.rotateRightPad.setInteractive();

            this.moveForwardPad.setAlpha(1, 1, 1, 1);
            this.moveForwardPad.setInteractive();

            this.reportButton.setAlpha(1, 1, 1, 1);
            this.reportButton.setInteractive();

            this.attackButton.setAlpha(1, 1, 1, 1);
            this.attackButton.setInteractive();
        } else {
            this.rotateLeftPad.setAlpha(0.5, 0.5, 0.5, 0.5);
            this.rotateLeftPad.setInteractive();

            this.rotateRightPad.setAlpha(0.5, 0.5, 0.5, 0.5);
            this.rotateRightPad.setInteractive();

            this.moveForwardPad.setAlpha(0.5, 0.5, 0.5, 0.5);
            this.moveForwardPad.disableInteractive();

            this.reportButton.setAlpha(0.5, 0.5, 0.5, 0.5);
            this.reportButton.disableInteractive();

            this.attackButton.setAlpha(0.5, 0.5, 0.5, 0.5);
            this.attackButton.disableInteractive();
        }
    }

    /**
     * Controls the state of the place button
     *
     *  State 0:   Start
     *
     *  State 1:   Warning
     *
     *  State 2:   Done
     *
     *
     * @param  {number} state
     */
    updatePlaceButton(state) {
        switch (state) {
        case 0:
            // eslint-disable-next-line max-len
            this.updateText('Drag the YELLOW DRONE to your desired location.\nYou can also rotate to choose your direction.');
            this.placeDronePad.setTexture('place_check');
            break;
        case 1:
            this.updateText('This is not a safe place to deploy the drone.');
            this.placeDronePad.setTexture('place_warning');
            break;
        case 2:
            this.placeDronePad.setTexture('place_icon');
            break;
        }
    }

    /**
     * Controls the state of the forward button
     * @param  {Phaser.Scene} scene object referenced from the Game main scene
     * @param {boolean} isOverlay
     */
    updateForwardButton(scene, isOverlay) {
        if (isOverlay) {
            this.moveForward = scene.overlay.drone.checkForward(1);
        } else {
            this.moveForward = scene.drone.checkForward(1);
        }
        if ( this.moveForward) {
            this.updateText('You are clear to move forward.');
            this.moveForwardPad.setTexture('forward_ready');
        } else {
            this.updateText('The way forward is blocked.');
            this.moveForwardPad.setTexture('forward_block');
        }
    }
}
