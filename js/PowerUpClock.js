var battleCity = battleCity || {};

battleCity.powerUpClock = function (_game, _x, _y, _tag, _level) {
    battleCity.powerUps.call(this, _game, _x, _y, _tag, _level);
    this.level = _level;
    this.game = _game;
    this.delay = 50;
    this.game.physics.arcade.enable(this);
    this.body.setSize(15,14,0,0);
    this.anchor.setTo(.5);
    console.log('hola');
};

battleCity.powerUpClock.prototype = Object.create(battleCity.powerUps.prototype);
battleCity.powerUpClock.prototype.constructor = battleCity.powerUpClock;



battleCity.powerUpClock.prototype.Behavior = function (bullet,player) {
    player.score.addScore(500);

   if (player.ClockActive == false) {
       player.ClockActive == true;
       this.ClockO = new battleCity.Clock(this.game,this.level,player);
       this.game.add.existing(this.ClockO);
   }
   
    this.kill();
};
