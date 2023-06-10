//Default Create Triangle
function regTriangle(x, y, radius, direction){
  triangle(x+sin(direction)*radius,y+cos(direction)*radius,x+sin(direction+120)*radius,y+cos(direction+120)*radius,x+sin(direction+240)*radius,y+cos(direction+240)*radius);
}

//Merge Array
function mergeArray(arr,arr2,value){
  return [arr[0]*value+arr2[0]*(1-value),arr[1]*value+arr2[1]*(1-value),arr[2]*value+arr2[2]*(1-value)]
}

//Screen transition animation
function displayTransition(transition){
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(transition.anim*width/4,height/2,transition.anim*width/2,height);
  rect(width-transition.anim*width/4,height/2,transition.anim*width/2,height);
  rect(width/2,transition.anim*height/4,width,transition.anim*height/2);
  rect(width/2,height-transition.anim*height/4,width,transition.anim*height/2);
  rectMode(CORNER);
  if(transition.trigger){
    transition.anim=round(transition.anim*10+1)/10;
    if(transition.anim>1.1){
      transition.trigger = false;
      screen=transition.screen;
    }
  }
  else if(transition.anim>0){
    transition.anim=round(transition.anim*10-1)/10;
  }
}

//Draw
function drawStack(){
  //Draw Background
  background(155,160,170);
  //Display Sun Values
  noStroke();
  fill(0,0,0);
  textSize(24);
  //Draw Sun and Coin Amount
  if (!currentLevel["type"].includes(2)){
    text(sun, 65, 40);
  }
  translate(830,635)
  scale(0.6)
  fill(225,this.fade)
  ellipse(0,0,30,30)
  stroke(150,this.fade)
  strokeWeight(4)
  noFill()
  arc(0,-5,12,10,90,270)
  arc(0,5,12,10,-90,90)
  line(0,-10,5,-10)
  line(0,10,-5,10)
  line(0,-13,0,13)
  scale(5/3)
  translate(-830,-635)
  noStroke()
  fill(0)
  textSize(15);
  textAlign(LEFT,CENTER)
  text(money, 845, 635);
  textAlign(CENTER,CENTER)
  //No Plants Lost
  if (currentLevel["type"].includes(8)){
    textSize(14);
    text(`Plants Left: ${currentLevel["maxLostPlant"] - lostPlants}`, 250, 30);
  }
  //Draw Tiles
  for (let currentTile of tiles){
    if((currentLevel["type"].includes(13))&&(currentTile.y===420)){//Unsodded
      fill(100,60,20);
    }else if (currentTile.color === 0){//Light Blue
      fill(110,105,220);   
    }else{//Dark Blue
      fill(80,170,230);
    }
    rect(currentTile.x, currentTile.y, 80, 100);
    //Outline
    if((currentLevel["type"].includes(13))&&(currentTile.y===420)){//Unsodded
      fill(90,50,10);
    }else if (currentTile.color === 0){//Light Blue
      fill(100,95,210);   
    }else{//Dark Blue
      fill(70,160,220);
    }
    rect(currentTile.x+5, currentTile.y+5, 70, 90)
  }
  //Draw Flower Line (If Level Has It)
  if (currentLevel["type"].includes(7) === true){
    fill(255,0,0);
    for(let a=0;a<20;a++){
      image(graphics.minor[a%7],currentLevel["flowerLine"]+((a*a)%4.3)*4-8.6,120+a*25,25,25)
    }
  }
  //Draw Zombie Line (I Zombie)
  if (currentLevel["type"].includes(14) === true){
    fill(255,0,0);
    for(let a=0;a<20;a++){
      ellipse(currentLevel["plantLine"]+((a*a)%4.3)*4-18.6,120+a*25,30,30)
    }
  }
  //Draw Boss
  if (currentLevel["type"].includes(10)){
    fill(100);
    rect(660,120,240,500);
    fill(200);
    ellipse(780,370,160,160);
    translate(780,420);
    stroke(240);
    strokeWeight(4);
    line(-4,-30,-8,0);
    line(4,-30,8,0);
    line(-6,-45,-24,-39-sin(globalTimer*9)*3);
    line(-6,-51,-24,-57+sin(globalTimer*9)*3);
    noStroke();
    fill(240);
    ellipse(0,-47,18,42);
    fill(60);
    rect(-10,-45,20,3);
    fill(240,220,180);
    ellipse(0,-78,30,30);
    fill(0);
    ellipse(-4,-75,4,4);
    ellipse(-12,-75,4,4);
    stroke(40);
    strokeWeight(1);
    fill(255,50);
    ellipse(-4,-74,6,5);
    ellipse(-12,-74,6,5);
    line(-7,-74,-9,-74);
    translate(-780,-420);
  }
  noStroke();
  //Draw Jams
  if((currentJam===1)||(currentJam===8)){//Punk
    fill(250,75,0,150);
    for(let a=0;a<9;a++){
      arc(a*80+220,100,20*(1+sin(frameCount*6)*0.5),20*(1+sin(frameCount*6)*0.5),0,180);
      triangle(a*80+220-10*(1+sin(frameCount*6)*0.5),100,a*80+220+10*(1+sin(frameCount*6)*0.5),100,a*80+220,100-50*(1+sin(frameCount*6)*0.5));
      arc(a*80+220,640,20*(1+sin(frameCount*6)*0.5),20*(1+sin(frameCount*6)*0.5),0,180);
      triangle(a*80+220-10*(1+sin(frameCount*6)*0.5),640,a*80+220+10*(1+sin(frameCount*6)*0.5),640,a*80+220,640-50*(1+sin(frameCount*6)*0.5));
    }
    fill(250,175,0,150);
    for(let a=0;a<9;a++){
      arc(a*80+220,100,10*(1+sin(frameCount*6)*0.5),10*(1+sin(frameCount*6)*0.5),0,180);
      triangle(a*80+220-5*(1+sin(frameCount*6)*0.5),100,a*80+220+5*(1+sin(frameCount*6)*0.5),100,a*80+220,100-25*(1+sin(frameCount*6)*0.5));
      arc(a*80+220,640,10*(1+sin(frameCount*6)*0.5),10*(1+sin(frameCount*6)*0.5),0,180);
      triangle(a*80+220-5*(1+sin(frameCount*6)*0.5),640,a*80+220+5*(1+sin(frameCount*6)*0.5),640,a*80+220,640-25*(1+sin(frameCount*6)*0.5));
    }
  }
  if((currentJam===2)||(currentJam===8)){//Glitter
    fill(255);
    for(let a=0;a<18;a++){
      ellipse((frameCount*2)%40+a*40+180,120,5,5);
      ellipse(-(frameCount*2)%40+a*40+220,220,5,5);
      ellipse((frameCount*2)%40+a*40+180,320,5,5);
      ellipse(-(frameCount*2)%40+a*40+220,420,5,5);
      ellipse((frameCount*2)%40+a*40+180,520,5,5);
      ellipse(-(frameCount*2)%40+a*40+220,620,5,5);
    }
    push();
    translate(540,10);
    rotate(frameCount*2);
    image(graphics.minor[7],-120,-120,240,240);
    pop();
  }
  if((currentJam===3)||(currentJam===8)){//Rap
    stroke(125,150,125);
    fill(75,150,75);
    strokeWeight(5);
    rect(440,-20,200,70,10);
    noStroke();
    fill(0);
    ellipse(540+sin(frameCount*2)*60,15,50,50);
    fill(75,150,75);
    ellipse(540+sin(frameCount*2)*60,15,40,40);
    fill(0);
    ellipse(530+sin(frameCount*2)*65,10,10,10);
    ellipse(550+sin(frameCount*2)*65,10,10,10);
    fill(80);
    rect(390,-20,40,70,5);
    rect(650,-20,40,70,5);
    fill(40);
    ellipse(410,0,20,20);
    ellipse(410,30,20,20);
    ellipse(670,0,20,20);
    ellipse(670,30,20,20);
  }
  if((currentJam===4)||(currentJam===8)){//Arcade
    fill(255,100,200,50);
    for (let currentTile of tiles){
      if(currentTile.id%4==floor((frameCount%240)/60)){
        rect(currentTile.x+10, currentTile.y+10, 60, 80);
      }
    }
    fill(255,150,200,150);
    for(let a=0;a<9;a++){
      ellipse(a*80+220,110,40*(1+sin(frameCount)*0.1),40*(1+sin(frameCount)*0.1));
      ellipse(a*80+220,630,40*(1+sin(frameCount)*0.1),40*(1+sin(frameCount)*0.1));
    }
    for(let a=0;a<8;a++){
      ellipse(a*80+260,110,40*(1-sin(frameCount)*0.1),40*(1-sin(frameCount)*0.1));
      ellipse(a*80+260,630,40*(1-sin(frameCount)*0.1),40*(1-sin(frameCount)*0.1));
    }
  }
  if((currentJam===5)||(currentJam===8)){//Rock
    fill(255);
    for(let a=0;a<9;a++){
      push();
      translate(a*80+220,100);
      scale(1+sin(frameCount*6)*0.5);
      beginShape();
      vertex(0,0);
      vertex(-15,-15);
      vertex(-3,-10);
      vertex(0,-30);
      vertex(3,-10);
      vertex(15,-15);
      endShape();
      pop();
    }
  }
  if((currentJam===6)||(currentJam===8)){//Techie
    fill(100,255,100);
    for(let a=0;a<9;a++){
      rect(a*80+200,120-(1-pow((0.5+0.5*sin(frameCount*3+a*150)),1/3))*100,40,(1-pow((0.5+0.5*sin(frameCount*3+a*150)),1/3))*100);
    }
    for(let a=0;a<9;a++){
      rect(a*80+200,620-(1-pow((0.5+0.5*sin(frameCount*3+a*150-300)),1/3))*100,40,(1-pow((0.5+0.5*sin(frameCount*3+a*150-300)),1/3))*100);
    }
  }
  if(currentJam===7){//Boombox
    noFill();
    stroke(255,100,255,255-(frameCount%600)/2);
    strokeWeight(10);
    ellipse(540,-10,frameCount%600,frameCount%600);
  }
  //Draw Plants
  for (let currentPlant of allPlants){
    currentPlant.draw();
  }
  //Draw Zombies
  for (let currentZombie of allZombies){
    currentZombie.draw();
  }
  //Draw Projectiles
  for (let currentProjectile of allProjectiles){
    currentProjectile.draw();
  }
  //Draw Lawnmowers
  for (let currentMower of lawnMowers){
    if (currentMower.active === true){
      currentMower.x += 6*levelSpeed;
    }
    noStroke(0);
    fill(80,160,160);
    rect(currentMower.x, currentMower.y+42, 36, 16);
    fill(60);
    ellipse(currentMower.x+10, currentMower.y+58,8,8);
    ellipse(currentMower.x+26, currentMower.y+58,8,8);
    ellipse(currentMower.x+18, currentMower.y+44, 20, 6);
    rect(currentMower.x-5, currentMower.y+40,2,12);
    quad(currentMower.x-3,currentMower.y+40,currentMower.x,currentMower.y+43,currentMower.x,currentMower.y+45,currentMower.x-3,currentMower.y+42);
    quad(currentMower.x-3,currentMower.y+50,currentMower.x,currentMower.y+53,currentMower.x,currentMower.y+55,currentMower.x-3,currentMower.y+52);
  }
  //Draw Particles
  for (let currentWhatever of allParticles){
    currentWhatever.draw();
    if(currentWhatever.remove){
      allParticles.splice(allParticles.indexOf(currentWhatever), 1);
      allEntities.splice(allEntities.indexOf(currentWhatever), 1);
    }
  }
  //Draw Conveyor
  if (currentLevel["type"].includes(2) === true){
    fill(40);
    rect(0,0,10,650);
    rect(120,0,10,650);
    fill(60);
    rect(10,0,110,650);
    fill(70);
    for(let a = 0; a < 24; a++){
      rect(10,10+a*30-(globalTimer)%30,110,8);
    }
  }
  //Draw Fog (If Level Has It)
  if (currentLevel["type"].includes(5) === true){
    fill("rgba(0,0,0,0.3)");//Night Overlay
    rect(0,0,900,650);
    if (currentJam !== 8){//Not Ultimate Jam, Draw Fog
      image(graphics.minor[8],currentLevel["fogLine"]-30,50,800,600);
    }
  }
  //Display Fast Forward Buttons
  strokeWeight(5);
  stroke(80);
  fill(100);
  rect(700,50,60,40,5);
  noStroke();
  fill(40);
  if (levelSpeed === 2){
    regTriangle(714,70,10,-30);
    regTriangle(730,70,10,-30);
    regTriangle(746,70,10,-30);
  }else if (levelSpeed === 1.5){
    regTriangle(722,70,10,-30);
    regTriangle(738,70,10,-30);
  }else{
    regTriangle(730,70,10,-30);
  }
  //Display Level Progress and Flags OR Boss Bar
  if (currentLevel["type"].includes(10)){//Boss Bar
    stroke(80);
    fill(100);
    rect(350,60,310,30,5);
    noStroke();
    fill(200,30,30);
    rect(356,66,bossDamage/25000*297/currentLevel["waves"].length+currentWave*297/currentLevel["waves"].length,18,5);
    fill(20);
    for(let a=1;a<7;a++){
      rect(348+a*310/7,60,4,30);
    }
  }else{//Regular Bar
    stroke(80);
    fill(100);
    rect(350,60,310,30,5);
    noStroke();
    fill(200,30,30);
    rect(356,66,currentWave/currentLevel["waves"].length*288,18,5);
    for(let a = 1; a < currentLevel.flag.length + 1; a++){
      if(currentLevel.flag[a - 1]){//Remember that 0th wave is not counted
        if(currentWave >= a){//Flag Raised (Wave Passed)
          fill(200,120,40);
          rect(350+288/currentLevel.flag.length+(a-1)*288/currentLevel.flag.length-3,63,2,24);
          fill(240,40,40);
          rect(352+288/currentLevel.flag.length+(a-1)*288/currentLevel.flag.length-3,64,12,10);
        }else{
          fill(200,120,40);
          rect(350+288/currentLevel.flag.length+(a-1)*288/currentLevel.flag.length-3,73,2,24);
          fill(240,40,40);
          rect(352+288/currentLevel.flag.length+(a-1)*288/currentLevel.flag.length-3,74,12,10);
        }
      }
    }
  }
  //Display Quit Button
  fill(100);
  stroke(80);
  strokeWeight(5);
  rect(800,30,60,40,5);
  noStroke();
  fill(255,255,255);
  textSize(20);
  text("Quit", 830, 50);
  //Draw Seed Packets and Shovel
  for (let currentPacket of allPackets){
    currentPacket.draw();
  }
  //Draw Sun
  for (let currentCollectible of allCollectibles){
    currentCollectible.draw();
  }
}
