<script>
  import { onMount } from 'svelte';

  let cursorEl = null;
  let followerEl = null;
  let mouseX = 0;
  let mouseY = 0;
  let followerX = 0;
  let followerY = 0;
  
  // Use Svelte 5 runes for state
  let isHovered = $state(false);
  let isVisible = $state(false);

  onMount(() => {
    // Only enable custom cursor if fine pointer (mouse/trackpad) is used
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    isVisible = true;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorEl) {
        cursorEl.style.left = `${mouseX}px`;
        cursorEl.style.top = `${mouseY}px`;
      }
    };

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      if (followerEl) {
        followerEl.style.left = `${followerX}px`;
        followerEl.style.top = `${followerY}px`;
      }
      requestAnimationFrame(animateFollower);
    };

    const onEnter = () => { isHovered = true; };
    const onLeave = () => { isHovered = false; };

    const addHoverListeners = () => {
      document.querySelectorAll('button, a, .work-card, .skill-item, select, input, textarea, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    let frameId = requestAnimationFrame(animateFollower);

    // Initial setup for hover elements
    addHoverListeners();

    // Re-bind when DOM updates (e.g., when modal opens or projects filter changes)
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      observer.disconnect();
      document.querySelectorAll('button, a, .work-card, .skill-item, select, input, textarea, [role="button"]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  });
</script>

{#if isVisible}
  <div 
    bind:this={cursorEl} 
    class="cursor" 
    style:transform={isHovered ? 'translate(-50%, -50%) scale(2)' : 'translate(-50%, -50%) scale(1)'}
  ></div>
  <div 
    bind:this={followerEl} 
    class="cursor-follower" 
    style:opacity={isHovered ? 0 : 1}
  ></div>
{/if}
