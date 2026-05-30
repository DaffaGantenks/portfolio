<script>
  import { fade } from 'svelte/transition';

  // Use Svelte 5 runes for state
  let activeFilter = $state('All');
  let selectedProject = $state(null);

  const filters = ['All', 'Web App', '3D Web', 'UI/UX Design', 'Frontend'];

  const projects = [
    {
      number: '01 / Featured',
      category: 'Web App',
      title: 'Project Volantis — AI Business Dashboard',
      shortDesc: 'A high-performance AI analytics platform offering real-time data visualization, predictive modeling, and automated report generation.',
      detailedDesc: 'Volantis AI solves key dashboard challenges by aggregating massive data pipelines into ultra-clean charts. Built for enterprise scale, it handles 10k+ dynamic telemetry updates per second. Its custom theme manager offers a personalized experience while the server-side hydration ensures load speeds under 800ms globally.',
      challenge: 'Optimizing SVG rendering pipelines for 50,000+ data nodes while retaining 60fps scrolling performance.',
      stack: ['Svelte 5', 'Astro', 'ChartJS', 'TypeScript', 'Tailwind'],
      bgClass: 'card-1-bg',
      link: '#',
      github: '#'
    },
    {
      number: '02',
      category: '3D Web',
      title: 'Aura 3D — Luxury Watch Configurator',
      shortDesc: 'Real-time 3D product customization using WebGL, custom shaders, and interactive lighting environments.',
      detailedDesc: 'Aura 3D is a photorealistic luxury watch customizer allowing consumers to modify bezels, straps, dial materials, and engrave text in real time. It uses PBR material structures to emulate glass reflections and stainless steel textures, rendering seamlessly on mobile and desktop web browsers.',
      challenge: 'Reducing heavy 3D mesh load times from 24MB down to 2.1MB without compromising normal map resolution.',
      stack: ['Three.js', 'WebGL', 'GLSL Shaders', 'Vite', 'GSAP'],
      bgClass: 'card-2-bg',
      link: '#',
      github: '#'
    },
    {
      number: '03',
      category: 'UI/UX Design',
      title: 'Elysian Brand — High Fashion Microsite',
      shortDesc: 'A design system and storytelling digital experience for a luxury fashion house, featuring fluid typography and scroll-driven parallax.',
      detailedDesc: 'Elysian showcases modern e-commerce storytelling. Rejecting standard grid templates, it features custom canvas scroll animations, dynamic mask path reveals, and interactive cursor overlays. It bridges the gap between high-end digital editorial design and optimized check-out conversion.',
      challenge: 'Aligning complex GSAP timeline triggers with cross-browser scrolling behaviors on mobile iOS Safari.',
      stack: ['Figma', 'Astro', 'GSAP', 'Framer Motion', 'Svelte'],
      bgClass: 'card-3-bg',
      link: '#',
      github: '#'
    },
    {
      number: '04',
      category: 'Frontend',
      title: 'Chronos — Verlet Physics Simulator',
      shortDesc: 'A lightweight canvas physics engine for rendering high-fidelity interactive particles and fluid simulations in web pages.',
      detailedDesc: 'Chronos is an open-source particle engine written in pure TypeScript. It utilizes Verlet integration to simulate gravity, string links, particle collisions, and wind factors, allowing developers to create highly interactive brand landing pages that respond instantly to touch or scroll actions.',
      challenge: 'Implementing spatial partitioning algorithms (grid hashing) to support 2,500 interactive particles at solid 60FPS.',
      stack: ['TypeScript', 'Canvas 2D', 'Svelte', 'Math.js'],
      bgClass: 'card-4-bg',
      link: '#',
      github: '#'
    }
  ];

  // Derived filtered projects using Svelte 5 rune
  const filteredProjects = $derived(
    activeFilter === 'All' 
      ? projects 
      : projects.filter(p => p.category === activeFilter)
  );

  function setFilter(filter) {
    activeFilter = filter;
  }

  function openProject(project) {
    selectedProject = project;
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  }

  function closeProject() {
    selectedProject = null;
    document.body.style.overflow = '';
  }
</script>

<section class="section" id="work">
  <div class="section-header">
    <div>
      <p class="section-label">Selected Work</p>
      <h2 class="section-title">Recent Projects</h2>
    </div>
    
    <!-- Filter tabs -->
    <div class="filter-tabs">
      {#each filters as filter}
        <button 
          class="filter-tab" 
          class:active={activeFilter === filter}
          onclick={() => setFilter(filter)}
        >
          {filter}
        </button>
      {/each}
    </div>
  </div>

  <div class="work-grid">
    {#each filteredProjects as project (project.title)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div 
        class="work-card" 
        onclick={() => openProject(project)}
        transition:fade={{ duration: 150 }}
      >
        <div class="work-card-bg {project.bgClass}"></div>
        <div class="work-card-inner">
          <p class="work-number">{project.number}</p>
          <div>
            <div class="work-tags">
              <span class="work-tag">{project.category}</span>
              {#each project.stack.slice(0, 2) as tech}
                <span class="work-tag">{tech}</span>
              {/each}
            </div>
            <h3 class="work-title">{project.title}</h3>
            <p class="work-desc">{project.shortDesc}</p>
            <div class="work-arrow">→</div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- Project Details Modal -->
{#if selectedProject}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div 
    class="modal-backdrop" 
    transition:fade={{ duration: 200 }} 
    onclick={closeProject}
    role="dialog"
    aria-modal="true"
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="modal-content" onclick={(e) => e.stopPropagation()}>
      <button class="modal-close" onclick={closeProject} aria-label="Close modal">×</button>
      
      <div class="modal-body">
        <p class="modal-category">{selectedProject.category}</p>
        <h2 class="modal-title">{selectedProject.title}</h2>
        
        <div class="modal-divider"></div>
        
        <div class="modal-layout">
          <div class="modal-main">
            <h3>Overview</h3>
            <p class="modal-desc">{selectedProject.detailedDesc}</p>
            
            <h3>Key Challenge Solved</h3>
            <p class="modal-challenge">{selectedProject.challenge}</p>
          </div>
          
          <div class="modal-sidebar">
            <h3>Technologies</h3>
            <div class="modal-stack">
              {#each selectedProject.stack as tech}
                <span class="stack-badge">{tech}</span>
              {/each}
            </div>
            
            <div class="modal-actions">
              <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" class="btn-primary modal-btn">Live Site</a>
              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" class="btn-outline modal-btn">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Work section */
  .section {
    padding: 6rem 3rem;
  }
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 3.5rem;
    flex-wrap: wrap;
    gap: 2rem;
  }
  .section-label {
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4vw, 3rem);
    line-height: 1.1;
  }

  /* Filter Tabs */
  .filter-tabs {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  .filter-tab {
    padding: 0.5rem 1.2rem;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: var(--font-body);
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: var(--transition-smooth);
  }
  .filter-tab:hover, .filter-tab.active {
    color: var(--text);
    border-color: var(--text);
  }
  .filter-tab.active {
    background-color: rgba(255, 255, 255, 0.03);
  }

  /* Work grid */
  .work-grid {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 1.5rem;
  }
  .work-card {
    position: relative;
    overflow: hidden;
    background: var(--bg2);
    border: 1px solid var(--border);
    transition: border-color 0.4s ease;
  }
  .work-card:hover {
    border-color: rgba(var(--accent-rgb), 0.3);
  }
  .work-card:first-child { 
    grid-row: span 2; 
  }
  .work-card-inner {
    padding: 2.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .work-card:hover .work-card-inner { 
    transform: translateY(-4px); 
  }
  .work-card:first-child .work-card-inner { 
    min-height: 520px; 
    justify-content: space-between;
  }
  .work-card-bg {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .work-card:hover .work-card-bg { opacity: 1; }
  
  .card-1-bg { background: radial-gradient(circle at 80% 80%, rgba(var(--accent-rgb), 0.08) 0%, transparent 60%); }
  .card-2-bg { background: radial-gradient(circle at 20% 20%, rgba(255, 107, 107, 0.08) 0%, transparent 60%); }
  .card-3-bg { background: radial-gradient(circle at 80% 20%, rgba(100, 150, 255, 0.08) 0%, transparent 60%); }
  .card-4-bg { background: radial-gradient(circle at 20% 80%, rgba(162, 100, 255, 0.08) 0%, transparent 60%); }

  .work-number {
    font-size: 0.72rem;
    letter-spacing: 0.15em;
    color: var(--muted);
    margin-bottom: auto;
  }
  .work-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 1.2rem;
    margin-top: 1.5rem;
  }
  .work-tag {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.35rem 0.75rem;
    border: 1px solid var(--border);
    color: var(--muted);
    background-color: rgba(10, 10, 15, 0.5);
  }
  .work-title {
    font-family: var(--font-display);
    font-size: 1.6rem;
    line-height: 1.25;
    margin-bottom: 0.8rem;
    font-weight: 500;
  }
  .work-card:first-child .work-title { font-size: 2.3rem; }
  .work-desc {
    font-size: 0.88rem;
    color: var(--muted);
    line-height: 1.7;
    max-width: 480px;
  }
  .work-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px; height: 40px;
    border: 1px solid var(--border);
    color: var(--muted);
    font-size: 1.1rem;
    margin-top: 2rem;
    transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  }
  .work-card:hover .work-arrow {
    background: var(--accent);
    color: #0a0a0f;
    border-color: var(--accent);
    transform: translateX(4px);
  }

  /* Modal overlay */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(10, 10, 15, 0.85);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
  .modal-content {
    background-color: var(--bg2);
    border: 1px solid var(--border);
    width: 100%;
    max-width: 860px;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
    padding: 3.5rem;
    animation: fadeUp 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
  }
  .modal-close {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    font-size: 2.2rem;
    background: transparent;
    border: none;
    color: var(--muted);
    cursor: pointer;
    line-height: 1;
    transition: color 0.2s ease;
  }
  .modal-close:hover {
    color: var(--accent);
  }
  .modal-category {
    font-size: 0.75rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.8rem;
  }
  .modal-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 500;
    line-height: 1.15;
  }
  .modal-divider {
    height: 1px;
    background-color: var(--border);
    margin: 2rem 0;
  }
  .modal-layout {
    display: grid;
    grid-template-columns: 1.6fr 1fr;
    gap: 3rem;
  }
  .modal-main h3, .modal-sidebar h3 {
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1rem;
    font-weight: 600;
  }
  .modal-desc {
    font-size: 1rem;
    line-height: 1.8;
    color: var(--text);
    margin-bottom: 2rem;
  }
  .modal-challenge {
    font-size: 0.95rem;
    line-height: 1.8;
    color: var(--text);
    border-left: 2px solid var(--accent);
    padding-left: 1.5rem;
    font-style: italic;
  }
  .modal-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 3rem;
  }
  .stack-badge {
    font-size: 0.72rem;
    letter-spacing: 0.05em;
    padding: 0.4rem 0.8rem;
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    color: var(--text);
  }
  .modal-actions {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }
  .modal-btn {
    text-align: center;
    text-decoration: none;
    display: block;
    width: 100%;
  }

  /* Responsive styling */
  @media (max-width: 992px) {
    .work-grid {
      grid-template-columns: 1fr;
    }
    .work-card:first-child {
      grid-row: span 1;
    }
    .work-card:first-child .work-card-inner {
      min-height: 250px;
    }
    .modal-layout {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
    .modal-stack {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 768px) {
    .section {
      padding: 5rem 1.5rem;
    }
    .section-header {
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 2.5rem;
    }
    .modal-content {
      padding: 2.5rem 1.8rem;
    }
  }
</style>
