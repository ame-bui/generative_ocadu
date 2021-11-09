let faceapi;
let detections = [];

let video; 
let canvas;

let particles = [];

function setup(){
    canvas = createCanvas(630,480);
    canvas.id('canvas');

    video = createCapture(VIDEO);
    video.size(width,height);
    video.hide();
    canvas.id('video');


    const faceOptions = {
        withLandmarks: true,
        withExpressions: true,
        withDescriptors: false,
        minConfidence: 0.5
    };

    faceapi = ml5.faceApi(video, faceOptions, faceReady)
}

function faceReady(){
    faceapi.detect(gotFaces);
}

function gotFaces(error, result){
    if( error ){
        // console.log(error);
        return;
    }
 
    detections = result;
    // console.log(detections);
    faceapi.detect(gotFaces);

}

function draw(){
    
    clear();
    translate(width, 0);
    scale(-1,1);
    image(video, 0, 0, width, height);
    video.loadPixels();

    frameRate(10);

    let m = millis();

    if(detections.length > 0){ 
        for(i=0; i< detections.length; i++){
            let x = detections[0].alignedRect._box._x - 10; 
            let y = detections[0].alignedRect._box._y - 100;
            let rectWidth = detections[0].alignedRect._box._width + 20;
            let rectHeight = detections[0].alignedRect._box._height + 100;
            


            let num = m/1000;
            if (num>550) {
                num == 550;
                tint(floor(random(40,255)), floor(random(40,255)), floor(random(100,255)));
                blendMode(DIFFERENCE)
                fill(floor(random(40,255)), floor(random(40,255)), floor(random(100,255)));
                rect(random(-20,width),random(10,height), random(50,200), random(1,5));
            }


            
            for( e=0; e< num; e++){
                if( m%33 ==0){
                    for(a=0; a< 1; a++){
                        noStroke();
                        blendMode(DIFFERENCE)
                        fill(floor(random(40,255)), floor(random(40,255)), floor(random(100,255)));
                        rect(random(-20,width),random(10,height), random(50,200), random(1,5));
                    }
                    
                    tint(floor(random(40,255)), floor(random(40,255)), floor(random(100,255)));
                } else { 
                    noTint();
                }
                let posX = random(x, x+rectWidth);
                let posY = random(y, y+rectHeight);
                let pWidth = random(10,40);
                let pHeight = random(10,40);
                particles[e] = new Particle(posX,posY,pWidth , pHeight);
                particles[e].drawRect();
                
            }



            


            // stroke(255,105,180);
            // strokeWeight(2);
            // noFill();
            // rect(x, y, rectWidth, rectHeight);

            // let px = floor(posX);
            // let py = floor(posY);
            // let col = video.get(px, py);
            // console.log(col);

            // stroke(255,105,180);
            // strokeWeight(2);
            // fill(col[0],col[1],col[2]);
            // rect(px, py, 10, 10);


            // stroke(255,105,180);
            // strokeWeight(2);
            // noFill();
            // rect(px + random(5,20), py+random(5,20), 30, 30);

        }
    }
}


class Particle{ 
    constructor(x,y,pwidth, pheight, constrainX, constrainY){
        this.x = x;
        this.y = y;
        this.w = pwidth;
        this.h = pheight;
        // this.dx = constrainX;
        // this.dy = constrainY;
    }

    // update() { 
    //     this.x += random(0,10);
    //     this.y += random(0,10);

    //     this.x = constrain(this.x, posX, posX + dx);
    //     this.y = constrain(this.y, posY, posY + dy);
    // }

    drawRect(){
        blendMode(BLEND)
        rectMode(CENTER) 
        noStroke();
        let px = floor(this.x);
        let py = floor(this.y);
        let col = video.get(px,py);
        // stroke(255,105,180);
        fill(col[0],col[1],col[2]);
        rect(this.x, this.y, this.w, this.h);
    }

}
