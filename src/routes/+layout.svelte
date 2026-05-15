<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import BackgroundPhysics from '$lib/components/BackgroundPhysics.svelte';
  import favicon from '$lib/assets/favicon.svg';
  import Lenis from 'lenis'; 
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  let { children } = $props();

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<BackgroundPhysics color="#ffffff" count={100} />
<BackgroundPhysics color="#ec4899" count={20} />
<main class="relative font-sans" style="z-index: 10;">
  {@render children()}
</main>

<style>
  
  html.lenis, html.lenis body {
    height: auto;
  }

  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis.lenis-smooth [data-lenis-prevent] {
    overscroll-behavior: contain;
  }

  .lenis.lenis-stopped {
    overflow: hidden;
  }

  .lenis.lenis-scrolling iframe {
    pointer-events: none;
  }
</style>