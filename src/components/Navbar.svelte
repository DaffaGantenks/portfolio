<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  let isMobileMenuOpen = $state(false);
  let isScrolled = $state(false);

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
  }

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 50;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<nav class:scrolled={isScrolled}>
  <a href="#" class="nav-logo">Daffa.</a>
  
  <!-- Desktop Nav Links -->
  <ul class="nav-links desktop-only">
    <li><a href="#work">Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>

  <!-- Mobile Menu Button -->
  <button 
    class="mobile-menu-btn" 
    class:open={isMobileMenuOpen} 
    onclick={toggleMobileMenu}
    aria-label="Toggle navigation menu"
  >
    <span class="bar bar-1"></span>
    <span class="bar bar-2"></span>
  </button>
</nav>

<!-- Mobile Fullscreen Overlay Menu -->
{#if isMobileMenuOpen}
  <div class="mobile-menu-overlay" transition:fade={{ duration: 250 }}>
    <ul class="mobile-nav-links">
      <li><a href="#work" onclick={closeMobileMenu}>Work</a></li>
      <li><a href="#about" onclick={closeMobileMenu}>About</a></li>
      <li><a href="#skills" onclick={closeMobileMenu}>Skills</a></li>
      <li><a href="#contact" onclick={closeMobileMenu}>Contact</a></li>
    </ul>
  </div>
{/if}

<style>
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 999;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: padding 0.3s ease, background-color 0.3s ease;
  }
  
  nav.scrolled {
    padding: 1rem 3rem;
    background-color: rgba(10, 10, 15, 0.85);
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.02em;
    color: var(--text);
    text-decoration: none;
  }
  
  .nav-logo::after {
    content: 'dev';
    font-family: var(--font-body);
    font-size: 0.65rem;
    color: var(--accent);
    vertical-align: super;
    margin-left: 2px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }

  .nav-links a {
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 0; height: 1px;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  .nav-links a:hover { color: var(--text); }
  .nav-links a:hover::after { width: 100%; }

  .mobile-menu-btn {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    width: 24px;
    height: 14px;
    background: transparent;
    border: none;
    padding: 0;
    z-index: 1001;
  }

  .bar {
    width: 100%;
    height: 2px;
    background-color: var(--text);
    transition: transform 0.3s ease, background-color 0.3s ease;
  }

  .mobile-menu-btn.open .bar-1 {
    transform: translateY(6px) rotate(45deg);
    background-color: var(--accent);
  }

  .mobile-menu-btn.open .bar-2 {
    transform: translateY(-6px) rotate(-45deg);
    background-color: var(--accent);
  }

  /* Mobile Fullscreen Overlay styles */
  .mobile-menu-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(10, 10, 15, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .mobile-nav-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    text-align: center;
  }

  .mobile-nav-links a {
    font-family: var(--font-display);
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--text);
    text-decoration: none;
    transition: color 0.3s ease, transform 0.3s ease;
    display: inline-block;
  }

  .mobile-nav-links a:hover {
    color: var(--accent);
    transform: scale(1.05);
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    nav {
      padding: 1.2rem 1.5rem;
    }
    nav.scrolled {
      padding: 0.9rem 1.5rem;
    }
    .desktop-only {
      display: none;
    }
    .mobile-menu-btn {
      display: flex;
    }
  }
</style>
