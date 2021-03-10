class AssetLoader{

  static init(){
    AssetLoader.assets = [];
    AssetLoader.add("fireball","assets/fires/Small_Fireball_10x26.png");
    AssetLoader.add("iceball","assets/fires/Small_Iceball_9x24.png");
    AssetLoader.add("dinoY","assets/dinos/sheets/yellow.png");
    AssetLoader.add("dinoB","assets/dinos/sheets/blue.png");
    AssetLoader.add("dinoG","assets/dinos/sheets/green.png");
    AssetLoader.add("dinoR","assets/dinos/sheets/red.png");
    AssetLoader.add("dinoS","assets/dinos/misc/shadow.png");
    AssetLoader.add("Xplosion","assets/explosions/X_plosion/spritesheet/spritesheet_small.png");
    AssetLoader.add("Vplosion","assets/explosions/vertical_explosion/spritesheet/spritesheet_small.png");
  }

  static add(name,path){
    AssetLoader.assets[name] = loadImage(path);
  }

  static get(name){
    return AssetLoader.assets[name];
  }

}
