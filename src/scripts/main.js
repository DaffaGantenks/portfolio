// 1.  GSAP + ScrollTrigger registration
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 2.  Theme toggle + localStorage
(function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  const saved = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    if (typeof gsap !== 'undefined') {
      gsap.to('#theme-toggle', { rotation: '+=180', duration: 0.4 });
    }
  });
})();

// 3.  Custom cursor (dot + lerp ring + text swap)
(function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const cursorText = document.getElementById('cursor-text');
  if (!dot || !ring || !cursorText) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let hasMoved = false;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    
    if (!hasMoved) {
      hasMoved = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      rx = mx;
      ry = my;
    }

    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    cursorText.style.left = (mx + 20) + 'px';
    cursorText.style.top = (my - 10) + 'px';
  });

  (function lerpRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(lerpRing);
  })();

  document.querySelectorAll('.bento-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorText.textContent = 'FLIP →';
      cursorText.style.opacity = '1';
      dot.style.width = '4px';
      dot.style.height = '4px';
    });
    el.addEventListener('mouseleave', () => {
      cursorText.style.opacity = '0';
      dot.style.width = '8px';
      dot.style.height = '8px';
    });
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '14px';
      dot.style.height = '14px';
      ring.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '8px';
      dot.style.height = '8px';
      ring.style.opacity = '1';
    });
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
    cursorText.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    if (hasMoved) {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  });
})();

// 4.  Nav scroll .scrolled class
(function initNavScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
})();

// 5.  Smooth scroll anchors
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const targetId = a.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// 6.  Hero load animation sequence
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;
  const tl = gsap.timeline({ delay: 0.15 });
  tl.from('.hero-eyebrow',    { y: 20, opacity: 0, duration: 0.6 })
    .from('.hero-name-first', { y: 40, opacity: 0, duration: 0.7 }, '-=0.3')
    .from('.hero-name-last',  { y: 40, opacity: 0, duration: 0.7 }, '-=0.5')
    .from('.hero-desc',       { y: 24, opacity: 0, duration: 0.6 }, '-=0.3')
    .from('.hero-cta',        { y: 20, opacity: 0, duration: 0.5 }, '-=0.2')
    .from('.hero-right',      { x: 50, opacity: 0, duration: 0.9, ease: 'power2.out' }, '-=0.8')
    .from('.hero-badge',      { opacity: 0, duration: 0.4 }, '-=0.2');
});

// 7.  ScrollTrigger: section titles slide up
(function initHeadingAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const sections = document.querySelectorAll('section');
  sections.forEach(sec => {
    const title = sec.querySelector('.section-title');
    const num = sec.querySelector('.section-num');
    if (title) {
      gsap.from(title, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%'
        }
      });
    }
    if (num) {
      gsap.from(num, {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%'
        }
      });
    }
  });
})();

// 8.  ScrollTrigger: bento cards stagger in
(function initBentoAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.from('.bento-item', {
    scrollTrigger: { trigger: '.bento-grid', start: 'top 80%' },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: { amount: 0.6, from: 'start' },
    ease: 'power2.out'
  });
})();

// 9.  Skills physics playground (self-invoking)
(function initPhysics() {
  const canvas = document.getElementById('physicsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const SKILLS = [
    { name: 'PHP',        color: '#7377ad', emoji: '🐘' },
    { name: 'Laravel',    color: '#ff2d20', emoji: '🔥' },
    { name: 'MySQL',      color: '#00758f', emoji: '🐬' },
    { name: 'PostgreSQL', color: '#336791', emoji: '🐘' },
    { name: 'Rust',       color: '#ce412b', emoji: '⚙️' },
    { name: 'Astro',      color: '#ff5d01', emoji: '🚀' },
    { name: 'Svelte',     color: '#ff3e00', emoji: '🔶' },
    { name: 'GSAP',       color: '#0ae448', emoji: '⚡' },
    { name: 'Three.js',   color: '#049ef4', emoji: '🌐' },
    { name: 'TypeScript', color: '#3178c6', emoji: '📘' },
    { name: 'Figma',      color: '#f24e1e', emoji: '🎨' },
    { name: 'Node.js',    color: '#68a063', emoji: '🟢' },
  ];

  const R = 46, DAMP = 0.983, GRAV = 0.1;
  let W, H, balls, drag = null, mouse = {x:0,y:0};

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    if (!balls) balls = SKILLS.map(s => ({
      ...s, x: R + Math.random()*(W-R*2), y: R + Math.random()*(H-R*2),
      vx: (Math.random()-.5)*3, vy: (Math.random()-.5)*3, r: R
    }));
  }

  function drawBall(b) {
    ctx.save();
    ctx.shadowColor = b.color; ctx.shadowBlur = 16;
    ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    ctx.fillStyle = isDark ? '#0d1f3c' : '#e2eeff';
    ctx.fill();
    ctx.strokeStyle = b.color; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
    ctx.font = `${b.r * 0.72}px serif`;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(b.emoji, b.x, b.y - 7);
    ctx.font = `500 ${b.r * 0.24}px 'DM Mono', monospace`;
    ctx.fillStyle = isDark ? '#93c5fd' : '#1a3a6b';
    ctx.globalAlpha = 0.85;
    ctx.fillText(b.name.toUpperCase(), b.x, b.y + b.r * 0.5);
    ctx.globalAlpha = 1;
  }

  function collide() {
    for (let i=0;i<balls.length;i++) for (let j=i+1;j<balls.length;j++) {
      const a=balls[i],b=balls[j],dx=b.x-a.x,dy=b.y-a.y;
      const d=Math.sqrt(dx*dx+dy*dy),min=a.r+b.r;
      if(d<min&&d>0){
        const nx=dx/d,ny=dy/d,ov=(min-d)/2;
        a.x-=nx*ov;a.y-=ny*ov;b.x+=nx*ov;b.y+=ny*ov;
        const dvx=b.vx-a.vx,dvy=b.vy-a.vy,dot=dvx*nx+dvy*ny;
        if(dot<0){a.vx+=dot*nx;a.vy+=dot*ny;b.vx-=dot*nx;b.vy-=dot*ny;}
      }
    }
  }

  function tick() {
    balls.forEach(b => {
      if (b===drag) return;
      b.vy+=GRAV; b.vx*=DAMP; b.vy*=DAMP;
      b.x+=b.vx; b.y+=b.vy;
      if(b.x-b.r<0){b.x=b.r;b.vx*=-.7;}
      if(b.x+b.r>W){b.x=W-b.r;b.vx*=-.7;}
      if(b.y-b.r<0){b.y=b.r;b.vy*=-.7;}
      if(b.y+b.r>H){b.y=H-b.r;b.vy*=-.7;}
    });
    collide();
    ctx.clearRect(0,0,W,H);
    balls.forEach(drawBall);
    requestAnimationFrame(tick);
  }

  function pos(e) {
    const r=canvas.getBoundingClientRect(),s=e.touches?e.touches[0]:e;
    return {x:s.clientX-r.left,y:s.clientY-r.top};
  }

  canvas.addEventListener('mousedown', e=>{const p=pos(e);drag=balls.find(b=>Math.hypot(b.x-p.x,b.y-p.y)<b.r)||null;if(drag)mouse=p;});
  canvas.addEventListener('mousemove', e=>{if(!drag)return;const p=pos(e);drag.vx=(p.x-mouse.x)*.6;drag.vy=(p.y-mouse.y)*.6;drag.x=p.x;drag.y=p.y;mouse=p;});
  canvas.addEventListener('mouseup', ()=>drag=null);
  canvas.addEventListener('touchstart', e=>{const p=pos(e);drag=balls.find(b=>Math.hypot(b.x-p.x,b.y-p.y)<b.r)||null;if(drag){mouse=p;e.preventDefault();}},{passive:false});
  canvas.addEventListener('touchmove', e=>{if(!drag)return;const p=pos(e);drag.vx=(p.x-mouse.x)*.6;drag.vy=(p.y-mouse.y)*.6;drag.x=p.x;drag.y=p.y;mouse=p;e.preventDefault();},{passive:false});
  canvas.addEventListener('touchend', ()=>drag=null);
  canvas.addEventListener('click', e=>{
    const p=pos(e);
    balls.forEach(b=>{const dx=b.x-p.x,dy=b.y-p.y,d=Math.max(Math.hypot(dx,dy),1),f=300/d;b.vx+=(dx/d)*f;b.vy+=(dy/d)*f;});
  });

  resize();
  window.addEventListener('resize', resize);
  tick();
})();

// 10. ScrollTrigger: about section fade in
(function initAboutAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.from('#about .about-quote', {
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
    opacity: 0,
    y: 30,
    duration: 0.8
  });

  gsap.from('#about .about-col-left', {
    scrollTrigger: { trigger: '.about-cols', start: 'top 80%' },
    opacity: 0,
    x: -30,
    duration: 0.8
  });

  gsap.from('#about .about-p', {
    scrollTrigger: { trigger: '.about-cols', start: 'top 80%' },
    opacity: 0,
    y: 20,
    stagger: 0.2,
    duration: 0.8
  });

  gsap.from('#about .stat', {
    scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
    opacity: 0,
    y: 20,
    stagger: 0.15,
    duration: 0.6
  });

  gsap.from('#about .testimonial-card', {
    scrollTrigger: { trigger: '.testimonials', start: 'top 85%' },
    opacity: 0,
    scale: 0.95,
    duration: 0.8
  });
})();
