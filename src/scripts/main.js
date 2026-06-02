// =============================================================
// DAFFA AUFA PORTFOLIO — main.js (v6 Ultimate)
// =============================================================

// 1. GSAP + ScrollTrigger Registration
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
  initAll();
});

function initAll() {
  initTheme();
  initCursor();
  initNav();
  initSmoothScroll();
  initHeroAnimation();
  initScrollAnimations();
  initPhysicsPlayground();
  initProjectFilter();
  initContactCopy();
}

// 2. Theme Toggle + localStorage (default: dark)
// =============================================================
function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const root   = document.documentElement;
  const stored = localStorage.getItem('portfolio-theme') || 'dark';

  root.setAttribute('data-theme', stored);

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  });
}

// 3. Custom Cursor — dot + lerp ring + label
// =============================================================
function initCursor() {
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');

  if (!dot || !ring) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    if (label) {
      label.style.left = (mx + 12) + 'px';
      label.style.top  = (my - 20) + 'px';
    }
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateRing() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Label swap on interactive elements
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!label) return;
      const lbl = el.dataset.cursor || 'VIEW';
      label.textContent = lbl;
      label.style.opacity = '1';
      dot.style.width  = '8px';
      dot.style.height = '8px';
    });
    el.addEventListener('mouseleave', () => {
      if (!label) return;
      label.style.opacity = '0';
      dot.style.width  = '5px';
      dot.style.height = '5px';
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '0.5';
  });
}

// 4. Nav — .scrolled class + active link detection
// =============================================================
function initNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link detection
  const path  = window.location.pathname;
  const links = navbar.querySelectorAll('.nav-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (
      (href === '/' && path === '/') ||
      (href !== '/' && path.startsWith(href))
    ) {
      link.classList.add('active');
    }
  });
}

// 5. Smooth Scroll for Anchor Links
// =============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id  = anchor.getAttribute('href').slice(1);
      const el  = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// 6. Hero Load Animation (home page only)
// =============================================================
function initHeroAnimation() {
  if (typeof gsap === 'undefined') return;
  const hero = document.getElementById('hero');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-eyebrow',  { opacity: 1, duration: 0.6, delay: 0.2 })
    .to('.hero-first',    { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to('.hero-last',     { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-desc',     { opacity: 1, duration: 0.6 }, '-=0.3')
    .to('.hero-cta',      { opacity: 1, duration: 0.5 }, '-=0.3')
    .to('.hero-stats',    { opacity: 1, duration: 0.5 }, '-=0.3')
    .to('.hero-right',    { opacity: 1, duration: 0.8 }, '-=0.6')
    .to('.hero-badge',    { opacity: 1, duration: 0.5 }, '-=0.4')
    .to('.hero-scroll',   { opacity: 1, duration: 0.5 }, '-=0.3');
}

// 7. ScrollTrigger — Section Titles Slide Up (all pages)
// =============================================================
function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // Section titles
  gsap.utils.toArray('.section-title, .archive-title, .ah-line1, .ah-line2, .contact-l1, .contact-l2').forEach(el => {
    gsap.from(el, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      }
    });
  });

  // 8. ScrollTrigger — Bento cards stagger (home)
  const bentoCards = gsap.utils.toArray('.bento-card');
  if (bentoCards.length) {
    gsap.from(bentoCards, {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.bento-grid',
        start: 'top 80%',
        once: true,
      }
    });
  }

  // 9. ScrollTrigger — Timeline cards slide in (about)
  gsap.utils.toArray('.timeline-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      x: 40,
      duration: 0.7,
      delay: i * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true,
      }
    });
  });

  // 10. ScrollTrigger — Philosophy cards stagger (about)
  const philCards = gsap.utils.toArray('.philosophy-card');
  if (philCards.length) {
    gsap.from(philCards, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.philosophy-grid',
        start: 'top 80%',
        once: true,
      }
    });
  }

  // Story section
  gsap.utils.toArray('.story-right p').forEach((p, i) => {
    gsap.from(p, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: p,
        start: 'top 88%',
        once: true,
      }
    });
  });

  // Project cards stagger
  const projCards = gsap.utils.toArray('.project-card');
  if (projCards.length) {
    gsap.from(projCards, {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 85%',
        once: true,
      }
    });
  }
}

// 11. Skills Physics Playground
// =============================================================
function initPhysicsPlayground() {
  const canvas = document.getElementById('physicsCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const arena = canvas.parentElement;

  function resize() {
    canvas.width  = arena.clientWidth;
    canvas.height = arena.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const SKILLS = [
    { label: 'Svelte',      color: '#ff4f25' },
    { label: 'Astro',       color: '#7c3aed' },
    { label: 'TypeScript',  color: '#3178c6' },
    { label: 'Three.js',    color: '#049ef4' },
    { label: 'GSAP',        color: '#88ce02' },
    { label: 'Laravel',     color: '#ef4444' },
    { label: 'PHP',         color: '#6366f1' },
    { label: 'PostgreSQL',  color: '#336791' },
    { label: 'MySQL',       color: '#f59e0b' },
    { label: 'Rust',        color: '#ce412b' },
    { label: 'WebGL',       color: '#00b894' },
    { label: 'CSS',         color: '#1e40af' },
  ];

  const GRAVITY   = 0.25;
  const FRICTION  = 0.97;
  const RADIUS    = 42;
  const PADDING   = RADIUS + 4;

  const balls = SKILLS.map((sk, i) => ({
    ...sk,
    x:  PADDING + Math.random() * (canvas.width  - PADDING * 2),
    y:  PADDING + Math.random() * (canvas.height * 0.5),
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 2,
    r:  RADIUS,
    dragging: false,
  }));

  let dragBall = null;
  let dragOffX = 0, dragOffY = 0;

  // Mouse / touch interaction
  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  function onDown(e) {
    const { x, y } = getPos(e);
    for (let b of balls) {
      const dx = x - b.x, dy = y - b.y;
      if (Math.hypot(dx, dy) < b.r) {
        dragBall = b;
        b.dragging = true;
        dragOffX = dx;
        dragOffY = dy;
        break;
      }
    }
  }

  function onMove(e) {
    if (!dragBall) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    dragBall.vx  = (x - dragOffX - dragBall.x) * 0.8;
    dragBall.vy  = (y - dragOffY - dragBall.y) * 0.8;
    dragBall.x   = x - dragOffX;
    dragBall.y   = y - dragOffY;
  }

  function onUp() {
    if (dragBall) {
      dragBall.dragging = false;
      dragBall = null;
    }
  }

  canvas.addEventListener('mousedown',  onDown);
  canvas.addEventListener('mousemove',  onMove);
  canvas.addEventListener('mouseup',    onUp);
  canvas.addEventListener('mouseleave', onUp);
  canvas.addEventListener('touchstart', onDown, { passive: false });
  canvas.addEventListener('touchmove',  onMove, { passive: false });
  canvas.addEventListener('touchend',   onUp);

  // Click-scatter
  canvas.addEventListener('click', (e) => {
    if (dragBall) return;
    const { x, y } = getPos(e);
    balls.forEach(b => {
      const dx = x - b.x, dy = y - b.y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = 8;
      b.vx -= (dx / dist) * force;
      b.vy -= (dy / dist) * force;
    });
  });

  // Resolve ball-ball collision
  function resolveCollision(a, b) {
    const dx   = b.x - a.x;
    const dy   = b.y - a.y;
    const dist = Math.hypot(dx, dy);
    const minD = a.r + b.r;
    if (dist < minD && dist > 0) {
      const nx   = dx / dist;
      const ny   = dy / dist;
      const push = (minD - dist) / 2;
      if (!a.dragging) { a.x -= nx * push; a.y -= ny * push; }
      if (!b.dragging) { b.x += nx * push; b.y += ny * push; }
      const relVx = a.vx - b.vx;
      const relVy = a.vy - b.vy;
      const dot   = relVx * nx + relVy * ny;
      if (dot > 0) {
        if (!a.dragging) { a.vx -= dot * nx; a.vy -= dot * ny; }
        if (!b.dragging) { b.vx += dot * nx; b.vy += dot * ny; }
      }
    }
  }

  // Detect dark theme for text color
  function isDark() {
    return document.documentElement.getAttribute('data-theme') !== 'light';
  }

  function update() {
    const W = canvas.width;
    const H = canvas.height;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Draw grid lines for ambiance
    ctx.strokeStyle = isDark()
      ? 'rgba(96,165,250,0.04)'
      : 'rgba(37,99,235,0.04)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W; gx += 80) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (let gy = 0; gy < H; gy += 80) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    balls.forEach(b => {
      if (!b.dragging) {
        b.vy += GRAVITY;
        b.vx *= FRICTION;
        b.vy *= FRICTION;
        b.x  += b.vx;
        b.y  += b.vy;
      }

      // Wall bounce
      if (b.x - b.r < 0)   { b.x = b.r;   b.vx *= -0.6; }
      if (b.x + b.r > W)   { b.x = W - b.r; b.vx *= -0.6; }
      if (b.y - b.r < 0)   { b.y = b.r;   b.vy *= -0.6; }
      if (b.y + b.r > H)   { b.y = H - b.r; b.vy *= -0.6; }
    });

    // Collision resolution
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        resolveCollision(balls[i], balls[j]);
      }
    }

    // Draw balls
    balls.forEach(b => {
      // Glow
      const grd = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1, b.x, b.y, b.r);
      grd.addColorStop(0, b.color + 'dd');
      grd.addColorStop(1, b.color + '88');

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Border
      ctx.strokeStyle = b.color;
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      // Label
      ctx.fillStyle   = '#fff';
      ctx.font        = `500 10px 'DM Mono', monospace`;
      ctx.textAlign   = 'center';
      ctx.textBaseline= 'middle';
      ctx.fillText(b.label, b.x, b.y);
    });

    requestAnimationFrame(update);
  }

  update();
}

// 12. Project Filter + Search (projects page)
// =============================================================
function initProjectFilter() {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const searchInput  = document.getElementById('projectSearch');

  if (!filterBtns.length && !projectCards.length) return;

  function applyFilter() {
    const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
    const query  = searchInput?.value.toLowerCase().trim() || '';

    projectCards.forEach(card => {
      const cats  = card.dataset.categories || '';
      const title = card.querySelector('.project-card-title')?.textContent.toLowerCase() || '';
      const desc  = card.querySelector('.project-card-desc')?.textContent.toLowerCase() || '';
      const matchFilter = active === 'all' || cats.includes(active);
      const matchSearch = !query || title.includes(query) || desc.includes(query);

      if (matchFilter && matchSearch) {
        card.style.display   = 'flex';
        card.style.animation = 'fadeUp 0.4s ease forwards';
      } else {
        card.style.display   = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter();
    });
  });

  searchInput?.addEventListener('input', applyFilter);
}

// 13. Contact — Copy Email Button Feedback
// =============================================================
function initContactCopy() {
  const copyBtn = document.querySelector('.contact-copy');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('hello@daffaaufa.dev').then(() => {
      copyBtn.textContent = '✓ Copied!';
      copyBtn.style.color = 'var(--primary)';
      setTimeout(() => {
        copyBtn.textContent = '⧉ Copy address';
        copyBtn.style.color = '';
      }, 2000);
    }).catch(() => {
      copyBtn.textContent = 'Try manually: hello@daffaaufa.dev';
      setTimeout(() => {
        copyBtn.textContent = '⧉ Copy address';
      }, 3000);
    });
  });
}
