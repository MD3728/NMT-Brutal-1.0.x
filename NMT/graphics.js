/* Graphics Setup File (Includes pointBox) */

//Minature collision method

function refresh(){
    for(currentPacket of allPackets){
        currentPacket.recharge=0
    }
}

function rich(){
    sun=99999
    money=99999
}

function shut(){
    daveIndex=99999
}

function go(){
    spawnWave()
    for(currentZombie of allZombies){
        currentZombie.x=800
    }
}

function test(){
    l1()
    rich()
    shut()
}

function l1(){
    currentLevel = levels['l1'];
    if (currentLevel.daveSpeech.length !== 0){//There is Dialogue
      daveSetup();
    }else if ((currentLevel.type.includes(10))||(currentLevel.type.includes(14))){//Boss or I Zombie
      initialLevelSetup();
      finalLevelSetup();
      transition.trigger=true;
      transition.screen="level";
    }else{//Normal
      initialLevelSetup();
      chooseSeeds();
    }
}

function pointBox(pointX, pointY, boxX, boxY, boxWidth, boxHeight){ 
    if((pointX > boxX)&&(pointX < boxX+boxWidth)&&(pointY > boxY)&&(pointY < boxY+boxHeight)){
        return true;
    }else{
        return false;
    }
}

function setupLayer(layer){
    layer.angleMode(DEGREES)
	layer.textAlign(CENTER,CENTER)
	layer.rectMode(CENTER)
	layer.colorMode(RGB,255,255,255,1)
}

function setupGraphics(){
    for(let a=0;a<7;a++){
        graphics.minor.push(createGraphics(120,120))
        setupLayer(graphics.minor[a])
        graphics.minor[a].translate(60,60)
        graphics.minor[a].rotate(a*360/7)
        graphics.minor[a].noStroke()
        graphics.minor[a].fill(236,130,138)
        for(let b=0;b<5;b++){
            graphics.minor[a].rotate(72)
            graphics.minor[a].beginShape()
            graphics.minor[a].vertex(0,0)
            graphics.minor[a].bezierVertex(-14,-14,-14,-28,0,-42)
            graphics.minor[a].bezierVertex(14,-28,14,-14,0,0)
            graphics.minor[a].endShape()
        }
        graphics.minor[a].fill(213,88,102)
        for(let b=0;b<5;b++){
            graphics.minor[a].rotate(72)
            graphics.minor[a].beginShape()
            graphics.minor[a].vertex(0,0)
            graphics.minor[a].bezierVertex(-7,-10,-7,-20,0,-30)
            graphics.minor[a].bezierVertex(7,-20,7,-10,0,0)
            graphics.minor[a].endShape()
        }
        graphics.minor[a].fill(255,161,161)
        graphics.minor[a].ellipse(0,0,4,4)
    }
    graphics.minor.push(createGraphics(200,200))
    setupLayer(graphics.minor[7])
    graphics.minor[7].translate(100,100)
    graphics.minor[7].noStroke()
    for(let a=9;a>=0;a--){
        for(let b=0;b<24;b++){
            graphics.minor[7].fill(random(200,260),this.fade)
            graphics.minor[7].arc(0,0,a*10+10,a*10+10,b*15,b*15+15)
        }
    }
    graphics.minor.push(createGraphics(1100,900))
    setupLayer(graphics.minor[8])
    graphics.minor[8].fill(160,0.6)
    graphics.minor[8].noStroke()
    for(let a=0;a<17;a++){
        for(let b=0;b<16;b++){
            graphics.minor[8].ellipse(a*50+random(90,110),b*50+random(90,110),random(120,160))
        }
    }
    for(let b=0;b<3;b++){
        graphics.minor.push(createGraphics(50,100))
        setupLayer(graphics.minor[9+b])
        graphics.minor[9+b].noFill()
        graphics.minor[9+b].strokeWeight(4)
        graphics.minor[9+b].stroke(200)
        for(let a=1;a<15;a++){
            graphics.minor[9+b].line(2+a*15,2,2,2+a*15)
            graphics.minor[9+b].line(48-a*15,2,48,2+a*15)
        }
        graphics.minor[9+b].stroke(240)
        graphics.minor[9+b].rect(25,50,46,96)
    }
    graphics.minor[10].noStroke()
    graphics.minor[11].noStroke()
    graphics.minor[10].fill(0)
    graphics.minor[11].fill(0)
    graphics.minor[10].erase()
    graphics.minor[10].triangle(50,100,50,70,20,100)
    graphics.minor[11].erase()
    graphics.minor[11].triangle(50,100,50,30,0,100)
}