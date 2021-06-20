var battleCity = battleCity || {};

battleCity.TanquePlayer = function (_game, _x, _y, _tag, _level, _player) {
    battleCity.Tanque.call(this, _game, _x, _y, _tag, _level);
    this.level = _level;
    this.lives = 3;
    this.ShovelActive = false;
    this.ClockActive = false;
    this.BombActive = false;
    this.PowerUpSpawnerActive = false;
    this.spawnX = _x;
    this.spawnY = _y;
    this.level2 = false;
    this.bulletsFired = 0;
    
    this.tanklevel = -1;
    this.score = new battleCity.Score(0, 0, 0, 0, 0);

    this.player = _player;
    this.velocity = gameOptions.playerSpeed;
    this.Animations(1);
    this.canDamage = true;
    console.log(this.player);
    this.inputEnable = true;
    this.body.setSize(13, 13, 0, 0);
    //this.level.soundGame.pause();    
    //INPUTS
    if (this.player) {
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //INTRO
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        this.text1 = new battleCity.Text(this.game, this.x - 16, this.y - 25, "Player 1", 'white', 'center', 1000);
        this.game.add.existing(this.text1);

    } else if (!this.player) {
        this.key_right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.key_left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.key_up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.key_down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        //SPACE
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.text2 = new battleCity.Text(this.game, this.x - 16, this.y - 25, "Player 2", 'white', 'center', 1000);
        this.game.add.existing(this.text2);
    }
};

battleCity.TanquePlayer.prototype = Object.create(battleCity.Tanque.prototype);
battleCity.TanquePlayer.prototype.constructor = battleCity.TanquePlayer;

battleCity.TanquePlayer.prototype.Behavior = function () {
    if (this.player && this.inputEnable) {
        this.Player1Input();
    } else if (!this.player && this.inputEnable) {
        this.Player2Input();
    }
};

battleCity.TanquePlayer.prototype.Animations = function (_tanquelvl) {
    if (_tanquelvl > 4) {
        console.log("Level too High");
    } else {
        this.animations.add('WalkU', [0 + (_tanquelvl - 1) * 8, 1 + (_tanquelvl - 1) * 8], 10, true);
        this.animations.add('WalkL', [2 + (_tanquelvl - 1) * 8, 3 + (_tanquelvl - 1) * 8], 10, true);
        this.animations.add('WalkD', [4 + (_tanquelvl - 1) * 8, 5 + (_tanquelvl - 1) * 8], 10, true);
        this.animations.add('WalkR', [6 + (_tanquelvl - 1) * 8, 7 + (_tanquelvl - 1) * 8], 10, true);
    }
};

battleCity.TanquePlayer.prototype.Player1Input = function () {

    if (this.level.soundGame.isPlaying == false) {
        this.level.soundGame.play();
    }

    if (this.cursors.left.isDown) {
        this.body.velocity.x = -this.velocity;
        this.body.velocity.y = 0;
        this.animations.play('WalkL');
        this.direction = tanqueDirection.LEFT;
        this.level.soundGame.resume();
    } else if (this.cursors.right.isDown) {
        this.body.velocity.x = this.velocity;
        this.body.velocity.y = 0;
        this.animations.play('WalkR');
        this.direction = tanqueDirection.RIGHT;
        this.level.soundGame.resume();
    } else if (this.cursors.up.isDown) {
        this.body.velocity.x = 0;
        this.body.velocity.y = -this.velocity;
        this.animations.play('WalkU');
        this.direction = tanqueDirection.UP;
        this.level.soundGame.resume();
    } else if (this.cursors.down.isDown) {
        this.body.velocity.x = 0;
        this.body.velocity.y = this.velocity;
        this.animations.play('WalkD');
        this.direction = tanqueDirection.DOWN;
        this.level.soundGame.resume();
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.frame = this.direction;
        this.level.soundGame.pause();
    }

    if (this.enter.isDown && this.enter.downDuration(1000)) {
        // SHOOT
        this.bullet2 = new battleCity.bullet(this.game, this.x, this.y, this, this.level);
        if (this.tanklevel < 1) {
            if (this.shooted == false) {
                this.bullet2.Shoot(this.direction);
                this.shooted = true;
                this.game.add.existing(this.bullet2);
                this.level.bullets.add(this.bullet2);
                this.bulletsFired++;
            }
        } else if (this.tanklevel >= 1) {
            if (this.shooted == false) {
                if (this.bulletsFired >= 2) {
                    this.shooted = true;
                } else {
                    this.bullet2.Shoot(this.direction);
                    this.game.add.existing(this.bullet2);
                    this.level.bullets.add(this.bullet2);
                    this.bulletsFired++;
                    this.enter.isDown = false;
                }
            }
        }
    }
};
battleCity.TanquePlayer.prototype.Player2Input = function () {

    if (this.level.soundGameP2.isPlaying == false) {
        this.level.soundGameP2.play();
    }

    if (this.key_left.isDown) {
        this.body.velocity.x = -this.velocity;
        this.body.velocity.y = 0;
        this.animations.play('WalkL');
        this.direction = tanqueDirection.LEFT;
        this.level.soundGame.resume();
    } else if (this.key_right.isDown) {
        this.body.velocity.x = this.velocity;
        this.body.velocity.y = 0;
        this.animations.play('WalkR');
        this.direction = tanqueDirection.RIGHT;
        this.level.soundGame.resume();
    } else if (this.key_up.isDown) {
        this.body.velocity.x = 0;
        this.body.velocity.y = -this.velocity;
        this.animations.play('WalkU');
        this.direction = tanqueDirection.UP;
        this.level.soundGame.resume();
    } else if (this.key_down.isDown) {
        this.body.velocity.x = 0;
        this.body.velocity.y = this.velocity;
        this.animations.play('WalkD');
        this.direction = tanqueDirection.DOWN;
        this.level.soundGame.resume();
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.frame = this.direction;
        this.level.soundGameP2.pause();
    }

    if (this.space.isDown && this.space.downDuration(1000)) {
        // SHOOT
        this.bullet2 = new battleCity.bullet(this.game, this.x, this.y, this, this.level);
        if (this.tanklevel < 1) {
            if (this.shooted == false) {
                this.bullet2.Shoot(this.direction);
                this.shooted = true;
                this.game.add.existing(this.bullet2);
                this.level.bullets.add(this.bullet2);
                this.bulletsFired++;
            }
        } else if (this.tanklevel >= 1) {
            if (this.shooted == false) {
                if (this.bulletsFired > 1) {
                    this.shooted = true;
                } else {
                    this.bullet2.Shoot(this.direction);
                    this.game.add.existing(this.bullet2);
                    this.level.bullets.add(this.bullet2);
                    this.bulletsFired++;
                    this.space.isDown = false;
                }
            }
        }
    }
};

battleCity.TanquePlayer.prototype.Collision = function () {
    this.game.physics.arcade.collide(this, this.level.bricks);
    this.game.physics.arcade.collide(this, this.level.walls);
    this.game.physics.arcade.collide(this, this.level.bgCollisions);
    this.game.physics.arcade.collide(this, this.level.water);
    this.game.physics.arcade.collide(this, this.level.eagle);
    this.game.physics.arcade.collide(this, this.level.eagleBricks);
    this.game.physics.arcade.collide(this, this.level.eagleWalls);
};

battleCity.TanquePlayer.prototype.CollideSound = function () {
    this.collideFX = this.game.add.audio('Collide');
    this.collideFX.play();
};

battleCity.TanquePlayer.prototype.Score = function (_amount) {
    this.score.addScore(_amount);
    if (this.score.getScore >= 20000) {
        this.lives += 1;
        this.score.addScore(-20000);
    }
};

battleCity.TanquePlayer.prototype.Respawn = function () {
    this.x = this.spawnX;
    this.y = this.spawnY;
};

battleCity.TanquePlayer.prototype.ShieldOn = function () {

    if (this.canDamage == true) {
        this.shield = new battleCity.Shield(this.game, this.level.player.spawnX, this.level.player.spawnY, 'shield', this.level, this);
        this.game.add.existing(this.shield);
    } else {
        this.shield.startTime = this.game.time.now;
        console.log(this.shield.startTime);
    }

};

battleCity.TanquePlayer.prototype.ShieldOnP2 = function () {

    if (this.level.player.canDamage == true) {
        this.shield = new battleCity.Shield(this.game, this.spawnX, this.spawnY, 'shield', this.level, this);
        this.game.add.existing(this.shield);
    } else {
        this.shield.timeInit = this.game.time.now;
    }
};

battleCity.TanquePlayer.prototype.GameOver = function () {
    this.inputEnable = false;
    this.level.soundGame.pause();
    this.level.soundGameP2.pause();
    this.dieSound = this.game.add.audio('GameOver');
    this.dieSound.play();
    this.level.scoreScene();
};

battleCity.TanquePlayer.prototype.Damage = function () {
    if (this.canDamage == true) {
        this.lives -= 1;
        if (this.lives > 0) {
            this.level.t.destroy();
            if(this.level==battleCity.Multiplayer)
            {
                 this.level.t2.destroy();
            }           
            this.level.livesLayout();
            this.ShieldOn();
            this.Respawn();
        } else {
            this.GameOver();
        }
    }
};
