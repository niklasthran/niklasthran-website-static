const dpi = window.devicePixelRatio;
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");

let width;
let height;
let step;
let mouseX;
let mouseY;
let grey_val;
let slider;
let diagram_h;
let diagram_l;
let translateX;
let translateY;

let radius = 64;
const resolution = 256;
let angle = (2.0 * Math.PI / resolution);
const shift = Math.PI * 0.5;
let stroke_offset = radius / 16;
let bar_width = radius / 16;
let bar_length = radius * 0.5;
let n_elements = 16;

const a = 4;
const b = 4;

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(event) {
    mouseX = event.clientX * window.devicePixelRatio;
    mouseY = event.clientY * window.devicePixelRatio;
}

function lin_map(x, in_min, in_max, out_min, out_max){
    if (in_min == in_max){
        return out_max / 2;
    } else {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}

function grey_val_px(
    grey_val,
    radius,
    posX,
    posY,
    stroke_offset){

    /* COLOR PIXEL */
    /* FOREGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(200 200 200)";
    ctx.fillStyle =
    `rgb(
        ${grey_val}
        ${grey_val}
        ${grey_val}
    )`;

    ctx.beginPath();
        ctx.lineTo(posX - radius, posY - radius);
        ctx.lineTo(posX + radius, posY - radius);
        ctx.lineTo(posX + radius, posY + radius);
        ctx.lineTo(posX - radius, posY + radius);
    ctx.closePath();
    ctx.fill();

    /* BACKGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(200 200 200)";
    ctx.fillStyle = "rgb(200 200 200)";

    ctx.beginPath();
        ctx.lineTo(posX - radius, posY - radius);
        ctx.lineTo(posX + radius, posY - radius);
        ctx.lineTo(posX + radius, posY + radius);
        ctx.lineTo(posX - radius, posY + radius);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
        ctx.lineTo(posX + radius, posY - radius);
        ctx.lineTo(posX + radius + (radius * 2.0 - stroke_offset), posY - radius);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
        ctx.lineTo(posX + radius, posY + radius);
        ctx.lineTo(posX + radius + (radius * 2.0 - stroke_offset), posY + radius);
    ctx.closePath();
    ctx.stroke();
}

function bloch_sphere(
    radius,
    angle,
    shift,
    slider,
    posX,
    posY,
    resolution,
    stroke_offset
){
    /* BLOCH SPHERE */
    let theta = angle * slider - shift;

    /* BACKGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(200 200 200)";
    ctx.fillStyle = "rgb(200 200 200)";

    // Polar ellipse
    ctx.beginPath();
        for (let pt = 0; pt <= resolution; pt += 1) {
            let theta = angle * pt;
            
            ctx.lineTo(
                posX + (radius * 1.00) * Math.cos(theta),
                posY + (radius * 1.00) * Math.sin(theta)
            );
        }
    ctx.stroke();

    // Azimuthal ellipse
    ctx.beginPath();
        for (let pt = 0; pt <= resolution; pt += 1) {
            let theta = angle * pt;
            
            ctx.lineTo(
                posX + (radius * 1.00) * Math.cos(theta),
                posY + (radius * 0.25) * Math.sin(theta)
            );
        }
    ctx.stroke();
    
    // Z-axis
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (radius * 1.00) - stroke_offset
        );

        ctx.lineTo(
            posX,
            posY + (radius * 1.00) + stroke_offset
        );
    ctx.stroke();

    // X-axis
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY
        );
        
        ctx.lineTo(
            posX + (radius * 1.00) + stroke_offset,
            posY
        );
    ctx.stroke();

    // Vector conjugate
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY
        );

        ctx.lineTo(
            posX - (radius * 1.00) * Math.cos(theta),
            posY - (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // Vector conjugate projection line onto z-axis
    ctx.beginPath();
        ctx.lineTo(
            posX + stroke_offset,
            posY - (radius * 1.00) * Math.sin(theta)
        );

        ctx.lineTo(
            posX - (radius * 1.00) * Math.cos(theta),
            posY - (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // UP-State-Vector line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (radius * 1.00)
        );

        ctx.lineTo(
            posX + (radius * 1.00) * Math.cos(theta),
            posY + (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // DOWN-State-Vector line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY + (radius * 1.00)
        );

        ctx.lineTo(
            posX + (radius * 1.00) * Math.cos(theta),
            posY + (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    /* FOREGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0 0 0)";
    ctx.fillStyle = "rgb(0 0 0)";

    // Vector
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY
        );
        
        ctx.lineTo(
            posX + (radius * 1.00) * Math.cos(theta),
            posY + (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // UP-State-Vector conjugate line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (radius * 1.00)
        );

        ctx.lineTo(
            posX - (radius * 1.00) * Math.cos(theta),
            posY - (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // DOWN-State-Vector conjugate line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY + (radius * 1.00)
        );

        ctx.lineTo(
            posX - (radius * 1.00) * Math.cos(theta),
            posY - (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // Vector conjugate projection line mark on z-axis
    ctx.beginPath();
        ctx.lineTo(
            posX + stroke_offset,
            posY - (radius * 1.00) * Math.sin(theta) + stroke_offset
        );

        ctx.lineTo(
            posX - stroke_offset,
            posY - (radius * 1.00) * Math.sin(theta) - stroke_offset
        );
    ctx.stroke();

    // Angle around Y-axis
    ctx.beginPath();
    for (let pt = 0; pt <= slider; pt += 1) {
        let theta = angle * pt - shift;
        
        ctx.lineTo(
            posX + (radius * 0.25) * Math.cos(theta),
            posY + (radius * 0.25) * Math.sin(theta)
        );
    }
    ctx.stroke();
}

function bernoulli_line(
    radius,
    angle,
    shift,
    slider,
    bar_length,
    bar_width,
    posX,
    posY,
    stroke_offset
){

    /* BERNOULLI LINE DIAGRAM */
    let theta = angle * slider - shift;
    let p_up = Math.abs(Math.pow(Math.cos((theta + shift) / 2), 2));
    let p_down = Math.abs(Math.pow(Math.sin((theta + shift) / 2), 2));

    /* BACKGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(200 200 200)";
    ctx.fillStyle = "rgb(200 200 200)";

    /* Bernoulli line */
    // 0%
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY + (radius * 1.00)
        );

        ctx.lineTo(
            posX,
            posY - (radius * 1.00)
        );
    ctx.stroke();

    // 50%
    ctx.beginPath();
        ctx.lineTo(
            posX + bar_length,
            posY + (radius * 1.00)
        );

        ctx.lineTo(
            posX + bar_length,
            posY - (radius * 1.00)
        );
    ctx.stroke();

    // 100%
    ctx.beginPath();
        ctx.lineTo(
            posX + bar_length * 0.5,
            posY + (radius * 1.00)
        );

        ctx.lineTo(
            posX + bar_length * 0.5,
            posY - (radius * 1.00)
        );
    ctx.stroke();

    /* Z-axis-Bloch sphere-Bernoulli correspondance lines */
    // Top line
    ctx.beginPath();
        ctx.lineTo(
            posX - (radius * 1.50),
            posY - (radius * 1.00)
        );

        ctx.lineTo(
            posX + stroke_offset,
            posY - (radius * 1.00)
        );
    ctx.stroke();

    // Bottom line
    ctx.beginPath();
        ctx.lineTo(
            posX - (radius * 1.50),
            posY + (radius * 1.00)
        );

        ctx.lineTo(
            posX + stroke_offset,
            posY + (radius * 1.00)
        );
    ctx.stroke();

    // Bloch sphere-vector conjugate projection line onto bernoulli line
    ctx.beginPath();
        ctx.lineTo(
            posX - (radius * 1.50),
            posY - (radius * 1.00) * Math.sin(theta)
        );

        ctx.lineTo(
            posX,
            posY - (radius * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    /* FOREGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0 0 0)";
    ctx.fillStyle = "rgb(0 0 0)";

    // Mark on bernoulli axis
    ctx.beginPath();
        ctx.lineTo(
            posX + stroke_offset,
            posY - (radius * 1.00) * Math.sin(theta) + stroke_offset
        );

        ctx.lineTo(
            posX - stroke_offset,
            posY - (radius * 1.00) * Math.sin(theta) - stroke_offset
        );
    ctx.stroke();

    /* UP-state probability bar */
    // On Bernoulli line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (radius * 0.50) * (Math.sin(theta) + 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_up * bar_length,
            posY - (radius * 0.50) * (Math.sin(theta) + 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_up * bar_length,
            posY - (radius * 0.50) * (Math.sin(theta) + 1) - (bar_width * 0.5)
        );

        ctx.lineTo(
            posX,
            posY - (radius * 0.50) * (Math.sin(theta) + 1) - (bar_width * 0.5)
        );
    ctx.closePath();
    ctx.stroke();

    /* DOWN-state probability bar */
    // On Bernoulli line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (radius * 0.50) * (Math.sin(theta) - 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_down * bar_length,
            posY - (radius * 0.50) * (Math.sin(theta) - 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_down * bar_length,
            posY - (radius * 0.50) * (Math.sin(theta) - 1) - (bar_width * 0.5)
        );

        ctx.lineTo(
            posX,
            posY - (radius * 0.50) * (Math.sin(theta) - 1) - (bar_width * 0.5)
        );
    ctx.closePath();
    ctx.fill();
}

function noise_matrix(
    radius,
    n_elements,
    angle,
    shift,
    slider,
    bar_length,
    posX,
    posY,
    stroke_offset){

    /* NOISE MATRIX */
    let patch_width = radius * 2;
    let patch_height = radius * 2;
    let theta = angle * slider - shift;
    let p_up = Math.abs(Math.pow(Math.cos((theta + shift) / 2), 2));
    let p_down = Math.abs(Math.pow(Math.sin((theta + shift) / 2), 2));
    
    /* FOREGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(0 0 0)";
    ctx.fillStyle = "rgb(0 0 0)";
    
    /* Matrix */
    for (let x = 0; x <= n_elements - 1; x++){
        for (let y = 0; y <= n_elements - 1; y++){

            if (Math.random() <= 1.0 - p_down){
                ctx.fillStyle = "rgb(255 255 255)";
            } else {
                ctx.fillStyle = "rgb(0 0 0)";
            }
    
            ctx.fillRect(
                posX + x * patch_width / n_elements,
                posY + (patch_height * 0.5 - patch_height / n_elements) - y * patch_height / n_elements,
                patch_width / n_elements,
                patch_height / n_elements
            );
        }
    }

    /* BACKGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(200 200 200)";
    ctx.fillStyle = "rgb(200 200 200)";

    /* Matrix frame */
    ctx.beginPath();
        ctx.lineTo(
            posX - (radius * 1.50) + bar_length + stroke_offset,
            posY - (radius * 1.00)
        );

        ctx.lineTo(
            posX,
            posY + patch_height * -0.5
        );
    ctx.stroke();

    ctx.beginPath();
        ctx.lineTo(
            posX - (radius * 1.50) + bar_length + stroke_offset,
            posY + (radius * 1.00)
        );

        ctx.lineTo(
            posX,
            posY + patch_height * 0.5
        );
    ctx.stroke();

    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY + patch_height * 0.5
        );

        ctx.lineTo(
            posX,
            posY + patch_height * -0.5
        );

        ctx.lineTo(
            posX + patch_width,
            posY + patch_height * -0.5
        );

        ctx.lineTo(
            posX + patch_width,
            posY + patch_height * 0.5
        );
    ctx.closePath();
    ctx.stroke();
}

function init() {
    window.requestAnimationFrame(draw);
    step = 0;
}

function draw() {
    step = step + 1;

    width = window.innerWidth * window.devicePixelRatio;
    height = window.innerHeight * window.devicePixelRatio;

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    mouse_y_constraint = mouseY;
    if (mouse_y_constraint >= height){
        mouse_y_constraint = height;
    }
    
    if (mouse_y_constraint <= 0.0){
        mouse_y_constraint = 0.0;
    }

    //let grey_val = lin_map(mouse_y_constraint, 0.0, height, 255, 0);
    //let slider = lin_map(grey_val, 255, 0, 0.0, resolution * 0.5);

    diagram_l = (radius * 2.0 * a + radius * 1.0) + (radius * 3.5 * a - radius * 0.5) + (radius * 2.0 * a + radius * 1.0);
    diagram_h = b * radius * 2.0;

    translateX = (width - diagram_l) * 0.5 + radius;
    translateY = (height - diagram_h) * 0.5 + radius;

    for (let i = 0; i < a; i++){
        for (let j = 0; j < b; j++){
            grey_val = lin_map(i + j, 0.0, a + b - 2, 255, 0);
            slider = lin_map(grey_val, 255, 0, 0.0, resolution * 0.5);

            noise_matrix(
                radius,
                n_elements,
                angle,
                shift,
                slider,
                bar_length,
                (radius * 5.5) * a + (radius * 2.0) * i + (radius * 0.5) + translateX,
                (radius * 0.0) * b + (radius * 2.0) * j + (radius * 0.0) + translateY,
                0
            );

            bernoulli_line(
                radius,
                angle,
                shift,
                slider,
                bar_length,
                bar_width,
                (radius * 2.0) * a + (radius * 3.5) * i + (radius * 2.5) + translateX,
                (radius * 0.0) * b + (radius * 2.0) * j + (radius * 0.0) + translateY,
                0
            );
            
            bloch_sphere(
                radius,
                angle,
                shift,
                slider,
                (radius * 2.0) * a + (radius * 3.5) * i + (radius * 1.0) + translateX,
                (radius * 0.0) * b + (radius * 2.0) * j + (radius * 0.0) + translateY,
                resolution,
                0
            );

            grey_val_px(
                grey_val,
                radius,
                (radius * 0.0) * a + (radius * 2.0) * i + (radius * 0.0) + translateX,
                (radius * 0.0) * b + (radius * 2.0) * j + (radius * 0.0) + translateY,
                0
            );

        }
    }

    window.requestAnimationFrame(draw);
}

init();