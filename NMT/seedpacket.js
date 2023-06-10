/* Seed Packet Class File */

class SeedPacket extends Entity{
  constructor(type,name,sunCost,tier,recharge,startingRecharge, moving = false, spawnZombie = false){
    super(type, 1000, 1000);
    this.name = name;
    this.recharge = startingRecharge;
    this.startingRecharge = startingRecharge;
    this.maxRecharge = recharge;
    this.sun = sunCost;//Sun Cost
    this.moving = moving;//True only for conveyors
    this.tier = tier;
    this.selected = false;
    this.spawnZombie = spawnZombie;
    allPackets.push(this);
  }

  draw(){
    noStroke();
    fill(180,200,180);
    rect(this.x, this.y, 120, 40,2);
    //Draw Recharge
    fill(0,50);
    rect(this.x, this.y, 120, (this.recharge/this.maxRecharge)*40,2);
    if (this.selected === true){
      stroke(200,0,0);
    }else{
      stroke(200);
    }
    strokeWeight(3);
    noFill();
    rect(this.x, this.y, 120, 40,2);
    //Draw Name
    noStroke();
    fill(0);
    textSize(12);
    text(this.name,this.x+60,this.y+20);
    textSize(8);
    if(!currentLevel["type"].includes(2)){
      if(sun < this.sun){
        fill(255,0,0);
      }
      text(this.sun,this.x+15,this.y+30);
    }
    // if (!currentLevel.type.includes(14)){//Show Tier (Not I Zombie)
    //   if(this.tier === 1){
    //     stroke(120,80,40);
    //     strokeWeight(3);
    //     line(this.x+108,this.y+26,this.x+108,this.y+32);
    //   }else if(this.tier === 2){
    //     stroke(160);
    //     strokeWeight(2.5);
    //     line(this.x+106,this.y+26,this.x+106,this.y+32);
    //     line(this.x+110,this.y+26,this.x+110,this.y+32);
    //   }
    // }
    // else if(this.tier==3){
    //   stroke(255,225,0)
    //   strokeWeight(2)
    //   line(this.x+102,this.y+26,this.x+102,this.y+32)
    //   line(this.x+108,this.y+26,this.x+108,this.y+32)
    //   line(this.x+114,this.y+26,this.x+114,this.y+32)
    // }
  }

  move(){
    if (this.moving === true){//Conveyor
      if (this.y > 65*(allPackets.indexOf(this) - 1) + 20){
        this.y -= levelSpeed;
      }
    }else{//Other Levels
      if (this.recharge > 0){
        this.recharge -= levelSpeed;
      }else{
        this.recharge = 0;
      }
      this.x = 10;
      this.y = 80 + allPackets.indexOf(this)*60;
      if (this.type === "shovel"){
        if (currentLevel.type.includes(2)){//Conveyor
          this.x = 140;
          this.y = 600;
        }else{
          this.x = 10;
          this.y = 600;
        }
      }
    }
  }
}








