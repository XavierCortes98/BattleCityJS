var battleCity = battleCity || {};


battleCity.Score = function(_points, _l1, _l2, _l3, _l4){
    this.points = _points;
    this.enemy1 = _l1;
    this.enemy2 = _l2;
    this.enemy3 = _l3;
    this.enemy4 = _l4;
}

battleCity.Score.prototype = Object.create(battleCity.Score.prototype);
battleCity.Score.prototype.constructor = battleCity.Score;

battleCity.Score.prototype.getScore = function(){
    return this.points;
}

battleCity.Score.prototype.getEnemy = function(_lvl){
    switch(_lvl){
        case 1:
            return this.enemy1;
            break;
        case 2:
            return this.enemy2;
            break;
        case 3:
            return this.enemy3;
            break;
        case 4:
            return this.enemy4;
            break;
        default:
            console.warn("Score Tank level not supported");
            break;
    }
}

battleCity.Score.prototype.setScore = function(_points){
    this.points = _points;
}

battleCity.Score.prototype.addScore = function(_points){
    this.points += _points;
}

battleCity.Score.prototype.addEnemy = function(_lvl){
        switch(_lvl){
        case 1:
            this.enemy1++;
            break;
        case 2:
            this.enemy2++;
            break;
        case 3:
            this.enemy3++;
            break;
        case 4:
            this.enemy4++;
            break;
        default:
            console.warn("Score Tank level not supported");
            break;
    }
}