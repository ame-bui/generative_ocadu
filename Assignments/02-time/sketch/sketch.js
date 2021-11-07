let faceapi;
let detections = [];

let video; 
let canvas;

function setup(){
    canvas = createCanvas(480,360);
    video = createCapture(VIDEO);
    video.size(width,height);

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
        console.log(error);
        return;
    }

    detections = result;
    console.log(detections);
    faceapi.detect(gotFaces);

}

function draw(){
    clear();

    if(detections.length > 0){ 
        for(f=0; f< detections.length; f++){
            let x = detections[0].alignedRect._box._x;
            let y = detections[0].alignedRect._box._y;
            let rectWidth = detections[0].alignedRect._box._width;
            let rectHeight = detections[0].alignedRect._box._height;

            stroke(44, 169, 222);
            strokeWeight(1);
            noFill();
            rect(x,y,rectWidth, rectHeight);
        }
    }
}