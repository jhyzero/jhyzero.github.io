(() => {
  const canvas = document.querySelector('[data-code-canvas]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 680px)');
  if (!canvas || reduceMotion.matches || mobile.matches) return;

  const context = canvas.getContext('2d');
  const symbols = ['{ }', '</>', '#', '$', '=>', '01', '*', '+', '::', '[]'];
  const pointer = { x: -1000, y: -1000, radius: 115 };
  const particles = [];
  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;

  class Particle {
    constructor(x, y, burst = false) {
      this.x = x;
      this.y = y;
      this.homeX = x;
      this.homeY = y;
      this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
      this.alpha = burst ? 0.5 : 0.11 + Math.random() * 0.08;
      this.burst = burst;
      this.life = burst ? 1 : Infinity;
      this.vx = burst ? (Math.random() - 0.5) * 5 : 0;
      this.vy = burst ? (Math.random() - 0.5) * 5 : 0;
      this.size = 10 + Math.random() * 5;
    }

    update() {
      if (this.burst) {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.985;
        this.vy = this.vy * 0.985 + 0.025;
        this.life -= 0.018;
        return;
      }

      const dx = this.x - pointer.x;
      const dy = this.y - pointer.y;
      const distance = Math.hypot(dx, dy) || 1;
      if (distance < pointer.radius) {
        const force = (pointer.radius - distance) / pointer.radius;
        this.x += (dx / distance) * force * 5;
        this.y += (dy / distance) * force * 5;
      }
      this.x += (this.homeX - this.x) * 0.035;
      this.y += (this.homeY - this.y) * 0.035;
    }

    draw() {
      context.globalAlpha = this.burst ? Math.max(0, this.life * this.alpha) : this.alpha;
      context.fillStyle = this.burst ? '#e44b3a' : '#252720';
      context.font = `${this.size}px ui-monospace, monospace`;
      context.fillText(this.symbol, this.x, this.y);
    }
  }

  const reset = () => {
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles.length = 0;
    const count = Math.min(80, Math.max(35, Math.floor((width * height) / 18000)));
    for (let index = 0; index < count; index += 1) {
      particles.push(new Particle(Math.random() * width, Math.random() * height));
    }
  };

  const animate = () => {
    context.clearRect(0, 0, width, height);
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.update();
      particle.draw();
      if (particle.burst && particle.life <= 0) particles.splice(index, 1);
    }
    context.globalAlpha = 1;
    frame = requestAnimationFrame(animate);
  };

  window.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    pointer.x = -1000;
    pointer.y = -1000;
  });

  window.addEventListener('click', (event) => {
    if (event.target.closest('a, button, input')) return;
    for (let index = 0; index < 22; index += 1) {
      const particle = new Particle(event.clientX, event.clientY, true);
      const angle = (index / 22) * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3.5;
      particle.vx = Math.cos(angle) * speed;
      particle.vy = Math.sin(angle) * speed;
      particles.push(particle);
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(reset, 180);
  }, { passive: true });

  reduceMotion.addEventListener('change', (event) => {
    if (event.matches) {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    } else {
      animate();
    }
  });

  reset();
  animate();
})();

