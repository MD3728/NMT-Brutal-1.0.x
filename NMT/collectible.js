/* Collectible Class File */
//Sun and Coins

class Collectible extends Entity{
  constructor(x,y,type,value,size, falling = false, timer = 900){
    super(type,x,y);//Call Entity Constructor
    this.falling = falling;
    this.timer = timer;
    this.value = value;
    this.size = size;//Larger sun means larger size (and vice versa)
    this.max = random(150,550);
    this.fade=0;
    allCollectibles.push(this);
  }

  draw(){
    noStroke();
    switch (this.type){
      case 1://Sun
        translate(this.x,this.y);
        rotate(this.timer);
        if(this.value>=75){//Big Sun
          scale(1.4)
        }else if (this.value <= 25){//Small Sun
          scale(0.75);
        }
        fill(255,255,150,this.fade/3);
        beginShape();
        for(var e=0;e<10;e++){
          vertex(sin(e*36)*24,cos(e*36)*24);
          vertex(sin(e*36+18)*15,cos(e*36+18)*15);
        }
        endShape();
        fill(255,255,100,this.fade/2);
        beginShape();
        for(e=0;e<10;e++){
          vertex(sin(e*36)*15,cos(e*36)*15);
          vertex(sin(e*36+18)*24,cos(e*36+18)*24);
        }
        endShape();
        fill(255,235,50,this.fade*2/3);
        ellipse(0,0,24,24);
        if(this.value>=75){
          scale(5/7)
        }else if (this.value <= 25){
          scale(4/3);
        }
        rotate(-this.timer);
        translate(-this.x,-this.y);
        break;
      case 2://Silver Coin
        translate(this.x,this.y);
        if(sin(this.timer*3)!=0){
          scale(sin(this.timer*3)*0.6,0.6);
          fill(225,this.fade);
          ellipse(0,0,30,30);
          stroke(150,this.fade);
          strokeWeight(4);
          noFill();
          arc(0,-5,12,10,90,270);
          arc(0,5,12,10,-90,90);
          line(0,-10,5,-10);
          line(0,10,-5,10);
          line(0,-13,0,13);
          scale(1/sin(this.timer*3)*5/3,5/3);
        }
        translate(-this.x,-this.y);
        break;
      case 3://Gold Coin
        translate(this.x,this.y);
        if(sin(this.timer*3)!=0){
          scale(sin(this.timer*3),1);
          fill(225,225,75,this.fade);
          ellipse(0,0,30,30);
          stroke(150,150,50,this.fade);
          strokeWeight(4);
          noFill();
          arc(0,-5,12,10,90,270);
          arc(0,5,12,10,-90,90);
          line(0,-10,5,-10);
          line(0,10,-5,10);
          line(0,-13,0,13);
          scale(1/sin(this.timer*3),1);
        }
        translate(-this.x,-this.y);
        break;
      default:
        break;
    }
  }

  move(){
    this.timer -= levelSpeed;
    if(this.timer<51/levelSpeed||this.trigger){
      this.fade-=15*levelSpeed;
      if(this.fade<=0){
        this.remove=true;
      }
    }else if(this.fade<255){
      this.fade+=15*levelSpeed;
    }
    if ((this.falling === true)&&(this.y < this.max)){
      this.y += 1.2 * levelSpeed;
    }
  }

}
  
  
  
  
  
  
 