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
        this.bulletSpeed = 100;
        this.heading = 'NORTH';

        this.scene.anims.create({
            key: 'explode',
            frames: 'boom',
            frameRate: 20,
            repeat: 0,
        });
        this.boom = this.scene.add.sprite(200, 300, 'boom');
        this.activateExplosion(false);
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
     * @param  {boolean} on
     */
    activateExplosion(on) {
        this.boom.setActive(on);
        this.boom.setVisible(on);
    }

    /**
     * Fire up this bad boy!
     * @param  {number} x
     * @param  {number} y
     * @param  {boolean} bulletOn
     * @param  {boolean} explosionOn
     */
    animateExplosion(x, y, bulletOn, explosionOn) {
        this.boom.x = x;
        this.boom.y = y;
        this.activateExplosion(explosionOn);
        this.boom.play('explode');
        this.activateBullet(bulletOn);
    }

    /**
     * Update bullet lifecycle to calculate when bullet end of life is
     * @param  {number} time
     * @param  {delta} delta
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        switch (this.heading) {
        case 'NORTH':
            if (this.y <= this.targetPixelY) {
                this.animateExplosion(this.x, this.y, false, true);
            }
            break;
        case 'EAST':
            if (this.x >= this.targetPixelX) {
                this.animateExplosion(this.x, this.y, false, true);
            }
            break;
        case 'SOUTH':
            if (this.y >= this.targetPixelY) {
                this.animateExplosion(this.x, this.y, false, true);
            }
            break;
        case 'WEST':
            if (this.x <= this.targetPixelX) {
                this.animateExplosion(this.x, this.y, false, true);
            }
            break;
        }
    }
}

/**
 * Bullets group to contain five bullets.
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
     * fireBullets relative to the drone to a specified x and y target
     * @param  {number} startX
     * @param  {number} startY
     * @param {number} droneAngle
     * @param {number} targetPixelX
     * @param {number} targetPixelY
     */
    fireBullet(startX, startY, droneAngle, targetPixelX, targetPixelY) {
        const bullet = this.getFirstDead(false);

        if (bullet) {
            bullet.targetPixelX = targetPixelX + this.scene.targetOffset;
            bullet.targetPixelY = targetPixelY + this.scene.targetOffset;
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
