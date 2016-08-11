//setup canvas, window and input modes.
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("touchstart", onTouchStart, false);
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var running = true;
var ending = "";

//utility random function
function random() {
  min = Math.ceil(-1);
  max = Math.floor(1);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//setup player images.
playerImage = new Image();
playerImage.onload = function() {
  player.ready = true;
}
playerImage.src="images/characters/player/Walking/w1.png"



//setup player multiple choice interface
var currentInteraction = 0;
function sendMessage(message, op1, op2, op3) {
  document.getElementById('output').innerHTML=message;
  document.getElementById("optionA").innerHTML=op1;
  document.getElementById("optionB").innerHTML=op2;
  document.getElementById("optionC").innerHTML=op3;
}
function Respond(){

}
function readResponse() {
  respond();
}
var endingText;
function showEnding(ending) {
  running=false;
  endingText=ending;
}



//Set the tile by tile dimentions of the world, tile count starts from 0.
var XTiles=13;
var YTiles=13;
//Setup Tile managing array for storage of the game world and populate with tiles chosen by random numbers, with exception of roads and a shelter
var tiles=new Array(XTiles);
for (i=0; i < (XTiles+1); i++) {
  tiles[i]=new Array(YTiles);
}
for (var x = 0; x < XTiles +1; x++) {
  for (var y = 0; y < YTiles +1; y++) {
    var value = Math.random();
    if(x == 0) {
      tiles[x][y] = new Road();
    } else if(x==3) {
      tiles[x][y] = new Road();
    } else if(x==6) {
      tiles[x][y] = new Road();
    } else if(x==9) {
      tiles[x][y] = new Road();
    } else if(x==12) {
      tiles[x][y] = new Road();
    } else if(y==0) {
      tiles[x][y] = new Road();
    } else if (x==5 && y==3) {
      tiles[x][y] = new Shelter();
    } else if (value < 0) {
      tiles[x][y] = new Shop();
    } else if (value > 0) {
      tiles[x][y] = new Hotel();
    }
  }
}

//setup functions to get tiles at global map co-ordenates and get the global co-ordenates of co-ordenates of the display.
function getTileAtGlobal(x, y) {
  var tileNX = 0|(x/64);
  var tileNY = 0|(y/64);
  var tile = tiles[tileNX] [tileNY];
  return tile;
}
//set player requested co-ordenates when the mouse it clicked or screen tapped.
function onMouseDown(event) {
  player.xReq = event.pageX;
  player.yReq = event.pageY;
  console.log("x= "+player.xReq+", y= "+player.yReq)
}
function onTouchStart (event) {
  event.preventDefault();

  var canvasX = event.targetTouches[0].pageX;
  var canvasY = event.targetTouches[0].pageY;

  player.xReq = canvasX;
  player.yReq = canvasY;
}
//set the sequence for a game logic update.
function update() {
  //check if the player requested cor-ordenates are a road, if so move and if not interact with the building
  if(player.xReq != 0) {
    var temp = getTileAtGlobal(player.xReq, player.yReq);
    console.log(temp);
    if(temp.walkable) {
      player.x=player.xReq-4;
      player.y=player.yReq-4;
    } else {
      getTileAtGlobal(player.xReq, player.yReq).interact();
    }
    player.xReq=0;
    player.yReq=0;
  }
}
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if(running) {
    //draw the tile grid on the screen
    var drawx = 0;
    var drawy = 0;
    for (var x = 0; x < XTiles +1; x++) {
      drawy=0;
      for (var y = 0; y < YTiles +1; y++) {
        var tempTile = tiles[x][y];
        context.drawImage(tempTile.image, drawx, drawy);
        drawy+=64;
      }
      drawx+=64;
    }
    //draw the player.
    context.drawImage(playerImage, player.x-8, player.y-8);
    //display player stats as text on the top of the scren
    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseLine = "top";
    context.fillText("|Health: "+player.health+", Food: "+player.food+", Money: "+player.money+"|", 32, 32);
  } else {
    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseLine = "top";
    context.fillText(endingText);
  }
}
//set main game loop
function main () {
  var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again as another frame in animation
	requestAnimationFrame(main);
}

var then = Date.now();
main();
