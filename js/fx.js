class FX{
  static X = "Xplosion";
  static V = "Vplosion";

  constructor(pos, type){
    this.pos = pos.copy();
    this.size = createVector(50,50);

    switch(type){
      case Weapon.FIRE: this.sprite = new Sprite(this.size, FX.X); break;
      case Weapon.ICE: this.sprite = new Sprite(this.size, FX.V); break;
    }

    this.sprite.clearSettings;
    this.sprite.addSetting("ex0",0,0,10,1);
    this.sprite.addSetting("ex1",0,1,10,1);
    this.sprite.addSetting("ex2",0,2,10,1);
    this.sprite.addSetting("ex3",0,3,10,1);
    this.sprite.addSetting("ex4",0,4,10,1);
    this.sprite.addSetting("ex5",0,5,10,1);
    this.sprite.addSetting("ex6",0,6,10,1);
    this.sprite.addSetting("ex7",0,7,10,1);
    this.sprite.autoCycle = true;
    this.sprite.playOnce = true;
    this.sprite.pos = pos;

    Renderer.add(this, Renderer.STATIC);
    Renderer.prepQueue(Renderer.STATIC);
  }

  draw(){
    this.sprite.draw();
    if(this.sprite.finished) Renderer.remove(this, Renderer.STATIC);
  }

}
