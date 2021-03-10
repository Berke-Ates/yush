class Projectile{

  constructor(spawnPoint, endPoint, type, group){
    this.spawnPoint = spawnPoint.copy();
    this.sPos = spawnPoint.copy();
    this.pos = spawnPoint.copy();
    this.type = type;
    switch(type){
      case Weapon.FIRE: this.size = createVector(10,26); break;
      case Weapon.ICE: this.size = createVector(9,24); break;
    }
    this.group = group;

    this.dir = endPoint.copy();
    this.dir.sub(spawnPoint);
    this.dir.normalize();
    this.speed = 2;
    this.range = 300;
    this.distanceTraveled = 0;
    this.target = null;
    this.alpha = 0.2;
    this.damage = 8;
    this.destroyed = false;

    this.sprite = new Sprite(this.size, type);
    this.sprite.settings = [];
    this.sprite.addSetting("f0",0,0,10,1);
    this.sprite.addSetting("f1",0,1,10,1);
    this.sprite.addSetting("f2",0,2,10,1);
    this.sprite.addSetting("f3",0,3,10,1);
    this.sprite.addSetting("f4",0,4,10,1);
    this.sprite.addSetting("f5",0,5,10,1);
    this.sprite.autoCycle = true;
    this.sprite.angle = -this.dir.angleBetween(createVector(0,1));
    this.rot = false;
    if(Math.abs(this.dir.x) > Math.abs(this.dir.y)){
      this.size = createVector(this.size.y, this.size.x);
      this.pos.add(createVector(-this.size.y,this.size.x/2 - this.size.y/2));
      this.rot = true;
    }

    Renderer.add(this, Renderer.DYNAMIC);
    Renderer.add(this, Renderer.COLLIDABLE);
    Renderer.add(this, this.group);
  }

  draw(){
    this.sprite.pos = this.sPos;
    this.sprite.draw();

    if(this.target != null){
      let tVec = p5.Vector.sub(this.target.pos,this.sPos);
      tVec.normalize();
      this.dir.lerp(tVec,this.alpha/10);
      this.dir.normalize();
      this.sprite.angle = -this.dir.angleBetween(createVector(0,1));
    }

    let addPos = p5.Vector.mult(this.dir,this.speed);
    this.sPos.add(addPos);
    if(this.rot) this.pos = p5.Vector.add(this.sPos,createVector(-this.size.y,this.size.x/2 - this.size.y/2));
    else this.pos = this.sPos;
    this.distanceTraveled += addPos.magSq();
    if(this.distanceTraveled >= this.range) this.hit();
    else {
      let col = Renderer.collides(this, Renderer.getQueue(this.group));
      if(col != null){
        col.hit(this.damage);
        this.hit();
      }
    }
  }

  hit(){
    if(this.destroyed) return;
    this.sPos.add(createVector(-20,-13));
    new FX(this.sPos, this.type);
    Renderer.remove(this, Renderer.DYNAMIC);
    Renderer.remove(this, Renderer.COLLIDABLE);
    Renderer.remove(this, this.group);
    this.destroyed = true;
  }

}
