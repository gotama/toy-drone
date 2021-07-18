/**
 * Drone
 */
export default class Drone extends Phaser.Physics.Arcade.Image {
    /**
     * @param  {Phaser.Scene} scene
     * @param  {number} x
     * @param  {number} y
     * @param {string} textureKey
     */
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);

        scene.add.existing(this);
        this.x = 8 + 16 + 32;
        this.y = 8 + 16 + 32;
        this.activateDrone(false);
        this.heading = 'NORTH';
    }

    /**
     * @param  {boolean} on
     */
    activateDrone(on) {
        this.setActive(on);
        this.setVisible(on);
    }

    /**
     * @param  {number} angleTo
     * @return {number}
     */
    getRotateAngle(angleTo) {
        const angleToReturn = this.angle + angleTo;
        switch (angleToReturn) {
        case 0:
            this.heading = 'NORTH';
            break;
        case 90:
        case -270:
            this.heading = 'EAST';
            break;
        case 180:
        case -180:
            this.heading = 'SOUTH';
            break;
        case -90:
            this.heading = 'WEST';
            break;
        }
        return angleToReturn;
    }

    /**
     * Checks one tile forward to confirm forward movement
     * @param  {number} tilesForward
     * @return {boolean}
     */
    checkForward(tilesForward) {
        let xMove = this.x;
        let yMove = this.y;
        const modifier = this.scene.tileSize * tilesForward;

        switch (this.angle) {
        case 0:
            yMove -= modifier;
            break;
        case 90:
            xMove += modifier;
            break;
        case -180:
            yMove += modifier;
            break;
        case -90:
            xMove -= modifier;
            break;
        }

        const targetTile = this.scene.world.getTileAtXY(xMove, yMove);
        if (targetTile && !targetTile.canCollide) {
            console.log(`angle: ${this.angle} - xMove: ${xMove} - yMove: ${yMove} TRUE`);
            return true;
        } else {
            console.log(`angle: ${this.angle} - xMove: ${xMove} - yMove: ${yMove} FALSE`);
            return false;
        }
    }
}
