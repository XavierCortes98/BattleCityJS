var battleCity = battleCity || {};

battleCity.Text = function (_game, _x, _y, _points, _color, _align,  _delay) {
    Phaser.Sprite.call(this, _game, _x, _y);
    this.x = _x;
    this.y = _y;
    this.points = _points;
    this.color = _color;
    this._align = _align;
    this.delay = _delay;
    this.game = _game;
    
    this.startTime = this.game.time.now;
    this.printPoints(_points);
};

battleCity.Text.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.Text.prototype.constructor = battleCity.Text;

battleCity.Text.prototype.update = function () {
    this.test.bringToTop();
    if(this.delay == -1){
        //Do NOT destroy
    }
    else{
        if (this.game.time.now - this.startTime >= this.delay) {
            this.test.kill();
            this.destroy();
        }
    }
};

battleCity.Text.prototype.printPoints = function(_points){
        this.style = {
        font: "PressStart2P",
        fill: this.color,
        align: this._align
    };
    this.test = this.game.add.text(this.x, this.y, _points, this.style);
};