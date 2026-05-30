// ==========================================
// 1. Custom cursor (lerp follower)
// ==========================================
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mouseX = -100, mouseY = -100;
let ringX = -100, ringY = -100;
let cursorVisible = false;

// Only enable custom cursor on fine pointer devices (mouse/trackpad)
if (window.matchMedia('(pointer: fine)').matches) {
  document.body.style.cursor = 'none';
  
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursorVisible) {
      // Snap ring to mouse on first move to avoid lag
      ringX = mouseX;
      ringY = mouseY;
      cursorVisible = true;
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '0.45';
    }
    if (dot) {
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    if (dot) dot.style.opacity = '0';
    if (ring) ring.style.opacity = '0';
  });

  window.addEventListener('mouseenter', () => {
    if (cursorVisible) {
      if (dot) dot.style.opacity = '1';
      if (ring) ring.style.opacity = '0.45';
    }
  });
}

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (ring) {
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// ==========================================
// 2. Nav scroll behavior (add .scrolled class)
// ==========================================
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (nav) {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
}, { passive: true });

// ==========================================
// 3. Page load animation sequence (hero stagger)
// ==========================================
window.addEventListener('DOMContentLoaded', () => {
  // Set opacity 1 to body
  gsap.to('body', { opacity: 1, duration: 0.3 });
  
  const tl = gsap.timeline();
  
  tl.fromTo('.hero-title-mask span', 
      { y: '110%', filter: 'blur(10px)' },
      { y: '0%', filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', stagger: 0.1 },
      '0.2'
    )
    .fromTo('nav', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.6 }, 
      '0.5'
    )
    .fromTo(['.hero-subrole', '.hero-badge', '.hero-vertical-label', '.hero-diagonal-svg line', '.hero-scroll-wrapper', '.hero-glow-orb'],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0.12 },
      '0.6'
    );
});

// ==========================================
// 4. ScrollTrigger — section headings fade up
// ==========================================
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.section-header-editorial').forEach(header => {
  gsap.fromTo(header,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
      }
    }
  );
});

// ==========================================
// 5. ScrollTrigger — project titles slide in alternating directions
// ==========================================
gsap.fromTo('.project-p1 .project-title',
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.project-p1',
      start: 'top 75%',
    }
  }
);

gsap.fromTo('.project-p2 .project-title',
  { x: 100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.project-p2',
      start: 'top 75%',
    }
  }
);

gsap.fromTo('.project-p3 .project-title',
  { x: -100, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.project-p3',
      start: 'top 75%',
    }
  }
);

// ==========================================
// 6. ScrollTrigger — skill bars scaleX animate
// ==========================================
gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
  gsap.to(bar, {
    scaleX: 1,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: bar,
      start: 'top 92%',
    }
  });
});

// ==========================================
// 7. ScrollTrigger — stats count up
// ==========================================
gsap.utils.toArray('.count-up').forEach(el => {
  const target = parseFloat(el.getAttribute('data-target') || '0');
  const obj = { value: 0 };
  gsap.to(obj, {
    value: target,
    duration: 1.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 90%',
    },
    onUpdate: () => {
      el.textContent = Math.floor(obj.value);
    }
  });
});

// ==========================================
// 8. Cursor text change on project hover ("VIEW →")
// ==========================================
const hoverClickable = () => document.body.classList.add('hovering-clickable');
const leaveClickable = () => document.body.classList.remove('hovering-clickable');
const hoverProject = () => document.body.classList.add('hovering-project');
const leaveProject = () => document.body.classList.remove('hovering-project');

function setupCursorListeners() {
  document.querySelectorAll('a, button, .social-cluster-item').forEach(el => {
    el.removeEventListener('mouseenter', hoverClickable);
    el.removeEventListener('mouseleave', leaveClickable);
    el.addEventListener('mouseenter', hoverClickable);
    el.addEventListener('mouseleave', leaveClickable);
  });
  
  document.querySelectorAll('.project-card').forEach(el => {
    el.removeEventListener('mouseenter', hoverProject);
    el.removeEventListener('mouseleave', leaveProject);
    el.addEventListener('mouseenter', hoverProject);
    el.addEventListener('mouseleave', leaveProject);
  });
}

setupCursorListeners();

// Re-bind cursor listeners when DOM updates
const observer = new MutationObserver(setupCursorListeners);
observer.observe(document.body, { childList: true, subtree: true });
