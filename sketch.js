var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feedtime,lastfeed;
var foodObj;
var milkImg;


function preload(){
   dogImg=loadImage("Dog.png");
   dogImg1=loadImage("happydog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  food=new Food()

  feed=createButton("feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addfood=createButton("add food");
  feed.position(800,95)
  feed.mousePressed(addfoods);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
  fill (255,255,255)
  textsize(15)
 if(lastfeed>=12) {
 text("lastfeed:"+lastfeed%12+"PH",350,30)
 }else if(lastfeed==0){
 text("lastfeed:12AM",350,30)
 }else{
  text("lastfeed:"+lastfeed+"AM",350,30)
 }
 food.display();
 
 


  drawSprites();
  
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

feedtime=database.ref('Feed Time');
feedTime.on("value",function(data){
lastfeed=data.val();
});
textSize(20); 
//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}
function feeddog(){
  dog.addImage(dogImg);
  foodObj.updateFoodstock(foodObj.getfoodStock()-1);
  database.ref('/').update({
    food:foodObj.getfoodstock(),
    feedTime:hour()
  })
}
function addFoods(){
foodS++
database.ref('/').update({
  food:foodS
})
}

