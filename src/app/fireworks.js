export default function startFireworks() {
  const canvas = document.getElementById("fireworksCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const gravity = 0.05;
  const fadeRate = 0.015;
  const explosionCount = 8; // Number of simultaneous fireworks

  class Particle {
    constructor(x, y, color, velocity, size, life) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.velocity = velocity;
      this.size = size;
      this.life = life;
      this.alpha = 1;
    }

    update() {
      this.velocity.y += gravity; // Apply gravity
      this.x += this.velocity.x;
      this.y += this.velocity.y;
      this.alpha -= fadeRate;
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function createExplosion(x, y) {
    const colors = [
      "#ff4747",
      "#ffd700",
      "#ff69b4",
      "#00ff7f",
      "#1e90ff",
      "#ff4500",
    ];
    const numParticles = 50 + Math.random() * 50; // Vary number of particles

    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particles.push(
        new Particle(
          x,
          y,
          color,
          { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
          size,
          1,
        ),
      );
    }
  }

  function launchFirework() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1; // Keep fireworks centered
    const y = canvas.height * (Math.random() * 0.3 + 0.2); // Vary explosion height
    createExplosion(x, y);
  }

  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.update();
      particle.draw();
      if (particle.alpha <= 0) {
        particles.splice(index, 1);
      }
    });

    if (Math.random() < 0.03) {
      // Launch new fireworks occasionally
      for (let i = 0; i < explosionCount; i++) {
        setTimeout(() => launchFirework(), i * 200);
      }
    }
  }

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  animate();
}
