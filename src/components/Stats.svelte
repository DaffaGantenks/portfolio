<script>
  import { onMount } from 'svelte';

  let containerEl = $state(null);
  
  // Use Svelte 5 state for reactive numbers list
  let statsData = $state([
    { target: 4, suffix: '+', label: 'Years Exp', current: 0 },
    { target: 24, suffix: '+', label: 'Projects Completed', current: 0 },
    { target: 12, suffix: '+', label: 'Happy Clients', current: 0 },
    { target: 99, suffix: '%', label: 'Success Rate', current: 0 }
  ]);

  let hasAnimated = false;

  function animateNumbers() {
    if (hasAnimated) return;
    hasAnimated = true;

    statsData.forEach((stat, i) => {
      let start = 0;
      let end = stat.target;
      let duration = 1500; // ms
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        // Easing out quad
        let easeProgress = progress * (2 - progress);
        
        statsData[i].current = Math.floor(easeProgress * end);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      }

      // Add a slight delay for cascading animation
      setTimeout(() => {
        requestAnimationFrame(step);
      }, i * 150);
    });
  }

  onMount(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        animateNumbers();
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

<div class="stats-bar" bind:this={containerEl}>
  {#each statsData as stat, i}
    <div class="stat-item" style:animation-delay="{0.1 + i * 0.1}s">
      <div class="stat-number">{stat.current}{stat.suffix}</div>
      <div class="stat-label">{stat.label}</div>
    </div>
  {/each}
</div>

<style>
  .stats-bar {
    padding: 0;
    display: flex;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    overflow: hidden;
    background-color: var(--bg);
  }
  .stat-item {
    flex: 1;
    padding: 3rem 2rem;
    border-right: 1px solid var(--border);
    opacity: 0;
    animation: fadeUp 0.6s forwards;
    text-align: center;
  }
  .stat-item:last-child { border-right: none; }
  .stat-number {
    font-family: var(--font-display);
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  .stat-label {
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  @media (max-width: 768px) {
    .stats-bar {
      flex-wrap: wrap;
    }
    .stat-item {
      flex: 0 0 50%;
      border-bottom: 1px solid var(--border);
      padding: 2rem 1rem;
    }
    .stat-item:nth-child(2n) {
      border-right: none;
    }
    .stat-item:nth-child(3), .stat-item:nth-child(4) {
      border-bottom: none;
    }
    .stat-number {
      font-size: 2.8rem;
    }
  }

  @media (max-width: 480px) {
    .stat-item {
      flex: 0 0 100%;
      border-right: none;
      border-bottom: 1px solid var(--border);
    }
    .stat-item:last-child {
      border-bottom: none;
    }
  }
</style>
