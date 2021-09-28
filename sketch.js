var score=0
var gameState=1
function preload(){
  playerimg=loadImage('Belle.png')
monsterimg=loadImage('Monster.png')  
}

function setup() {
  createCanvas(800,550);
  player= createSprite(100, 300, 50, 50);
  player.addImage(playerimg)
  player.scale=0.3
  player.debug = false
  player.setCollider("rectangle",-60,30,260,300)
  obg=createGroup()
  bulletg=createGroup()
  monsterg=createGroup()
  edges=createEdgeSprites()
  ob1=createSprite(250,500,70,20)
  ob2=createSprite(350,400,70,20)
  ob3=createSprite(550,300,70,20)
  ob4=createSprite(150,300,70,20)
  ob5=createSprite(400,200,70,20)
  ob6=createSprite(550,100,70,20)
  ob7=createSprite(650,500,70,20)
  ob8=createSprite(250,100,70,20)
  obg.add(ob1)
  obg.add(ob2)
  obg.add(ob3)
  obg.add(ob4)
  obg.add(ob5)
  obg.add(ob6)
  obg.add(ob7)
  obg.add(ob8)
}

function draw() {
  background(0);
  textSize(30)
  fill('green')
  text('Score: '+score,650,30)
  if(gameState===1){
  
  if(keyDown('space')){
    player.velocityY=-3
    obg.setVelocityEach(0,1)
  }
  player.velocityY+=0.2
  player.velocityX=0
  if(keyDown('left')){
    player.velocityX=-2
    player.mirrorX(-1)
  }
  if(keyDown('right')){
    player.velocityX=2
    player.mirrorX(1)
  }
  if(ob1.y>550){
    ob1.y= 0
  }
  if(ob2.y>550){
    ob2.y= 0
  }
  if(ob3.y>550){
    ob3.y= 0
  }
  if(ob4.y>550){
    ob4.y= 0
  }
  if(ob5.y>550){
    ob5.y= 0
  }
  if(ob6.y>550){
    ob6.y= 0
  }
  if(ob7.y>550){
    ob7.y= 0
  }
  if(ob8.y>550){
    ob8.y= 0
  }
  if(keyDown('w') &&frameCount%5===0 ){
    bullet=createSprite(player.x+50,player.y-20,20,5)
    bullet.velocityX=7
    bulletg.add(bullet)
  }

  for(var i=0;i<bulletg.length;i++){
    for (var v=0;v<monsterg.length;v++){
      if(bulletg[i]!==undefined && monsterg[v]!==undefined){
        if(bulletg[i].isTouching(monsterg[v])){
          bulletg[i].destroy()
          monsterg[v].destroy()
          score++
        }
      }
    }
  }
  
  if(frameCount%30===0){
    monster=createSprite(0,random(50,450))
 monster.addImage(monsterimg)  
 monster.scale=0.1
 switch(Math.round(random(1,2))) {
   case 1: monster.x = 0
   monster.velocityX = 2
   break
   case 2: monster.x = 800
   monster.velocityX = -2
   break
 }
 monsterg.add(monster)
  }
  player.collide(obg)
  player.collide(edges[0])
  player.collide(edges[1])
  player.collide(edges[2])
 if(player.isTouching(edges[3])){
   gameState=0
 } 
}
if(gameState===0){
  text("Game Over",300,300)
  monsterg.setVelocityXEach(0)
  obg.setVelocityYEach(0) 
  player.destroy()
}
  drawSprites();
}