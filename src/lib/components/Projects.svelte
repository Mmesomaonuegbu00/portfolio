<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { projects } from "$lib/data/project";

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".project-header", {
      opacity: 0,
      filter: "blur(20px)",
      y: -30,
      duration: 1.4,
      ease: "expo.out",
    });

    const cards = gsap.utils.toArray(".project-card") as HTMLElement[];

    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: "top 95%" },
        scale: 0.82,
        opacity: 0,
        y: 40,
        duration: 1.1,
        delay: i * 0.12,
        ease: "elastic.out(1, 0.75)",
      });

      const scanLine = card.querySelector(".scan-line") as HTMLElement;
      const corners = card.querySelectorAll(".corner-accent");
      const sideTick = card.querySelector(".side-tick") as HTMLElement;
      const bottomTick = card.querySelector(".bottom-tick") as HTMLElement;

      gsap.to(scanLine, {
        top: "100%",
        duration: 2.8 + i * 0.3,
        ease: "none",
        repeat: -1,
        delay: i * 0.5,
      });

      gsap.to(corners, {
        boxShadow: "0 0 16px #ff44ff, inset 0 0 10px rgba(255, 68, 255, 0.5)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut",
        stagger: 0.3,
        delay: i * 0.4,
      });

      gsap.to(sideTick, {
        scaleY: 1.6,
        opacity: 0.5,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
        delay: i * 0.2,
      });

      gsap.to(bottomTick, {
        scaleX: 1.5,
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
        delay: i * 0.35,
      });

      card.addEventListener("mouseenter", () => {
        gsap.to(card.querySelector(".card-inner"), {
          boxShadow:
            "0 0 40px rgba(236, 72, 153, 0.35), 0 0 80px rgba(236, 72, 153, 0.15), inset 0 0 30px rgba(236, 72, 153, 0.06)",
          duration: 0.4,
        });
        gsap.to(corners, {
          width: 28,
          height: 28,
          borderColor: "#ff00ff",
          boxShadow: "0 0 20px #ff00ff, inset 0 0 12px rgba(255, 0, 255, 0.6)",
          duration: 0.3,
        });
        gsap.to(scanLine, {
          background:
            "linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.9), rgba(255, 100, 255, 0.9), transparent)",
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card.querySelector(".card-inner"), {
          boxShadow: "none",
          duration: 0.4,
        });
        gsap.to(corners, {
          width: 22,
          height: 22,
          borderColor: "#ec4899",
          boxShadow: "0 0 8px #ec4899, inset 0 0 8px rgba(236, 72, 153, 0.3)",
          duration: 0.3,
        });
        gsap.to(scanLine, {
          background:
            "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.6), rgba(255, 100, 255, 0.8), transparent)",
          duration: 0.3,
        });
      });

      card.addEventListener("mousedown", () => {
        gsap.to(card, { scale: 0.96, y: 8, duration: 0.1, ease: "power2.out" });
      });

      card.addEventListener("mouseup", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });
      });
    });

    gsap.to(".underline-bar", {
      width: 160,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  });
</script>

<section
  id="projects"
  class="px-4 max-w-7xl mx-auto bg-black/15 rounded-lg border border-white/15 mt-0"
>
  <div class="max-w-5xl pt-38 mx-auto">
    <div class="project-header flex flex-col mb-20 text-center">
      <h2
        class="text-2xl lg:text-4xl font-black uppercase tracking-tight text-white"
        style="font-family: 'Orbitron', sans-serif;"
      >
        Selected
        <span
          class="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-blue-950 to-blue-900"
        >
          Projects
        </span>
      </h2>
      <div
        class="underline-bar h-0.5 w-20 mx-auto mt-3"
        style="background: linear-gradient(90deg, #ec4899, #ff4fff); box-shadow: 0 0 12px #ec4899;"
      ></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
      {#each projects as project, i}
        <a
          href="/projects/{project.id}"
          class="project-card block outline-none"
          style="perspective: 1000px;"
        >
          <div
            class="card-inner relative overflow-hidden"
            style="
            background: rgba(255, 20, 147, 0.003); 
            backdrop-filter: blur(16px);
            min-height: 300px;
            display: flex;
            flex-direction: column;
            clip-path: polygon(18px 0%, 100% 0%, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0% 100%, 0% 18px);
            padding: 36px 28px;
            border: 1px solid rgba(236, 72, 153, 0.1);
          "
          >
            <div
              class="scan-line absolute left-0 right-0 h-px pointer-events-none z-10"
              style="
              top: 0;
              background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.6), rgba(255, 100, 255, 0.8), transparent);
            "
            ></div>

            <div
              class="glow-orb absolute rounded-full pointer-events-none"
              style="
              width: 120px; height: 120px;
              filter: blur(50px);
              top: -30px; right: -30px;
              background: rgba(236, 72, 153, 0.2);
            "
            ></div>

            <div
              class="corner-accent absolute"
              style="width:22px;height:22px;top:-1px;left:-1px;border:2px solid #ec4899;border-right:none;border-bottom:none;box-shadow:0 0 8px #ec4899;"
            ></div>
            <div
              class="corner-accent absolute"
              style="width:22px;height:22px;top:-1px;right:-1px;border:2px solid #ec4899;border-left:none;border-bottom:none;box-shadow:0 0 8px #ec4899;"
            ></div>
            <div
              class="corner-accent absolute"
              style="width:22px;height:22px;bottom:-1px;left:-1px;border:2px solid #ec4899;border-right:none;border-top:none;box-shadow:0 0 8px #ec4899;"
            ></div>
            <div
              class="corner-accent absolute"
              style="width:22px;height:22px;bottom:-1px;right:-1px;border:2px solid #ec4899;border-left:none;border-top:none;box-shadow:0 0 8px #ec4899;"
            ></div>

            <div
              class="side-tick absolute"
              style="right:-1px;top:50%;transform:translateY(-50%);width:4px;height:24px;background:linear-gradient(to bottom,#ec4899,#ff4fff);box-shadow:0 0 8px #ec4899;border-radius:2px;"
            ></div>
            <div
              class="bottom-tick absolute"
              style="bottom:-1px;left:50%;transform:translateX(-50%);height:4px;width:36px;background:linear-gradient(to right,#ec4899,#f472b6);box-shadow:0 0 8px #ec4899;border-radius:2px;"
            ></div>

            <div class="relative z-10 flex flex-col h-full">
              <div class="mb-6">
                <div
                  class="w-full h-48 overflow-hidden rounded-xl border border-pink-500/20 bg-pink-500/5"
                  style="
                    clip-path: polygon(10px 0%, 100% 0%, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0% 100%, 0% 10px); "
                >
                  <img
                   src={project.images[0]} 
                    alt={project.title}
                    class="w-full h-full object-cover"
                  />
                </div>

                <div class="flex items-center justify-between mt-5">
                  <h3
                    class="text-2xl font-bold text-white card-title"
                    style="font-family:'Orbitron',sans-serif;letter-spacing:0.05em;"
                  >
                    {project.title}
                  </h3>

                  <span
                    style="font-family:'Share Tech Mono',monospace;font-size:10px;color:rgba(236,72,153,0.4);letter-spacing:0.2em;"
                  >
                    0{i + 1} // TECH_STACK
                  </span>
                </div>
              </div>

              <p
                class="text-sm leading-relaxed flex-1 mb-6"
                style="color:rgba(249,168,212,0.5);"
              >
                {project.description}
              </p>

              <div class="flex items-center justify-between mt-auto">
                <div class="flex gap-1.5 flex-wrap">
                  {#each (project?.tech ?? []).slice(0, 3) as tag}
                    <span
                      style="
            font-size:9px;letter-spacing:0.18em;text-transform:uppercase;
            color:rgba(244,114,182,0.6);border:1px solid rgba(236,72,153,0.25);
            padding:3px 7px;background:rgba(236,72,153,0.07);
          "
                    >
                      {tag}
                    </span>
                  {/each}
                </div>

                <div class="flex items-center gap-2">
                  <span
                    class="btn-label text-pink-400"
                    style="font-size:10px;letter-spacing:0.18em;text-transform:uppercase;opacity:0;transform:translateX(10px);transition:opacity 0.3s,transform 0.3s;font-family:'Orbitron',sans-serif;"
                  >
                    View
                  </span>

                  <div
                    class="btn-circle flex items-center justify-center rounded-full"
                    style="width:36px;height:36px;border:1px solid rgba(236,72,153,0.5);"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="w-3.5 h-3.5"
                      fill="none"
                      stroke="white"
                      stroke-width="2.5"
                    >
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap");

  .project-card:hover .btn-label {
    opacity: 1 !important;
    transform: translateX(0) !important;
  }

  .project-card:hover .btn-circle {
    background: #ec4899;
    border-color: #ff4fff;
    box-shadow: 0 0 16px rgba(236, 72, 153, 0.6);
  }

  .project-card:hover .card-title {
    color: #f472b6;
  }
</style>
