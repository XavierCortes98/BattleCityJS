var battleCity = battleCity || {};

battleCity.TanqueEnemy = function (_game, _x, _y, _tag, _level, _lvl, _color) {
    battleCity.Tanque.call(this, _game, _x, _y, _tag, _level);
    this.lvl = _lvl;
    this.color;
    this.direction = tanqueDirection.DOWN;   
    this.freeze = 1;    
    this.level = _level;
    this.Color(_color);
    this.Animations();
    
    this.game.physics.arcade.enable(this);
    this.velocity=gameOptions.enemySpeed;
    this.timer = this.game.time.now;
    if (this.lvl > 4) {
        console.warn("TanqueEnemy._lvl too high ERROR");
    } 
    else {
        this.delay = (5-this.lvl) * 750;
        console.log(this.delay);
    }
};

battleCity.TanqueEnemy.prototype = Object.create(battleCity.Tanque.prototype);
battleCity.TanqueEnemy.prototype.constructor = battleCity.TanqueEnemy;


battleCity.TanqueEnemy.prototype.Behavior = function () {    
    if (this.game.time.now - this.timer >= this.delay && this.freeze==1) {
        this.Pinyau();
    }    
    if (this.freeze==1)
        {
    switch (this.direction) {
        case 0:
            // UP
           
            this.body.velocity.y = -this.velocity * this.freeze;
            this.animations.play('WalkU');
            break;
        case 2:
            // LEFT
            this.body.velocity.x = -this.velocity * this.freeze;
            this.animations.play('WalkL');
            break;
        case 4:
            // DOWN
            this.body.velocity.y = this.velocity * this.freeze;
            this.animations.play('WalkD');
            break;
        case 6:
            // RIGHT
            this.body.velocity.x = this.velocity * this.freeze;
            this.animations.play('WalkR');
            break;
    };
        }
    else{
        this.body.velocity.y = 0;
        this.body.velocity.x = 0;
        this.animations.stop();
    }
};

battleCity.TanqueEnemy.prototype.EndGame = function () {
    this.game.destroy();
};

battleCity.TanqueEnemy.prototype.Collision = function () {
    this.game.physics.arcade.collide(this, this.level.bricks, this.ChangeDirection, null, this);
    this.game.physics.arcade.collide(this, this.level.walls, this.ChangeDirection, null, this);
    this.game.physics.arcade.collide(this, this.level.bgCollisions, this.ChangeDirection, null, this);
    this.game.physics.arcade.collide(this, this.level.eagle, this.EndGame, null, this);
    this.game.physics.arcade.collide(this, this.level.eagleBricks,this.ChangeDirection, null, this);
    this.game.physics.arcade.collide(this, this.level.eagleWalls,this.ChangeDirection, null, this);
     this.game.physics.arcade.collide(this, this.level.water,this.ChangeDirection, null, this);
};

battleCity.TanqueEnemy.prototype.ChangeDirection = function () {
    this.direction = (Math.floor(Math.random() * 4 + 0)) * 2;
};

battleCity.TanqueEnemy.prototype.Animations = function () {
    if (this.lvl > 4) {
        console.warn("TanqueEnemy.Animations() _tanquelvl too high ERROR");
    } else {
        this.animations.add('WalkU', [(32*this.color) + (0 + (this.lvl - 1) * 8), (32*this.color) + (1 + (this.lvl - 1) * 8)], 10, true);
        this.animations.add('WalkL', [(32*this.color) + (2 + (this.lvl - 1) * 8), (32*this.color) + (3 + (this.lvl - 1) * 8)], 10, true);
        this.animations.add('WalkD', [(32*this.color) + (4 + (this.lvl - 1) * 8), (32*this.color) + (5 + (this.lvl - 1) * 8)], 10, true);
        this.animations.add('WalkR', [(32*this.color) + (6 + (this.lvl - 1) * 8), (32*this.color) + (7 + (this.lvl - 1) * 8)], 10, true);
    }
};


battleCity.TanqueEnemy.prototype.die = function (player) {
    if(this.color < 1){
            this.level.enemies -= 1;
            this.level.enemieslayout();
            player.score.addEnemy(this.lvl);
            player.score.addScore(100*this.lvl);
            this.ShowPoints(100 * this.lvl);
            this.destroy();
    }
    else{
        this.color -= 1;
        this.Animations();
    }
};



battleCity.TanqueEnemy.prototype.dieBomb = function (player) {
    
            this.level.enemies -= 1;
            this.level.enemieslayout();
           
            player.Score(100 * this.lvl);
            this.ShowPoints(100 * this.lvl);
            
   
};


battleCity.TanqueEnemy.prototype.Pinyau = function () {
    this.bullet = new battleCity.bullet(this.game, this.x, this.y, this, this.level);
    if (this.shooted == false) {
        this.bullet.Shoot(this.direction);
        this.shooted = true;
        this.game.add.existing(this.bullet);
        this.level.bullets.add(this.bullet);
    }
    this.timer = this.game.time.now;
};

battleCity.Tanque.prototype.ShowPoints = function (_points) {
    if(_points == 100 || _points == 200 || _points == 300 || _points == 400 || _points == 400){
        this.explo = new battleCity.BigExplosion(this.game, this.x, this.y, 'BigExplosion', _points, 500);
        this.game.add.existing(this.explo);
    }
    else{
        console.warn("TanqueEnemy.ShowPoints _points ERROR");
    }
};

battleCity.TanqueEnemy.prototype.Color = function(_color){
    switch(_color){
        case "Yellow":
            this.color = 0;
            break;
        case "Grey":
            this.color = 1;
            break;
        case  "Green":
            this.color = 2;
            break;
        case  "Red":
            this.color = 3;
            break;
        default:
            console.warn("TanquePEnemy.Color _color ERROR");
    }
};