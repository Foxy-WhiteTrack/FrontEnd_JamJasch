const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    start();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        location.reload();
    }
});

const clouds = [];
let stormLevel = 0;

class Cloud {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 10;
        this.image = new Image();
        this.image.src = 'img/cloud.png';
        this.growthRate = 0.01;
    }

    draw() {
        ctx.drawImage(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    // draw() {
    //     ctx.beginPath();
    //     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    //     ctx.fillStyle = '#4d79bc';
    //     ctx.fill();
    //     ctx.closePath();
    // }

    update() {
        this.size += this.growthRate;
    }
}

canvas.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const newCloud = new Cloud(x, y);
    clouds.push(newCloud);
    console.log("posX: " + x + " posY: " + y)
});

function checkCollisions() {
    for (let i = 0; i < clouds.length; i++) {
        for (let j = i + 1; j < clouds.length; j++) {
            const dx = clouds[i].x - clouds[j].x;
            const dy = clouds[i].y - clouds[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < clouds[i].size + clouds[j].size) {
                clouds[i].size += 0.1;
                clouds[j].size += 0.1;
                stormLevel += 0.3;
            }
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clouds.forEach(cloud => {
        cloud.update();
        cloud.draw();
    });

    checkCollisions();
    triggerStorm();

    requestAnimationFrame(update);
}

update();

function triggerStorm() {
    if (stormLevel > 500000) {
        ctx.fillStyle = 'darkgray';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + 50, canvas.height / 2 + 200);
        ctx.lineTo(canvas.width / 2 - 50, canvas.height / 2 + 200);
        ctx.fillStyle = 'gray';
        ctx.fill();
        ctx.closePath();
    }
}