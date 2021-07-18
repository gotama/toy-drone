/**
 * BulletSprite
 */
class BulletSprite extends Phaser.Physics.Arcade.Sprite {
    /**
     * @param  {Phaser.Scene} scene
     * @param  {number} x
     * @param  {number} y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'red_bullet');

        this.targetPixelX = 0;
        this.targetPixelY = 0;
        this.bulletSpeed = 56;
        this.heading = 'NORTH';
    }

    /**
     * @param  {number} x
     * @param  {number} y
     * @param  {number} bulletXVelocity
     * @param  {number} bulletYVelocity
     */
    fire(x, y, bulletXVelocity, bulletYVelocity) {
        this.body.reset(x, y);
        this.activateBullet(true);
        this.setVelocity(bulletXVelocity, bulletYVelocity);
    }

    /**
     * @param  {boolean} on
     */
    activateBullet(on) {
        this.setActive(on);
        this.setVisible(on);
    }

    /**
     * Update bullet lifecycle
     * @param  {number} time
     * @param  {delta} delta
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        switch (this.heading) {
        case 'NORTH':
            if (this.y <= this.targetPixelY) {
                this.activateBullet(false);
            }
            break;
        case 'EAST':
            if (this.x >= this.targetPixelX) {
                this.activateBullet(false);
            }
            break;
        case 'SOUTH':
            if (this.y >= this.targetPixelY) {
                this.activateBullet(false);
            }
            break;
        case 'WEST':
            if (this.x <= this.targetPixelX) {
                this.activateBullet(false);
            }
            break;
        }
    }
}

/**
 * Bullets
 */
export default class Bullets extends Phaser.Physics.Arcade.Group {
    /**
     *
     * @param  {Phaser.Scene} scene
     */
    constructor(scene) {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 5,
            key: 'red_bullet',
            active: false,
            visible: false,
            classType: BulletSprite,
        });
    }

    /**
     * fireBullets relative to the drone
     * @param  {number} startX
     * @param  {number} startY
     * @param {number} droneAngle
     * @param {number} targetPixelX
     * @param {number} targetPixelY
     */
    fireBullet(startX, startY, droneAngle, targetPixelX, targetPixelY) {
        const bullet = this.getFirstDead(false);

        if (bullet) {
            bullet.targetPixelX = targetPixelX + 24;
            bullet.targetPixelY = targetPixelY + 24;

            switch (droneAngle) {
            case 0:
                bullet.angle = 90;
                bullet.heading = 'NORTH';
                bullet.fire(startX, startY, 0, -bullet.bulletSpeed);
                break;
            case 90:
                bullet.angle = 0;
                bullet.heading = 'EAST';
                bullet.fire(startX, startY, bullet.bulletSpeed, 0);
                break;
            case -180:
                bullet.angle = 90;
                bullet.heading = 'SOUTH';
                bullet.fire(startX, startY, 0, bullet.bulletSpeed);
                break;
            case -90:
                bullet.angle = 180;
                bullet.heading = 'WEST';
                bullet.fire(startX, startY, -bullet.bulletSpeed, 0);
                break;
            }
        }
    }
}
