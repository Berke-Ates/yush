let hero;

function preload(){
  AssetLoader.init();
  Renderer.init();
  Map.init();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  hero = new Player(createVector(width/2,height/2),0);
  new Enemy(createVector(0,0));
  /*new Enemy(createVector(width,0));
  new Enemy(createVector(0,height));
  new Enemy(createVector(width,height));*/
  Map.generate();
}

function draw() {
  Renderer.render();
}
