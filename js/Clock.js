var battleCity = battleCity || {};

battleCity.Clock = function (_game,_level,player) {
    Phaser.Sprite.call(this,_game, 0,0, "bg_left");    
    this.level=_level;  
    this.game=_game;
    this.player = player;
    this.startTime = this.game.time.now;
    this.delay=6000;
    for (var i = 0; i<this.level.enemyGroup.length; i++){
        this.level.enemyGroup.children[i].freeze = 0;
    }
};

battleCity.Clock.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.Clock.prototype.constructor = battleCity.Clock;

battleCity.Clock.prototype.update = function () 
{   
    
   if (this.game.time.now - this.startTime >= this.delay) 
   {
       
       this.player.ClockActive = false;
       
        for (var i = 0; i<this.level.enemyGroup.length; i++)
        this.level.enemyGroup.children[i].freeze = 1;
       
       this.destroy();
   }    
};

