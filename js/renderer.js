class Renderer{

  static init(){
    Renderer.queueAmt = 6;
    Renderer.BG = 0;
    Renderer.STATIC = 1;
    Renderer.DYNAMIC = 2;
    Renderer.COLLIDABLE = 3;
    Renderer.ALLY = 4;
    Renderer.ENEMY = 5;

    Renderer.queues = new Array(Renderer.queueAmt*2);
    for (let i = 0; i < Renderer.queueAmt*2; i++) Renderer.queues[i] = [];

    Renderer.autoPrep = true;
    Renderer.prepped = false;
    Renderer.BGColor = color(138, 212, 79);
  }

  static add(obj,queue){
    Renderer.queues[queue].push(obj);
  }

  static remove(obj,queue){
    Renderer.queues[queue+Renderer.queueAmt].push(obj);
  }

  static removeType(type,queue){
    for(let i = 0; i < Renderer.queues[queue].length; i++)
      if (Renderer.queues[queue][i] instanceof type)
        Renderer.remove(Renderer.queues[queue][i],queue);
  }

  static render(){
    if(!Renderer.prepped){
       Renderer.prepQueue(Renderer.BG);
       Renderer.prepQueue(Renderer.STATIC);
       Renderer.drawQueue(Renderer.BG);
       Renderer.prepped = true;
     }

    if(Renderer.autoPrep) Renderer.prepQueue(Renderer.DYNAMIC);

    background(Renderer.BGColor);
    Renderer.drawQueue(Renderer.BG);
    Renderer.drawStatDyn();

    Renderer.clearRemQueues();
  }

  static drawStatDyn(){
    let statInd = 0;
    let dynInd = 0;
    let statQ = Renderer.queues[Renderer.STATIC];
    let dynQ = Renderer.queues[Renderer.DYNAMIC];

    while(statInd < statQ.length && dynInd < dynQ.length)
      if(statQ[statInd].renderComp < dynQ[dynInd].renderComp) statQ[statInd++].draw();
      else dynQ[dynInd++].draw();

    for(let i = statInd; i < statQ.length; i++) statQ[i].draw();
    for(let i = dynInd; i < dynQ.length; i++) dynQ[i].draw();
  }

  static getQueue(queue){
    return Renderer.queues[queue];
  }

  static drawQueue(queue){
    Renderer.queues[queue].forEach(elem => elem.draw());
  }

  static clearRemQueues(){
    for (let i = 0; i < Renderer.queueAmt; i++){
      Renderer.queues[i+Renderer.queueAmt].forEach(elem => Renderer.queues[i].splice(Renderer.queues[i].indexOf(elem), 1));
      Renderer.queues[i+Renderer.queueAmt] = [];
    }
  }

  static prepQueue(queue){
    Renderer.calcCompQueue(queue);
    Renderer.sortQueue(queue);
  }

  static sortQueue(queue){
    Renderer.queues[queue].sort((a,b) => Renderer.compare(a,b));
  }

  static calcCompQueue(queue){
    Renderer.queues[queue].forEach(elem => Renderer.calcComp(elem));
  }

  static calcComp(obj){
    let eClear = obj.clearance;
    if(eClear === undefined) eClear = 0;
    obj.renderComp = obj.pos.y + obj.size.y + eClear;
  }

  static compare(a,b){
    return a.renderComp - b.renderComp;
  }

  static getClosest(obj, queue, excl){
    let Q = Renderer.queues[queue];
    let closest = null;
    let closestMag = -1;

    for(let i = 0; i < Q.length; i++){
      if(Q[i] == obj || (excl != undefined && excl.indexOf(Q[i]) != -1)) continue;
      let mag = Renderer.distSq(obj, Q[i]);
      if(closestMag == -1 || mag < closestMag){
        closestMag = mag;
        closest = Q[i];
      }
    }

    return closest;
  }

  static distSq(a, b){
    let aPos = p5.Vector.add(a.pos, p5.Vector.mult(a.size,0.5) );
    let bPos = p5.Vector.add(b.pos, p5.Vector.mult(b.size,0.5) );
    return p5.Vector.sub(aPos,bPos).magSq();
  }

  static collidesWith(a, b){
    if (a.pos.x < b.pos.x + b.size.x &&
        a.pos.y <  b.pos.y + b.size.y &&
        a.pos.x + a.size.x >  b.pos.x &&
        a.pos.y + a.size.y >  b.pos.y) return true;
    return false;
  }

  static collides(obj, excl){
    let clo = Renderer.getClosest(obj, Renderer.COLLIDABLE, excl);
    if(clo != null && Renderer.collidesWith(obj, clo)) return clo;
    return null;
  }
}
