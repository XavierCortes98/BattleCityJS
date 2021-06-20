var battleCity = battleCity || {};

battleCity.PowerUpSpawner = function (_game,_level) {
    Phaser.Sprite.call(this,_game, 0,0, "bg_left");    
    this.level=_level;  
    this.game=_game;
    this.spawnTime = this.game.time.now;
    this.spawned=false;
    this.delay=0;
};

battleCity.PowerUpSpawner.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.PowerUpSpawner.prototype.constructor = battleCity.PowerUpSpawner;

battleCity.PowerUpSpawner.prototype.update = function () 
{   
    
   if (this.game.time.now - this.spawnTime >= this.delay) 
   {
       this.spawnTime = this.game.time.now;
       this.delay= this.game.rnd.integerInRange(7000, 12000);
       //this.level.player.PowerUpSpawnerActive = false;
       
       this.powerUpNumber = this.game.rnd.integerInRange(1, 4);
       
       this.positionX = this.game.rnd.integerInRange(24, 216);
       this.positionY = this.game.rnd.integerInRange(16, 208);
       
       if(this.powerUpNumber ==1)
        {
            this.pUP = new battleCity.powerUpBomb(this.game, this.positionX, this.positionY, 'pwupBomb', this);
            this.game.add.existing(this.pUP);
        }
       else if(this.powerUpNumber ==2)
        {
            this.pUP = new battleCity.powerUpClock(this.game, this.positionX, this.positionY, 'pwupClock', this);
            this.game.add.existing(this.pUP);
        }
       else if(this.powerUpNumber ==3)
        {
            this.pUP = new battleCity.powerUpHelmet(this.game, this.positionX, this.positionY, 'pwupHelmet', this);
            this.game.add.existing(this.pUP);
        }
       else if(this.powerUpNumber ==4)
        {
            this.pUP = new battleCity.powerUpShovel(this.game, this.positionX, this.positionY, 'pwupShovel', this);
            this.game.add.existing(this.pUP);
        }
   }    
};

