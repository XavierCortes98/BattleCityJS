var battleCity = battleCity || {};

battleCity.Bomb = function (_game,_level,player) {
    Phaser.Sprite.call(this,_game, 0,0, "bg_left");    
    this.level=_level;  
    this.game=_game;
    this.startTime = this.game.time.now;
    this.delay=6000;
    console.log('holaB');
   for (var i = 0; i<this.level.enemyGroup.length; i++){
       this.explosionSound=this.game.add.audio('Explosion');
       this.explosionSound.play();
       this.level.enemyGroup.children[i].color = -4;
       this.level.enemyGroup.children[i].die(player);
   }
    
  for (var j = 0; j<this.level.enemyGroup.length; j++){
       this.level.enemyGroup.children[j].color = -4;
       this.level.enemyGroup.children[j].die(player);
   }
    
    this.level.enemyGroup.forEach(function (c) { c.color=-4;c.die(player); });    
    
    player.BombActivate = false;
    this.destroy();
};

battleCity.Bomb.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.Bomb.prototype.constructor = battleCity.Bomb;


