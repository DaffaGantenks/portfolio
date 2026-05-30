<script>
  import { onMount } from 'svelte';

  let canvasEl = null;

  onMount(() => {
    const canvas = canvasEl;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.offsetWidth || 300;
    let height = canvas.height = canvas.offsetHeight || 300;
    const particles = [];
    const maxParticles = 40;
    const maxDistance = 65;
    let mouse = { x: -1000, y: -1000, active: false };

    // Handle resizing
    const resizeObserver = new ResizeObserver(() => {
      width = canvas.width = canvas.offsetWidth || 300;
      height = canvas.height = canvas.offsetHeight || 300;
    });
    const container = canvas.parentElement;
    if (container) {
      resizeObserver.observe(container);
    }

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * (width * 0.38); // keep within center area
        this.x = width / 2 + Math.cos(angle) * radius;
        this.y = height / 2 + Math.sin(angle) * radius;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 2 + 1;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.005;
        this.floatOffset = Math.random() * 100;
        this.color = Math.random() > 0.8 ? 'rgba(255, 107, 107, 0.8)' : 'rgba(200, 255, 0, 0.8)';
      }

      update() {
        // Natural floating motion
        this.angle += this.speed;
        const radiusOffset = Math.sin(this.angle) * 15;
        const floatX = Math.cos(this.angle) * radiusOffset;
        const floatY = Math.sin(this.angle) * radiusOffset;

        let targetX = this.baseX + floatX;
        let targetY = this.baseY + floatY;

        // Mouse interaction (repel)
        if (mouse.active) {
          const dx = mouse.x - targetX;
          const dy = mouse.y - targetY;
          const dist = Math.hypot(dx, dy);
          if (dist < 80) {
            const force = (80 - dist) / 80;
            const angle = Math.atan2(dy, dx);
            targetX -= Math.cos(angle) * force * 35;
            targetY -= Math.sin(angle) * force * 35;
          }
        }

        // Lerp towards dynamic target position
        this.x += (targetX - this.x) * 0.1;
        this.y += (targetY - this.y) * 0.1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }
    }

    // Populate particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    // Listen to mouse events on the container
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background ambient glow
      const grad = ctx.createRadialGradient(width/2, height/2, 5, width/2, height/2, width/2);
      grad.addColorStop(0, 'rgba(200, 255, 0, 0.04)');
      grad.addColorStop(0.5, 'rgba(255, 107, 107, 0.01)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(width/2, height/2, width/2, 0, Math.PI*2);
      ctx.fill();

      // Update and draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `rgba(200, 255, 0, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw central star symbol
      ctx.font = '500 48px var(--font-display)';
      ctx.fillStyle = 'rgba(200, 255, 0, 0.3)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', width / 2, height / 2);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  });
</script>

<canvas bind:this={canvasEl} class="orb-canvas"></canvas>

<style>
  .orb-canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    border-radius: 50%;
  }
</style>
