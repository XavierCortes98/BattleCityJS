var battleCity = battleCity || {};

battleCity.powerUpShovel = function (_game, _x, _y, _tag, _level) {
    battleCity.powerUps.call(this, _game, _x, _y, _tag, _level);
    this.level = _level;
    this.game = _game;
    this.delay = 50;
    this.game.physics.arcade.enable(this);
    this.body.setSize(15,14,0,0);
    this.anchor.setTo(.5);
    console.log('hola');
};

battleCity.powerUpShovel.prototype = Object.create(battleCity.powerUps.prototype);
battleCity.powerUpShovel.prototype.constructor = battleCity.powerUpShovel;



battleCity.powerUpShovel.prototype.Behavior = function (bullet,player) {
    player.score.addScore(500);

   if (player.ShovelActive == false) {
       player.ShovelActive == true;
       this.shovelO = new battleCity.Shovel(this.game,this.level,player);
       this.game.add.existing(this.shovelO);
   }
   
    this.kill();
};
