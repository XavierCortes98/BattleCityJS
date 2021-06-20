var battleCity = battleCity || {};

battleCity.powerUps = function(_game,_x,_y, _tag, _level){
    Phaser.Sprite.call(this, _game,_x,_y, _tag);
    this.level=_level;
    this.anchor.setTo(.25);
    this.startDestroyTime = this.game.time.now;
    this.game.physics.arcade.enable(this);  
    this.body.setSize(13,13,0,0);
};

battleCity.powerUps.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.powerUps.prototype.constructor = battleCity.powerUps;
    //UPTADE
battleCity.powerUps.prototype.update = function()
{
    this.Collision();    
    if((this.game.time.now - this.startDestroyTime)>9500)
        {
            this.kill();
        }
};
    //COLLISION Walls
battleCity.powerUps.prototype.Collision = function()
{        
    this.game.physics.arcade.overlap(this, this.level.player, this.Behavior, null, this);
    this.game.physics.arcade.overlap(this, this.level.player2, this.Behavior, null, this);
};

battleCity.powerUps.prototype.Behavior = function(bullet,player)
{
    
};

