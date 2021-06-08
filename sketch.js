var backImage,backgr;
var player, player_running;
var ground,ground_img;
var bananaImg, obsImg;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score;

function preload(){
  backImage=loadImage("jungle.jpg");
  playerImg = loadImage("Monkey_01.png");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  obsImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  score = 0;
  
  bananaGroup = new Group();
  obsGroup = new Group();
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") && player.y >= 100) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
    for(var i =0 ; i< bananaGroup.length; i++){
      if(bananaGroup.get(i).isTouching(player)){
        bananaGroup.get(i).destroy();
        score += 1;
        player.scale += 0.01;
      }
    }
    if(obsGroup.isTouching(player)){
     gameState = END;
    }
    player.collide(ground);
    spawnBanana();
    spawnObstacles();
  }

  drawSprites();
  textAlign(CENTER);
  textSize(20);
  fill(255)
  text("Score : "+score, 100,50);
  if(gameState===END){
    player.changeAnimation("collided",playerImg);
    backgr.velocityX = 0;
    obsGroup.setVelocityXEach(0);
    obsGroup.setLifetimeEach(-1);
    bananaGroup.setVelocityXEach(0);
    bananaGroup.setLifetimeEach(-1);
    textAlign(CENTER);
    fill(255);
    textSize(30)
    text("Game Over", 400, 200)
  }
}

function spawnBanana(){
  if(frameCount%90 === 0){
    var y = random(100,300);
    var banana;
     banana = createSprite(800, y,10,10);
     bananaGroup.add(banana);
     banana.addImage(bananaImg);
     banana.velocityX = -4;
     banana.scale = 0.05;
     banana.lifeTime = 200;
  }
}

function spawnObstacles(){
  if(frameCount%150 === 0){
    var obs;
    obs = createSprite(800,300,10,10);
    obsGroup.add(obs);
    obs.addImage(obsImg);
    obs.scale = 0.2;
    obs.velocityX = -4;
  }
}
