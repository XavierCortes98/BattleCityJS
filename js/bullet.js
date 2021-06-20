var battleCity = battleCity || {};

battleCity.bullet = function (_game, _x, _y, _owner, _level) {
    Phaser.Sprite.call(this, _game, _x, _y, 'bullet');
    this.anchor.setTo(.5);
    this.checkWorldBounds = true;
    this.owner = _owner;
    this.bulletDelay = 200;
    this.outOfBoundsKill = true;
    this.bulletDirection;
    this.speed = gameOptions.bulletSpeed;
    this.velocity = 50;
    this.animations.add('ShootU', [0], 10, true);
    this.animations.add('ShootD', [1], 10, true);
    this.animations.add('ShootL', [2], 10, true);
    this.animations.add('ShootR', [3], 10, true);
    this.game.physics.arcade.enable(this);
    this.level = _level;

};
battleCity.bullet.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.bullet.prototype.constructor = battleCity.bullet;

battleCity.bullet.prototype.update = function () {
    //BASE Tanque Update Function    
    this.CollideHUD();
    this.Collision();
    this.Input();
    this.game.world.bringToTop(this);
};
//COLLISION Walls
battleCity.bullet.prototype.Collision = function () {
    if (this.owner == this.level.player) {
        this.game.physics.arcade.overlap(this, this.level.bricks, this.bricksCollide, null, this);

        this.game.physics.arcade.overlap(this, this.level.bgCollisions, this.walls, null, this);
        this.game.physics.arcade.overlap(this, this.level.eagle, this.eagleCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.collisions);
        this.game.physics.arcade.overlap(this, this.level.enemyGroup, this.enemyCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.player2, this.playerCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.bullets, this.bulletsCollisionEvent, null, this);
        this.game.physics.arcade.overlap(this, this.level.shield, this.walls, null, this);
        this.game.physics.arcade.collide(this, this.level.eagleBricks, this.bricksCollide, null, this);
        this.game.physics.arcade.collide(this, this.level.eagleWalls, this.walls, null, this);
        if (this.level.player.tanklevel >= 2) {
            this.game.physics.arcade.collide(this, this.level.walls, this.collideWalls, null, this);
        } else {
            this.game.physics.arcade.overlap(this, this.level.walls, this.walls, null, this);
        }
    } else if (this.owner == this.level.player2) {
        this.game.physics.arcade.overlap(this, this.level.bricks, this.bricksCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.walls, this.walls, null, this);
        this.game.physics.arcade.overlap(this, this.level.bgCollisions, this.walls, null, this);
        this.game.physics.arcade.overlap(this, this.level.eagle, this.eagleCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.collisions);
        this.game.physics.arcade.overlap(this, this.level.enemyGroup, this.enemyCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.player, this.playerCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.bullets, this.bulletsCollisionEvent, null, this);
        this.game.physics.arcade.collide(this, this.level.eagleBricks, this.bricksCollide, null, this);
        this.game.physics.arcade.collide(this, this.level.eagleWalls, this.walls, null, this);
    } else {
        this.game.physics.arcade.overlap(this, this.level.bricks, this.bricksCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.walls, this.walls, null, this);
        this.game.physics.arcade.overlap(this, this.level.bgCollisions, this.walls, null, this);
        this.game.physics.arcade.overlap(this, this.level.eagle, this.eagleCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.collisions);
        this.game.physics.arcade.overlap(this, this.level.player, this.playerCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.player2, this.playerCollide, null, this);
        this.game.physics.arcade.overlap(this, this.level.bullets, this.bulletsCollisionEvent, null, this);
        this.game.physics.arcade.collide(this, this.level.eagleBricks, this.bricksCollide, null, this);
        this.game.physics.arcade.collide(this, this.level.eagleWalls, this.walls, null, this);
    }
};

battleCity.bullet.prototype.bricksCollide = function (bullet, bricks) {

    if (this.owner.tanklevel < 1) {
        this.owner.shooted = false;
    } else if (this.owner.tanklevel >= 1 && this.owner.bulletsFired > 1) {
        this.owner.shooted = false;
    }
    
    if(this.owner!=this.level.player &&this.owner!=this.level.player2)
    {
        this.owner.shooted=false;
    }
    
    bricks.kill();
    //SMALL EXPLOSION
    this.explode = new battleCity.SmallExplosion(this.game, this.x, this.y, 'SmallExplosion', this.bulletDelay);
    this.game.add.existing(this.explode);

    if (this.owner.bulletsFired > 0) {
        this.owner.bulletsFired--;
    }

    this.kill();
};

battleCity.bullet.prototype.bulletsCollisionEvent = function (bullet, otherBullet) {
    if (this.owner.tanklevel < 1) {
        this.owner.shooted = false;
    } else if (this.owner.tanklevel >= 1 && this.owner.bulletsFired >= 2) {
        this.owner.shooted = false;
    }
   if(this.owner!=this.level.player &&this.owner!=this.level.player2)
    {
        this.owner.shooted=false;
    }
    otherBullet.owner.shooted = false;
    otherBullet.kill();
    //SMALL EXPLOSION
    this.explode = new battleCity.SmallExplosion(this.game, this.x, this.y, 'SmallExplosion', this.bulletDelay);
    this.game.add.existing(this.explode);

    if (this.owner.bulletsFired > 0) {
        this.owner.bulletsFired--;
    }
    this.kill();
};

battleCity.bullet.prototype.playerCollide = function (bullet, player) {


    if (player.canDamage == true) {
        this.explosionSound = this.game.add.audio('Explosion');
        this.explosionSound.play();
    }

    if (this.owner.tanklevel < 1) {
        this.owner.shooted = false;
    } else if (this.owner.tanklevel >= 1 && this.owner.bulletsFired >= 2) {
        this.owner.shooted = false;
    }
   if(this.owner!=this.level.player &&this.owner!=this.level.player2)
    {
        this.owner.shooted=false;
    }
    player.Damage();
    //SMALL EXPLOSION
    this.explode = new battleCity.SmallExplosion(this.game, this.x, this.y, 'SmallExplosion', this.bulletDelay);
    this.game.add.existing(this.explode);
    if (this.owner.bulletsFired > 0) {
        this.owner.bulletsFired--;
    }
    this.kill();
};


battleCity.bullet.prototype.collideWalls = function (bullet, walls) {
    this.explosionSound = this.game.add.audio('Explosion');
    this.explosionSound.play();
    if (this.owner.tanklevel < 1) {
        this.owner.shooted = false;
    } else if (this.owner.tanklevel >= 1 && this.owner.bulletsFired >= 2) {
        this.owner.shooted = false;
    }
    if(this.owner!=this.level.player &&this.owner!=this.level.player2)
    {
        this.owner.shooted=false;
    }
    walls.kill();
    //SMALL EXPLOSION
    this.explode = new battleCity.SmallExplosion(this.game, this.x, this.y, 'SmallExplosion', this.bulletDelay);
    this.game.add.existing(this.explode);

    if (this.owner.bulletsFired > 0) {
        this.owner.bulletsFired--;
    }
    this.kill();
};

battleCity.bullet.prototype.enemyCollide = function (bullet, enemy) {
    this.explosionSound = this.game.add.audio('Explosion');
    this.explosionSound.play();
    if (this.owner.tanklevel < 1) {
        this.owner.shooted = false;
    } else if (this.owner.tanklevel >= 1 && this.owner.bulletsFired >= 2) {
        this.owner.shooted = false;
    }
   if(this.owner!=this.level.player &&this.owner!=this.level.player2)
    {
        this.owner.shooted=false;
    }
    enemy.die(this.owner);
    //SMALL EXPLOSION
    this.explode = new battleCity.SmallExplosion(this.game, this.x, this.y, 'SmallExplosion', this.bulletDelay);
    this.game.add.existing(this.explode);

    if (this.owner.bulletsFired > 0) {
        this.owner.bulletsFired--;
    }
    this.kill();
};

battleCity.bullet.prototype.eagleCollide = function () {
    this.level.player.GameOver();
};

battleCity.bullet.prototype.walls = function (bullet) {

    if (this.owner.tanklevel < 1) {
        this.owner.shooted = false;
    } else if (this.owner.tanklevel >= 1 && this.owner.bulletsFired >= 2) {
        this.owner.shooted = false;
    }
    if(this.owner!=this.level.player &&this.owner!=this.level.player2)
    {
        this.owner.shooted=false;
    }

    //SMALL EXPLOSION
    this.explode = new battleCity.SmallExplosion(this.game, this.x, this.y, 'SmallExplosion', this.bulletDelay);
    this.game.add.existing(this.explode);

    if (this.owner.bulletsFired > 0) {
        this.owner.bulletsFired--;
    }
    this.kill();
};

battleCity.bullet.prototype.CollideHUD = function () {
    this.body.collideWorldBounds = true;
};



battleCity.bullet.prototype.Input = function (_x, _y) {

};
battleCity.bullet.prototype.Shoot = function (_direction) {

    if (this.owner == this.level.player || this.owner == this.level.player2) {
        this.shootSound = this.level.add.audio('Shoot');
        this.shootSound.play();
    }

    if (_direction == tanqueDirection.RIGHT) {
        this.animations.play('ShootR');
        this.body.velocity.y = 0;
        this.body.velocity.x = gameOptions.bulletSpeed;
    } else if (_direction == tanqueDirection.LEFT) {
        this.animations.play('ShootL');
        this.body.velocity.y = 0;
        this.body.velocity.x = gameOptions.negativeBulletSpeed;
    } else if (_direction == tanqueDirection.UP) {
        this.animations.play('ShootU');
        this.body.velocity.y = gameOptions.negativeBulletSpeed;
        this.body.velocity.x = 0;
    } else if (_direction == tanqueDirection.DOWN) {
        this.animations.play('ShootD');
        this.body.velocity.y = gameOptions.bulletSpeed;
        this.body.velocity.x = 0;
    }
};
