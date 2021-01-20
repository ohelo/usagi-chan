// Literature Exercise #4
// By Andrea Shea
//

// Make game variable accessible to window.onload and resize functions
var game;
var gameOptions = {
    tileSize: 100,
    tileSpacing: 20,
    numItems: 14,
    boardSize: {
        rows: 11,
        cols: 13
    },

    tweenSpeed: 50,
//    aspectRatio: 16 / 9,
    aspectRatio: 16/12,
};

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
            width: width+200,
            height: width * gameOptions.aspectRatio
        },
        backgroundColor: 0xecf0f1,
        scene: [playGame]
    };
    game = new Phaser.Game(gameConfig);
    window.focus();
}

class playGame extends Phaser.Scene {

    constructor() {
        super("PlayGame");  // access and call functions in the parent class

    }
    preload() {
        this.load.image("drop1", "assets/sprites/drop1.png");         
        this.load.image("drag1", "assets/sprites/1.png");         
        this.load.image("drag2", "assets/sprites/2.png"); 
        this.load.image("drag3", "assets/sprites/3.png"); 
        this.load.image("drag4", "assets/sprites/4.png"); 
        this.load.image("drag5", "assets/sprites/5.png"); 
        this.load.image("drag6", "assets/sprites/6.png"); 
        this.load.image("drag7", "assets/sprites/7.png"); 
        this.load.image("drag8", "assets/sprites/8.png"); 
        this.load.image("drag9", "assets/sprites/9.png"); 
        this.load.image("drag10", "assets/sprites/10.png"); 
        this.load.image("drag11", "assets/sprites/11.png"); 
        this.load.image("drag12", "assets/sprites/12.png"); 
        this.load.image("drag13", "assets/sprites/13.png");
        this.load.image("drag14", "assets/sprites/14.png");
        this.load.image("title", "assets/sprites/title.png");
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        this.load.bitmapFont('desyrel-pink', 'assets/fonts/desyrel-pink.png', 'assets/fonts/desyrel-pink.xml');

   
    }

    create() {
        var tempPos;

        // Place drag items in an array and shuffle them
        var itemArray = [];
        for (var i = 0; i < gameOptions.numItems; i++) {
            itemArray[i] = i+1;
        } 
        Phaser.Utils.Array.Shuffle(itemArray);

        var titlePos = getTilePosition(0.3,6);
        this.add.image(titlePos.x, titlePos.y, "title");

        var itemIndex = 0;

        // Column 1
        var dragPos;
        var colLoc = 10.5;
        dragPos = getTilePosition(1.5,colLoc);
        var drag1 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag1.setName("item"+itemArray[itemIndex]);
        drag1.setInteractive();
        this.input.setDraggable(drag1);

        itemIndex++;
        dragPos = getTilePosition(2.5,colLoc);
        var drag2 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag2.setName("item"+itemArray[itemIndex]);
        drag2.setInteractive();
        this.input.setDraggable(drag2);

        itemIndex++;
        dragPos = getTilePosition(3.5,colLoc);
        var drag3 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag3.setName("item"+itemArray[itemIndex]);
        drag3.setInteractive();
        this.input.setDraggable(drag3);

        itemIndex++;
        dragPos = getTilePosition(4.5,colLoc);
        var drag4 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag4.setName("item"+itemArray[itemIndex]);
        drag4.setInteractive();
        this.input.setDraggable(drag4);

        itemIndex++;
        dragPos = getTilePosition(5.5,colLoc);
        var drag5 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag5.setName("item"+itemArray[itemIndex]);
        drag5.setInteractive();
        this.input.setDraggable(drag5);

        itemIndex++;
        dragPos = getTilePosition(6.5,colLoc);
        var drag6 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag6.setName("item"+itemArray[itemIndex]);
        drag6.setInteractive();
        this.input.setDraggable(drag6);
 
        itemIndex++;
        dragPos = getTilePosition(7.5,colLoc);
        var drag7 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag7.setName("item"+itemArray[itemIndex]);
        drag7.setInteractive();
        this.input.setDraggable(drag7);

        itemIndex++;
        dragPos = getTilePosition(8.5,colLoc);
        var drag8 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag8.setName("item"+itemArray[itemIndex]);
        drag8.setInteractive();
        this.input.setDraggable(drag8);
 
        itemIndex++;
        dragPos = getTilePosition(9.5,colLoc);
        var drag9 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag9.setName("item"+itemArray[itemIndex]);
        drag9.setInteractive();
        this.input.setDraggable(drag9);

        itemIndex++;
        dragPos = getTilePosition(10.5,colLoc);
        var drag10 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag10.setName("item"+itemArray[itemIndex]);
        drag10.setInteractive();
        this.input.setDraggable(drag10);

        itemIndex++;
        dragPos = getTilePosition(11.5,colLoc);
        var drag11 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag11.setName("item"+itemArray[itemIndex]);
        drag11.setInteractive();
        this.input.setDraggable(drag11);
 
        itemIndex++;
        dragPos = getTilePosition(12.5,colLoc);
        var drag12 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag12.setName("item"+itemArray[itemIndex]);
        drag12.setInteractive();
        this.input.setDraggable(drag12);

        itemIndex++;
        dragPos = getTilePosition(13.5,colLoc);
        var drag13 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag13.setName("item"+itemArray[itemIndex]);
        drag13.setInteractive();
        this.input.setDraggable(drag13);
  
        itemIndex++;
        dragPos = getTilePosition(14.5,colLoc);
        var drag14 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag14.setName("item"+itemArray[itemIndex]);
        drag14.setInteractive();
        this.input.setDraggable(drag14);
  


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.depth = 5;

        });
        
        // Drop Zone

        // Column 1
        colLoc = 3;
        var numLoc = 2.85;
        tempPos = getTilePosition(1.5, colLoc);

        this.makeZone(tempPos, "item1");
        tempPos = getTilePosition(1.15, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "1");

    
        tempPos = getTilePosition(2.5, colLoc);
        this.makeZone(tempPos, "item2");
        tempPos = getTilePosition(2.15, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "2");
    
        tempPos = getTilePosition(3.5, colLoc);
        this.makeZone(tempPos, "item3");
        tempPos = getTilePosition(3.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "3");
    
        tempPos = getTilePosition(4.5, colLoc);
        this.makeZone(tempPos, "item4");
        tempPos = getTilePosition(4.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "4");
    
        tempPos = getTilePosition(5.5, colLoc);
        this.makeZone(tempPos, "item5");
        tempPos = getTilePosition(5.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "5");
    
        tempPos = getTilePosition(6.5, colLoc);
        this.makeZone(tempPos, "item6");
        tempPos = getTilePosition(6.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "6");
    
        tempPos = getTilePosition(7.5, colLoc);
        this.makeZone(tempPos, "item7");
        tempPos = getTilePosition(7.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "7");
    
        tempPos = getTilePosition(8.5, colLoc);
        this.makeZone(tempPos, "item8");
        tempPos = getTilePosition(8.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "8");
    
        tempPos = getTilePosition(9.5, colLoc);
        this.makeZone(tempPos, "item9");
        tempPos = getTilePosition(9.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "9");

        tempPos = getTilePosition(10.5, colLoc);
        this.makeZone(tempPos, "item10");
        tempPos = getTilePosition(10.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "10");

        tempPos = getTilePosition(11.5, colLoc);
        this.makeZone(tempPos, "item11");
        tempPos = getTilePosition(11.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "11");
    
        tempPos = getTilePosition(12.5, colLoc);
        this.makeZone(tempPos, "item12");
        tempPos = getTilePosition(12.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "12");
    
        tempPos = getTilePosition(13.5, colLoc);
        this.makeZone(tempPos, "item13");
        tempPos = getTilePosition(13.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "13");
    
        tempPos = getTilePosition(14.5, colLoc);
        this.makeZone(tempPos, "item14");
        tempPos = getTilePosition(14.05, numLoc);
        this.numText = this.add.bitmapText(tempPos.x, tempPos.y, "desyrel-pink", "14");
    
        this.input.on('dragstart', function (pointer, gameObject) {

            this.children.bringToTop(gameObject);
    
        }, this);    

        this.input.on('drop', this.doDrop, this);
        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
     
        });

    } //end of create
    update() {

    }

    makeZone(pos, itemName) {
//        var zone = this.add.zone(pos.x, pos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(0.75*gameOptions.tileSize, 0.75*gameOptions.tileSize);
        var zone = this.add.zone(pos.x, pos.y, 800, 0.75*gameOptions.tileSize).setRectangleDropZone(800, 0.75*gameOptions.tileSize);
        zone.setName(itemName);
        var graphics = this.add.graphics();
        graphics.lineStyle(3, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    }
    doDrop(pointer, gameObject, dropZone) {
        // Check if the drag item has the same name as the drop zone
        if (gameObject.name == dropZone.name) {

            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.depth = 0;
            gameObject.input.enabled = false;

        }
        else {
            // send back to original location
            gameObject.x = gameObject.input.dragStartX;
            gameObject.y = gameObject.input.dragStartY;
            gameObject.depth = 0;
        }
    };


}   //end of class playgame

// Given a row and column, determines the tile position in pixels
function getTilePosition(row, col) {

    var posX = gameOptions.tileSpacing * (col + 1) + gameOptions.tileSize * (col + 0.5);
    var posY = gameOptions.tileSpacing * (row + 1) + gameOptions.tileSize * (row + 0.5);
    var boardHeight = gameOptions.boardSize.rows * gameOptions.tileSize;
    boardHeight += (gameOptions.boardSize.rows + 1) * gameOptions.tileSpacing;
    //var offsetY = (game.config.height - boardHeight) / 2;
    //posY += offsetY;

    return new Phaser.Geom.Point(posX, posY);
}

