const dpi = window.devicePixelRatio;
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
let width;
let height;
let step;
let mouseX;
let mouseY;
let r = 256;
let res = 256;
let angle = (2.0 * Math.PI / res);
let shift = Math.PI * 0.5;
let stroke_offset = r / 16;
let bar_width = r / 16;
let bar_length = r * 0.5;
let n_elements = 8;

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
    r,
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
        ctx.lineTo(posX - r, posY - r);
        ctx.lineTo(posX + r, posY - r);
        ctx.lineTo(posX + r, posY + r);
        ctx.lineTo(posX - r, posY + r);
    ctx.closePath();
    ctx.fill();

    /* BACKGROUND */
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(200 200 200)";
    ctx.fillStyle = "rgb(200 200 200)";

    ctx.beginPath();
        ctx.lineTo(posX - r, posY - r);
        ctx.lineTo(posX + r, posY - r);
        ctx.lineTo(posX + r, posY + r);
        ctx.lineTo(posX - r, posY + r);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
        ctx.lineTo(posX + r, posY - r);
        ctx.lineTo(posX + r * 2.25 - stroke_offset, posY - r);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
        ctx.lineTo(posX + r, posY + r);
        ctx.lineTo(posX + r * 2.25 - stroke_offset, posY + r);
    ctx.closePath();
    ctx.stroke();
}

function bloch_sphere(
    r,
    angle,
    shift,
    slider,
    posX,
    posY,
    res,
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
        for (let pt = 0; pt <= res; pt += 1) {
            let theta = angle * pt;
            
            ctx.lineTo(
                posX + (r * 1.00) * Math.cos(theta),
                posY + (r * 1.00) * Math.sin(theta)
            );
        }
    ctx.stroke();

    // Azimuthal ellipse
    ctx.beginPath();
        for (let pt = 0; pt <= res; pt += 1) {
            let theta = angle * pt;
            
            ctx.lineTo(
                posX + (r * 1.00) * Math.cos(theta),
                posY + (r * 0.25) * Math.sin(theta)
            );
        }
    ctx.stroke();
    
    // Z-axis
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (r * 1.00) - stroke_offset
        );

        ctx.lineTo(
            posX,
            posY + (r * 1.00) + stroke_offset
        );
    ctx.stroke();

    // X-axis
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY
        );
        
        ctx.lineTo(
            posX + (r * 1.00) + stroke_offset,
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
            posX - (r * 1.00) * Math.cos(theta),
            posY - (r * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // Vector conjugate projection line onto z-axis
    ctx.beginPath();
        ctx.lineTo(
            posX + stroke_offset,
            posY - (r * 1.00) * Math.sin(theta)
        );

        ctx.lineTo(
            posX - (r * 1.00) * Math.cos(theta),
            posY - (r * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // UP-State-Vector line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (r * 1.00)
        );

        ctx.lineTo(
            posX + (r * 1.00) * Math.cos(theta),
            posY + (r * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // DOWN-State-Vector line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY + (r * 1.00)
        );

        ctx.lineTo(
            posX + (r * 1.00) * Math.cos(theta),
            posY + (r * 1.00) * Math.sin(theta)
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
            posX + (r * 1.00) * Math.cos(theta),
            posY + (r * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // UP-State-Vector conjugate line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (r * 1.00)
        );

        ctx.lineTo(
            posX - (r * 1.00) * Math.cos(theta),
            posY - (r * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // DOWN-State-Vector conjugate line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY + (r * 1.00)
        );

        ctx.lineTo(
            posX - (r * 1.00) * Math.cos(theta),
            posY - (r * 1.00) * Math.sin(theta)
        );
    ctx.stroke();

    // Vector conjugate projection line mark on z-axis
    ctx.beginPath();
        ctx.lineTo(
            posX + stroke_offset,
            posY - (r * 1.00) * Math.sin(theta) + stroke_offset
        );

        ctx.lineTo(
            posX - stroke_offset,
            posY - (r * 1.00) * Math.sin(theta) - stroke_offset
        );
    ctx.stroke();

    // Angle around Y-axis
    ctx.beginPath();
    for (let pt = 0; pt <= slider; pt += 1) {
        let theta = angle * pt - shift;
        
        ctx.lineTo(
            posX + (r * 0.25) * Math.cos(theta),
            posY + (r * 0.25) * Math.sin(theta)
        );
    }
    ctx.stroke();
}

function bernoulli_line(
    r,
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
            posY + (r * 1.00)
        );

        ctx.lineTo(
            posX,
            posY - (r * 1.00)
        );
    ctx.stroke();

    // 50%
    ctx.beginPath();
        ctx.lineTo(
            posX + bar_length,
            posY + (r * 1.00)
        );

        ctx.lineTo(
            posX + bar_length,
            posY - (r * 1.00)
        );
    ctx.stroke();

    // 100%
    ctx.beginPath();
        ctx.lineTo(
            posX + bar_length * 0.5,
            posY + (r * 1.00)
        );

        ctx.lineTo(
            posX + bar_length * 0.5,
            posY - (r * 1.00)
        );
    ctx.stroke();

    /* Z-axis-Bloch sphere-Bernoulli correspondance lines */
    // Top line
    ctx.beginPath();
        ctx.lineTo(
            posX - (r * 1.50),
            posY - (r * 1.00)
        );

        ctx.lineTo(
            posX + stroke_offset,
            posY - (r * 1.00)
        );
    ctx.stroke();

    // Bottom line
    ctx.beginPath();
        ctx.lineTo(
            posX - (r * 1.50),
            posY + (r * 1.00)
        );

        ctx.lineTo(
            posX + stroke_offset,
            posY + (r * 1.00)
        );
    ctx.stroke();

    // Bloch sphere-vector conjugate projection line onto bernoulli line
    ctx.beginPath();
        ctx.lineTo(
            posX - (r * 1.50),
            posY - (r * 1.00) * Math.sin(theta)
        );

        ctx.lineTo(
            posX,
            posY - (r * 1.00) * Math.sin(theta)
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
            posY - (r * 1.00) * Math.sin(theta) + stroke_offset
        );

        ctx.lineTo(
            posX - stroke_offset,
            posY - (r * 1.00) * Math.sin(theta) - stroke_offset
        );
    ctx.stroke();

    /* UP-state probability bar */
    // On Bernoulli line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (r * 0.50) * (Math.sin(theta) + 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_up * bar_length,
            posY - (r * 0.50) * (Math.sin(theta) + 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_up * bar_length,
            posY - (r * 0.50) * (Math.sin(theta) + 1) - (bar_width * 0.5)
        );

        ctx.lineTo(
            posX,
            posY - (r * 0.50) * (Math.sin(theta) + 1) - (bar_width * 0.5)
        );
    ctx.closePath();
    ctx.stroke();

    /* DOWN-state probability bar */
    // On Bernoulli line
    ctx.beginPath();
        ctx.lineTo(
            posX,
            posY - (r * 0.50) * (Math.sin(theta) - 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_down * bar_length,
            posY - (r * 0.50) * (Math.sin(theta) - 1) + (bar_width * 0.5)
        );

        ctx.lineTo(
            posX + p_down * bar_length,
            posY - (r * 0.50) * (Math.sin(theta) - 1) - (bar_width * 0.5)
        );

        ctx.lineTo(
            posX,
            posY - (r * 0.50) * (Math.sin(theta) - 1) - (bar_width * 0.5)
        );
    ctx.closePath();
    ctx.fill();
}

function noise_matrix(
    r,
    n_elements,
    angle,
    shift,
    slider,
    bar_length,
    posX,
    posY,
    stroke_offset){

    /* NOISE MATRIX */
    let patch_width = r * 2;
    let patch_height = r * 2;
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
            posX - (r * 1.50) + bar_length + stroke_offset,
            posY - (r * 1.00)
        );

        ctx.lineTo(
            posX,
            posY + patch_height * -0.5
        );
    ctx.stroke();

    ctx.beginPath();
        ctx.lineTo(
            posX - (r * 1.50) + bar_length + stroke_offset,
            posY + (r * 1.00)
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

    let grey_val = lin_map(mouse_y_constraint, 0.0, height, 255, 0);
    let slider = lin_map(grey_val, 255, 0, 0.0, res * 0.5);

    let translateX = r * 4.25;

    noise_matrix(
        r,
        n_elements,
        angle,
        shift,
        slider,
        bar_length,
        (width * 0.5) + r * 6.5 - translateX,
        height * 0.5,
        stroke_offset
    );

    bernoulli_line(
        r,
        angle,
        shift,
        slider,
        bar_length,
        bar_width,
        (width * 0.5) + r * 5.0 - translateX,
        height * 0.5,
        stroke_offset
    );

    bloch_sphere(
        r,
        angle,
        shift,
        slider,
        (width * 0.5) + r * 3.5 - translateX,
        height * 0.5,
        res,
        stroke_offset
    );

    grey_val_px(
        grey_val,
        r,
        (width * 0.5) + r - translateX,
        height * 0.5,
        stroke_offset
    );

    window.requestAnimationFrame(draw);
}

init();