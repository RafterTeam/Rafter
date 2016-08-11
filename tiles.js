//Road class
var Road = function() {
  this.walkable = true;
  this.image= new Image();
  this.image.src="images/tiles/road.png";
}
//Shop class
var Shop = function() {
  this.type=1;
  this.walkable=false;
  this.image=new Image();
  this.image.src="images/tiles/shop.png";
  this.robbed=0;
  this.mood=1;
  this.interact = function() {
    if(this.mood=1) {
      sendMessage("Shop friendly message", "rob shop for food", "buy from shop", "leave");
    } else {
      sendMessage("Shop hostile message", "rob shop for food", "buy from shop", "leave");
    }
    RespondAction = function(value) {
      if(value == 1) {
        player.money+=(-5);
        player.food+=(5);
      } else if(value == 2) {
        player.food+=(5);
        player.helth+=(-10);
      }
    }
  }
}
//Hotel class
var Hotel = function(type){
  this.walkable=false;
  this.image=new Image();
  this.image.src="images/tiles/office.png";
  this.mood=1;
  this.interact = function() {
    if(this.mood=1) {
      sendMessage("Hotel friendly message", "buy a stay", "sneak in", "leave");

    } else {
      sendMessage("Hotel hostile message", "buy a stay", "sneak in", "leave");
    }
    RespondAction = function(value) {
      if(value == 1) {
        player.money+=(-5);
        player.health+=(5);
      } else if(value == 2) {
        player.health+=(5);
        player.food+=(-5);
      }
    }
  }
}
//Shelter class
var Shelter = function(type) {
  this.walkable=false;
  this.image=new Image();
  this.image.src="images/tiles/cross-road.png";
  this.interact= function() {
    showEnding("You found shelter, they with the help of the council helped you get a new home, they gave you financial advice and soon after you found a new job, things can now go back to the way they used to be. Your life is back to normal.");
  }
}
