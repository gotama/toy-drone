/**
 * Entry point to set keys on the [Phaser.Data.DataManager]
 */
export default class Boot extends Phaser.Scene {
    /**
     * Construct boot
     */
    constructor() {
        super('boot');
    }

    /**
     * Do nothing atm
     */
    preload() {
        console.log('Booting...');
    }

    /**
     * Set bulletscore key then start preloader
     */
    create() {
        // TODO finish state manangement
        this.registry.set('bulletscore', 0);

        this.scene.start('preloader');
    }
}
