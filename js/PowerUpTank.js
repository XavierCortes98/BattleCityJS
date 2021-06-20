var battleCity = battleCity || {};

battleCity.powerUpTank = function (_game, _x, _y, _tag, _level) {
    battleCity.powerUps.call(this, _game, _x, _y, _tag, _level);
    this.level = _level;
    this.game = _game;
    this.delay = 50;
    this.game.physics.arcade.enable(this);
    this.body.setSize(15,14,0,0);
    this.anchor.setTo(.5);
    console.log('hola');
};

battleCity.powerUpTank.prototype = Object.create(battleCity.powerUps.prototype);
battleCity.powerUpTank.prototype.constructor = battleCity.powerUpTank;



battleCity.powerUpTank.prototype.Behavior = function (bullet,player) {
    player.score.addScore(500);

   
       player.lives +=1 ;
        this.level.t.destroy();
       this.level.livesLayout();
   
    this.kill();
};
