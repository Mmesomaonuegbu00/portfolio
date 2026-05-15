<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";

    const { data } = $props();
    const { project } = data;

    let container = $state();
    let header = $state();
    let content = $state();

    onMount(() => {
        if (project) {
            const tl = gsap.timeline({
                defaults: { ease: "power4.out", duration: 1.2 },
            });

            tl.fromTo(header, { y: 100, opacity: 0 }, { y: 0, opacity: 1 })
                .fromTo(
                    ".info-block",
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, stagger: 0.1 },
                    "-=0.8",
                )
                .fromTo(
                    ".project-image",
                    { scale: 0.9, opacity: 0 },
                    { scale: 1, opacity: 1, stagger: 0.2 },
                    "-=1",
                );
        }
    });
</script>

{#if project}
    <main
        bind:this={container}
        class="min-h-screen bg-[#050505]/10 text-white p-6 md:p-16 font-sans selection:bg-pink-500/30"
    >
        <div class="max-w-7xl mx-auto py-20">
            <a
                href="/"
                class="fixed top-8 left-8 z-50 flex items-center gap-3 group"
            >
                <div
                    class="h-10 w-10 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center group-hover:border-pink-500/50 transition-all duration-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="group-hover:text-pink-500 group-hover:-translate-x-1 transition-all duration-500"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </div>
                <span
                    class="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 group-hover:text-pink-500 transition-colors duration-500"
                >
                    Back
                </span>
            </a>
            <header bind:this={header} class="mb-20">
                <div class="flex items-center gap-4 mb-4">
                    <span class="h-[1px] w-12 bg-pink-500"></span>
                    <p
                        class="text-pink-500 uppercase tracking-[0.3em] text-xs font-bold"
                    >
                        {project.role}
                    </p>
                </div>
                <h1
                    class="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-[0.85]"
                >
                    {project.title}
                </h1>
            </header>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div class="lg:col-span-7 space-y-12">
                    <div class="info-block">
                        <h2
                            class="text-pink-500 text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            Overview
                        </h2>
                        <p
                            class="text-xl md:text-2xl text-white/70 leading-relaxed font-light"
                        >
                            {project.description}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div class="info-block">
                            <h2
                                class="text-pink-500 text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                Key Features
                            </h2>
                            <ul class="space-y-4">
                                {#each project.keyFeatures as feature}
                                    <li
                                        class="flex items-start gap-3 text-white/60 text-sm"
                                    >
                                        <span
                                            class="mt-1.5 h-1 w-1 rounded-full bg-pink-500 shrink-0"
                                        ></span>
                                        {feature}
                                    </li>
                                {/each}
                            </ul>
                        </div>

                        <div class="info-block">
                            <h2
                                class="text-pink-500 text-xs font-bold uppercase tracking-widest mb-6"
                            >
                                Tech Stack
                            </h2>
                            <div class="flex flex-wrap gap-2">
                                {#each project.tech as t}
                                    <span
                                        class="px-4 py-2 border border-white/10 bg-white/5 rounded-full text-[10px] uppercase tracking-widest font-bold hover:border-pink-500/50 transition-colors"
                                    >
                                        {t}
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 space-y-8">
                    <div
                        class="info-block p-8 border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-2xl"
                    >
                        <h2
                            class="text-pink-500 text-xs font-bold uppercase tracking-widest mb-4"
                        >
                            Problem Solved
                        </h2>
                        <p class="text-white/60 text-sm leading-relaxed italic">
                            "{project.problemSolved}"
                        </p>
                    </div>

                    <div class="info-block">
                        <h2
                            class="text-pink-500 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            Challenges & Solutions
                        </h2>
                        <div class="space-y-6">
                            {#each project.challenges as challenge}
                                <div
                                    class="p-4 bg-pink-500/5 border-l-2 border-pink-500"
                                >
                                    <p class="text-white/80 text-sm">
                                        {challenge}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    class="project-image aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 group"
                >
                    <img
                        src={project.images[0]}
                        alt="Project Preview 1"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </div>
                <div
                    class="project-image aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 group md:mt-12"
                >
                    <img
                        src={project.images[1]}
                        alt="Project Preview 2"
                        class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                </div>
            </section>

            <footer class="mt-32 pb-20 text-center">
                <a
                    href={project.link}
                    class="group inline-flex flex-col items-center gap-4"
                >
                    <span
                        class="text-white/40 text-xs uppercase tracking-widest group-hover:text-pink-500 transition-colors"
                        >Launch Project</span
                    >
                    <div
                        class="h-16 w-16 rounded-full border border-white/20 flex items-center justify-center group-hover:border-pink-500 group-hover:scale-110 transition-all duration-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="group-hover:text-pink-500 transition-colors"
                            ><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg
                        >
                    </div>
                </a>
            </footer>
        </div>
    </main>
{:else}
    <div
        class="h-screen flex items-center justify-center bg-[#050505] text-white"
    >
        <div class="text-center space-y-4">
            <p
                class="text-6xl font-black uppercase tracking-tighter opacity-10"
            >
                404
            </p>
            <p
                class="text-xs font-bold uppercase tracking-[0.5em] text-pink-500"
            >
                Artifact Not Found
            </p>
        </div>
    </div>
{/if}

<style>
    :global(body) {
        background-color: #050505;
        margin: 0;
    }
</style>
