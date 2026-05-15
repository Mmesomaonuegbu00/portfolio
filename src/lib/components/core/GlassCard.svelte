<script>
  // Svelte 5 uses destructuring from $props()
  let { children, hoverGlow = true } = $props();
</script>

<div class="glass p-3 transition-all duration-500 {hoverGlow ? 'hover:border-orange-500/50 hover:glow-orange' : ''}">
  {@render children()}
</div>