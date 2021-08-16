var dog,dogImg, happyDog, database, foodS, foodStock;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250, 250);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);


}


function draw() {  
  background("yellow");

  text("Press Up Arrow Key To Feed Your Dog Drago Milk", 125, 100);
  text("Food Left : " + foodS, 125, 130);

  drawSprites();
 
  if(foodS !== 0){
    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDog);
  
     
    }
  
    if(keyWentUp(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(dogImg);
     
    }
  }
  
  if(foodS == 0){
    
    dog.addImage(dogImg);
    foodS = 20;
  
  }  
}

function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    
    'Food':x
  
  });

}




