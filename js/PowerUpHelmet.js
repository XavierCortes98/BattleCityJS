var battleCity = battleCity || {};

battleCity.powerUpHelmet = function (_game, _x, _y, _tag, _level,) {
    battleCity.powerUps.call(this, _game, _x, _y, _tag, _level);
    this.level = _level;
    this.game = _game;
    this.delay = 50;
    this.x = _x;
    this.y = _y;
    this.game.physics.arcade.enable(this);
    this.body.setSize(15, 14, 0, 0);
    this.anchor.setTo(.5);
    console.log('hola');
};

battleCity.powerUpHelmet.prototype = Object.create(battleCity.powerUps.prototype);
battleCity.powerUpHelmet.prototype.constructor = battleCity.powerUpHelmet;


battleCity.powerUpHelmet.prototype.Behavior = function (bullet,player) {
    player.score.addScore(500);
    
    //this.test = battleCity.Text(this.game, this.x, this.y, '500', 'white', 'center', 1000);
    //this.game.add.existing(this.test);
    
    player.ShieldOn();
    this.kill();
};

