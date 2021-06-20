var battleCity = battleCity || {};

battleCity.Shovel = function (_game,_level,player) {
    Phaser.Sprite.call(this,_game, 0,0, "bg_left");    
    this.level=_level;  
    this.game=_game;
    this.player = player;
    this.startTime = this.game.time.now;
    this.delay=6000;
    console.log("hola");
    this.level.eagleBricks.destroy();
   
    
    var numcols = 28;

    var numrows = 27;

    var squareSize = 8;
        
    this.level.eagleWalls = this.level.add.group();
    
        for (var j = 0; j < eagleBricksPositions.length; j++) {
            if (eagleBricksPositions[j] != 0) {
                this.bufferEWalls = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'walls');
                this.game.physics.arcade.enable(this.bufferEWalls);
                this.bufferEWalls.body.allowGravity = false;
                this.bufferEWalls.body.immovable = true;

                this.level.eagleWalls.add(this.bufferEWalls);
            }
        }
    console.log('algo');
};

battleCity.Shovel.prototype = Object.create(Phaser.Sprite.prototype);
battleCity.Shovel.prototype.constructor = battleCity.Shovel;

battleCity.Shovel.prototype.update = function () 
{   
    console.log('algo');
   if (this.game.time.now - this.startTime >= this.delay) 
   {
       
       this.player.ShovelActive = false;
       this.level.eagleWalls.destroy();
       
       var numcols = 28;

       var numrows = 27;

       var squareSize = 8;
       
       this.level.eagleBricks = this.level.add.group();
       
       for (var j = 0; j < eagleBricksPositions.length; j++) {
           if (eagleBricksPositions[j] != 0) {
               this.bufferEWalls = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'bricks');
               this.game.physics.arcade.enable(this.bufferEWalls);
               this.bufferEWalls.body.allowGravity = false;
               this.bufferEWalls.body.immovable = true;

               this.level.eagleBricks.add(this.bufferEWalls);
           }
       }
       
       this.destroy();
   }    
};

