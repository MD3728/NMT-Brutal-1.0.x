class Particle extends Entity{
    constructor(type, x, y){
        super(type,x,y);
        this.size=0;
        this.fade=255;
        this.remove=false;
        allParticles.push(this);
    }

    draw(){
        switch(this.type){
            case 0://Cherry Bomb OR Cherry Bomb Zombie OR Zomboss Missile Explosion
                noStroke();
                fill(255,100,0,this.fade);
                ellipse(this.x,this.y,this.size*16,this.size*16);
                fill(255,200,0,this.fade);
                ellipse(this.x,this.y,this.size*8,this.size*8);
                break;
            case 1://Melon Grenade Explosion
                noStroke();
                fill(150,255,255,this.fade);
                ellipse(this.x,this.y,this.size*16,this.size*16);
                fill(200,255,255,this.fade);
                ellipse(this.x,this.y,this.size*8,this.size*8);
                break;
            case 2://Dazey
                noStroke()
                fill(255,125,125,this.fade);
                ellipse(this.x,this.y,this.size*16,this.size*16);
                fill(255,75,75,this.fade);
                ellipse(this.x,this.y,this.size*8,this.size*8);
                break;
            case 3://Solar tomato
                noStroke()
                fill(255,255,185,this.fade);
                ellipse(this.x,this.y,this.size*16,this.size*16);
                fill(255,255,125,this.fade);
                ellipse(this.x,this.y,this.size*8,this.size*8);
                break;
            case 4://Zomboss Missile Explosion
                noStroke();
                fill(255,100,0,this.fade);
                ellipse(this.x,this.y,this.size*8,this.size*8);
                fill(255,200,0,this.fade);
                ellipse(this.x,this.y,this.size*4,this.size*4);
            break;
            case 5://bumbry
                noStroke()
                fill(255,50,255,this.fade);
                ellipse(this.x,this.y,this.size*20,this.size*20);
                break;
            case 6://poto min
                noStroke()
                fill(220,200,100,this.fade);
                ellipse(this.x,this.y,this.size*6,this.size*6);
                fill(240,220,120,this.fade);
                ellipse(this.x,this.y,this.size*3,this.size*3);
                break;
            case 7://priml poto min
                noStroke()
                fill(220,200,100,this.fade);
                ellipse(this.x,this.y,this.size*18,this.size*18);
                fill(240,220,120,this.fade);
                ellipse(this.x,this.y,this.size*9,this.size*9);
                break;
            case 8://bom ouch
                noStroke();
                fill(255,100,0,this.fade);
                ellipse(this.x,this.y,this.size*8,this.size*8);
                fill(255,200,0,this.fade);
                ellipse(this.x,this.y,this.size*4,this.size*4);
                break;
            case 9://squish
                translate(this.x,this.y)
                noStroke()
                fill(100,150,100)
                rect(-2,-63,4,4)
                fill(100,200,100)
                arc(0,-20,50,40,0,180)
                quad(25,-20,-25,-20,-15,-50,15,-50)
                arc(0,-50,30,20,-180,0)
                fill(0)
                ellipse(0,-25,6,6)
                ellipse(15,-25,6,6)
                translate(-this.x,-this.y)
            break
            case 10://squosh
                translate(this.x,this.y)
                noStroke()
                fill(100,150,100)
                rect(-2,-63,4,4)
                fill(100,200,100)
                arc(0,-20,50,40,0,180)
                quad(25,-20,-25,-20,-15,-50,15,-50)
                arc(0,-50,30,20,-180,0)
                fill(0)
                ellipse(0,-25,6,6)
                ellipse(-15,-25,6,6)
                translate(-this.x,-this.y)
            break
            case 11://theOnion
                fill(100,200,50,this.fade)
                ellipse(this.x+this.size*6,this.y,this.size*12,this.size*5)
            break
        }
    }

    update(){
        if(this.type==9){
            this.x+=10
        }else if(this.type==10){
            this.x-=10
        }
        this.size++;
        this.fade-=17;
        if(this.fade<=0){
            this.remove=true;
        }
    }

    move(){
        this.update();
    }
}