// Literature Exercise #1
// By Andrea Shea
//

// Make game variable accessible to window.onload and resize functions
var game;
var gameOptions = {
    tileSize: 200,
    tileSpacing: 20,
    numItems: 10,
    boardSize: {
        rows: 10,
        cols: 10
    },

    tweenSpeed: 50,
    aspectRatio: 16 / 9,
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
            width: width,
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
        this.load.image("title1", "assets/sprites/classical_title.png"); 
        this.load.image("title2", "assets/sprites/modern_title.png"); 
        this.load.image("labelTop1", "assets/sprites/labelTop1.png"); 
        this.load.image("labelTop2", "assets/sprites/labelTop2.png"); 
        this.load.image("label1", "assets/sprites/label1.png"); 
        this.load.image("label2", "assets/sprites/label2.png"); 
        this.load.image("label3", "assets/sprites/label3.png"); 
        this.load.image("label4", "assets/sprites/label4.png"); 
        this.load.image("label5", "assets/sprites/label5.png"); 
    }

    create() {
        var tempPos = getTilePosition(0.4, 4.5);
        this.add.image(tempPos.x, tempPos.y, "title1");
        tempPos = getTilePosition(7.5, 4.5);
        this.add.image(tempPos.x, tempPos.y, "title2");

        tempPos = getTilePosition(1.75, 2.5);
        this.add.image(tempPos.x, tempPos.y, "labelTop1"); 

        tempPos = getTilePosition(8.75, 2.5);
        this.add.image(tempPos.x, tempPos.y, "labelTop1"); 
 
        tempPos = getTilePosition(1.75, 6.5);
        this.add.image(tempPos.x, tempPos.y, "labelTop2"); 

        tempPos = getTilePosition(8.75, 6.5);
        this.add.image(tempPos.x, tempPos.y, "labelTop2"); 
 
 
        tempPos = getTilePosition(2.5, 4.5);
        this.add.image(tempPos.x, tempPos.y, "label1"); 
   
        tempPos = getTilePosition(3.5, 4.5);
        this.add.image(tempPos.x, tempPos.y, "label2"); 
   
        tempPos = getTilePosition(4.5, 4.5);
        this.add.image(tempPos.x, tempPos.y, "label3"); 
   
        tempPos = getTilePosition(5.5, 4.5);
        this.add.image(tempPos.x, tempPos.y, "label4"); 
   
        tempPos = getTilePosition(9.5, 4.5);
        this.add.image(tempPos.x, tempPos.y, "label5"); 
   
        // Place drag items in an array and shuffle them
        var itemArray = [];
        for (var i = 0; i < gameOptions.numItems; i++) {
            itemArray[i] = i+1;
        } 
        Phaser.Utils.Array.Shuffle(itemArray);

        var itemIndex = 0;

        var dragPos = getTilePosition(3,0.5);
        var drag1 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag1.setName("item"+itemArray[itemIndex]);
        drag1.setInteractive();
        this.input.setDraggable(drag1);
 
        itemIndex++;
        dragPos = getTilePosition(4,0.5);
        var drag2 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag2.setName("item"+itemArray[itemIndex]);
        drag2.setInteractive();
        this.input.setDraggable(drag2);
 
        itemIndex++;
        dragPos = getTilePosition(5,0.5);
        var drag3 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag3.setName("item"+itemArray[itemIndex]);
        drag3.setInteractive();
        this.input.setDraggable(drag3);
 
        itemIndex++;
        dragPos = getTilePosition(6,0.5);
        var drag4 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag4.setName("item"+itemArray[itemIndex]);
        drag4.setInteractive();
        this.input.setDraggable(drag4);
 
        itemIndex++;
        dragPos = getTilePosition(7,0.5);
        var drag5 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag5.setName("item"+itemArray[itemIndex]);
        drag5.setInteractive();
        this.input.setDraggable(drag5);
 
        itemIndex++;
        dragPos = getTilePosition(3,8.5);
        var drag6 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag6.setName("item"+itemArray[itemIndex]);
        drag6.setInteractive();
        this.input.setDraggable(drag6);
 
        itemIndex++;
        dragPos = getTilePosition(4,8.5);
        var drag7 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag7.setName("item"+itemArray[itemIndex]);
        drag7.setInteractive();
        this.input.setDraggable(drag7);

        itemIndex++;
        dragPos = getTilePosition(5,8.5);
        var drag8 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag8.setName("item"+itemArray[itemIndex]);
        drag8.setInteractive();
        this.input.setDraggable(drag8);

        itemIndex++;
        dragPos = getTilePosition(6,8.5);
        var drag9 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag9.setName("item"+itemArray[itemIndex]);
        drag9.setInteractive();
        this.input.setDraggable(drag9);

        itemIndex++;
        dragPos = getTilePosition(7,8.5);
        var drag10 = this.add.image(dragPos.x, dragPos.y, "drag"+itemArray[itemIndex]);
        drag10.setName("item"+itemArray[itemIndex]);
        drag10.setInteractive();
        this.input.setDraggable(drag10);


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.depth = 5;

        });
        // Drop Zone
        tempPos = getTilePosition(2.5, 2.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item1");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(3.5, 2.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item2");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(4.5, 2.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item3");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(5.5, 2.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item4");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(9.5, 2.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item5");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(2.5, 6.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item6");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(3.5, 6.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item7");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(4.5, 6.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item8");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(5.5, 6.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item9");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    
        tempPos = getTilePosition(9.5, 6.5);
        var zone = this.add.zone(tempPos.x, tempPos.y, gameOptions.tileSize, gameOptions.tileSize).setRectangleDropZone(2*gameOptions.tileSize, gameOptions.tileSize);
        zone.setName("item10");
        // Add a visual display of drop zone
        var graphics = this.add.graphics();
        graphics.lineStyle(2, 0x8b0000);
        graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    

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

