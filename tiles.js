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
      sendMessage("Shop friendly message", "buy a stay", "sneak in", "leave");

    } else {
      sendMessage("Shop hostile message", "buy a stay", "sneak in", "leave");
    }

  }
}
//Shelter class
var Shelter = function(type) {
  this.walkable=false;
  this.image=new Image();
  this.image.src="images/tiles/cross-road.png"
  this.interact= function() {
    showEnding()
  }
}
