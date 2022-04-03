let sketch = (sketch) => {

    let socket;

    let infoDiv;

    let eraseMode = false;
    let scribbleMode = false;

    const STROKE_WEIGHT = 8;
    const COLOR_1 = sketch.color(0, 0, 0, 150);
    const COLOR_2 = sketch.color(234, 34, 93, 150);

    function drawLine(x1, y1, x2, y2){
        if (scribbleMode) {
            scribble.scribbleLine(x1, y1, x2, y2);
        } else {
            sketch.line(x1, y1, x2, y2);
        }
    }

    sketch.setup = () => {
        sketch.createCanvas(sketch.windowWidth, sketch.windowHeight)
        socket = io.connect('http://localhost:3000')
        socket.on('mouse', (data) => {
            sketch.strokeWeight(STROKE_WEIGHT);
            sketch.stroke(COLOR_1);
            drawLine(data.x, data.y, data.prev_x, data.prev_y);
        });
        infoDiv = sketch.createDiv();
        infoDiv.position(sketch.windowWidth - 100, 0);
    }

    sketch.draw = () => {
        if (sketch.mouseIsPressed) {
            socket.emit('mouse', { x: sketch.mouseX, y: sketch.mouseY, prev_x: sketch.pmouseX, prev_y: sketch.pmouseY });
            if (!eraseMode) {
                sketch.strokeWeight(STROKE_WEIGHT);
                sketch.stroke(COLOR_2);
                drawLine(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
            } else {
                sketch.strokeWeight(20);
                sketch.stroke(255);
                sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
            }
        }
        infoDiv.html(`<ul><li>X: ${sketch.mouseX}</li><li>Y: ${sketch.mouseY}</li></ul>`);
    }

    sketch.windowResized = () => {
        sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
        infoDiv.position(sketch.windowWidth - 100, 0);
    }

    sketch.mouseClicked = () => {
        if (sketch.mouseButton === sketch.RIGHT) {
            eraseMode = !eraseMode;
        }
    }
};

let myp5 = new p5(sketch, 'p5_canvas');
let scribble = new Scribble(myp5);