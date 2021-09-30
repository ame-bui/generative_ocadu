let shopItems = [];
let grocery = [];
let threshold = 60;
let sizeItem = [300,400,500];

function preload() {
  for(let i=1; i<10; i++){
    shopItems[i] = loadImage('../data/images/item-'+ i +'.png');
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let x = 100;
  let y = 100;
  for (let i = 1; i< 10; i++){
    // shopItems[i].resize(60,0);
    shopItems[i].loadPixels();
    for(let h = 0; h<shopItems[i].height; h++){
      for(let w = 0; w<shopItems[i].width; w++){
  
        let pixel = shopItems[i].get(w,h);
  
        let area = lightness(pixel);
  
        if(area == 100){ 
          shopItems[i].set(w,h,color(0,0,0,0))
        } else if (area < threshold && area != 100) {
          shopItems[i].set(w,h,color(168, 62, 50));
        } else {
          shopItems[i].set(w,h,color(240,240,240));
        }
      }
    }
    shopItems[i].updatePixels();


    let order = shopItems[i];
    let item = new Item(x,y,order);
    grocery.push(item);
    x += random(-100,50)
    y += random(-100,50) 
  }

  noLoop();

}

function draw() {
  background(240,240,240);

  // image(shopItems[1],1,1,shopItems[1].width/6,shopItems[1].height/6);
  for(let i = shopItems.length; i>0;i--){
    // grocery[i].change();
    grocery[i].show();
    // shopItems[i].move();
  }

}

class Item {
    constructor(x,y,img) {
      this.x = x;
      this.y = y;
      this.img = img;
    }

    show(){
      imageMode(CENTER);
      // blendMode(MULTIPLY);
      image(this.img, this.x, this.y, this.img.width/8, this.img.height/8);
      // ellipseMode(CENTER)
      // stroke(255);
      // strokeWeight(4);
      // noFill();
      // ellipse(this.x, this.y, this.r*2);
    }
}