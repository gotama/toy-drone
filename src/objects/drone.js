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
        return this.angle + angleTo;
    }
}
