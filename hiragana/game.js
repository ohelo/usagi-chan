// Make game variable accessible to window.onload and resize functions
var game;
var gameOptions = {
    tileSize: 200,
    tileSpacing: 20,
    numKana: 46,
    boardSize: {
        rows: 10,
        cols: 10
    },

    tweenSpeed: 50,
    aspectRatio: 16/9,
    localStorageName: "besttimehiragana"
};
var timeText;
var hits;
var gameOver = false;

window.onload = function () {
    //console.log("gameOptions.tileSize = " + gameOptions.tileSize);
    var tileAndSpacing = gameOptions.tileSize + gameOptions.tileSpacing;
    var width = gameOptions.boardSize.cols * tileAndSpacing;
    width += gameOptions.tileSpacing;
    var gameConfig = {
        // scale object contains everything we need in order to tell Phaser how we want to
        // scale and align the canvas
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: "thegame",
            width: width,
            height: width * gameOptions.aspectRatio
        },
        backgroundColor: 0xecf0f1,
        scene: [bootGame, playGame]
    };
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload(){
        this.load.image("restart", "assets/sprites/restart.png");   // Must be same width as a tile
        this.load.image("scorepanel", "assets/sprites/scorepanel.png");
        this.load.image("scorelabels", "assets/sprites/scorelabels.png");
        this.load.image("logo", "assets/sprites/logo.png");
        this.load.image("howtoplay", "assets/sprites/howtoplay.png");
        this.load.image("gametitle", "assets/sprites/gametitle.png");
 
        this.load.image("emptytile", "assets/sprites/emptytile.png");
        this.load.image("chibiusagi", "assets/sprites/chibi-usagi.png");
        //this.load.image("ka", "assets/ka.gif");

        // Sprite sheet is a series of images combined into a larger image
        // A single image inside a sprite sheet is called a frame
       this.load.spritesheet("romajiTiles", "assets/sprites/romajiTiles.png", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.load.spritesheet("tiles", "assets/sprites/hiraTiles.png", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
    }
    create(){
        this.scene.start("PlayGame");
    }
}


class playGame extends Phaser.Scene{
    
    constructor(){
        super("PlayGame");  // access and call functions in the parent class
 
    }
    create(){
        hits = 0;
        //var timedEvent = this.time.addEvent({ delay: 6000000, callback: this.onClockEvent, callbackScope: this, repeat: 1 }); 
//        this.timedEvent = this.time.addEvent({ delay: 6000000, callback: this.onClockEvent, callbackScope: this, loop: true });
        this.timedEvent = this.time.addEvent({ delay: 6000000, callback: this.onClockEvent, callbackScope: this, repeat: 1 });
        //this.timedEvent.remove(); //works at this location
     
        var timeXY = this.getTilePosition(-1, gameOptions.boardSize.cols - 1);
        //timeText = this.add.text(timeXY.x, timeXY.y, '', { fontSize: '20px', fill: '#ffffff' });
        timeText = this.add.text(32,32);
        var restartXY = this.getTilePosition(-0.9, gameOptions.boardSize.cols -1.2);
        var restartButton = this.add.sprite(restartXY.x, restartXY.y, "restart");
        restartButton.setInteractive();
        restartButton.on("pointerdown", function() {
            this.scene.start("PlayGame");
        }, this);
        //console.log("Getting score position...");
 //       var scoreXY = this.getTilePosition(-0.8, 1);
        var scoreXY = this.getTilePosition(-0.9, 1.73);
        var resetBestTimeBtn = this.add.sprite(scoreXY.x, scoreXY.y, "scorepanel");
        resetBestTimeBtn.setInteractive();
        resetBestTimeBtn.on("pointerdown", function() {
            this.bestScore = 0;
            this.bestScoreText.text = displayTimeElapsed(this.bestScore);
            localStorage.setItem(gameOptions.localStorageName, 0);
        }, this);

        //this.add.image(scoreXY.x, scoreXY.y, "scorepanel");
        this.add.image(scoreXY.x, scoreXY.y -105, "scorelabels");
        var textXY = this.getTilePosition(-1.1, 0.0);
        this.scoreText = this.add.bitmapText(textXY.x, textXY.y, "font", "0");
        textXY = this.getTilePosition(-1.1, 2.2);
        this.bestScore = localStorage.getItem(gameOptions.localStorageName);
        if (this.bestScore == null) {
            console.log("best score was null");
            this.bestScore = 0;
        }
        console.log("Best score from local storage: ", this.bestScore);
        //this.bestScore = 20; //just for testing, need to remove
        console.log("Best score from local storage (hardcoded): ", this.bestScore);
        var bestSeconds = displayTimeElapsed(this.bestScore);
        this.bestScoreText = this.add.bitmapText(textXY.x, textXY.y, "font", bestSeconds.toString());
        
//        this.scoreText.text = timeText.text;

        var gameTitle = this.add.image(10, 5, "gametitle");
        gameTitle.setOrigin(0, 0);
        var howTo = this.add.image(game.config.width, 5, "howtoplay");
        howTo.setOrigin(1, 0);
        var logo = this.add.sprite(game.config.width / 2, game.config.height, "logo");
        logo.setOrigin(0.5, 3.5); //center, bottom

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.depth = 5;

        });

    

        this.input.on('drop', this.doDrop, this);
        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }

        });


        var romajiArray = ["wa","ra","ya","ma","ha","na","ta","sa","ka","a",
        "blank","ri","blank","mi","hi","ni","chi","shi","ki","i",
        "wo","ru","yu","mu","fu","nu","tsu","su","ku","u",
        "blank","re","blank","me","he","ne","te","se","ke","e",
        "n","ro","yo","mo","ho","no","to","so","ko","o"];
     
        // Generate the romaji tiles, need to create them as dropzones
        //console.log("before setting up romaji array");
        var romajiTileNum = 0;
  //      for(var i = 0; i < gameOptions.boardSize.rows; i++){
        for(var i = 0; i < gameOptions.boardSize.rows/2; i++){
            for(var j = 0; j < gameOptions.boardSize.cols; j++){
                //console.log("Getting romaji position...");
                var romajiTilePosition = this.getTilePosition(i, j);
                this.add.image(romajiTilePosition.x, romajiTilePosition.y, "emptytile");
                // Add from sprite sheet, last argument gives location
                
           //     var romajiTile = this.add.sprite(romajiTilePosition.x, romajiTilePosition.y, "romajiTiles", romajiTileNum);
                
                this.add.image(romajiTilePosition.x, romajiTilePosition.y, "romajiTiles", romajiTileNum);
                
                var romajiTile = this.add.zone(romajiTilePosition.x, romajiTilePosition.y, gameOptions.tileSize,gameOptions.tileSize).setRectangleDropZone(gameOptions.tileSize, gameOptions.tileSize);
                
                //console.log("romajiTileNum=" + romajiTileNum);
                //console.log("romaji=" + romajiArray[romajiTileNum]);
                romajiTile.setName(romajiArray[romajiTileNum]);
               // romajiTile.setName("e");
                romajiTileNum++;
            }
        }
        
        ///////////////////////////
        // Create an array of kana
        
        var kanaArray = [["a",0],["i",1],["u",2], ["e",3], ["o",4],
                        ["ka",5],["ki",6],["ku",7],["ke",8], ["ko",9],
                        ["sa",10],["shi",11],["su",12],["se",13], ["so",14],
                        ["ta",15],["chi",16],["tsu",17],["te",18], ["to",19],
                        ["na",20],["ni",21],["nu",22],["ne",23], ["no",24],
                        ["ha",25],["hi",26],["fu",27],["he",28], ["ho",29],
                        ["ma",30],["mi",31],["mu",32],["me",33], ["mo",34],
                        ["ya",35],["yu",36],["yo",37],
                        ["ra",38],["ri",39],["ru",40],["re",41], ["ro",42],
                        ["wa",43],["wo",44],["n",45],
                        ["blank",46],["blank",47],["blank",48],["blank",49]                 
        ];
                            
        Phaser.Utils.Array.Shuffle(kanaArray);

        // Generate an array of random unique numbers 0-49
        var tileNum = 0;
        var color = new Phaser.Display.Color();
        for(var i = gameOptions.boardSize.rows/2; i < gameOptions.boardSize.rows; i++){
            for(var j = 0; j < gameOptions.boardSize.cols; j++){
                //console.log("Getting kana position...");
                var tilePosition = this.getTilePosition(i, j);
                 //console.log("X: " + tilePosition.x + " Y: " + tilePosition.y);
               this.add.image(tilePosition.x, tilePosition.y, "emptytile");
                // Add from sprite sheet, last argument gives location
                
                if (kanaArray[tileNum][0] != "blank") {
                    var kanaTile = this.add.sprite(tilePosition.x, tilePosition.y, "tiles", kanaArray[tileNum][1]);
                    kanaTile.setInteractive();
                    this.input.setDraggable(kanaTile);
                    kanaTile.setName(kanaArray[tileNum][0]);
                   // kanaTile.tintFill = true;
                    color.random(125,255);
                    //color.setTo(0,255,255);
                    kanaTile.setTint(color.color);
                    //kanaTile.setTint(0xffeedd);
                }
                else {
                    this.add.sprite(tilePosition.x, tilePosition.y,"chibiusagi");
                }

              
                tileNum++;
            }
        }


      } //end of create
      update() {
        this.scoreText.text = displayTimeElapsed(this.timedEvent.getElapsedSeconds());
      }   

    

    // Given a row and column, determines the tile position in pixels

    getTilePosition(row, col){

        var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize * (col + 0.5);
        var posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize * (row + 0.5);
        var boardHeight = gameOptions.boardSize.rows * gameOptions.tileSize;
        boardHeight += (gameOptions.boardSize.rows + 1) * gameOptions.tileSpacing;
        var offsetY = (game.config.height - boardHeight) / 2;
        posY += offsetY;

        return new Phaser.Geom.Point(posX, posY);
    }

    doDrop(pointer,gameObject, dropZone) {
      //console.log("gameObject name:" + gameObject.name);
       // console.log("dropZone name:" + dropZone.name);
        // Check if the drag item has the same name as the drop zone
        if(gameObject.name == dropZone.name) {

            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.depth = 0;
            gameObject.input.enabled = false;
            hits++;
            console.log(hits);
            if (hits == gameOptions.numKana) {
                //Game over, stop timer, congratulate user
                //this.timedEvent.remove();
               //this.timedEvent.remove();
               this.timedEvent.paused = true;
               var currentScore = this.timedEvent.getElapsedSeconds();
               gameOver = true;
               //check if current time is less than best time
               //Math.floor(eTime);
               console.log("current score: ",this.scoreText.text);
               console.log("best score: ",this.bestScoreText.text);
               console.log("this.bestScore: ", this.bestScore);
               console.log("current score: ", currentScore);
               if (this.bestScore == 0 || currentScore < this.bestScore) {
                   this.bestScoreText.text = this.scoreText.text;
                   this.bestScore = currentScore;
                   localStorage.setItem(gameOptions.localStorageName, this.bestScore);
                }
                 console.log("Game over");

            }
            
        }
        else  {
            // send back to original location
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            gameObject.depth = 0;
        }
    };

    
}   //end of class playgame

function displayTimeElapsed(eTime) {
    var time = Math.floor(eTime);
    var min = Math.floor(time / 60);
    var sec = time % 60;

    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    timeText.text = 'Time ' + min + ':' + sec;
    return (timeText.text);
}

