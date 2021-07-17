class DroneSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'black_drone');
    }

    fire(x, y) {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.y <= -32) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}

export default class Drones extends Phaser.Physics.Arcade.Group {
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 2,
            key: 'drones',
            active: false,
            visible: false,
            classType: DroneSprite
        });
    }

    fireBullet(x, y) {
        let bullet = this.getFirstDead(false);

        if (bullet) {
            bullet.fire(x, y);
        }
    }
}