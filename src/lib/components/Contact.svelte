<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
  import { Send, MapPin, Mail } from "lucide-svelte";
  import emailjs from "@emailjs/browser";

  let toast = "";
  let showToast = false;
  let toastSuccess = true;
  let toastTimeout: ReturnType<typeof setTimeout>;

  let errors = { userName: "", email: "", message: "" };

  const triggerToast = (msg: string, success = true) => {
    clearTimeout(toastTimeout);
    toast = msg;
    toastSuccess = success;
    showToast = false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        showToast = true;

        const el = document.querySelector(".toast-el") as HTMLElement;
        if (el) {
          gsap.fromTo(
            el,
            { y: 20, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
          );
        }

        toastTimeout = setTimeout(() => {
          const el2 = document.querySelector(".toast-el") as HTMLElement;
          if (el2) {
            gsap.to(el2, {
              y: 12,
              opacity: 0,
              scale: 0.95,
              duration: 0.35,
              ease: "power2.in",
              onComplete: () => { showToast = false; }
            });
          } else {
            showToast = false;
          }
        }, 3000);
      });
    });
  };

  let userName = "";
  let email = "";
  let message = "";
  let loading = false;

  const validateEmail = (val: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validate = () => {
    let valid = true;
    errors = { userName: "", email: "", message: "" };

    if (!userName.trim()) {
      errors.userName = "Name is required";
      valid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Enter a valid email address";
      valid = false;
    }

    if (!message.trim()) {
      errors.message = "Message cannot be empty";
      valid = false;
    }

    if (!valid) {
      const firstError = document.querySelector(".field-error") as HTMLElement;
      if (firstError) {
        gsap.fromTo(
          firstError,
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }

      document.querySelectorAll(".field-wrap.has-error").forEach((el) => {
        gsap.fromTo(
          el,
          { x: 0 },
          { x: [-6, 6, -4, 4, 0], duration: 0.4, ease: "power2.out" }
        );
      });
    }

    return valid;
  };

  const animateSending = () => {
    const btn = document.querySelector(".send-btn") as HTMLButtonElement;
    const btnText = document.querySelector(".btn-text") as HTMLElement;
    const btnIcon = document.querySelector(".btn-icon") as HTMLElement;

    gsap.to(btnIcon, { x: 24, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(btnText, { opacity: 0, duration: 0.2, delay: 0.1 });
    gsap.to(btn, {
      background: "rgba(236,72,153,0.2)",
      borderColor: "rgba(236,72,153,0.5)",
      duration: 0.3,
      delay: 0.1
    });

    const dots = document.querySelector(".sending-dots") as HTMLElement;
    if (dots) {
      gsap.set(dots, { opacity: 1 });
      gsap.fromTo(
        dots,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, delay: 0.25 }
      );
    }
  };

  const resetSendBtn = () => {
    const btn = document.querySelector(".send-btn") as HTMLButtonElement;
    const btnText = document.querySelector(".btn-text") as HTMLElement;
    const btnIcon = document.querySelector(".btn-icon") as HTMLElement;
    const dots = document.querySelector(".sending-dots") as HTMLElement;

    gsap.to(dots, { opacity: 0, duration: 0.2 });
    gsap.to(btnIcon, { x: 0, opacity: 1, duration: 0.35, ease: "back.out(1.4)", delay: 0.1 });
    gsap.to(btnText, { opacity: 1, duration: 0.3, delay: 0.2 });
    gsap.to(btn, {
      background: "rgba(236,72,153,0.12)",
      borderColor: "rgba(236,72,153,0.3)",
      duration: 0.3,
      delay: 0.15
    });
  };

  const sendMessage = async () => {
    if (!validate()) return;

    try {
      loading = true;
      animateSending();

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: userName,
          from_email: email,
          message: message,
          to_name: "Mmesoma"
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      userName = "";
      email = "";
      message = "";
      errors = { userName: "", email: "", message: "" };

      triggerToast("Message sent successfully!", true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      triggerToast("Failed to send message. Please try again.", false);
    } finally {
      loading = false;
      resetSendBtn();
    }
  };

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".contact-header", {
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 88%",
        toggleActions: "play none none reverse"
      },
      x: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(".contact-line", {
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 88%",
        toggleActions: "play none none reverse"
      },
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power3.out",
      delay: 0.2
    });

    gsap.from(".contact-field", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      x: -30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: "power3.out"
    });

    gsap.from(".contact-sidebar", {
      scrollTrigger: {
        trigger: ".contact-form",
        start: "top 90%",
        toggleActions: "play none none reverse"
      },
      x: 30,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.2
    });

    const fields = document.querySelectorAll(
      ".field-wrap input, .field-wrap textarea"
    );

    fields.forEach((field) => {
      field.addEventListener("focus", () => {
        gsap.to(field.closest(".field-wrap"), {
          borderColor: "rgba(236,72,153,0.4)",
          duration: 0.3
        });
      });

      field.addEventListener("blur", () => {
        const wrap = field.closest(".field-wrap");
        if (!wrap?.classList.contains("has-error")) {
          gsap.to(wrap, {
            borderColor: "rgba(255,255,255,0.07)",
            duration: 0.3
          });
        }
      });
    });

    const btn = document.querySelector(".send-btn") as HTMLButtonElement;

    btn?.addEventListener("mouseenter", () => {
      if (!btn.disabled) gsap.to(btn, { scale: 1.02, duration: 0.25, ease: "power2.out" });
    });

    btn?.addEventListener("mouseleave", () =>
      gsap.to(btn, { scale: 1, duration: 0.25, ease: "power2.in" })
    );

    btn?.addEventListener("mousedown", () => {
      if (!btn.disabled) gsap.to(btn, { scale: 0.97, duration: 0.1 });
    });

    btn?.addEventListener("mouseup", () => {
      if (!btn.disabled) gsap.to(btn, { scale: 1.02, duration: 0.1 });
    });
  });
</script>

<section class="contact-section py-24 px-4">
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center gap-4 mb-16">
      <h2 class="contact-header text-4xl font-black uppercase tracking-tighter text-white">
        Get in <span class="italic" style="color: #ec4899;">Touch</span>
      </h2>
      <div class="contact-line h-px flex-grow" style="background: linear-gradient(to right, rgba(236,72,153,0.5), transparent);"></div>
    </div>

    <div class="contact-form grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 flex flex-col gap-4">

        <div class="contact-field flex flex-col gap-1">
          <div class="field-wrap rounded-xl {errors.userName ? 'has-error' : ''}"
            style="background: rgba(255,255,255,0.02); border: 0.5px solid {errors.userName ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.07)'}; transition: border-color 0.3s;">
            <input
              bind:value={userName}
              on:input={() => { if (errors.userName) errors.userName = ""; }}
              type="text"
              placeholder="Name"
              class="w-full bg-transparent px-5 py-4 outline-none text-white text-sm placeholder:text-white/25"
              style="border: none;"
            />
          </div>
          {#if errors.userName}
            <p class="field-error text-xs px-1" style="color: rgba(248,113,113,0.9);">{errors.userName}</p>
          {/if}
        </div>

        <div class="contact-field flex flex-col gap-1">
          <div class="field-wrap rounded-xl {errors.email ? 'has-error' : ''}"
            style="background: rgba(255,255,255,0.02); border: 0.5px solid {errors.email ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.07)'}; transition: border-color 0.3s;">
            <input
              bind:value={email}
              on:input={() => { if (errors.email) errors.email = ""; }}
              type="email"
              placeholder="Email"
              class="w-full bg-transparent px-5 py-4 outline-none text-white text-sm placeholder:text-white/25"
              style="border: none;"
            />
          </div>
          {#if errors.email}
            <p class="field-error text-xs px-1" style="color: rgba(248,113,113,0.9);">{errors.email}</p>
          {/if}
        </div>

        <div class="contact-field flex flex-col gap-1">
          <div class="field-wrap rounded-xl {errors.message ? 'has-error' : ''}"
            style="background: rgba(255,255,255,0.02); border: 0.5px solid {errors.message ? 'rgba(248,113,113,0.5)' : 'rgba(255,255,255,0.07)'}; transition: border-color 0.3s;">
            <textarea
              bind:value={message}
              on:input={() => { if (errors.message) errors.message = ""; }}
              placeholder="Message"
              rows="6"
              class="w-full bg-transparent px-5 py-4 outline-none text-white text-sm placeholder:text-white/25 resize-none"
              style="border: none;"
            ></textarea>
          </div>
          {#if errors.message}
            <p class="field-error text-xs px-1" style="color: rgba(248,113,113,0.9);">{errors.message}</p>
          {/if}
        </div>

        <button
          on:click={sendMessage}
          disabled={loading}
          class="contact-field send-btn w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 text-white relative overflow-hidden"
          style="background: rgba(236,72,153,0.12); border: 0.5px solid rgba(236,72,153,0.3); color: #f9a8d4; will-change: transform; cursor: {loading ? 'not-allowed' : 'pointer'};"
        >
          <span class="btn-icon flex items-center"><Send size={16} /></span>
          <span class="btn-text">Send Message</span>
          <span class="sending-dots absolute flex items-center gap-1 opacity-0" style="pointer-events: none;">
            <span class="dot" style="width:6px;height:6px;border-radius:50%;background:#f9a8d4;animation:pulse 1s ease-in-out infinite;"></span>
            <span class="dot" style="width:6px;height:6px;border-radius:50%;background:#f9a8d4;animation:pulse 1s ease-in-out 0.2s infinite;"></span>
            <span class="dot" style="width:6px;height:6px;border-radius:50%;background:#f9a8d4;animation:pulse 1s ease-in-out 0.4s infinite;"></span>
          </span>
        </button>
      </div>

      <div class="contact-sidebar flex flex-col gap-4">
        <div class="rounded-xl p-6 flex flex-col gap-6" style="background: rgba(255,255,255,0.02); border: 0.5px solid rgba(255,255,255,0.07);">
          <div class="flex items-start gap-4">
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style="background: rgba(236,72,153,0.08); border: 0.5px solid rgba(236,72,153,0.2);">
              <MapPin size={15} style="color: #f9a8d4;" />
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: rgba(255,255,255,0.4);">Location</p>
              <p class="text-sm text-white">Remote / Global</p>
            </div>
          </div>

          <div style="height: 0.5px; background: rgba(255,255,255,0.06);"></div>

          <div class="flex items-start gap-4">
            <div class="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style="background: rgba(236,72,153,0.08); border: 0.5px solid rgba(236,72,153,0.2);">
              <Mail size={15} style="color: #f9a8d4;" />
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-widest mb-1" style="color: rgba(255,255,255,0.4);">Email</p>
              <p class="text-sm text-white">dev@portfolio.com</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl p-6 flex flex-col gap-3" style="background: rgba(255,255,255,0.02); border: 0.5px solid rgba(255,255,255,0.07);">
          <p class="text-xs font-bold uppercase tracking-widest" style="color: rgba(255,255,255,0.3);">Availability</p>
          <div class="flex items-center gap-3">
            <div class="w-2 h-2 rounded-full" style="background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5);"></div>
            <p class="text-sm text-white">Open to new projects</p>
          </div>
          <p class="text-xs leading-relaxed" style="color: rgba(255,255,255,0.35);">
            Currently available for freelance work and full-time roles. Response within 24 hours.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{#if showToast}
  <div
    class="toast-el fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg text-sm font-medium text-white flex items-center gap-2"
    style="background: rgba(20,20,20,0.95); border: 1px solid {toastSuccess ? 'rgba(74,222,128,0.25)' : 'rgba(248,113,113,0.25)'}; backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0,0,0,0.4);"
  >
    <span style="width:7px;height:7px;border-radius:50%;background:{toastSuccess ? '#4ade80' : '#f87171'};flex-shrink:0;"></span>
    {toast}
  </div>
{/if}

<style>
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(0.85); }
    50% { opacity: 1; transform: scale(1); }
  }
</style>