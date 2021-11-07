let faceapi;
let dectections = [];

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
    }

    faceapi = ml5.faceApi(video,faceOptions, faceReady)
}

function faceReady(){
    faceapi.detect(gotFaces);
}

function gotFaces(error, result){
    if( error ){
        console.log(error);
        return;
    }

    dectections = result;
    console.log(detections);
    faceapi.detect(gotFaces);

}

function draw(){

}