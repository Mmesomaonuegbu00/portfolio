<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { Briefcase, User, Mail, Menu, X, WorkflowIcon } from 'lucide-svelte';

  let navbar = $state<HTMLElement>();
  let scrollLine = $state<HTMLElement>();
  let indicator = $state<HTMLElement>();
  let logo = $state<HTMLAnchorElement>();
  let linkItems = $state<HTMLElement[]>([]);
  let cta = $state<HTMLAnchorElement>();
  let menuOpen = $state(false);

  const links = [
    { label: 'work', href: '#projects', icon: Briefcase },
    { label: 'about', href: '#about', icon: User },
    { label: 'stack', href: '#tech', icon: WorkflowIcon },
  ];

  const scrollToSection = (e: MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
      menuOpen = false;
    }
  };

  onMount(() => {
    if (!navbar) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(navbar, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
      .to(logo!, { opacity: 1, x: 0, duration: 0.6 }, "-=0.4")
      .to(linkItems, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
      .to(cta!, { opacity: 1, x: 0, duration: 0.5 }, '-=0.3')
      .to(indicator!, { width: '100%', duration: 0.9, ease: 'power2.inOut' }, '-=0.1');

    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (y / max) * 100 : 0;

      gsap.to(scrollLine!, { width: pct + '%', duration: 0.1, ease: 'none' });
      
      gsap.to(navbar!, {
        backgroundColor: y > 40 ? 'rgba(10, 10, 10, 0.8)' : 'rgba(20, 20, 20, 0.4)',
        y: y > lastY && y > 100 ? -20 : 0,
        scale: y > 40 ? 0.98 : 1,
        duration: 0.4,
      });

      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  const toggleMenu = () => menuOpen = !menuOpen;
</script>

<div class="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
  <nav
    bind:this={navbar}
    class="pointer-events-auto w-full max-w-5xl h-14 md:h-16 px-4 md:px-8 flex items-center justify-between 
           bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full 
           transition-all duration-500 opacity-0 translate-y-4 shadow-2xl shadow-black/50"
  >
    <div bind:this={scrollLine} class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] w-0 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>
    <div bind:this={indicator} class="absolute bottom-0 left-0 h-[1px] w-0 bg-white/10 rounded-full"></div>

    <a bind:this={logo} href="/" class="hidden sm:block text-lg font-bold font-mono  tracking-tighter opacity-0 -translate-x-4 no-underline text-white whitespace-nowrap">
      Mm<span class="text-pink-500">.</span>
    </a>

    <ul class="flex items-center gap-2 md:gap-8 list-none m-0 p-0">
      {#each links as link, i}
        <li bind:this={linkItems[i]} class="opacity-0 translate-y-2">
          <a
            href={link.href}
            onclick={(e) => scrollToSection(e, link.href)}
            class="group flex items-center gap-2 px-3 py-2 rounded-full transition-colors no-underline"
          >
            <svelte:component this={link.icon} size={18} class="text-white/50 group-hover:text-pink-500 transition-colors" />
            <span class="hidden md:block text-[11px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
              {link.label}
            </span>
          </a>
        </li>
      {/each}
    </ul>

    <div class="flex items-center gap-2">
      <a
        bind:this={cta}
        href="#contact"
        onclick={(e) => scrollToSection(e, '#contact')}
        class="flex items-center justify-center w-10 h-10 md:w-auto md:px-5 md:py-2 rounded-full 
               bg-pink-500 text-white md:text-pink-400 md:bg-pink-500/5 border border-pink-500/30 
               hover:bg-pink-500/20 transition-all opacity-0 translate-x-4 no-underline"
      >
        <Mail size={18} class="md:hidden" />
        <span class="hidden md:block text-[11px] font-black uppercase tracking-widest">Connect</span>
      </a>

      <button class="md:hidden flex items-center justify-center w-10 h-10 text-white/60 hover:text-white transition-colors" onclick={toggleMenu}>
        {#if menuOpen}<X size={24} />{:else}<Menu size={24} />{/if}
      </button>
    </div>
  </nav>
</div>

{#if menuOpen}
  <div class="fixed top-24 left-4 right-4 z-40 p-6 bg-black/90 border border-white/10 backdrop-blur-3xl rounded-[2rem] flex flex-col gap-4 md:hidden shadow-2xl">
    {#each links as link}
      <a
        href={link.href}
        class="flex items-center gap-4 text-lg font-bold uppercase tracking-tighter text-white/70 hover:text-pink-500 no-underline p-2"
        onclick={(e) => scrollToSection(e, link.href)}
      >
        <svelte:component this={link.icon} size={20} />
        {link.label}
      </a>
    {/each}
  </div>
{/if}