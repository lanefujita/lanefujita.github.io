const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = "-1";
document.body.style.margin = "0";
document.body.style.overflow = "hidden";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSize = 12;
const dotSize = 2;
const dots = [];
const ripples = [];
const mouse = { x: null, y: null };

class Dot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseOpacity = 0.1;
        this.opacity = this.baseOpacity;
        this.maxOpacity = 1;
        this.fadeSpeed = 0.1;
    }
    
    update() {
        this.opacity -= this.fadeSpeed;
        if (this.opacity < this.baseOpacity) {
            this.opacity = this.baseOpacity;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(128, 128, 128, ${this.opacity})`;
        ctx.fill();
    }
}

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 60;
        this.alpha = 1;
        this.fadeSpeed = 0.05;
    }
    
    update() {
        this.radius += 2;
        this.alpha -= this.fadeSpeed;
        if (this.alpha <= 0) {
            const index = ripples.indexOf(this);
            if (index > -1) ripples.splice(index, 1);
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function createGrid() {
    dots.length = 0;
    for (let x = gridSize / 2; x < canvas.width; x += gridSize) {
        for (let y = gridSize / 2; y < canvas.height; y += gridSize) {
            dots.push(new Dot(x, y));
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let dot of dots) {
        let dist = Math.hypot(dot.x - mouse.x, dot.y - mouse.y);
        if (dist < 50) {
            dot.opacity = dot.maxOpacity;
        }
        dot.update();
        dot.draw();
    }
    
    for (let ripple of ripples) {
        ripple.update();
        ripple.draw();
    }
    
    requestAnimationFrame(animate);
}

canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

canvas.addEventListener("click", (e) => {
    ripples.push(new Ripple(e.clientX, e.clientY));
});

canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    ripples.push(new Ripple(touch.clientX, touch.clientY));
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createGrid();
});

createGrid();
animate();

