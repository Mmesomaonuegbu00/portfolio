<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";
   

    let canvas: HTMLCanvasElement;
    let moonEl: HTMLElement;
    let moonGlow: HTMLElement;

    onMount(() => {
        const ctx = canvas.getContext("2d")!;

        const FONT = 11;
        let W: number, H: number;
        let drops: number[] = [];
        let stars: { x: number; y: number; r: number; a: number }[] = [];
        let frame: number;

        const chars = "01アイウエオカキクケコサシスセソタチツテト∑∂∆ΩΨΦ";

        const init = () => {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            drops = Array.from(
                { length: Math.floor(W / FONT) },
                () => Math.random() * (H / FONT),
            );
            stars = Array.from({ length: 100 }, () => ({
                x: Math.random() * W,
                y: Math.random() * H * 0.55,
                r: Math.random() * 0.8 + 0.2,
                a: Math.random() * 0.6 + 0.2,
            }));
        };

        const drawSky = () => {
            const g = ctx.createLinearGradient(0, 0, 0, H);
            g.addColorStop(0, "#03040a");
            g.addColorStop(0.4, "#05091a");
            g.addColorStop(0.72, "#070d20");
            g.addColorStop(1, "#091228");
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        };

        const drawStars = () => {
            stars.forEach((s) => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(220,210,255,${s.a})`;
                ctx.fill();
            });
        };

        const draw = () => {
            drawSky();
            drawStars();
            ctx.font = `${FONT}px monospace`;

            drops.forEach((y, i) => {
                const yPx = y * FONT;
                const t = Math.min(yPx / H, 1);

                const r = Math.round(180 + t * 70);
                const g = Math.round(190 - t * 100);
                const b = Math.round(255 - t * 200);
                const a = Math.random() > 0.985 ? 0.9 : 0.18 + t * 0.12;

                ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
                ctx.fillText(
                    chars[Math.floor(Math.random() * chars.length)],
                    i * FONT,
                    yPx,
                );

                if (yPx > H && Math.random() > 0.975) drops[i] = 0;
                drops[i] += 0.4 + Math.random() * 0.3;
            });

            frame = requestAnimationFrame(draw);
        };

        init();
        draw();

        gsap.set(moonEl, { opacity: 0, y: -10 });
        gsap.to(moonEl, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power2.out",
            delay: 0.5,
        });
        gsap.to(moonEl, {
            y: 6,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 2.5,
        });
        gsap.to(moonGlow, {
            opacity: 0.5,
            duration: 3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1,
        });

        window.addEventListener("resize", init);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", init);
        };
    });
</script>

<canvas
    bind:this={canvas}
    class="fixed inset-0 pointer-events-none"
    style="z-index: 0;"
></canvas>

<div
    bind:this={moonEl}
    class="fixed pointer-events-none"
    style="top: 18px; left: 50%; transform: translateX(-50%); z-index: 1; width: 100px; height: 100px;"
>
    <div
        bind:this={moonGlow}
        style="
        position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
        width: 160px; height: 160px; border-radius: 50%;
        background: radial-gradient(circle, rgba(200,185,120,0.09), transparent 70%);
        opacity: 0.8;
    "
    ></div>

    <div
        style="
        position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
        width: 1px; height: 80px;
        background: linear-gradient(to bottom, rgba(220,210,160,0.15), transparent);
    "
    ></div>

    <div
        style="
        position: absolute; bottom: 60px; left: 50%; transform: translateX(-50%);
        width: 28px; height: 28px; border-radius: 50%;
        background: radial-gradient(circle at 36% 36%, #f8f3e2, #ccc4a0);
        box-shadow: 0 0 12px 4px rgba(220,210,155,0.15), 0 0 35px 12px rgba(200,185,120,0.07);
    "
    >
        <div
            style="position:absolute;width:5px;height:5px;border-radius:50%;background:rgba(0,0,0,0.07);top:5px;left:7px"
        ></div>
        <div
            style="position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(0,0,0,0.06);top:14px;left:17px"
        ></div>
        <div
            style="position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(0,0,0,0.05);top:19px;left:6px"
        ></div>
    </div>
</div>
