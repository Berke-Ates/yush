class Player{

  constructor(pos, col){
    this.pos = pos.copy();
    this.clearance = 8;
    this.size = createVector(24,24);

    let name;
    switch(col){
      case 0: name = "dinoB"; break;
      case 1: name = "dinoG"; break;
      case 2: name = "dinoR"; break;
      case 3: name = "dinoY"; break;
    }

    let sprite = new Sprite(this.size, name);
    sprite.clearSettings();
    sprite.addSetting("idle",0,0,4,10);
    sprite.addSetting("walk",4,0,6,8);
    sprite.addSetting("kick",10,0,3,10);
    sprite.addSetting("hit",13,0,4,5);
    sprite.addSetting("duck",17,0,1,10);
    sprite.addSetting("run",18,0,6,5);

    this.pawn = new Pawn(pos, this.size, sprite);

    this.weapon = new Weapon(this.pos, Weapon.ICE, Renderer.ALLY);
    this.weapon.fireRate = 2;

    Renderer.add(this, Renderer.DYNAMIC);
    Renderer.add(this, Renderer.COLLIDABLE);
    Renderer.add(this, Renderer.ALLY);
  }

  draw(){
    this.pawn.draw();
    this.pos = this.pawn.pos;

    this.pawn.idle();
    this.walk();
    if(keyIsDown(16)) this.pawn.run(); // shift

    this.weapon.pos = p5.Vector.add(this.pos,createVector(6,0));
    if(mouseIsPressed) this.weapon.fire(createVector(mouseX,mouseY));
    this.weapon.tick();
  }

  walk(){
    let dir = createVector(0,0);
    if(keyIsDown(87)) dir.y = -1; // W
    if(keyIsDown(65)) dir.x = -1; // A
    if(keyIsDown(83)) dir.y = 1; // S
    if(keyIsDown(68)) dir.x = 1; // D
    this.pawn.walk(dir);
  }

  hit(dmg){
    this.pawn.hit(dmg);
  }

}
