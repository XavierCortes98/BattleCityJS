var battleCity = battleCity || {};



battleCity.Multiplayer = {
    init: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.tanqueGravity;
        this.game.world.setBounds(0, 0, gameOptions.level1Width, gameOptions.level1Height);
        this.sound = true;
    },



    preload: function () {
        //GREY BG
        this.game.backgroundColor = "#636363";
        // TANQUES        
        this.game.load.spritesheet('AllTanque', 'assets/sprites/AllTanks.png', 16, 16);
        this.game.load.spritesheet('bullet', 'assets/sprites/bullets.png', 5, 4);
        this.game.load.spritesheet('shield', 'assets/sprites/shield.png', 16, 16);
        // EXPLOSION
        this.game.load.spritesheet('BigExplosion', 'assets/sprites/Explosion_Big.png', 32, 32);
        this.game.load.spritesheet('SmallExplosion', 'assets/sprites/Explosion_Small.png', 16, 16);

        //SEPARATE IMAGES
        this.game.load.image('bg_left', 'assets/sprites/Layout_left.png');
        this.game.load.image('pwupHelmet', 'assets/sprites/PowerUpHelmet.png');
        this.game.load.image('enemiesLayout', 'assets/sprites/enemiesLayout.png');
        this.game.load.image('bg_right', 'assets/sprites/Layout_right.png');
        this.game.load.image('bg_right', 'assets/sprites/Layout_right.png');
        this.game.load.image('bg_top', 'assets/sprites/Layout_top.png');
        this.game.load.image('bg_bottom', 'assets/sprites/Layout_bottom.png');
        this.game.load.image('bg', 'assets/sprites/Layout.png');
        this.game.load.image('bricks', 'assets/sprites/Bricks.png');
        this.game.load.image('walls', 'assets/sprites/Walls.png');
        this.game.load.image('eagle', 'assets/sprites/eagle.png');
        //this.game.load.image('eagle', 'assets/sprites/eagle.png');
        this.game.load.image('pwupShovel', 'assets/sprites/PowerUpShovel.png');
        this.game.load.image('pwupClock', 'assets/sprites/PowerUpClock.png');
        this.game.load.image('pwupBomb', 'assets/sprites/PowerUpBomb.png');
        this.game.load.image('pwupTank', 'assets/sprites/PowerUpTank.png');
        this.game.load.image('pwupStar', 'assets/sprites/PowerUpStar.png');
        this.game.load.image('blacktile', 'assets/sprites/BlackTile.png');
        this.game.load.image('grass', 'assets/sprites/Grass.png');
        this.game.load.spritesheet('water', 'assets/sprites/Water.png', 8, 8);

        
        this.game.load.audio('Collide', 'assets/music/Collide.wav');
        this.game.load.audio('Explosion', 'assets/music/Explosion.wav');
        this.game.load.audio('GameOver', 'assets/music/GameOver.wav');
        this.game.load.audio('HighScore', 'assets/music/HighScore.wav');
        this.game.load.audio('Pause', 'assets/music/Pause.wav');
        this.game.load.audio('Shoot', 'assets/music/Shoot.wav');
        this.game.load.audio('StartSound', 'assets/music/StartSound.wav');
        this.game.load.audio('sound', 'assets/music/soundInGame.wav');



        //LEVEL TILED
        this.game.load.tilemap('level', 'assets/tilemaps/levelMultiplayer.json', null, Phaser.Tilemap.TILED_JSON);

    },
    enemieslayout: function () {
        var numCol = 1;
        var numRow = 1;

        this.enemiesImage.removeAll();
        for (var i = 1; i < (this.enemies + 1); i++) {
            if (i % 2 == 0) {
                this.eBuffer = this.game.add.sprite(225 + (8 * numCol), 35 + (8 * numRow), 'enemiesLayout');
                numCol = 1;
                numRow++;
                this.enemiesImage.add(this.eBuffer);
            } else {
                this.eBuffer = this.game.add.sprite(225 + (8 * numCol), 35 + (8 * numRow), 'enemiesLayout');
                if (numCol % 2 == 0) {
                    numRow++;
                } else {
                    numCol++;
                }
                this.enemiesImage.add(this.eBuffer);
            }
        }
    },

    livesLayout: function () {

        this.msg = this.player.lives;
        this.msg2 = this.player2.lives;
        //this.msg = "a";
        this.style = {
            font: "PressStart2P",
            fill: "#000000",
            align: "center"
        };
        this.t = this.game.add.text(241, 142, this.msg, this.style);
        this.t2 = this.game.add.text(241, 165, this.msg2, this.style);
        
        
    },

    levelLayout: function () {

        this.msgl = "1";
        this.stylel = {
            font: "PressStart2P",
            fill: "#000000",
            align: "center"
        };
        this.tl = this.game.add.text(241, 192, this.msgl, this.stylel);
    },

    setVariablesofPowerUps: function () {
        this.spawnTime = this.game.time.now;
        this.spawned = false;
        this.delayPUP = 0;

    },
    spawnPUPs: function () {
        if (this.game.time.now - this.spawnTime >= this.delayPUP) {

            this.spawnTime = this.game.time.now;
            this.delayPUP = this.game.rnd.integerInRange(7000, 12000);
            //this.level.player.PowerUpSpawnerActive = false;

            this.powerUpNumber = this.game.rnd.integerInRange(1, 6);

            this.positionX = this.game.rnd.integerInRange(24, 216);
            this.positionY = this.game.rnd.integerInRange(16, 208);

            if (this.powerUpNumber == 1) {
                this.pUP = new battleCity.powerUpBomb(this.game, this.positionX, this.positionY, 'pwupBomb', this);
                this.game.add.existing(this.pUP);
            } else if (this.powerUpNumber == 2) {
                this.pUP = new battleCity.powerUpClock(this.game, this.positionX, this.positionY, 'pwupClock', this);
                this.game.add.existing(this.pUP);
            } else if (this.powerUpNumber == 3) {
                this.pUP = new battleCity.powerUpHelmet(this.game, this.positionX, this.positionY, 'pwupHelmet', this);
                this.game.add.existing(this.pUP);
            } else if (this.powerUpNumber == 4) {
                this.pUP = new battleCity.powerUpShovel(this.game, this.positionX, this.positionY, 'pwupShovel', this);
                this.game.add.existing(this.pUP);
            } else if (this.powerUpNumber == 5) {
                this.pUP = new battleCity.powerUpTank(this.game, this.positionX, this.positionY, 'pwupTank', this);
                this.game.add.existing(this.pUP);
            } else if (this.powerUpNumber == 6) {
                this.pUP = new battleCity.powerUpStar(this.game, this.positionX, this.positionY, 'pwupStar', this);
                this.game.add.existing(this.pUP);
            }
        }
    },

    setVariablesofTanks: function () {
        this.tanksSpawnTime = this.game.time.now;
        this.delayTank = 0;
    },
    spawnTanks: function () {

        //console.log(this.tanksSpawnTime);

        if ((this.game.time.now - this.tanksSpawnTime > this.delayTank) && this.enemiesToSpawn > 0) {

            this.tanksSpawnTime = this.game.time.now;
            this.delayTank = this.game.rnd.integerInRange(5000, 1000);
            //this.level.player.PowerUpSpawnerActive = false;

            this.tankNumber = this.game.rnd.integerInRange(1, 4);

            this.positionTankX = this.game.rnd.integerInRange(24, 216);
            this.positionTankY = 16;


            if (this.tankNumber == 4) {
                this.enemy = new battleCity.TanqueEnemy(this.game, 24, 16, 'AllTanque', this, 4, 'Red');

                this.game.add.existing(this.enemy);
                this.enemyGroup.add(this.enemy);
            } else if (this.tankNumber == 1) {
                this.enemy = new battleCity.TanqueEnemy(this.game, 48, 16, 'AllTanque', this, 1, 'Yellow');

                this.game.add.existing(this.enemy);
                this.enemyGroup.add(this.enemy);
            } else if (this.tankNumber == 2) {
                this.enemy = new battleCity.TanqueEnemy(this.game, 72, 16, 'AllTanque', this, 2, 'Grey');

                this.game.add.existing(this.enemy);
                this.enemyGroup.add(this.enemy);
            } else if (this.tankNumber == 3) {
                this.enemy = new battleCity.TanqueEnemy(this.game, 96, 16, 'AllTanque', this, 3, 'Green');

                this.game.add.existing(this.enemy);
                this.enemyGroup.add(this.enemy);
            }
            this.enemiesToSpawn -= 1;
        }
    },
    create: function () {
        this.enemies = 0;
        this.soundGame = new Phaser.Sound(this.game, 'sound', 1, true);
        this.soundGameP2 = new Phaser.Sound(this.game, 'sound', 1, true);

        this.musicStart = this.game.add.audio('StartSound');
        this.musicStart.play();

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //BG
        this.bgCollisions = this.add.group();
        this.bgBuffer = this.game.add.sprite(0, 0, 'bg_left');
        this.game.physics.arcade.enable(this.bgBuffer);
        this.bgBuffer.body.allowGravity = false;
        this.bgBuffer.body.immovable = true;
        this.bgCollisions.add(this.bgBuffer);

        this.bgBuffer = this.game.add.sprite(0, 0, 'bg_top');
        this.game.physics.arcade.enable(this.bgBuffer);
        this.bgBuffer.body.allowGravity = false;
        this.bgBuffer.body.immovable = true;
        this.bgCollisions.add(this.bgBuffer);

        this.bgBuffer = this.game.add.sprite(0, 216, 'bg_bottom');
        this.game.physics.arcade.enable(this.bgBuffer);
        this.bgBuffer.body.allowGravity = false;
        this.bgBuffer.body.immovable = true;
        this.bgCollisions.add(this.bgBuffer);

        this.bgBuffer = this.game.add.sprite(224, 0, 'bg_right');
        this.game.physics.arcade.enable(this.bgBuffer);
        this.bgBuffer.body.allowGravity = false;
        this.bgBuffer.body.immovable = true;
        this.bgCollisions.add(this.bgBuffer);

        this.bg = this.game.add.tileSprite(0, 0, gameOptions.gameWidth, gameOptions.gameHeight, 'bg');


        //TILED MAP
        this.map = this.game.add.tilemap('level');
        this.map.addTilesetImage('bricks');
        this.map.addTilesetImage('eagle');
        this.map.addTilesetImage('blacktile');
        this.map.addTilesetImage('walls');
        this.map.addTilesetImage('grass');
        this.walls = this.map.createLayer('walls_layer');
        this.bricks = this.map.createLayer('bricks_layer');
        this.eagle = this.map.createLayer('eagle_layer');
        this.water = this.map.createLayer('water_layer');
        this.grass = this.map.createLayer('grass_layer');
        //this.map.setCollisionBetween(1, 1, true, 'walls_layer');



        this.bricks = this.add.group();
        this.walls = this.add.group();
        this.eagle = this.add.group();
        this.bullets = this.add.group();
        this.grass = this.add.group();
        this.water = this.add.group();
        this.eagleBricks = this.add.group();
        this.eagleWalls = this.add.group();


        var bricksPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 0, 0, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        var eaglePositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


        var wallsPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7];

        var grassPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0];

        var waterPositions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        var numcols = 28;

        var numrows = 27;

        var squareSize = 8;

        for (var j = 0; j < bricksPositions.length; j++) {
            if (bricksPositions[j] != 0) {
                this.bufferBricks = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'bricks');
                this.game.physics.arcade.enable(this.bufferBricks);
                this.bufferBricks.body.allowGravity = false;
                this.bufferBricks.body.immovable = true;
                this.bricks.add(this.bufferBricks);
                //console.log(bricksPositions[j]);
            }
            if (wallsPositions[j] != 0) {
                this.bufferWalls = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'walls');
                this.game.physics.arcade.enable(this.bufferWalls);
                this.bufferWalls.body.allowGravity = false;
                this.bufferWalls.body.immovable = true;

                this.walls.add(this.bufferWalls);
                //console.log(bricksPositions[j]);
            }
            if (eaglePositions[j] != 0) {
                this.bufferEagle = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'eagle');
                this.game.physics.arcade.enable(this.bufferEagle);
                this.bufferEagle.body.allowGravity = false;
                this.bufferEagle.body.immovable = true;

                this.eagle.add(this.bufferEagle);
                //console.log(bricksPositions[j]);
            }
            if (waterPositions[j] != 0) {
                this.bufferWater = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'water');
                this.game.physics.arcade.enable(this.bufferWater);
                this.bufferWater.body.allowGravity = false;
                this.bufferWater.body.immovable = true;
                this.bufferWater.animations.add("idle", [0, 1, 2, 3], 10, true);
                this.bufferWater.animations.play("idle");
                this.water.add(this.bufferWater);
                //console.log(bricksPositions[j]);
            }
            if (grassPositions[j] != 0) {
                this.bufferGrass = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'grass');
                this.game.physics.arcade.enable(this.bufferGrass);
                this.bufferGrass.body.allowGravity = false;
                this.bufferGrass.body.immovable = true;

                this.grass.add(this.bufferGrass);
                //console.log(bricksPositions[j]);
            }
            if (eagleBricksPositions[j] != 0) {
                this.bufferEBricks = this.game.add.sprite((j % numcols) * squareSize, Math.floor((j / numcols)) * squareSize, 'bricks');
                this.game.physics.arcade.enable(this.bufferEBricks);
                this.bufferEBricks.body.allowGravity = false;
                this.bufferEBricks.body.immovable = true;

                this.eagleBricks.add(this.bufferEBricks);
            }
        }

        this.player = new battleCity.TanquePlayer(this.game, 90, 200, 'AllTanque', this, true);
        this.game.add.existing(this.player);

        this.player2 = new battleCity.TanquePlayer(this.game, 150, 200, 'AllTanque', this, false);
        this.game.add.existing(this.player2);

        this.enemyGroup = this.add.group();


        this.enemies = 16;
        this.enemiesToSpawn = this.enemies;
        this.enemiesImage = this.add.group();

        this.enemieslayout();
        this.livesLayout();
        this.levelLayout();
        this.setVariablesofPowerUps();
        this.setVariablesofTanks();
        this.time;
        
        this.stylePause = {
            font: "PressStart2P",
            fill: "#FFFFFF",
            align: "center",
            fontSize: 55
        };
        
        battleCity.pauseText = this.game.add.text(16, battleCity.game.height*0.5 -35, "PAUSED", this.stylePause);
        battleCity.pauseText.visible = false;
        
        this.game.input.onDown.add(function () {
 
            battleCity.game.paused = !battleCity.game.paused;
            
            battleCity.pauseText.visible = battleCity.game.paused;
             battleCity.game.world.bringToTop(battleCity.pauseText);
           //battleCity.paused =true;
 
        });

    },
    scoreScene: function () {
        this.game.state.start('ScoreMenu', true, false, true, 2, this.player.score, this.player2.score);
    },
    update: function () {
        console.log(this.player2.bulletsFired);
        
        this.game.world.bringToTop(this.grass);
        this.spawnPUPs();
        this.spawnTanks();

        if (this.time != 0) {
            if (((this.game.time.now - this.chrono) >= this.time)) {
                this.time = 0;
                console.log("caca");
                this.soundGame.play();
            }
        }
        if (this.enemies <= 0) {
            this.player.GameOver();
        }
    }
}
