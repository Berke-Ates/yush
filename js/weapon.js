class Weapon{

  static FIRE = "fireball";
  static ICE = "iceball";

  constructor(pos, type, group){
    this.pos = pos.copy();
    this.type = type;
    this.group = group;
    this.fireRate = 1;
    this.fireCounter = 0;
    this.autoFire = false;
    this.autoFireTarget = null;
    this.autoFireEnd = null;
    this.range = 500;
    this.speed = 3;
    this.seeking = 0.2;
  }

  tick(){
    if(this.fireCounter > 0) this.fireCounter--;

    if(this.autoFire && this.autoFireTarget != null)
      this.fireTarget(this.autoFireTarget);

    if(this.autoFire && this.autoFireEnd != null)
      this.fire(this.autoFireEnd);
  }

  fire(end){
    if(this.fireCounter <= 0) {
      let p = new Projectile(this.pos, end, this.type, this.group);
      p.range = this.range;
      p.speed = this.speed;
      this.fireCounter = 60/this.fireRate;
    }
  }

  fireTarget(target){
    if(this.fireCounter <= 0) {
      let p = new Projectile(this.pos, target.pos, this.type, this.group);
      p.range = this.range;
      p.speed = this.speed;
      p.target = target;
      p.alpha = this.seeking;
      this.fireCounter = 60/this.fireRate;
    }
  }

}
