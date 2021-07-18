import Drone from '../objects/drone';

/**
 * Place Overlay container to give the player the ability to place a drone
 */
export default class PlaceOverlay extends Phaser.GameObjects.Container {
    /**
     * @param  {Phaser.Scene} scene
     * @param  {number} x
     * @param  {number} y
     */
    constructor(scene, x, y) {
        super(scene, x, y);

        this.placingDrone = false;
        this.background = scene.add.rectangle(x, y, 384, 384, 0x000000, 0.8);
        this.drone = new Drone(scene, 0, 0, 'yellow_drone');
        this.drone.setInteractive();
        scene.input.setDraggable(this.drone);
        scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.activateOverlay(false);
    }

    /**
     * @param  {boolean} on
     */
    activateOverlay(on) {
        this.background.setActive(on);
        this.background.setVisible(on);
        this.placingDrone = on;
    }
}
