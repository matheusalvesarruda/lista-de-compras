const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ['#6a0dad', '#2575fc', '#ff6f61', '#28a745'];

function createParticle(x, y) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push({
        x,
        y,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color,
    });
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle, index) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        if (particle.x > canvas.width || particle.x < 0 || particle.y > canvas.height || particle.y < 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(drawParticles);
}

canvas.addEventListener('mousemove', (event) => {
    createParticle(event.x, event.y);
});

canvas.addEventListener('click', (event) => {
    createParticle(event.x, event.y);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

drawParticles();
