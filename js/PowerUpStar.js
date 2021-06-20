var battleCity = battleCity || {};

battleCity.powerUpStar = function (_game, _x, _y, _tag, _level, ) {
    battleCity.powerUps.call(this, _game, _x, _y, _tag, _level);
    this.level = _level;
    this.game = _game;
    this.delay = 50;
    this.game.physics.arcade.enable(this);
    this.body.setSize(15, 14, 0, 0);
    this.anchor.setTo(.5);

};

battleCity.powerUpStar.prototype = Object.create(battleCity.powerUps.prototype);
battleCity.powerUpStar.prototype.constructor = battleCity.powerUpStar;


battleCity.powerUpStar.prototype.Behavior = function (bullet, player) {
    player.score.addScore(500);
    player.tanklevel++;
    switch (player.tanklevel) {
        case 0:
            gameOptions.bulletSpeed = 150;
            gameOptions.negativeBulletSpeed = -150;
            break;
        case 1:
            if(player.bulletsFired<2)
            {
                player.shooted=false;
            }
            break;
    }


    console.log("STAR");
    this.kill();
}
