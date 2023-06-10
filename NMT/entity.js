/* General Entity Class File */

class Entity{
  constructor(type,x,y){
    this.id = idIndexer;
    idIndexer++;
    this.type = type;
    this.x = x;
    this.y = y;
    allEntities.push(this);
  }
}








