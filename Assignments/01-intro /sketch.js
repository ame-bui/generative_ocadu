let shopItems = [];
let grocery = [];
let threshold = 60;
let priceTags = ['3.99', '20.49', '8.20', '1.99', 'ON SALE NOW','Bestseller','Deals'];
var alignText = ['RIGHT','CENTER', 'LEFT'];
var priceTag, col1, col2;
var myFont, titleFont, monoFont;


function preload() {
  myFont = loadFont('data/font/Archivo-Regular.ttf');
  monoFont = loadFont('data/font/IBMPlexMono-Regular.ttf');
  titleFont = loadFont('data/font/Archivo-Black.ttf');
  for(let i=1; i<10; i++){
    shopItems[i] = loadImage('data/images/item-'+ i +'.png');
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let x = random(100,500);
  let y = random(100,500);
  for (let i = 1; i < shopItems.length; i++){
    // shopItems[i].resize(60,0);
    shopItems[i].loadPixels();
    for(let h = 0; h<shopItems[i].height; h++){
      for(let w = 0; w<shopItems[i].width; w++){

        let pixel = shopItems[i].get(w,h);

        let area = lightness(pixel);
        

        if(area == 100){ 
          shopItems[i].set(w,h,color(0,0,0,0))
        } else if (area < threshold && area != 100) {
          shopItems[i].set(w,h,color(30));
        } else {
          shopItems[i].set(w,h,color(210));
        }
      }
    }

    shopItems[i].updatePixels();

    let priceTag = random(priceTags);
    let order = shopItems[i];
    let item = new Item(x,y,order,priceTag);
    grocery.push(item);
    x += random(-100,250);
    y += random(-100,250);
  }

}

function draw() {
  background(204);
  resetSketch();
  let col1 = map(mouseX, 0, windowWidth, 0, 150);
  let col2 = map(mouseY, 0, windowHeight, 100,255);
  addTittle();
  tint(160,col1,col2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function resetSketch(){
  for(let i = 0; i < grocery.length; i++){
    // grocery[i].change();
    // if (i = grocery.length) {
    //   i = i -1;
    // }
    grocery[i].move();
    grocery[i].show();
    grocery[i].drawText();
    // shopItems[i].move();
  }

}

function addTittle(){
  textSize(80);
  textFont(titleFont);
  textLeading(70);
  fill(255);
  textAlign(LEFT);
  text("Shop til you're broke", random(0,windowWidth-300), random(0,windowHeight-300),windowWidth/3+100,200);
}

class Item {
    constructor(x,y,img,word) {
      this.x = x;
      this.y = y;
      this.img = img;
      this.word = word;
    }
    move(){
      let maxWidth = windowWidth;
      let maxHeight = windowHeight;
      if (this.x + this.img.width/4 > maxWidth) {
        this.x -= random(50,300);
      }
      if (this.y + this.img.height/4 > maxHeight) {
        this.y -= random(50,300);
      }
      if (this.x - this.img.width/4 < -100) {
        this.x += random(200,500);
      }
      if (this.y - this.img.height/4 < -100) {
        this.y += random(200,500);
      }
    }

    show(){
      imageMode(CENTER);
      // blendMode(MULTIPLY);
      image(this.img, this.x, this.y, this.img.width/2 , this.img.height/2);
      // ellipseMode(CENTER)
      // stroke(255);
      // strokeWeight(4);
      // noFill();
      // ellipse(this.x, this.y, this.r*2);

    }

    drawText(){
      textSize(50);
      textFont(monoFont);
      textAlign(RIGHT);
      fill(5);
      text(this.word, random(this.x,this.x+50), random(this.y, this.y-60));
      
    }
}


// REFERENCE
// https://youtu.be/j-ZLDEnhT3Q - IMAGE PROCESSING with pixels
