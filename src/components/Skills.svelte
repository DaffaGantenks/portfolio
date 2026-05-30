<script>
  import { onMount } from 'svelte';

  let containerEl = $state(null);
  let isVisible = $state(false);

  const skills = [
    { name: 'Astro / Svelte', level: 'Expert', val: 92, icon: '⬡' },
    { name: 'GSAP / Motion', level: 'Advanced', val: 88, icon: '◈' },
    { name: 'Three.js / WebGL', level: 'Intermediate', val: 72, icon: '◎' },
    { name: 'UI/UX Design', level: 'Advanced', val: 85, icon: '✦' },
    { name: 'TypeScript / JS', level: 'Expert', val: 90, icon: '▲' },
    { name: 'Node.js / APIs', level: 'Intermediate', val: 75, icon: '◆' },
    { name: 'Figma Design', level: 'Expert', val: 92, icon: '■' },
    { name: 'Web Performance', level: 'Advanced', val: 86, icon: '▼' }
  ];

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isVisible = true;
        observer.disconnect();
      }
    }, { threshold: 0.1 });

    if (containerEl) {
      observer.observe(containerEl);
    }

    return () => {
      observer.disconnect();
    };
  });
</script>

<section class="skills-section" id="skills" bind:this={containerEl}>
  <div class="section-header">
    <div>
      <p class="section-label">Expertise</p>
      <h2 class="section-title">Technical Skills</h2>
    </div>
  </div>
  
  <div class="skills-grid">
    {#each skills as skill, i}
      <div class="skill-item">
        <div class="skill-icon">{skill.icon}</div>
        <p class="skill-name">{skill.name}</p>
        <p class="skill-level">{skill.level}</p>
        <div class="skill-bar">
          <div 
            class="skill-bar-fill" 
            style:width={isVisible ? `${skill.val}%` : '0%'}
            style:transition="width 1.2s cubic-bezier(0.25, 0.8, 0.25, 1) {i * 0.08}s"
          ></div>
        </div>
      </div>
    {/each}
  </div>
</section>

<style>
  .skills-section {
    padding: 6rem 3rem;
    background: var(--bg2);
    border-top: 1px solid var(--border);
  }
  .section-header {
    margin-bottom: 3rem;
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
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }
  .skill-item {
    background: var(--bg);
    border: 1px solid var(--border);
    padding: 2.2rem 2rem;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }
  .skill-item:hover { 
    background-color: var(--bg2); 
    border-color: rgba(var(--accent-rgb), 0.2);
  }
  .skill-icon {
    width: 44px; height: 44px;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: var(--accent);
    transition: border-color 0.3s ease, background-color 0.3s ease;
  }
  .skill-item:hover .skill-icon { 
    border-color: var(--accent);
    background-color: rgba(var(--accent-rgb), 0.03);
  }
  .skill-name {
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 0.4rem;
    letter-spacing: 0.02em;
  }
  .skill-level {
    font-size: 0.72rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .skill-bar {
    height: 2px;
    background: var(--border);
    margin-top: 1.2rem;
    overflow: hidden;
  }
  .skill-bar-fill {
    height: 100%;
    background: var(--accent);
    width: 0%;
  }

  @media (max-width: 992px) {
    .skills-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 576px) {
    .skills-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    .skills-section {
      padding: 5rem 1.5rem;
    }
  }
</style>
