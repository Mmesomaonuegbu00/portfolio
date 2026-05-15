<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import profileImg from "$lib/assets/f.png";
    import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
    import { ArrowRight } from "lucide-svelte";

    gsap.registerPlugin(ScrollTrigger);

    let container = $state<HTMLElement>();
    let photoFrame = $state<HTMLElement>();

    onMount(() => {
        // Entrance Animation on Scroll
        gsap.from(".about-content > *", {
            scrollTrigger: {
                trigger: container,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
        });

        // --- AUTOMATIC 3D SWAY (No Hover Needed) ---
        if (photoFrame) {
            gsap.to(photoFrame, {
                rotationY: -15,
                rotationX: 10,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                transformPerspective: 1000,
            });

            // Added a secondary subtle float for depth
            gsap.to(photoFrame, {
                y: -15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }
    });
</script>

<section
    bind:this={container}
    class="relative w-[90%] lg:w-[65%] mx-auto py-32 flex flex-col xl:flex-row justify-between gap-16 items-center overflow-visible"
>
    <div class="about-content flex flex-col gap-6 order-2 xl:order-1">
        <div>
            <h2
                class="text-3xl font-bold tracking-tighter text-white uppercase"
            >
                About Me
            </h2>
            <p class="text-xs tracking-[0.3em] text-pink-500 uppercase mt-2">
                The Digital Architect
            </p>
        </div>

        <p
            class="text-white/50 text-[14px] leading-relaxed max-w-[550px] font-light"
        >
            I build and maintain full-stack web applications that focus on
            performance, usability, and long-term scalability. On the backend, I
            design APIs, manage data flow, and structure systems in a way that
            keeps things stable as the application grows. On the frontend, I
            create clean and responsive interfaces that feel smooth to use
            across different devices and screen sizes.

            <br /><br />

            My work is centered around making applications fast, reliable, and
            easy to interact with. That includes optimizing data fetching,
            reducing unnecessary load on the client, and ensuring the UI
            responds quickly to user actions. I also pay attention to real user
            experience details like loading states, transitions, and
            accessibility.

            <br /><br />

            Over time, I’ve worked on projects ranging from dashboards and
            portfolio systems to real-time interfaces that require constant data
            updates. Each project teaches me how to balance structure with
            flexibility so the product remains maintainable without losing
            performance or design quality.

            <br /><br />

            Ultimately, I aim to build software that feels simple to use but is
            thoughtfully engineered under the hood.
        </p>

        <a
            href="/contact"
            class="group px-6 py-3 bg-white/5 border border-white/10 text-white rounded-full text-[10px] uppercase tracking-widest font-black flex items-center gap-3 w-fit hover:bg-pink-500 hover:border-pink-500 transition-all duration-500 no-underline"
        >
            Explore Philosophy
            <ArrowRight
                size={14}
                class="group-hover:translate-x-1 transition-transform"
            />
        </a>
    </div>

    <div class="relative order-1 xl:order-2 perspective-1000">
        <div
            bind:this={photoFrame}
            class="relative w-[260px] h-[340px] rounded-[4px] border border-white/10 bg-white/5 overflow-hidden shadow-2xl"
            style="transform-style: preserve-3d;"
        >
            <img
                src={profileImg}
                alt="Favour Willison"
                class="w-full h-full object-cover grayscale opacity-80"
            />

            <div
                class="absolute bottom-6 -left-8 bg-pink-500 text-white text-[10px] font-black uppercase tracking-widest py-2 px-6 shadow-lg"
                style="transform: translateZ(50px);"
            >
                Favour Willison
            </div>
        </div>

        <div
            class="absolute inset-0 bg-pink-500/5 blur-[100px] -z-10 rounded-full"
        ></div>
    </div>
</section>

<style>
    .perspective-1000 {
        perspective: 1500px;
    }

    :global(body) {
        background: #050505;
    }
</style>
