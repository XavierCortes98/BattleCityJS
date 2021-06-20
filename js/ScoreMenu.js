var battleCity = battleCity || {};

battleCity.level1 = {
    preload:function(){
        //GET SCORE
        this.player1 = playerPoints.player1;
        this.player2 = playerPoints.player2;
    },
    create:function(){},
    update:function(){
        colsole.log(this.player1);
        
    }
};