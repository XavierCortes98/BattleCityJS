var battleCity = battleCity || {};

battleCity.Tanque = function(_game, _x, _y, _tag, _level){
    Phaser.Sprite.call(this, _game, _x, _y, _tag);
    this.lives;
    this.level = _level;
    this.x = _x;
    this.y = _y;
    this.speed = gameOptions.heroSpeed;
    this.direction = tanqueDirection.LEFT;
    this.game.physics.arcade.enable(this);
    this.body.setSize(14,14,0,0);
    this.anchor.setTo(.5);
    this.shooted = false;
    this.velocity;
};

battleCity.Tanque.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.Tanque.prototype.constructor = battleCity.Tanque;
    //UPTADE
battleCity.Tanque.prototype.update = function(){
    //BASE Tanque Update Function
    this.Collision();
    this.Behavior();
    
    
};
    //COLLISION Walls
battleCity.Tanque.prototype.Collision = function(){
};


battleCity.Tanque.prototype.Behavior = function(){    
};

battleCity.Tanque.prototype.Shoot = function(){
};