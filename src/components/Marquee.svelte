<script>
  // Svelte 5 rune props
  let { items = [], reverse = false, speed = '25s' } = $props();
</script>

<div class="marquee-section">
  <div 
    class="marquee-track" 
    style:animation-duration={speed}
    style:animation-direction={reverse ? 'reverse' : 'normal'}
  >
    <!-- First group -->
    {#each items as item}
      <div class="marquee-item">
        {item} <span class="marquee-sep"></span>
      </div>
    {/each}
    <!-- Duplicate group for seamless wrapping -->
    {#each items as item}
      <div class="marquee-item">
        {item} <span class="marquee-sep"></span>
      </div>
    {/each}
  </div>
</div>

<style>
  .marquee-section {
    overflow: hidden;
    padding: 1.5rem 0;
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    background: var(--bg);
    display: flex;
    width: 100%;
  }
  .marquee-track {
    display: flex;
    animation: marquee linear infinite;
    width: max-content;
  }
  .marquee-item {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 0 2rem;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    white-space: nowrap;
  }
  .marquee-sep {
    width: 4px; height: 4px;
    background: var(--accent);
    border-radius: 50%;
    display: inline-block;
  }
</style>
