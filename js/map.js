class Map{

  static init(){
    Map.tileSet = [];
    Map.addTile("tree","assets/tiles/96x96/tree.gif");
    Map.addTile("chopped","assets/tiles/96x96/chopped.gif");
    Map.addTile("bush","assets/tiles/32x32/bush.gif");
    Map.addTile("flower","assets/tiles/32x32/flower.gif");
    Map.addTile("fence","assets/tiles/32x32/fence.png");
    Map.addTile("rock","assets/tiles/32x32/rock.png");
    Map.addTile("barrel","assets/tiles/32x32/barrel.png");
    Map.addTile("sign","assets/tiles/32x32/sign.png");
    Map.addTile("grassA","assets/tiles/32x32/grassA.png");
    Map.addTile("grassB","assets/tiles/32x32/grassB.png");
    Map.addTile("grassC","assets/tiles/32x32/grassC.png");
    Map.addTile("grassD","assets/tiles/32x32/grassD.png");
    Map.addTile("grassE","assets/tiles/32x32/grassE.png");
    Map.addTile("grassF","assets/tiles/32x32/grassF.png");
    Map.addTile("grassG","assets/tiles/32x32/grassG.png");
    Map.addTile("grassH","assets/tiles/32x32/grassH.png");
    Map.addTile("grassI","assets/tiles/32x32/grassI.png");
    //Map.addTile("path","assets/tiles/32x32/patch.png");
    Map.addTile("roadT","assets/tiles/32x32/roadT.png"); //16
    Map.addTile("roadM","assets/tiles/32x32/roadM.png");
    Map.addTile("roadB","assets/tiles/32x32/roadB.png");
  }

  static addTile(name,path){
    AssetLoader.add(name,path);
    Map.tileSet.push(name);
  }

  static generate(){
    let ss = createVector(32,32);
    let sm = createVector(64,64);
    let sl = createVector(96,96);
    let ts = createVector(int(width/ss.x), int(height/ss.y));

    Map.mapArr = new Array(ts.x);
    for (let i = 0; i < ts.x; i++) Map.mapArr[i] = new Array(ts.y);
    for (let i = 0; i < ts.x; i++) Map.mapArr[i].fill(-1);

    let len = Map.tileSet.length-2;
    for (var x = 0; x < ts.x; x++)
      for (var y = 0; y < ts.y; y++){
        if(Map.mapArr[x][y] != -1) continue;

        if(y > 0 && Map.mapArr[x][y-1] == len-1){
          Map.mapArr[x][y] = Math.floor(Math.random() * 2) + len;
          let s = new Sprite(ss,Map.tileSet[Map.mapArr[x][y]]);
          s.pos = createVector(x*ss.x,y*ss.y);
          Renderer.add(s, Renderer.BG);

        } else if(y > 0 && Map.mapArr[x][y-1] == len){
          Map.mapArr[x][y] = Math.floor(Math.random() * 2) + len;
          let s = new Sprite(ss,Map.tileSet[Map.mapArr[x][y]]);
          s.pos = createVector(x*ss.x,y*ss.y);
          Renderer.add(s, Renderer.BG);

        } else if(Math.random() < 0.5){
          Map.mapArr[x][y] = Math.floor(Math.random() * len);
          let s;
          if(Map.mapArr[x][y] <= 1){
            s = new Sprite(sl,Map.tileSet[Map.mapArr[x][y]]);
            for (var xi = 0; xi + x < ts.x && xi < 3; xi++)
              for (var yi = 0; yi + y < ts.y && yi < 3; yi++)
                Map.mapArr[x + xi][y + yi] = Map.mapArr[x][y];
          }
          else
            s = new Sprite(ss,Map.tileSet[Map.mapArr[x][y]]);

          if(Map.mapArr[x][y] <= 3){
            s.isGif = true;
            //s.settings[0].delay = 1500;
            s.settings[0].delay = 50;
          }

          s.pos = createVector(x*ss.x,y*ss.y);
          if(Map.mapArr[x][y] == len-1) Renderer.add(s, Renderer.BG);
          else if(s.isGif) Renderer.add(s, Renderer.STATIC);
          else Renderer.add(s, Renderer.STATIC);
        }


      }

  }

}
