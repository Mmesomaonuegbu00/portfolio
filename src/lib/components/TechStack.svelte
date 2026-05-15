<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

  const stack = [
    { label: 'Next.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { label: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { label: 'Vue',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
    { label: 'Expo',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { label: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { label: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { label: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { label: 'Express',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { label: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { label: 'Tailwind',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
    { label: 'Bootstrap',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  ];

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.stack-title', {
      scrollTrigger: { trigger: '.stack-section', start: 'top 88%', toggleActions: 'play none none reverse' },
      opacity: 0,
      y: -20,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.from('.stack-line', {
      scrollTrigger: { trigger: '.stack-section', start: 'top 88%', toggleActions: 'play none none reverse' },
      scaleX: 0,
      transformOrigin: 'center',
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.2,
    });

    const items = gsap.utils.toArray('.stack-item') as HTMLElement[];

    gsap.from(items, {
      scrollTrigger: { trigger: '.stack-grid', start: 'top 90%', toggleActions: 'play none none reverse' },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.07,
      ease: 'power4.out',
    });

    items.forEach((item, i) => {
      gsap.to(item, {
        y: `random(-10, 10)`,
        x: `random(-6, 6)`,
        duration: 2.5 + i * 0.15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1,
      });

      const sheen = item.querySelector('.item-sheen') as HTMLElement;
      gsap.to(sheen, {
        opacity: 0.5,
        duration: 2 + i * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.15,
      });

      item.addEventListener('mouseenter', () => {
        gsap.killTweensOf(item);
        gsap.to(item, { scale: 1.15, y: -8, duration: 0.35, ease: 'power2.out' });
        gsap.to(item.querySelector('.item-glow'), { opacity: 1, duration: 0.3 });
        gsap.to(item.querySelector('.item-label'), { opacity: 1, y: 0, duration: 0.3 });
        gsap.to(item.querySelector('img'), { filter: 'grayscale(0%) brightness(1.1)', duration: 0.3 });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item, {
          scale: 1, y: `random(-10, 10)`, x: `random(-6, 6)`,
          duration: 0.4, ease: 'power2.inOut',
        });
        gsap.to(item.querySelector('.item-glow'), { opacity: 0, duration: 0.3 });
        gsap.to(item.querySelector('.item-label'), { opacity: 0, y: 4, duration: 0.25 });
        gsap.to(item.querySelector('img'), { filter: 'grayscale(100%) brightness(0.7)', duration: 0.3 });

        gsap.to(item, {
          y: `random(-10, 10)`,
          x: `random(-6, 6)`,
          duration: 2.5 + i * 0.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.4,
        });
      });
    });
  });
</script>

<section class="stack-section py-14 px-4">
  <div class="max-w-4xl mx-auto">

    <div class="flex items-center gap-4 mb-16">
      <div class="stack-line h-px flex-grow" style="background: linear-gradient(to right, transparent, rgba(236,72,153,0.4));"></div>
      <h2 class="stack-title text-xs font-mono tracking-[0.3em] uppercase" style="color: rgba(255,255,255,0.35);">technical stack</h2>
      <div class="stack-line h-px flex-grow" style="background: linear-gradient(to left, transparent, rgba(236,72,153,0.4));"></div>
    </div>

    <div class="stack-grid flex flex-wrap justify-center gap-10">
      {#each stack as tech, i}
        <div class="stack-item relative flex flex-col items-center cursor-default" style="will-change: transform;">

          <div class="item-glow" style="
            position: absolute; inset: -8px; border-radius: 50%; opacity: 0; pointer-events: none;
            background: radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%);
          "></div>

          <div class="item-sheen" style="
            position: absolute; top: 0; left: 50%; transform: translateX(-50%);
            width: 50%; height: 1px; opacity: 0; pointer-events: none;
            background: linear-gradient(90deg, transparent, rgba(220,210,150,0.4), transparent);
          "></div>

          <div style="
            width: 64px; height: 64px; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            background: rgba(255,255,255,0.03);
            border: 0.5px solid rgba(255,255,255,0.08);
            position: relative;
          ">
            <img
              src={tech.icon}
              alt={tech.label}
              style="width: 30px; height: 30px; object-fit: contain; filter: grayscale(100%) brightness(0.7); transition: none;"
            />
          </div>

          <span class="item-label text-[10px] font-mono tracking-widest uppercase mt-3" style="
            color: rgba(249,168,212,0.7); opacity: 0; transform: translateY(4px);
          ">
            {tech.label}
          </span>

        </div>
      {/each}
    </div>

  </div>
</section>