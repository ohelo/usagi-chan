// Usagi-chan's Hiragana Drag-n-drop
// By Andrea Shea
//

// Make game variable accessible to window.onload and resize functions
var game;
var gameOptions = {
    numChibi: 4,
    tileSize: 200,
    tileSpacing: 20,
    numKana: 46,
    boardSize: {
        rows: 10,
        cols: 10
    },

    tweenSpeed: 50,
    aspectRatio: 16 / 9,
    localStorageName: "besttimehiragana"
};
var timeText;
var hits;
var gameOver = false;
var chibiArray = [];
var gameOverImage;
var romajiArray = ["wa", "ra", "ya", "ma", "ha", "na", "ta", "sa", "ka", "a",
"blank", "ri", "blank", "mi", "hi", "ni", "chi", "shi", "ki", "i",
"wo", "ru", "yu", "mu", "fu", "nu", "tsu", "su", "ku", "u",
"blank", "re", "blank", "me", "he", "ne", "te", "se", "ke", "e",
"n", "ro", "yo", "mo", "ho", "no", "to", "so", "ko", "o"];

var kanaArray = [["a", 0], ["i", 1], ["u", 2], ["e", 3], ["o", 4],
["ka", 5], ["ki", 6], ["ku", 7], ["ke", 8], ["ko", 9],
["sa", 10], ["shi", 11], ["su", 12], ["se", 13], ["so", 14],
["ta", 15], ["chi", 16], ["tsu", 17], ["te", 18], ["to", 19],
["na", 20], ["ni", 21], ["nu", 22], ["ne", 23], ["no", 24],
["ha", 25], ["hi", 26], ["fu", 27], ["he", 28], ["ho", 29],
["ma", 30], ["mi", 31], ["mu", 32], ["me", 33], ["mo", 34],
["ya", 35], ["yu", 36], ["yo", 37],
["ra", 38], ["ri", 39], ["ru", 40], ["re", 41], ["ro", 42],
["wa", 43], ["wo", 44], ["n", 45],
["blank", 46], ["blank", 47], ["blank", 48], ["blank", 49]
];

window.onload = function () {
    var tileAndSpacing = gameOptions.tileSize + gameOptions.tileSpacing;
    var width = gameOptions.boardSize.cols * tileAndSpacing;
    width += gameOptions.tileSpacing;
    var gameConfig = {
        // scale object contains everything we need in order to tell Phaser how we want to
        // scale and align the canvas
        physics: {
            default: 'arcade',
            arcade: {
                //gravity: {y:1000},
            }
        },
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

class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }
    preload() {
        this.load.image("restart", "assets/sprites/restart.png");   // Must be same width as a tile
        this.load.image("scorepanel", "assets/sprites/scorepanel.png");
        this.load.image("scorelabels", "assets/sprites/scorelabels.png");
        this.load.image("logo", "assets/sprites/logo.png");
        this.load.image("howtoplay", "assets/sprites/howtoplay.png");
        this.load.image("gametitle", "assets/sprites/gametitle.png");

        this.load.image("emptytile", "assets/sprites/emptytile.png");
        this.load.image("chibiusagi", "assets/sprites/chibi-usagi.png");
        this.load.image("gameover", "assets/sprites/yokudekimashita2.png");
        this.load.image("resetbesttime", "assets/sprites/resetbesttime.png");
        this.load.image("start", "assets/sprites/start.png");

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
    create() {
        var timeXY = getTilePosition(-1, gameOptions.boardSize.cols - 1);
        timeText = this.add.text(32, 32);

        var restartXY = getTilePosition(-0.9, gameOptions.boardSize.cols - 1.2);
        var restartButton = this.add.sprite(restartXY.x, restartXY.y, "restart");

        var scoreXY = getTilePosition(-0.9, 1.73);
        this.add.image(scoreXY.x, scoreXY.y, "scorepanel");

        var resetBestTimeXY = getTilePosition(-0.9, 4.7);
        var resetBestTimeBtn = this.add.sprite(resetBestTimeXY.x, resetBestTimeXY.y, "resetbesttime");
        this.add.image(scoreXY.x, scoreXY.y - 105, "scorelabels");
        var textXY = getTilePosition(-1.1, 0.0);
        this.scoreText = this.add.bitmapText(textXY.x, textXY.y, "font", "00:00");
        textXY = getTilePosition(-1.1, 2.2);
        this.bestScore = localStorage.getItem(gameOptions.localStorageName);
        if (this.bestScore == null) {
            this.bestScore = 0;
        }

        var bestSeconds = displayTimeElapsed(this.bestScore);
        this.bestScoreText = this.add.bitmapText(textXY.x, textXY.y, "font", bestSeconds.toString());

        var gameTitle = this.add.image(10, 5, "gametitle");
        gameTitle.setOrigin(0, 0);
        var howTo = this.add.image(game.config.width, 5, "howtoplay");
        howTo.setOrigin(1, 0);
        var logo = this.add.sprite(game.config.width / 2, game.config.height, "logo");
        logo.setOrigin(0.5, 3.5); //center, bottom

        // Generate the romaji tiles
        var romajiTileNum = 0;
        for (var i = 0; i < gameOptions.boardSize.rows / 2; i++) {
            for (var j = 0; j < gameOptions.boardSize.cols; j++) {
                var romajiTilePosition = getTilePosition(i, j);
                this.add.image(romajiTilePosition.x, romajiTilePosition.y, "emptytile");
                // Add from sprite sheet, last argument gives location

                this.add.image(romajiTilePosition.x, romajiTilePosition.y, "romajiTiles", romajiTileNum);

                //var romajiTile = this.add.zone(romajiTilePosition.x, romajiTilePosition.y, gameOptions.tileSize,gameOptions.tileSize).setRectangleDropZone(gameOptions.tileSize, gameOptions.tileSize);

                romajiTileNum++;
            }
        }


        Phaser.Utils.Array.Shuffle(kanaArray);

        var tileNum = 0;
        var color = new Phaser.Display.Color();
        var chibiCount = 0;
        for (var i = gameOptions.boardSize.rows / 2; i < gameOptions.boardSize.rows; i++) {
            for (var j = 0; j < gameOptions.boardSize.cols; j++) {
                var tilePosition = getTilePosition(i, j);
                this.add.image(tilePosition.x, tilePosition.y, "emptytile");
                // Add from sprite sheet, last argument gives location

                if (kanaArray[tileNum][0] != "blank") {
                    var kanaTile = this.add.sprite(tilePosition.x, tilePosition.y, "tiles", kanaArray[tileNum][1]);
                    //kanaTile.setInteractive();
                    //this.input.setDraggable(kanaTile);
                    //kanaTile.setName(kanaArray[tileNum][0]);
                    color.random(125, 255);
                    kanaTile.setTint(color.color);
                }
                else {
                    var chibiTile = this.physics.add.sprite(tilePosition.x, tilePosition.y, "chibiusagi");
                    chibiArray[chibiCount++] = chibiTile;

                }


                tileNum++;
            }
        }
        var startXY = getTilePosition(gameOptions.boardSize.rows / 3, (gameOptions.boardSize.cols / 2)-0.5);
        var startButton = this.add.sprite(startXY.x, startXY.y, "start");

        startButton.setInteractive();
        startButton.on("pointerdown", function () {
            this.scene.start("PlayGame");
        }, this);


        //this.scene.start("PlayGame");
    }
}


class playGame extends Phaser.Scene {

    constructor() {
        super("PlayGame");  // access and call functions in the parent class

    }
    create() {
        hits = 0;

        this.timedEvent = this.time.addEvent({ delay: 6000000, callback: this.onClockEvent, callbackScope: this, repeat: 1 });

        var timeXY = getTilePosition(-1, gameOptions.boardSize.cols - 1);
        timeText = this.add.text(32, 32);
        var restartXY = getTilePosition(-0.9, gameOptions.boardSize.cols - 1.2);
        var restartButton = this.add.sprite(restartXY.x, restartXY.y, "restart");
        restartButton.setInteractive();
        restartButton.on("pointerdown", function () {
            this.scene.start("PlayGame");
        }, this);
        var scoreXY = getTilePosition(-0.9, 1.73);
        this.add.image(scoreXY.x, scoreXY.y, "scorepanel");

        var resetBestTimeXY = getTilePosition(-0.9, 4.7);
        var resetBestTimeBtn = this.add.sprite(resetBestTimeXY.x, resetBestTimeXY.y, "resetbesttime");
        resetBestTimeBtn.setInteractive();
        resetBestTimeBtn.on("pointerdown", function () {
            this.bestScore = 0;
            this.bestScoreText.text = displayTimeElapsed(this.bestScore);
            localStorage.setItem(gameOptions.localStorageName, 0);
        }, this);

        this.add.image(scoreXY.x, scoreXY.y - 105, "scorelabels");
        var textXY = getTilePosition(-1.1, 0.0);
        this.scoreText = this.add.bitmapText(textXY.x, textXY.y, "font", "0");
        textXY = getTilePosition(-1.1, 2.2);
        this.bestScore = localStorage.getItem(gameOptions.localStorageName);
        if (this.bestScore == null) {
            this.bestScore = 0;
        }

        var bestSeconds = displayTimeElapsed(this.bestScore);
        this.bestScoreText = this.add.bitmapText(textXY.x, textXY.y, "font", bestSeconds.toString());

        var gameTitle = this.add.image(10, 5, "gametitle");
        gameTitle.setOrigin(0, 0);
        var howTo = this.add.image(game.config.width, 5, "howtoplay");
        howTo.setOrigin(1, 0);
        var logo = this.add.sprite(game.config.width / 2, game.config.height, "logo");
        logo.setOrigin(0.5, 3.5); //center, bottom

        var gameOverPosition = getTilePosition(7, 4.5);
        gameOverImage = this.add.image(gameOverPosition.x, gameOverPosition.y, "gameover");
        gameOverImage.setVisible(false);

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

        // Generate the romaji tiles, need to create them as dropzones
        var romajiTileNum = 0;
        for (var i = 0; i < gameOptions.boardSize.rows / 2; i++) {
            for (var j = 0; j < gameOptions.boardSize.cols; j++) {
                var romajiTilePosition = getTilePosition(i, j);
                this.add.image(romajiTilePosition.x, romajiTilePosition.y, "emptytile");
                // Add from sprite sheet, last argument gives location

                this.add.image(romajiTilePosition.x, romajiTilePosition.y, "romajiTiles", romajiTileNum);

                var romajiTile = this.add.zone(romajiTilePosition.x, romajiTilePosition.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(gameOptions.tileSize, gameOptions.tileSize);

                romajiTile.setName(romajiArray[romajiTileNum]);
                romajiTileNum++;
            }
        }

        Phaser.Utils.Array.Shuffle(kanaArray);  //Shuffle the kana

        var tileNum = 0;
        var color = new Phaser.Display.Color();
        var chibiCount = 0;
        for (var i = gameOptions.boardSize.rows / 2; i < gameOptions.boardSize.rows; i++) {
            for (var j = 0; j < gameOptions.boardSize.cols; j++) {
                var tilePosition = getTilePosition(i, j);
                this.add.image(tilePosition.x, tilePosition.y, "emptytile");
                // Add from sprite sheet, last argument gives location

                if (kanaArray[tileNum][0] != "blank") {
                    var kanaTile = this.add.sprite(tilePosition.x, tilePosition.y, "tiles", kanaArray[tileNum][1]);
                    kanaTile.setInteractive();
                    this.input.setDraggable(kanaTile);
                    kanaTile.setName(kanaArray[tileNum][0]);
                    color.random(125, 255);
                    kanaTile.setTint(color.color);
                }
                else {
                    var chibiTile = this.physics.add.sprite(tilePosition.x, tilePosition.y, "chibiusagi");
                    chibiArray[chibiCount++] = chibiTile;

                }


                tileNum++;
            }
        }


    } //end of create
    update() {
        this.scoreText.text = displayTimeElapsed(this.timedEvent.getElapsedSeconds());
    }

    doDrop(pointer, gameObject, dropZone) {
        // Check if the drag item has the same name as the drop zone
        if (gameObject.name == dropZone.name) {

            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.depth = 0;
            gameObject.input.enabled = false;
            hits++;
            if (hits == gameOptions.numKana) {
            //if (hits == 3) { //for testing

                //Game over, stop timer, congratulate user
                this.timedEvent.paused = true;
                var currentScore = this.timedEvent.getElapsedSeconds();
                gameOver = true;
                //check if current time is less than best time
                //    console.log("current score: ",this.scoreText.text);
                //    console.log("best score: ",this.bestScoreText.text);
                //    console.log("this.bestScore: ", this.bestScore);
                //    console.log("current score: ", currentScore);
                if (this.bestScore == 0 || currentScore < this.bestScore) {
                    this.bestScoreText.text = this.scoreText.text;
                    this.bestScore = currentScore;
                    localStorage.setItem(gameOptions.localStorageName, this.bestScore);
                }
                //Drop the chibi usagis
                for (var i = 0; i < gameOptions.numChibi; i++) {
                    chibiArray[i].setGravityY(1000);
                    chibiArray[i].setBounce(0.7);
                    chibiArray[i].setDrag(1);
                    chibiArray[i].setCollideWorldBounds(true);
                    chibiArray[i].setVelocity(100, 0);

                }

                gameOverImage.setVisible(true);
                gameOverImage.depth = 6;


            }

        }
        else {
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

// Given a row and column, determines the tile position in pixels
function getTilePosition(row, col) {

    var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize * (col + 0.5);
    var posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize * (row + 0.5);
    var boardHeight = gameOptions.boardSize.rows * gameOptions.tileSize;
    boardHeight += (gameOptions.boardSize.rows + 1) * gameOptions.tileSpacing;
    var offsetY = (game.config.height - boardHeight) / 2;
    posY += offsetY;

    return new Phaser.Geom.Point(posX, posY);
}

