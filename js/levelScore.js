var battleCity = battleCity || {};

battleCity.levelScore = {
    init: function(_multi, _level, _tankP1, _tankP2){
        this.multi = _multi;
        this.level = _level;
        
        this.startTime = this.game.time.now;
        this.startTime2 = this.game.time.now;
        this.delay = 200;
        
    //PLAYER I
        this.p1  = _tankP1.points;;
        this.e_1 = _tankP1.enemy1;
        this.e_2 = _tankP1.enemy2;
        this.e_3 = _tankP1.enemy3;
        this.e_4 = _tankP1.enemy4;
    //TEMP ENEMIES P1
        this.e_1_t = 0;
        this.e_2_t = 0;
        this.e_3_t = 0;
        this.e_4_t = 0;        
        
    //PLAYER II
        this.p2   = _tankP2.points;
        this.e2_1 = _tankP2.enemy1;
        this.e2_2 = _tankP2.enemy2;
        this.e2_3 = _tankP2.enemy3;
        this.e2_4 = _tankP2.enemy4;
    //TEMP ENEMIES P2
        this.e2_1_t = 0;
        this.e2_2_t = 0;
        this.e2_3_t = 0;
        this.e2_4_t = 0;
    },
    
    preload: function(){
        this.game.load.image('bg_1', 'assets/img/ScoreScene.png');
        this.game.load.image('bg_2', 'assets/img/ScoreScene_2.png');
    },
    
    create: function(){
    //SCALE 
        this.load.json('points', 'assets/score.json');
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        if(!this.multi){
            this.bg = this.game.add.sprite(0,0, 'bg_1');
        }
        else{
            this.bg = this.game.add.sprite(0,0,'bg_2');
        }
    // PRINT SCREEN CONST LINES

    //    HI_SCORE 
    this.HScore = new battleCity.Text(this.game, gameOptions.gameWidth/2 + 40, 11, "20000",'lightyellow', 'center' -1);
    //    STAGE
    this.Stage = new battleCity.Text(this.game, gameOptions.gameWidth/2 + 20, 29, this.level, 'white', 'center', -1);
    // POINTS 1
    this.Poits_T = new battleCity.Text(this.game, 85 - ((this.p1.toString().length)*6), 70, this.p1, 'lightyellow', 'left', -1); 
    if(this.multi){
        this.Poits2_T = new battleCity.Text(this.game, 154 + ((this.p2.toString().length)*4), 70, this.p2, 'lightyellow', 'left', -1); 
    }
        this.numInStorage = localStorage.getItem('playerName');
        this.parsed = parseInt(this.numInStorage);
        
        console.log(this.parsed);
        
        if(this.p1 > this.p2)
            {
                if(this.p1>this.parsed  || isNaN(this.parsed))
                    {
                        this.stringed = JSON.stringify(this.p1);
                        localStorage.setItem("playerName", this.stringed);
                        
                    }
               
            }
        else
            {
               if(this.p2>this.parsed || isNaN(this.parsed))
                   {
                         this.stringed = JSON.stringify(this.p2);
                        localStorage.setItem("playerName", this.stringed);
                    }
            }
        
    },

    //SHOW POINTS
    ShowTanks: function(_player, _level, _total, _toPrint, _time){
        if(_total){
            if(_player == 1){
                    this.SUM_1 = new battleCity.Text(this.game, 107 - ((_toPrint.toString().length)*6), 195, _toPrint.toString(), 'white', 'center', _time);
                    this.game.add.existing(this.SUM_1);
            }
            else{
                    this.SUM_2 = new battleCity.Text(this.game, 143 + ((_toPrint.toString().length)*3), 195, _toPrint.toString(), 'white', 'center', _time);
                    this.game.add.existing(this.SUM_2);
            }
        }
        else{
            switch(_level){
                case 1:
                    if(_player == 1){
                        this.E1_1 = new battleCity.Text(this.game, 107 - ((_toPrint.toString().length)*6), 93, _toPrint.toString(), 'white', 'left', _time);
                        this.game.add.existing(this.E1_1);
                    }
                    else{
                        this.E1_1 = new battleCity.Text(this.game, 144 + ((_toPrint.toString().length)*3), 93, _toPrint.toString(), 'white', 'left', _time);
                        this.game.add.existing(this.E1_1);
                    }

                break;
                case 2:
                    if(_player == 1){
                        this.E1_2 = new battleCity.Text(this.game, 107 - ((_toPrint.toString().length)*6), 121, _toPrint.toString(), 'white', 'center', _time);
                        this.game.add.existing(this.E1_2);
                    }
                    else{
                        this.E1_2 = new battleCity.Text(this.game, 144 + ((_toPrint.toString().length)*3), 121, _toPrint.toString(), 'white', 'center', _time);
                        this.game.add.existing(this.E1_2);
                    }
                    break;
                case 3:
                    if(_player == 1){
                        this.E1_3 = new battleCity.Text(this.game, 107 - ((_toPrint.toString().length)*6), 148, _toPrint.toString(), 'white', 'center', _time);
                        this.game.add.existing(this.E1_3);   
                    }
                    else{
                        this.E1_3 = new battleCity.Text(this.game, 144 + ((_toPrint.toString().length)*3), 148, _toPrint.toString(), 'white', 'center', _time);
                        this.game.add.existing(this.E1_3); 
                    }
                    break;
                case 4:
                    if(_player == 1){
                        this.E1_4 = new battleCity.Text(this.game, 107 - ((_toPrint.toString().length)*6), 175, _toPrint.toString(), 'white', 'center', _time);
                        this.game.add.existing(this.E1_4);  
                    }
                    else{
                        this.E1_4 = new battleCity.Text(this.game, 144 + ((_toPrint.toString().length)*3), 175, _toPrint.toString(), 'white', 'center', _time);
                        this.game.add.existing(this.E1_4);
                    }
                    break;
                default:
                    break;
            }
        }
    },
    
    ShowPoints: function(_player, _level, _toPrint, _time){
    //SAME AS ShowTanks() but with the poitns
        switch(_level){
            case 1:
                if(_player == 1){
                    this.Points = new battleCity.Text(this.game, 45 - ((_toPrint.toString().length)*6), 93, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points);   
                }
                else{
                    this.Points = new battleCity.Text(this.game, 205 - ((_toPrint.toString().length)*6), 93, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points);  
                }
                break;
            case 2:
                if(_player == 1){
                    this.Points = new battleCity.Text(this.game, 45 - ((_toPrint.toString().length)*6), 121, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points);   
                }
                else{
                    this.Points = new battleCity.Text(this.game, 205 - ((_toPrint.toString().length)*6), 121, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points); 
                }
                break;
            case 3:
                if(_player == 1){
                    this.Points = new battleCity.Text(this.game, 45 - ((_toPrint.toString().length)*6), 148, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points);   
                }
                else{
                    this.Points = new battleCity.Text(this.game, 205 - ((_toPrint.toString().length)*6), 148, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points);    
                }
                break;
            case 4:
                if(_player == 1){
                    this.Points = new battleCity.Text(this.game, 45 - ((_toPrint.toString().length)*6), 175, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points);   
                }
                else{
                    this.Points = new battleCity.Text(this.game, 205 - ((_toPrint.toString().length)*6), 175, _toPrint.toString(), 'white', 'left', _time);
                    this.game.add.existing(this.Points); 
                }
                break;
            default:
                break;
        }
    },
    
    
    update: function (){        
    //LEVEL 1 P1        
        if((this.e_1 == 0) && (!this.a)){
            this.a = true;
            this.ShowTanks(1, 1, false, 0, -1);
            this.ShowPoints(1, 1, 0, -1);
        }
        else if(this.e_1_t < this.e_1){
            if(this.game.time.now - this.startTime >= this.delay){
                if(this.e_1_t == (this.e_1 - 1)){
                    this.ShowTanks(1, 1, false, this.e_1, -1);
                    this.ShowPoints(1, 1, this.e_1 * 100, -1);
                }
                else{
                    this.ShowTanks(1, 1, false, this.e_1_t, this.delay);
                    this.ShowPoints(1, 1, this.e_1_t * 100, this.delay);
                }
                this.e_1_t++;
                this.startTime = this.game.time.now;
            }
        }
    //LEVEL 1 P2
        if((this.e2_1 == 0) && this.multi && !this.a1){
            this.a1 = true;
            this.ShowTanks(2, 1, false, 0, -1);
            this.ShowPoints(2, 1, 0, -1);
        }
        else if((this.e2_1_t < this.e2_1) && this.multi){
            if(this.game.time.now - this.startTime2 >= this.delay){
                if(this.e2_1_t == (this.e2_1 - 1)){
                    this.ShowTanks(2, 1, false, this.e2_1, -1);
                    this.ShowPoints(2, 1, this.e2_1 * 100, -1);
                }
                else{
                    this.ShowTanks(2, 1, false, this.e2_1_t, this.delay);
                    this.ShowPoints(2, 1, this.e2_1_t * 100, this.delay);
                }
                this.e2_1_t++;
                this.startTime2 = this.game.time.now;
            }
        }
    //LEVEL 2 P1
        if((this.e_2 == 0) && !this.b){
            this.b = true;
            this.ShowTanks(1, 2, false, 0, -1);
            this.ShowPoints(1, 2, 0, -1);
        }
        else if(this.e_2_t < this.e_2){
            if(this.game.time.now - this.startTime >= this.delay){
                if(this.e_2_t == (this.e_2 - 1)){
                    this.ShowTanks(1, 2, false, this.e_2, -1);
                    this.ShowPoints(1, 2, this.e_2 * 200, -1);
                }
                else{
                    this.ShowTanks(1, 2, false, this.e_2_t, this.delay);
                    this.ShowPoints(1, 2, this.e_2_t * 200, this.delay);
                }
                this.e_2_t++;
                this.startTime = this.game.time.now;
            }
        }
    //LEVEL 2 P2
        if((this.e2_2 == 0) && !this.b1 && this.multi){
            this.b1 = true;
            this.ShowTanks(2, 2, false, 0, -1);
            this.ShowPoints(2, 2, 0, -1);
        }
        else if((this.e2_2_t < this.e2_2) && this.multi){
            if(this.game.time.now - this.startTime2 >= this.delay){
                if(this.e2_2_t == (this.e2_2 - 1)){
                    this.ShowTanks(2, 2, false, this.e2_2, -1);
                    this.ShowPoints(2, 2, this.e2_2 * 200, -1);
                }
                else{
                    this.ShowTanks(2, 2, false, this.e2_2_t, this.delay);
                    this.ShowPoints(2, 2, this.e2_2_t * 200, this.delay);
                }
                this.e2_2_t++;
                this.startTime2 = this.game.time.now;
            }
        }
    //LEVEL 3
        if((this.e_3 == 0) && !this.c){
            this.c = true;
            this.ShowTanks(1, 3, false, 0, -1);
            this.ShowPoints(1, 3, 0, -1);
        }
        else if(this.e_3_t < this.e_3){
            if(this.game.time.now - this.startTime >= this.delay){
                if(this.e_3_t == (this.e_3 - 1)){
                    this.ShowTanks(1, 3, false, this.e_3, -1);
                    this.ShowPoints(1, 3, this.e_3 * 300, -1);
                }
                else{
                    this.ShowTanks(1, 3, false, this.e_3_t, this.delay);
                    this.ShowPoints(1, 3, this.e_3_t * 300, this.delay);
                }
                this.e_3_t++;
                this.startTime = this.game.time.now;
            }
        }
    //LEVEL 3 P2        
        if((this.e2_3 == 0) && !this.c1 && this.multi){
            this.c1 = true;
            this.ShowTanks(2, 3, false, 0, -1);
            this.ShowPoints(2, 3, 0, -1);
        }
        else if((this.e2_3_t < this.e2_3) && this.multi){
            if(this.game.time.now - this.startTime2 >= this.delay){
                if(this.e2_3_t == (this.e2_3 - 1)){
                    this.ShowTanks(2, 3, false, this.e2_3, -1);
                    this.ShowPoints(2, 3, this.e2_3 * 300, -1);
                }
                else{
                    this.ShowTanks(2, 3, false, this.e2_3_t, this.delay);
                    this.ShowPoints(2, 3, this.e2_3_t * 300, this.delay);
                }
                this.e2_3_t++;
                this.startTime2 = this.game.time.now;
            }
        }
    //LEVEL 4
        if((this.e_4 == 0) && !this.d){
            this.d = true;
            this.ShowTanks(1, 4, false, 0, -1);
            this.ShowPoints(1, 4, 0, -1);
        }
        else if(this.e_4_t < this.e_4){
            if(this.game.time.now - this.startTime >= this.delay){
                if(this.e_4_t == (this.e_4 - 1)){
                    this.ShowTanks(1, 4, false, this.e_4, -1);
                    this.ShowPoints(1, 4, this.e_4 * 400, -1);
                }
                else{
                    this.ShowTanks(1, 4, false, this.e_4_t, this.delay);
                    this.ShowPoints(1, 4, this.e_4_t * 400, this.delay);
                }
                this.e_4_t++;
                this.startTime = this.game.time.now;
            }
        }
    //LEVEL 4 P2
        if((this.e2_4 == 0) && !this.d1 && this.multi){
            this.d1 = true;
            this.ShowTanks(2, 4, false, 0, -1);
            this.ShowPoints(2, 4, 0, -1);
        }
        else if((this.e2_4_t < this.e2_4) && this.multi){
            if(this.game.time.now - this.startTime2 >= this.delay){
                if(this.e2_4_t == (this.e2_4 - 1)){
                    this.ShowTanks(2, 4, false, this.e2_4, -1);
                    this.ShowPoints(2, 4, this.e2_4 * 400, -1);
                }
                else{
                    this.ShowTanks(2, 4, false, this.e2_4_t, this.delay);
                    this.ShowPoints(2,4, this.e2_4_t * 400, this.delay);
                }
                this.e2_4_t++;
                this.startTime2 = this.game.time.now;
            }
        }
    //TOTAL P1
        if((this.e_4_t == this.e_4) && (!this.executed1)){
            this.executed1 = true;
            this.sum = this.e_1 + this.e_2 + this.e_3 + this.e_4;
            this.ShowTanks(1,0,true,this.sum, -1);
        } 
    //TOTAL P2
        if((this.e2_4 == this.e2_4_t) && (!this.executed2) && (this.multi)){
            this.executed2 = true;
            this.sum = this.e2_1 + this.e2_2 + this.e2_3 + this.e2_4;
            this.ShowTanks(2, 0, true, this.sum, -1);
        }
        
    //RESET AFTER 5 SECONDS
        if(this.game.time.now - this.startTime2 >= 5000){
                this.game.state.start('menu');
            }
    }
}