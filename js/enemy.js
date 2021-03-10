class Enemy{

  constructor(pos){
    this.pos = pos.copy();
    this.size = createVector(24,24);

    let sprite = new Sprite(this.size,"dinoY");
    sprite.clearSettings();
    sprite.addSetting("idle",0,0,4,10);
    sprite.addSetting("walk",4,0,6,8);
    sprite.addSetting("kick",10,0,3,10);
    sprite.addSetting("hit",13,0,4,5);
    sprite.addSetting("duck",17,0,1,10);
    sprite.addSetting("run",18,0,6,5);
    sprite.changeSetting("walk");

    this.running = true;

    this.pawn = new Pawn(this.pos, this.size, sprite);
    this.pawn.maxStamina = 300;
    this.pawn.stamina = 300;
    this.pawn.dir = p5.Vector.sub(hero.pos,this.pos);
    this.pawn.showStamina = false;

    this.weapon = new Weapon(this.pos, Weapon.FIRE, Renderer.ENEMY);

    Renderer.add(this, Renderer.DYNAMIC);
    Renderer.add(this, Renderer.COLLIDABLE);
    Renderer.add(this, Renderer.ENEMY);
  }

  draw(){
    this.pawn.draw();
    this.pos = this.pawn.pos;

    let tVec = p5.Vector.sub(hero.pos,this.pos);
    let dist = tVec.magSq();

    this.weapon.pos = p5.Vector.add(this.pos, createVector(6,0));
    if(dist <= this.weapon.range*this.weapon.range/4) this.weapon.fireTarget(hero);
    this.weapon.tick();

    if(!this.running && dist > this.weapon.range*this.weapon.range/2 && this.pawn.stamina >= 100
      || this.pawn.stamina >= 200) this.running = true;
    if(this.running && dist < this.weapon.range*this.weapon.range/4 && this.pawn.stamina <= 25
      || this.pawn.stamina <= 0) this.running = false;

    this.pawn.idle();
    if(this.running){
      this.pawn.walk(tVec, 0.5, 0.04);
      this.pawn.run();
    } else {
      this.pawn.walk(tVec, 0.5, 0.02);
    }

  }

  hit(dmg){
    this.pawn.hit(dmg);
  }

}
