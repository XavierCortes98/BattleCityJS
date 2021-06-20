var battleCity = battleCity || {};

battleCity.BigExplosion = function (_game, _x, _y, _tag, _points, _delay) {
    Phaser.Sprite.call(this, _game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.x = _x;
    this.y = _y;
    this.points = _points;
    this.delay = _delay;
    this.Animations();
    this.startTime = this.game.time.now;
    this.ShowSprite();
};

battleCity.BigExplosion.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.BigExplosion.prototype.constructor = battleCity.BigExplosion;

battleCity.BigExplosion.prototype.update = function () {
    if (this.game.time.now - this.startTime >= this.delay) {
    if(this.points != 0){
        this.text = new battleCity.Text(this.game, this.x - 8, this.y - 8, this.points, 'white', 'center', 1000);
        this.game.add.existing(this.text);
    }
    this.destroy();
    }

};


battleCity.BigExplosion.prototype.ShowSprite = function () {
    this.animations.play('Explode');
};

battleCity.BigExplosion.prototype.Animations = function () {
    this.animations.add('Explode', [0, 1], 10, true);
};