var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivalTime;
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,180,1000,20);
  ground.x = ground.width /2;
  
   gameOver = createSprite(300,75);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  //restart.scale = 0.5;
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  bGroup = createGroup();
  
  //console.log("Hello" + 5);
  
  monkey.setCollider("circle",0,0,40);
  monkey.debug = true
  
  survivalTime = 0;
  score = 0;
}

function draw() {
  
  background(180);
  //displaying score
  stroke("black");
    textSize(20);
    fill("black");
    text("Score " + score,500,50)
  
  //console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    
    ground.velocityX = -4;
    
    
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount/frameRate())
    text("Survival Time: " + survivalTime,100,50)
    
    
    if(bGroup.isTouching(monkey)){
      bGroup.destroyEach();
      score = score + 2;
  }
    
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >= 160) {
        monkey.velocityY = -14;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.6
  
    //spawn the clouds
    spawnBanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){  
      gameState = END;
    }
  }
   else if (gameState === END) {
     //console.log("hey")
     restart.scale = 0.1; 
     
     gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      monkey.velocityY = 0
     
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    bGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bGroup.setVelocityXEach(0);
     
     //making the game reset when restart button is pressed
     if(mousePressedOver(restart) || keyDown("space")){
    
        reset();
    
     } 
   
   }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  //drawing sprites 
  drawSprites();
}

function reset(){
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bGroup.destroyEach();
  
  score = 0;
}



function spawnObstacles(){
 if (frameCount % 300 === 0){
   obstacle = createSprite(610,165,10,40);
   obstacle.velocityX = ground.velocityX;
   obstacle.addImage(obstacleImage)
   
   obstacle.x =Math.round(random(200,750));
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    banana = createSprite(600,100,40,10);
    banana.y = Math.round(random(20,150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 210;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding cloud to the group
   bGroup.add(banana);
    }
}

