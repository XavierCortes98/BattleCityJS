var battleCity = battleCity || {};

var gameOptions = 
    {
        gameWidth:256,
        gameHeight:224,
        level1Width:256,
        level1Height:224,
        fieldSize: 208, 
        tanqueSize:16,
        tanqueGravity:0,
        playerSpeed:50,
        enemySpeed:30,
        bulletSpeed:120,
        negativeBulletSpeed:-120
        
    };

var tanqueDirection = 
    {
        UP : 0,
        LEFT : 2,
        DOWN: 4,
        RIGHT: 6,
    };

battleCity.game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, null, this, false, false);

battleCity.game.state.add('menu', battleCity.menu);
battleCity.game.state.add('level1', battleCity.level1);
battleCity.game.state.add('level2', battleCity.level2);
battleCity.game.state.add('Multiplayer', battleCity.Multiplayer);
battleCity.game.state.add('ScoreMenu', battleCity.levelScore);

battleCity.game.state.start('menu');
//this.tank1 = new battleCity.Score(100, 4,10,7,2);
//this.tank2 = new battleCity.Score(  20, 0,0,0,0);
//battleCity.game.state.start('ScoreMenu', true, false, true, 2, this.tank1, this.tank2);