class Pawn{

  constructor(pos, size, sprite){
    this.pos = pos.copy();
    this.size = size.copy();
    this.sprite = sprite;

    this.walkSpeed = 1;
    this.runFactor = 2;
    this.dir = createVector(0,0);

    this.maxStamina = 100;
    this.stamina = this.maxStamina;
    this.staminaConsumption = 1;
    this.staminaRegenDelay = 1000;
    this.staminaRegenStrength = 1;
    this.lastStaminaUsed = 0;
    this.staminaAlpha = 0;
    this.showStamina = true;

    this.maxHP = 100;
    this.HP = this.maxHP;
    this.HPRegenDelay = 7000;
    this.HPRegenStrength = 1;
    this.lastHitTaken = 0;
    this.isDead = false;
    this.HPAlpha = 0;
    this.gotHit = false;
    this.showHP = true;

    this.addPos = createVector(0,0);
    this.isWalking = false;
    this.isRunning = false;
  }

  draw(){
    this.drawShadow();

    this.sprite.pos = this.pos;
    this.sprite.draw();

    if(this.showStamina) this.drawStamina();
    if(this.showHP) this.drawHP();

    if(!this.isDead){
      this.pos.add(this.addPos);
      this.regenStamina();
      this.regenHP();
      if(this.gotHit && this.sprite.finished) this.gotHit = false;
    }

  }

  drawShadow(strength = 0.4, height = 7){
    push();
    noStroke();
    fill(color(0,0,0,strength * 255));
    ellipse(this.pos.x + this.size.x/2, this.pos.y + this.size.y - height/2, this.size.x, height);
    pop();
  }

  drawStamina(width = this.size.x + this.maxStamina/10, height = 5, offsetY = 0){
    push();
    fill(color(255,255,0,this.staminaAlpha*255));
    noStroke();
    rect(this.pos.x + this.size.x/2 - width/2, this.pos.y - height - offsetY, width * this.stamina/this.maxStamina, height, 20);
    noFill();
    stroke(color(0,0,0,this.staminaAlpha*255));
    rect(this.pos.x + this.size.x/2 - width/2, this.pos.y - height - offsetY, width, height, 20);
    pop();
    if(this.stamina >= this.maxStamina){
      this.staminaAlpha -= 0.03;
      if(this.staminaAlpha <= 0) this.staminaAlpha = 0;
    }
    else this.staminaAlpha = 1;
  }

  regenStamina(){
    if(!this.isRunning && millis() - this.lastStaminaUsed >= this.staminaRegenDelay){
      this.stamina += this.staminaRegenStrength;
      if(this.stamina >= this.maxStamina) this.stamina = this.maxStamina;
    }
  }

  drawHP(width = this.size.x + this.maxHP/10, height = 5, offsetY = 7 * Math.ceil(this.staminaAlpha)){
    push();
    fill(color(255,0,0,this.HPAlpha*255));
    noStroke();
    rect(this.pos.x + this.size.x/2 - width/2, this.pos.y - height - offsetY, width * this.HP/this.maxHP, height, 20);
    noFill();
    stroke(color(0,0,0,this.HPAlpha*255));
    rect(this.pos.x + this.size.x/2 - width/2, this.pos.y - height - offsetY, width, height, 20);
    pop();
    if(this.HP >= this.maxHP){
      this.HPAlpha -= 0.03;
      if(this.HPAlpha <= 0) this.HPAlpha = 0;
    } else this.HPAlpha = 1;
  }

  regenHP(){
    if(this.HP < this.maxHP && millis() - this.lastHitTaken >= this.HPRegenDelay){
      this.HP += this.HPRegenStrength;
      if(this.HP >= this.maxHP) this.HP = this.maxHP;
    }
  }

  idle(){
    this.isWalking = false;
    this.isRunning = false;
    this.addPos = createVector(0,0);
    if(!this.gotHit) this.sprite.changeSetting("idle");
  }

  walk(dirV, wobble = 0, lerpStrength = 1){
    let dir = dirV.copy();

    if(dir.x == 0 && dir.y == 0) return;
    this.isWalking = true;

    let wob = createVector(Math.random()*wobble - wobble/2,Math.random()*wobble - wobble/2);

    dir.normalize();
    this.dir.lerp(dir,lerpStrength);
    this.addPos = this.dir;
    this.addPos.add(wob);
    this.addPos.normalize();
    this.addPos.mult(this.walkSpeed);

    if(this.addPos.x >= 0) this.sprite.flip.x = 1;
    else this.sprite.flip.x = -1;

    if(!this.gotHit) this.sprite.changeSetting("walk");
  }

  run(){
    this.isRunning = true;
    if(this.isWalking && this.stamina > 0){
      this.lastStaminaUsed = millis();
      this.stamina -= this.staminaConsumption;
      if(this.stamina <= 0) this.stamina = 0;
      this.addPos.mult(this.runFactor);
      if(!this.gotHit) this.sprite.changeSetting("run");
    }
  }

  hit(dmg){
    if(this.gotHit) return;
    this.lastHitTaken = millis();
    this.HP -= dmg;
    this.sprite.changeSetting("hit");
    this.sprite.reset();
    this.gotHit = true;
    if(this.HP <= 0){
      this.HP = 0;
      this.isDead = true;
      this.sprite.changeSetting("die");
    }
  }

}
