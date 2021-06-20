var battleCity = battleCity || {};
var menuOptions = {
    player1Posx: 80,
    player1Posy: 133,
    player2Posx: 80,
    player2Posy: 148,
    player3Posx: 80,
    player3Posy: 163
};



battleCity.menu = {
    init: function () {
        //Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = gameOptions.heroGravity;
        //Camera
        this.game.world.setBounds(0, 0, gameOptions.level1Width, gameOptions.level1Height);
    },


    preload: function () {
        this.load.json('points', 'assets/score.json');
        this.game.load.image('bg', 'assets/img/Menu_Screen2.png');
        this.game.load.spritesheet('selector', 'assets/sprites/Tank1.png', 16, 16);
    },

    create: function () {

        
        



        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.bg = this.game.add.tileSprite(0, 0, gameOptions.gameWidth, gameOptions.gameHeight, 'bg');

        this.selector = this.game.add.sprite(menuOptions.player1Posx, menuOptions.player1Posy, 'selector', 0);
        this.selector.animations.add('selection', [6, 7], 10, true);
        this.selector.anchor.setTo(.5);
        this.selector.scale.setTo(.8);

        //INPUT
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.upPressed = false;
        this.downPressed = false;
        this.stylel = {
            font: "PressStart2P",
            fill: "#FFFFFF",
            align: "center"
        };
        
        this.numInStorage = localStorage.getItem('playerName');
        this.parsed = parseInt(this.numInStorage);
        
        console.log(this.parsed);
        
        if(isNaN(this.parsed))
            this.parsed=0;
        
        this.tl = this.game.add.text(115, 13, this.parsed, this.stylel);
    },

    update: function () {
        this.selector.animations.play('selection');
        if (this.up.isDown && this.upPressed == false) {
            if (this.selector.position.y == menuOptions.player2Posy) {
                this.selector.position.y = menuOptions.player1Posy;
            } else if (this.selector.position.y == menuOptions.player3Posy) {
                this.selector.position.y = menuOptions.player2Posy;
            }

            this.upPressed = true;
        }
        if (this.up.isUp) {
            this.upPressed = false;
        }
        if (this.down.isDown && this.downPressed == false) {

            if (this.selector.position.y == menuOptions.player1Posy) {
                this.selector.position.y = menuOptions.player2Posy;
            } else if (this.selector.position.y == menuOptions.player2Posy) {
                this.selector.position.y = menuOptions.player3Posy;
            }
            this.downPressed = true;
        }
        if (this.down.isUp) {
            this.downPressed = false;
        }
        if (this.enter.isDown) {
            if (this.selector.position.y == menuOptions.player1Posy) {
                // LOAD LEVEL 1
                battleCity.game.state.start('level1');
            } else if (this.selector.position.y == menuOptions.player3Posy) {
                battleCity.game.state.start('Multiplayer');
            } else if (this.selector.position.y == menuOptions.player2Posy) {
                battleCity.game.state.start('level2');
            }
        }
    }
};
