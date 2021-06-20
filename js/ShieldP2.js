var battleCity = battleCity || {};

battleCity.ShieldP2 = function (_game, _x, _y, _tag, _level) {
    Phaser.Sprite.call(this,_game, _x, _y, _tag);    
    this.level=_level;
    this.animations.add('shieldON', [0,1], 10, true); 
    this.animations.play('shieldON');    
    this.game.physics.arcade.enable(this);
    this.startTime = this.game.time.now;
    this.delay=15000;
};

battleCity.ShieldP2.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.ShieldP2.prototype.constructor = battleCity.ShieldP2;

battleCity.ShieldP2.prototype.update = function () 
{   
    this.level.player2.canDamage=false;
    this.body.position.x=this.level.player2.body.position.x-1;
    this.body.position.y=this.level.player2.body.position.y;
    if (this.game.time.now - this.startTime >= this.delay) 
    {
        this.level.player2.canDamage=true;
        this.destroy();
    }    
};