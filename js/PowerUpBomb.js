var battleCity = battleCity || {};

battleCity.powerUpBomb = function (_game, _x, _y, _tag, _level) {
    battleCity.powerUps.call(this, _game, _x, _y, _tag, _level);
    this.level = _level;
    this.game = _game;
    this.delay = 50;
    this.game.physics.arcade.enable(this);
    this.body.setSize(15,14,0,0);
    this.anchor.setTo(.5);
    console.log('hola');
};

battleCity.powerUpBomb.prototype = Object.create(battleCity.powerUps.prototype);
battleCity.powerUpBomb.prototype.constructor = battleCity.powerUpBomb;



battleCity.powerUpBomb.prototype.Behavior = function (bullet,player) {
    player.score.addScore(500);

   if (player.BombActive == false) {
       player.BombActive == true;
       this.BombO = new battleCity.Bomb(this.game,this.level,player);
       this.game.add.existing(this.BombO);
   }
   
    this.kill();
};
