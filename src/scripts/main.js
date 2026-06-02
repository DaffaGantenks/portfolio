// =============================================================
// 1.  GSAP + ScrollTrigger registration
// =============================================================

function registerGSAP() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    return true;
  }
  return false;
}

// =============================================================
// 2.  Theme toggle (light/dark + localStorage)
// =============================================================

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);

    // Rotate icon animation
    toggle.classList.add('rotating');
    setTimeout(() => toggle.classList.remove('rotating'), 400);
  });
}

// =============================================================
// 3.  Custom cursor (dot + lerp follower)
// =============================================================

function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  // Hide until first mouse movement so cursor doesn't flash at (0,0)
  dot.style.opacity  = '0';
  ring.style.opacity = '0';

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let hasMoved = false;
  const lerpFactor = 0.12;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Reveal cursor on first move
    if (!hasMoved) {
      hasMoved = true;
      dot.style.opacity  = '1';
      ring.style.opacity = '0.5';
      // Snap ring to current position to avoid swooping from corner
      ringX = mouseX;
      ringY = mouseY;
    }

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // Lerp ring
  function animateRing() {
    ringX += (mouseX - ringX) * lerpFactor;
    ringY += (mouseY - ringY) * lerpFactor;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effects on interactive elements
  const interactiveEls = document.querySelectorAll('a, button, .bento-item, .skills-arena');
  interactiveEls.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-view'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (hasMoved) {
      dot.style.opacity  = '1';
      ring.style.opacity = '0.5';
    }
  });
}

// =============================================================
// 4.  Nav scroll behavior (.scrolled class)
// =============================================================

function initNav() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// =============================================================
// 5.  Hero load animation sequence (staggered)
// =============================================================

function initHeroAnimations() {
  if (typeof gsap === 'undefined') return;

  // Nav fades down
  gsap.fromTo(
    '#main-nav',
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }
  );

  // Hero load sequence
  const heroTl = gsap.timeline({ delay: 0.2 });
  heroTl
    .from('.hero-eyebrow',       { y: 20, opacity: 0, duration: 0.6 })
    .from('.hero-name-first',    { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.hero-name-last',     { y: 40, opacity: 0, duration: 0.7 }, '-=0.4')
    .from('.hero-desc',          { y: 24, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.hero-cta',           { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.hero-avatar-wrap',   { x: 40, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.7')
    .from('.hero-badge',         { opacity: 0, duration: 0.5 }, '-=0.3');
}

// =============================================================
// 6.  ScrollTrigger: section headings slide up
// =============================================================

function initHeadingAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const headings = document.querySelectorAll('.section-title, .about-quote, .contact-lets, .contact-build, .contact-something');

  headings.forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // Section numbers also
  const numbers = document.querySelectorAll('.section-number');
  numbers.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, x: -10 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// =============================================================
// 7.  ScrollTrigger: bento cards stagger in
// =============================================================

function initBentoAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const bentoItems = document.querySelectorAll('.bento-item');
  if (!bentoItems.length) return;

  gsap.fromTo(
    bentoItems,
    { y: 30, opacity: 0, scale: 0.96 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    }
  );
}

// =============================================================
// 10. Skills Physics Playground
// =============================================================

// ── Skills Physics Playground ───────────────────────────────────────
function initSkillsPhysics() {
  // Defer until after first paint so offsetWidth/Height are non-zero
  requestAnimationFrame(function() {
    const canvas = document.getElementById('physicsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const SKILLS = [
      { name: 'PHP',        color: '#7377ad', label: 'PHP' },
      { name: 'Laravel',    color: '#ff2d20', label: 'Laravel' },
      { name: 'MySQL',      color: '#00758f', label: 'MySQL' },
      { name: 'PostgreSQL', color: '#336791', label: 'Postgres' },
      { name: 'Rust',       color: '#ce412b', label: 'Rust' },
      { name: 'Astro',      color: '#ff5d01', label: 'Astro' },
      { name: 'Svelte',     color: '#ff3e00', label: 'Svelte' },
      { name: 'GSAP',       color: '#0ae448', label: 'GSAP' },
      { name: 'Three.js',   color: '#049ef4', label: 'Three.js' },
      { name: 'TypeScript', color: '#3178c6', label: 'TypeScript' },
      { name: 'Figma',      color: '#f24e1e', label: 'Figma' },
      { name: 'Node.js',    color: '#68a063', label: 'Node.js' },
    ];

    const RADIUS = 46;
    const DAMPING = 0.985;
    const GRAVITY = 0.09;

    let W, H, balls, dragging = null, mouse = { x: 0, y: 0 };

    function resize() {
      // Use clientWidth as fallback if offsetWidth is 0
      const w = canvas.offsetWidth || canvas.parentElement.clientWidth || window.innerWidth;
      const h = canvas.offsetHeight || 520;
      W = canvas.width  = w;
      H = canvas.height = h;
      // Re-clamp balls after resize
      if (balls) {
        balls.forEach(b => {
          b.x = Math.min(Math.max(b.x, b.r), W - b.r);
          b.y = Math.min(Math.max(b.y, b.r), H - b.r);
        });
      } else {
        initBalls();
      }
    }

    function initBalls() {
      const cols = Math.floor(W / (RADIUS * 2.5));
      balls = SKILLS.map((s, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        return {
          ...s,
          x: RADIUS * 1.5 + col * (RADIUS * 2.5),
          y: RADIUS * 1.5 + row * (RADIUS * 2.5),
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          r: RADIUS,
        };
      });
    }

    function drawBall(b) {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      // Glow
      ctx.save();
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#0d1f3c' : '#e2eeff';
      ctx.fill();
      ctx.restore();

      // Colored border
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.strokeStyle = b.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Abbreviated letter icon — 2-char, colored
      const abbr = b.label.slice(0, 2).toUpperCase();
      ctx.save();
      ctx.font = `bold ${Math.round(b.r * 0.52)}px 'DM Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = b.color;
      ctx.fillText(abbr, b.x, b.y - Math.round(b.r * 0.18));
      ctx.restore();

      // Full name label
      ctx.save();
      ctx.font = `500 ${Math.round(b.r * 0.24)}px 'DM Mono', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)';
      ctx.fillText(b.label.toUpperCase(), b.x, b.y + Math.round(b.r * 0.48));
      ctx.restore();
    }

    function resolveCollisions() {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const a = balls[i], b = balls[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = a.r + b.r;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist, ny = dy / dist;
            const overlap = (minDist - dist) / 2;
            a.x -= nx * overlap; a.y -= ny * overlap;
            b.x += nx * overlap; b.y += ny * overlap;
            const dvx = b.vx - a.vx, dvy = b.vy - a.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot < 0) {
              a.vx += dot * nx; a.vy += dot * ny;
              b.vx -= dot * nx; b.vy -= dot * ny;
            }
          }
        }
      }
    }

    function update() {
      balls.forEach(b => {
        if (b === dragging) return;
        b.vy += GRAVITY;
        b.vx *= DAMPING;
        b.vy *= DAMPING;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x - b.r < 0)    { b.x = b.r;    b.vx *= -0.7; }
        if (b.x + b.r > W)    { b.x = W - b.r; b.vx *= -0.7; }
        if (b.y - b.r < 0)    { b.y = b.r;    b.vy *= -0.7; }
        if (b.y + b.r > H)    { b.y = H - b.r; b.vy *= -0.7; }
      });
      resolveCollisions();
    }

    function render() {
      ctx.clearRect(0, 0, W, H);
      balls.forEach(drawBall);
    }

    function loop() {
      update();
      render();
      requestAnimationFrame(loop);
    }

    function getPos(e) {
      const rect = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      return { x: src.clientX - rect.left, y: src.clientY - rect.top };
    }

    function onDown(e) {
      const p = getPos(e);
      dragging = balls.find(b => Math.hypot(b.x - p.x, b.y - p.y) < b.r) || null;
      if (dragging) { mouse = p; e.preventDefault(); }
    }

    function onMove(e) {
      if (!dragging) return;
      const p = getPos(e);
      dragging.vx = (p.x - mouse.x) * 0.6;
      dragging.vy = (p.y - mouse.y) * 0.6;
      dragging.x = p.x;
      dragging.y = p.y;
      mouse = p;
      e.preventDefault();
    }

    function onUp() { dragging = null; }

    canvas.addEventListener('mousedown',  onDown);
    canvas.addEventListener('mousemove',  onMove);
    canvas.addEventListener('mouseup',    onUp);
    canvas.addEventListener('touchstart', onDown, { passive: false });
    canvas.addEventListener('touchmove',  onMove, { passive: false });
    canvas.addEventListener('touchend',   onUp);

    resize();
    window.addEventListener('resize', resize);
    loop();

    canvas.addEventListener('click', (e) => {
      if (dragging) return;
      const p = getPos(e);
      balls.forEach(b => {
        const dx = b.x - p.x, dy = b.y - p.y;
        const dist = Math.max(Math.hypot(dx, dy), 1);
        const force = 320 / dist;
        b.vx += (dx / dist) * force;
        b.vy += (dy / dist) * force;
      });
    });
  }); // end requestAnimationFrame
}

function initProjectHoverCursor() {
  const dot = document.getElementById('cursor-dot');
  if (!dot) return;

  const projectCards = document.querySelectorAll('.bento-item');

  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-view');
    });

    card.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-view');
    });
  });
}

// =============================================================
// 10. Smooth scroll for nav anchor links
// =============================================================

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navHeight = document.getElementById('main-nav')?.offsetHeight || 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    });
  });
}

// =============================================================
// Boot sequence
// =============================================================

function boot() {
  initTheme();
  initNav();
  initCursor();
  initSmoothScroll();
  initSkillsPhysics();

  if (registerGSAP()) {
    initHeroAnimations();
    initHeadingAnimations();
    initBentoAnimations();
    initProjectHoverCursor();
  } else {
    // Retry once GSAP CDN scripts have loaded
    let attempts = 0;
    const retryInterval = setInterval(() => {
      attempts++;
      if (registerGSAP()) {
        clearInterval(retryInterval);
        initHeroAnimations();
        initHeadingAnimations();
        initBentoAnimations();
        initProjectHoverCursor();
      }
      if (attempts > 20) clearInterval(retryInterval);
    }, 150);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
