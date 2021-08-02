alert_message = "";
status = "";
objects = [];

function preload(){
    alert_message = loadSound('alert_message.mp3')
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,300);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log('Model Loaded');
    status = true;
}

function draw(){
    image(video,0,0,300,300);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Baby Found";
                alert_message.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby Not Found";
                alert_message.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("baby_status").innerHTML = "Baby Not Found";
            alert_message.play();
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}