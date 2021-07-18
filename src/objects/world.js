/**
 * World container to encapuslate the world logic
 */
export default class World extends Phaser.GameObjects.Container {
    /**
     * @param  {Phaser.Scene} scene
     * @param  {number} xOffset
     * @param  {number} yOffset
     */
    constructor(scene, xOffset, yOffset) {
        super(scene, xOffset, yOffset);

        const map = scene.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('rover_ground', 'tiles');

        this.world = map.createLayer('Tile Layer 1', tileset, xOffset, yOffset);
        this.world.setCollisionByProperty({ collidable: true });
    }

    /**
     * @param  {number} x drone cord
     * @param  {number} y drone cord
     * @return {Phaser.Tilemaps.Tile}
     */
    getTileAtXY(x, y) {
        return this.world.getTileAtWorldXY(x, y);
    }
}
