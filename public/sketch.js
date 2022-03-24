var socket;

function setup(){
    createCanvas(600, 600)
    background(51)
    socket = io.connect('http://localhost:3000')
    socket.on('mouse', newDrawing);
}

function newDrawing(data){
    noStroke();
    fill(255, 0, 100);
    circle(data.x, data.y, 20);
}

function mouseDragged(){
    console.log(mouseX + ', ' + mouseY);
    var data = {
        x: mouseX,
        y: mouseY
    }

    socket.emit('mouse', data);
    noStroke();
    fill(255);
    circle(mouseX, mouseY, 20);
}

function draw(){

}