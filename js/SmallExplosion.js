var battleCity = battleCity || {};

battleCity.SmallExplosion = function (_game, _x, _y, _tag, _delay) {
    Phaser.Sprite.call(this, _game, _x, _y, _tag);
    this.anchor.setTo(.5);
    this.game = _game;
    this.x = _x;
    this.y = _y;

    this.delay = _delay;
    this.startTime = this.game.time.now;
    this.Animations();
    this.ShowSprite();
};

battleCity.SmallExplosion.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.SmallExplosion.prototype.constructor = battleCity.SmallExplosion;

battleCity.SmallExplosion.prototype.update = function () {
    if (this.game.time.now - this.startTime >= this.delay) {
        this.destroy();
    }
};


battleCity.SmallExplosion.prototype.ShowSprite = function () {
    
    this.animations.play('Explode');
};

battleCity.SmallExplosion.prototype.Animations = function () {
    this.animations.add('Explode', [0, 1, 2], 10, true);
};
