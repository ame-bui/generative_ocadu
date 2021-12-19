
import User from './object.js';

var myp5, myBG, myText = null;


// Data
const name = ['Noah', 'Phuong', 'Alexis', 'Jung', 'Mateo', 'Yin'];
const gender = ['Man', 'Non-binary', 'Woman', 'None of the above'];
const age = ['16', '31', '50', '24', '42', '19'];
const loc = ['the library', 'work', 'the bus stop', 'Walmart', 'a fast-food restaurant', 'the post office', 'subway', 'home', 'a public restroom', 'the bar'];


$(document).ready(function() {
    myBG = new p5(bground, document.getElementById('myCanvas-background'));
    myText = new p5(textScape, document.getElementById('myCanvas-foreground'));
    $(window).on('resize', canvasResize);
});


var canvasResize = function() {
    console.log('canvasresize called');
    if(myText && myBG) {
        myBG.resizeCanvas(window.innerWidth, window.innerHeight);
        myText.resizeCanvas(window.innerWidth, window.innerHeight);
    }

};

var bground = function(p){
    let bg = null;
    p.noiseVal = 150;
    p.cellSize = 5;
    p.zseed = 0;
    p.Width = window.innerWidth;
    p.Height = window.innerHeight;
    let rectX = [];
    let rectY = []; 
    let numRects = 50;
    p.setup = function(){
        p.createCanvas(p.Width,p.Height);
        bg = p.createGraphics(p.width,p.height);
        p.colorMode(p.RGB);
        p.noStroke();

        for(var i = 0; i<numRects; i++){
            rectX[i] = p.random(p.width);
            rectY[i] = p.random(p.height);
        }

    }
    p.draw = function(){ 
        for (var y=0; y*p.cellSize < p.height; y++) {
            for (var x=0; x*p.cellSize < p.width; x++) {
                var fillCol = p.noise(x/p.noiseVal, y/p.noiseVal, p.zseed)*300;
                var gVal = p.map(p.mouseX, 0, p.height, 0, 250);
                var bVal = p.map(p.mouseY, 0, p.height, 0, 250);
                bg.fill(fillCol,gVal,bVal,250);
                bg.noStroke();
                bg.rect(x*p.cellSize, y*p.cellSize, p.cellSize, p.cellSize);
            }
        }
        p.image(bg,0,0);
        p.zseed += 0.01;
        if(p.mouseIsPressed){
            var rVal = p.map(p.mouseX, 0, p.width, 150, 255);
            var gVal = p.map(p.mouseX, 0, p.width, 0, 255);
            var bVal = p.map(p.mouseY, 0, p.height, 0, 255);
            console.log('clicked');
            p.noStroke();

            p.fill(rVal,gVal,bVal,250);
            p.ellipse(p.mouseX, p.mouseY,80);
            for(let i=0; i<10; i++){
                p.fill(rVal,gVal,bVal,255);
                p.ellipse(i*p.random(30,p.width-500), p.random(-30,p.height), p.random(5,100));
            }
        }

        if(p.frameCount > 100){
                if( p.frameCount % 6 == 0){
                    for(let e = 0; e<numRects ; e++){
                        if(p.frameCount% 6 == 0) {p.fill(255)} 
                        else {p.fill(255,0)}
                        p.rect(rectX[e],rectY[e],p.random(10,100), 10 );
                        rectX[e] += 10;

                    }    
                }
            
        }



    }



}


var textScape = function(p){
    p.Width = window.innerWidth;
    p.Height = window.innerHeight;
    p.Py = 100;
    p.noiseVal = 200;
    p.cellSize = 5;
    p.zseed = 0;
    let userAge = p.int(p.random(age));
    let userName = p.random(name);
    let userLoc = p.random(loc);
    console.log(userLoc);
    let userGender = p.random(gender);
    let textFrame;
    let Px, resetSketch;
    p.setup = function(){
        p.createCanvas(p.windowWidth,p.windowHeight);
        textFrame = p.createGraphics(p.width,p.height);
        p.frameRate(10); 
    }

    p.draw = function(){
        let timer = p.month() + '/' + p.day() + '/' + p.year() + '  ' + p.hour()+':'+p.minute()+':'+p.second()+':'+p.millis() + '  ';
        console.log(p.frameCount);

        
        // LOG INPUT
        if(p.pmouseX - p.mouseX < 0){
            Px = p.random(40,p.width);
                textFrame.textSize(10);
                textFrame.fill(255,10);
                textFrame.text(timer + ': mouse move right',Px, p.Py);
                p.Py += 20;
        } else if(p.pmouseX - p.mouseX > 0) {
            Px = p.random(40,p.width);
                textFrame.textSize(10);
                textFrame.fill(255,10);
                textFrame.text(timer + ': mouse move left',Px, p.Py);
                p.Py += 20;

        } else  if (p.mouseIsPressed) {
            Px = p.random(40,p.width);
            textFrame.textSize(10);
            textFrame.fill(255,10);
            textFrame.text(timer + ': mouse is clicked',Px, p.Py);
                p.Py += 20;
        }

        if(p.Py > p.height){
            p.Py = 8;
            Px = p.random(40,p.width);
        }



        if (p.mouseIsPressed) {
            p.image(textFrame,0,0);

            var rVal = p.map(p.mouseX, 0, p.width, 150, 255);
            var gVal = p.map(p.mouseX, 0, p.width, 0, 255);
            var bVal = p.map(p.mouseY, 0, p.height, 0, 255);
            console.log('clicked');
            p.noStroke();

            p.fill(rVal,gVal,bVal,250);
            p.ellipse(p.mouseX, p.mouseY,80);
            for(let i=0; i<2; i++){
                p.ellipseMode(p.CENTER);
                p.fill(rVal,gVal,bVal,200);
                p.ellipse(p.random(54, p.width), p.random(0,p.height), p.random(50,100));
                
            }
            
            if(p.frameCount > 100 && p.frameCount % 30 == 0){
                textFrame.textSize(40);
                textFrame.fill(0);
                textFrame.text(timer +' : '+ userName +  ' is at '+ userLoc, p.random(40,p.width-200), p.Py);
                Px--;
            }
        } else {
            p.frameCount = 0;
            textFrame.clear();
            
            p.clear();

        }

    }

    // p.mousePressed = function(){

        // var rVal = p.map(p.mouseX, 0, p.width, 150, 255);
        // var gVal = p.map(p.mouseX, 0, p.width, 0, 255);
        // var bVal = p.map(p.mouseY, 0, p.height, 0, 255);
        // console.log('clicked');
        // p.fill(rVal,gVal,bVal,250);
        // p.ellipse(p.mouseX, p.mouseY,50);
        // for(let i=0; i<10; i++){
        //     p.noStroke();
        //     p.fill(rVal,gVal,bVal,80);
        //     p.ellipse(i*p.random(0,200), p.random(0,p.height), 50, 50);
            
        // }
    // }

    
}




// function p2.setup(){

//     p = createCanvas(windowWidth,windowHeight);
//     p.parent("mycanvas2");

//     canvas = createCanvas(windowWidth,windowHeight);
//     canvas.parent("myCanvas");
//     canvas.background(30,50,100);
//     frameRate(10);



// }

// function draw(){

    
//     stroke(255);
//     noFill();
//     ellipse(mouseX,mouseY,50);


// }

// function windowResized(){
//     resizeCanvas(windowWidth, windowHeight);
//     setup();
// }

// function mouseAct(){
//     if(pmouseX - mouseX < 0){
//         console.log('mouse move right');
//         fill(255);
//         p.text('mouse move right',200,Py);
//         Py += 20;
//     } else if(pmouseX - mouseX > 0) {
//         console.log('mouse move left');
//         fill(255);
//         p.text('mouse move left',200,Py);
//         Py += 20;
//     } else { console.log('mouse standstill');}
// }





// Resources 

// OOP 
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
// https://glitch.com/edit/#!/matter-js-bouncing-colorful-balls?path=global.html%3A8%3A0
// Instances/NameSpacing: https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace

// Layering/Multiple canvases into one > for saving the frame
// https://stackoverflow.com/questions/37240287/can-i-create-multiple-canvas-elements-on-same-page-using-p5js/38771816

// Interactivity
// https://p5js.org/learn/interactivity.html

// Visual reference
// https://www.timo.ee/memopol2/
// https://openprocessing.org/sketch/504313
// https://openprocessing.org/sketch/393093


// Higher order array function
// https://youtu.be/m9bRVQ_-DXY

// Mapping colors 