<script>
  import { onMount } from "svelte";
  import Lenis from "lenis"; // Use this
  import Hero from "$lib/components/Hero.svelte";
  import Navbar from "$lib/components/Navbar.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import TechStack from "$lib/components/TechStack.svelte";
  import Contact from "$lib/components/Contact.svelte";
  import About from "$lib/components/About.svelte";

  onMount(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
</script>

<Navbar />

<div class="relative overflow-hidden">
  <Hero />

  <div class="container mx-auto px-4 space-y-10">
    <div id="projects">
      <Projects />
    </div>

    <div id="tech">
      <TechStack />
    </div>

    <div id="about">
      <About />
    </div>

    <div id="contact">
      <Contact />
    </div>
  </div>
</div>
