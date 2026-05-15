<script lang="ts">
    import { onMount } from "svelte";
    import resume from '$lib/assets/resume.pdf';
    import gsap from "gsap";
    import { Globe, Cpu, Layers, Flame, Code2, Smartphone, Server, Database, Wind, Download } from "lucide-svelte";

    let heroEl = $state<HTMLElement>();
    let skyCanvas = $state<HTMLCanvasElement>();
    let sceneEl = $state<SVGElement>();
    let iconsEl = $state<HTMLElement>();
    const W = 900,
        H = 340;

    const treePath = (
        x: number,
        trunkH: number,
        spread: number,
        lean: number,
    ) => {
        const base = H;
        const tx = x + lean;
        return `
    M${x},${base}
    L${x - 3},${base - trunkH * 0.28}
    L${tx - spread * 0.55},${base - trunkH * 0.42}
    L${tx - spread * 0.3},${base - trunkH * 0.44}
    L${tx - spread * 0.65},${base - trunkH * 0.62}
    L${tx - spread * 0.35},${base - trunkH * 0.63}
    L${tx - spread * 0.5},${base - trunkH * 0.8}
    L${tx - spread * 0.18},${base - trunkH * 0.81}
    L${tx},${base - trunkH}
    L${tx + spread * 0.18},${base - trunkH * 0.81}
    L${tx + spread * 0.5},${base - trunkH * 0.8}
    L${tx + spread * 0.35},${base - trunkH * 0.63}
    L${tx + spread * 0.65},${base - trunkH * 0.62}
    L${tx + spread * 0.3},${base - trunkH * 0.44}
    L${tx + spread * 0.55},${base - trunkH * 0.42}
    L${x + 3},${base - trunkH * 0.28}
    Z
  `;
    };

    const floatingIcons = [
        { icon: Globe,      label: 'Next.js',    x: '8%',    y: '15%', size: 18, delay: 0    },
        { icon: Code2,      label: 'React',      x: '88%',   y: '12%', size: 16, delay: 0.2  },
        { icon: Layers,     label: 'Vue',        x: '75%',   y: '35%', size: 20, delay: 0.4  },
        { icon: Smartphone, label: 'Expo',       x: '5%',    y: '55%', size: 16, delay: 0.6  },
        { icon: Cpu,        label: 'TypeScript', x: '92%',   y: '58%', size: 18, delay: 0.3  },
        { icon: Server,     label: 'Node.js',    x: '18%',   y: '78%', size: 16, delay: 0.5  },
        { icon: Flame,      label: 'Express',    x: '82%',   y: '78%', size: 18, delay: 0.1  },
        { icon: Database,   label: 'MongoDB',    x: '60%',   y: '18%', size: 16, delay: 0.7  },
        { icon: Wind,       label: 'Tailwind',   x: '40%',   y: '82%', size: 18, delay: 0.35 },
    ];
    const grassBlade = (x: number, y: number, h: number, lean: number) =>
        `M${x},${y} Q${x + lean * 0.5},${y - h * 0.5} ${x + lean},${y - h}`;

    onMount(() => {
        const ctx = skyCanvas!.getContext("2d")!;
const iconEls = iconsEl!.querySelectorAll('.float-icon');
        iconEls.forEach((el, i) => {
            const icon = floatingIcons[i];
            
            gsap.set(el, { 
                opacity: 0, 
                z: -800, 
                rotationX: 110,
                filter: "blur(12px)"
            });

            gsap.to(el, {
                opacity: 1,
                z: 0,
                rotationX: 0,
                filter: "blur(0px)",
                duration: 2.5,
                delay: 0.4 + icon.delay,
                ease: "expo.out"
            });

            gsap.to(el, {
                z: 120,
                rotationY: 25,
                rotationX: 15,
                duration: 4 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });

        gsap.from("[data-hero]", {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });

        const buttons = document.querySelectorAll('.btn-3d');
        buttons.forEach(btn => {
            gsap.to(btn, {
                rotationY: 15,
                rotationX: -10,
                z: 30,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random()
            });

            btn.addEventListener('mousemove', (e: any) => {
                const rect = btn.getBoundingClientRect();
                const dx = e.clientX - rect.left - rect.width / 2;
                const dy = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, {
                    rotationY: dx / 4,
                    rotationX: -dy / 4,
                    z: 60,
                    duration: 0.2,
                    overwrite: true
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    rotationY: 15,
                    rotationX: -10,
                    z: 30,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
        const resize = () => {
            skyCanvas!.width = heroEl!.offsetWidth;
            skyCanvas!.height = heroEl!.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const stars = Array.from({ length: 80 }, () => ({
            x: Math.random() * 2000,
            y: Math.random() * 800,
            r: Math.random() * 0.7 + 0.2,
            a: Math.random() * 0.5 + 0.1,
            twinkle: Math.random() * Math.PI * 2,
        }));

        let skyT = 0;
        const drawSky = () => {
            ctx.clearRect(0, 0, skyCanvas!.width, skyCanvas!.height);
            skyT += 0.008;
            stars.forEach((s) => {
                const flicker = Math.sin(skyT * 1.2 + s.twinkle) * 0.15;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(210,215,255,${Math.max(0, s.a + flicker)})`;
                ctx.fill();
            });
            requestAnimationFrame(drawSky);
        };
        drawSky();

        const trees = [
            {
                x: 120,
                trunkH: 150,
                spread: 50,
                color: "#0d2211",
                lean: 2,
                windAmp: 5,
                phase: 0.2,
            },
            {
                x: 760,
                trunkH: 160,
                spread: 55,
                color: "#0d2211",
                lean: 0,
                windAmp: 6,
                phase: 0,
            },
            {
                x: 810,
                trunkH: 200,
                spread: 70,
                color: "#0c2010",
                lean: 5,
                windAmp: 8,
                phase: 0.5,
            },
            {
                x: 840,
                trunkH: 130,
                spread: 45,
                color: "#0b1e0c",
                lean: -3,
                windAmp: 5,
                phase: 1,
            },
        ];

        const grasses = Array.from({ length: 280 }, () => ({
            x: Math.random() * W, // Full width coverage
            y: H - 2 - Math.random() * 20,
            h: 15 + Math.random() * 25,
            lean: (Math.random() - 0.5) * 15,
            phase: Math.random() * Math.PI * 2,
            amp: 4 + Math.random() * 7,
            color: `rgba(${15 + Math.floor(Math.random() * 10)},${40 + Math.floor(Math.random() * 20)},${15 + Math.floor(Math.random() * 10)},${(0.3 + Math.random() * 0.3).toFixed(2)})`,
        }));

        const ns = "http://www.w3.org/2000/svg";
        let frame = 0;

        const mk = (tag: string, attrs: Record<string, string>) => {
            const el = document.createElementNS(ns, tag);
            Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
            return el;
        };

        const animateScene = () => {
            frame += 0.018;
            sceneEl!.innerHTML = "";

            // Ground
            sceneEl!.appendChild(
                mk("rect", {
                    x: "0",
                    y: String(H - 12),
                    width: String(W),
                    height: "12",
                    fill: "#050a06",
                }),
            );

            grasses.forEach((g) => {
                const sway = Math.sin(frame * 1.1 + g.phase) * g.amp;
                sceneEl!.appendChild(
                    mk("path", {
                        d: grassBlade(g.x, g.y, g.h, g.lean + sway),
                        fill: "none",
                        stroke: g.color,
                        "stroke-width": "1",
                        "stroke-linecap": "round",
                    }),
                );
            });

            // Using your provided Tree Animation logic exactly
            trees.forEach((tree) => {
                const sway = Math.sin(frame * 0.7 + tree.phase) * tree.windAmp;
                sceneEl!.appendChild(
                    mk("path", {
                        d: treePath(
                            tree.x,
                            tree.trunkH,
                            tree.spread,
                            tree.lean + sway,
                        ),
                        fill: tree.color,
                    }),
                );
                sceneEl!.appendChild(
                    mk("rect", {
                        x: String(tree.x - 2),
                        y: String(H - tree.trunkH * 0.25),
                        width: "4",
                        height: String(tree.trunkH * 0.25),
                        fill: "#050c06",
                    }),
                );
            });

            requestAnimationFrame(animateScene);
        };
        animateScene();

        // Entrance Animation
        gsap.set("[data-hero]", { y: 20, opacity: 0 });
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.to('[data-hero="tag"]', { opacity: 1, y: 0, duration: 0.8 }, 0.5)
            .to('[data-hero="name"]', { opacity: 1, y: 0, duration: 1 }, 0.7)
            .to('[data-hero="role"]', { opacity: 1, y: 0, duration: 0.8 }, 0.9)
            .to('[data-hero="bio"]', { opacity: 1, y: 0, duration: 0.8 }, 1.1)
            .to(
                '[data-hero="actions"]',
                { opacity: 1, y: 0, duration: 0.8 },
                1.3,
            );

        return () => window.removeEventListener("resize", resize);
    });
</script>

<section
    bind:this={heroEl}
    class="relative max-w-7xl mx-auto min-h-screen overflow-hidden flex items-center bg-transparent px-[7%] font-sans"
>
    <canvas
        bind:this={skyCanvas}
        class="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        style="z-index:0"
    ></canvas>
<div bind:this={iconsEl} class="absolute inset-0 pointer-events-none" style="transform-style: preserve-3d; z-index: 1;">
        {#each floatingIcons as item}
            <div class="float-icon absolute" style="left: {item.x}; top: {item.y}; transform-style: preserve-3d;">
                <div class="flex items-center justify-center rounded-full bg-pink-500/5 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]" 
                     style="width: {item.size + 30}px; height: {item.size + 30}px; transform-style: preserve-3d;">
                    <svelte:component this={item.icon} size={item.size} style="color: rgba(236,72,153,0.5); transform: translateZ(20px);" />
                </div>
            </div>
        {/each}
    </div>
    <svg
        bind:this={sceneEl}
        class="absolute bottom-0 left-0 w-full pointer-events-none"
        style="height: 340px; z-index: 1;"
        viewBox="0 0 900 340"
        preserveAspectRatio="xMidYMax slice"
    ></svg>

    <div class="relative z-10 mx-auto">
        <p
            data-hero="tag"
            class="text-xs tracking-[0.3em] text-pink-500 uppercase mb-5 font-medium"
        >
            Designer & Developer
        </p>

        <h6 class="mb-3 text-xl text-gray-400">Hello, I'm Mmesoma Willison Favour</h6>
        <h1
            data-hero="name"
            class="lg:text-6xl md:text-5xl text-3xl font-bold tracking-tighter text-white leading-[0.9] mb-4 uppercase"
        >
            Softwar Developer
        </h1>

        <p
            data-hero="role"
            class="text-x text-white/40 mb-3 lowercase tracking-tight"
        >
            crafting digital experiences
        </p>

        <p
            data-hero="bio"
            class="text-[13.5px] leading-relaxed text-white/50 max-w-sm mb-10 font-light"
        >
            I build full web applications by combining strong backend systems with smooth, interactive frontends. I focus on making sites fast using static generation and reliable with progressive enhancement, so they work well for everyone. I also optimize databases and design clean, animated interfaces to create scalable and visually engaging user experiences.
        </p>

       <div data-hero class="flex flex-wrap gap-6" style="transform-style: preserve-3d;">
            <a href='#projects' class="btn-3d group relative px-10 py-4 bg-pink-500 text-white rounded-full text-[11px] uppercase tracking-[0.2em] font-black no-underline overflow-hidden shadow-[0_20px_40px_-10px_rgba(236,72,153,0.3)]">
                <span class="relative z-10" style="display: block; transform: translateZ(40px);">Explore Work</span>
            </a>
            
            <a href={resume} download class="btn-3d group flex items-center gap-3 px-10 py-4 border border-white/10 bg-white/5 text-white/70 rounded-full text-[11px] uppercase tracking-[0.2em] font-black no-underline">
                <Download size={14} style="transform: translateZ(30px);" />
                <span style="transform: translateZ(30px);">Resume</span>
            </a>
        </div>
        
        <div data-hero class="flex gap-8 mt-16">
            <a href="https://www.linkedin.com/in/mmesoma-onuegbu-38a176220" class="text-[20px] uppercase tracking-widest text-white/30 hover:text-pink-500 transition-colors no-underline">LinkedIn</a>
            <a href="https://github.com/Mmesomaonuegbu00" class="text-[20px] uppercase tracking-widest text-white/30 hover:text-pink-500 transition-colors no-underline">GitHub</a>
            <a href="https://x.com/mmesomaOnuegbu5" class="text-[20px] uppercase tracking-widest text-white/30 hover:text-pink-500 transition-colors no-underline">Twitter</a>
        </div>
    </div>
</section>
<style>
    .btn-3d {
        transform-style: preserve-3d;
        will-change: transform;
    }
    
    :global(body) {
        background: #050505;
        overflow-x: hidden;
    }
</style>