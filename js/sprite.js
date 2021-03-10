class Sprite{

  constructor(size,sheet){
    this.isGif = false;
    this.sheet = AssetLoader.get(sheet);
    this.size = size.copy();
    this.pos = createVector(0,0);
    this.angle = 0;
    this.flip = createVector(1,1);
    this.settings = [];
    this.addSetting("static",0,0,1,1);
    this.settingIndex = 0;
    this.spriteIndex = 0;
    this.lastSpriteIndex = -1;
    this.lastSettingIndex = -1;
    this.img = createImage(size.x,size.y);
    this.img.loadPixels();
    this.numPixels = this.img.pixels.length;
    this.autoCycle = false;
    this.playOnce = false;
    this.finished = false;
  }

  draw(){
    let set = this.settings[this.settingIndex%this.settings.length];
    let si = int(this.spriteIndex/set.delay)%set.length;

    if(si != this.lastSpriteIndex || this.settingIndex != this.lastSettingIndex){
      this.clearImg();
      if(si != this.lastSpriteIndex) this.lastSpriteIndex = si;
      if(this.settingIndex != this.lastSettingIndex) this.lastSettingIndex = this.settingIndex;
      let ss = this.size;
      let off = set.offset;
      this.img.copy(this.sheet,(si+off.x) * ss.x ,off.y * ss.y,ss.x,ss.y,0,0,ss.x,ss.y);
    }

    if(++this.spriteIndex >= set.length * set.delay){
      this.spriteIndex = 0;
      if(this.autoCycle) this.settingIndex++;

      if(this.playOnce && this.autoCycle && this.settingIndex > this.settings.length-1){
        this.finished = true;
        this.spriteIndex = set.length * set.delay;
        this.settingIndex = this.settings.length-1;
      } else if(this.playOnce && !this.autoCycle){
        this.finished = true;
        this.spriteIndex = set.length * set.delay;
      } else if(!this.playOnce) this.finished = true;
    }

    push();
    if(this.angle != 0 || this.flip.x != 1 || this.flip.y != 1) this.transform();
    if(this.isGif){
      this.sheet.delay(set.delay);
      image(this.sheet,this.pos.x,this.pos.y);
    } else image(this.img,this.pos.x,this.pos.y);
    pop();
  }

  transform(){
    translate(this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
    scale(this.flip.x, this.flip.y);
    rotate(this.angle);
    translate(-this.pos.x - this.size.x/2, -this.pos.y - this.size.y/2);
  }

  clearImg(){
    for(let i = 3 ; i < this.numPixels; i += 4) this.img.pixels[i] = 0;
    this.img.updatePixels();
  }

  addSetting(name, offX, offY, length, delay){
    this.settings.push(new SpriteSetting(name, createVector(offX,offY), length, delay));
  }

  reset(){
    this.spriteIndex = 0;
  }

  resetSetting(){
    this.settingIndex = 0;
  }

  clearSettings(){
    this.settings = [];
  }

  changeSetting(name){
    for(let i = 0; i < this.settings.length; i++){
      if(this.settings[i].name == name){
        this.settingIndex = i;
        this.finished = false;
        return;
      }
    }
  }

}

class SpriteSetting{
  constructor(name, offset, length, delay){
    this.name = name;
    this.offset = offset;
    this.length = length;
    this.delay = delay;
  }
}
