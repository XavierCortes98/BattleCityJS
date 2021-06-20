var battleCity = battleCity || {};

battleCity.Shield = function (_game, _x, _y, _tag, _level,player) {
    Phaser.Sprite.call(this,_game, _x, _y, _tag);    
    this.level=_level;
    this.player = player;
    this.animations.add('shieldON', [0,1], 10, true); 
    this.animations.play('shieldON');    
    this.game.physics.arcade.enable(this);
    this.startTime = this.game.time.now;
    this.delay=5000;
};

battleCity.Shield.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.Shield.prototype.constructor = battleCity.Shield;

battleCity.Shield.prototype.update = function () 
{   
    this.player.canDamage=false;
    this.body.position.x=this.player.body.position.x-1;
    this.body.position.y=this.player.body.position.y;
    if (this.game.time.now - this.startTime >= this.delay) 
    {
        this.player.canDamage=true;
        this.destroy();
    }    
};