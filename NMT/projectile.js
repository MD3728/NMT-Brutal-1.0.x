/* Projectile Class File */

class Projectile extends Entity{
  constructor(x,y,row,type,damage,speed,tier,splashDamage = 0, toZombie = true){
    super(type,x,y);//Call Entity Constructor
    this.originalX = x; //For Puff Projectile
    this.lane = row;
    this.damage = damage;
    this.splashDamage = splashDamage;
    this.speed = speed;
    this.used = false;
    this.toZombie = toZombie;
    this.tier = tier;
    this.time = 0;
    this.goDownTimer=0;
    this.goUpTimer=0;
    allProjectiles.push(this);
  }

  draw(){
    //Types: 1: Pea, 2: Red Stinger, 3: Snow Pea, 4: Spore Shroom Spore, 5: Puff Projectile
    //6: Fume shroom (Does not exist), 7: Phat Beet Wave (Does not exist), 8: Pepper Cannon Pepper, 9: Coconut, 10: Lily (Valley Lily),
    //11 Basketball, 12: Frozen Pea
    translate(this.x+10,this.y+10);
    noStroke();
    switch(this.type){
      case 1://Pea
        fill(50,200,50);
        ellipse(0,0,16,16);
        fill(50,190,50);
        ellipse(-2,-2,10,10);
      break
      case 2://Red Stinger
        fill(200,15,20);
        ellipse(0,0,24,12);
        fill(235,25,30);
        ellipse(-1,0,20,10);
      break
      case 3://Ice Pea
        fill(130,235,230);
        ellipse(0,0,20,20);
        fill(180,240,240);
        ellipse(-2,-2,12,12);
      break
      case 4://Spore Shroom Spore
        rotate(this.time*4);
        fill(140,35,80);
        arc(0,4,24,30,-180,0);
        arc(0,4,24,6,0,180);
        fill(75,10,110);
        ellipse(-4,-1,6,6);
        ellipse(4,-3,5,5);
        rotate(-this.time*4);
      break
      case 5://Puff Shroom Spore
        fill(115,40,120);
        ellipse(5,0,10,10);
        fill(175,80,195);
        ellipse(4,-1,6,6);
        break;
      case 8://Pepper
        fill(240,20,20);
        ellipse(0,0,16,16);
        fill(250,125,0);
        ellipse(0,0,6,6);
        break;
      case 9://Coconut
        fill(125,65,10);
        ellipse(0,0,20,20);
        fill(255,100,0);
        ellipse(-7,-7,4,4);
        break;
      case 10://Poisonous Lily
        fill(180,235,240,200);
        ellipse(0,0,18,18);
        fill(100,50,125,150);
        rotate(this.time*2);
        rect(-4,-4,8,8);
        rotate(this.time*-2);
        break;
        case 11://basketball
          fill(200,100,50)
          ellipse(0,0,24,24)
          rotate(this.time*2)
          stroke(0)
          strokeWeight(1)
          line(0,-12,0,12)
          arc(9,0,6,16,90,270)
          arc(-9,0,6,16,-90,90)
          rotate(-this.time*2)
        break
        case 12://Ice Pea (freeze)
        fill(180,255,255)
        ellipse(0,0,24,24)
        triangle(0,-12,0,12,-24,0)
        fill(130,235,230);
        ellipse(0,0,20,20);
        fill(180,240,240);
        ellipse(-2,-2,12,12);
      break
      default:
        fill(255,0,0);
        rect(-10,-10,20, 20);
        break;
    }
    translate(-this.x-10,-this.y-10);
  }

  move(){
    this.time++;
    this.x += 5*this.speed*levelSpeed;
    if ((this.x > this.originalX + 280)&&(this.toZombie === true)&&(this.type === 5)){//Puff Shroom Spore Range
      this.used = true;
    }
    if(this.goDownTimer>0){
      this.goDownTimer--
      this.y+=5
    }
    if(this.goUpTimer>0){
      this.goUpTimer--
      this.y-=5
    }
  }
}
  
  
  
  
  
  
 