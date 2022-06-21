song = "";
leftX = 0;
leftY = 0;
rightX = 0;
rightY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(550, 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotPoses)
}

function modalLoaded() {
    console.log('PoseNet Is is a net and is netting')
}



function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[9].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist =" + scoreLeftWrist);

        leftX = results[0].pose.leftWrist.x;
        leftY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftX + "leftWristY = " + leftY);

        rightX = results[0].pose.rightWrist.x;
        rightY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightX + "rightWristY = " + rightY);
    }
}

function draw() {
    image(video, 0, 0, 550, 450);

    fill("#5a78d1");
    stroke("#5a78d1");
    if(scoreRightWrist > 0.2){
    circle(rightX, rightY, 20);

    if (rightY > 0 && rightY <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }

   else if (rightY > 100 && rightY <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1.0x";
        song.rate(1.0);
    }

    else if (rightY > 200 && rightY <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }

    else if (rightY > 300 && rightY <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2.0x";
        song.rate(2.0);
    }

    else if (rightY > 400 && rightY <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftX, leftY, 20);
        NumberleftY = Number(leftY);
        remove = floor(NumberleftY);
        volume = remove / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}