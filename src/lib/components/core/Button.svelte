<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';

  // 1. Define exactly what variants are allowed
  type Variant = 'primary' | 'secondary' | 'outline';

  // 2. Define the props interface
  interface Props extends HTMLButtonAttributes {
    children: Snippet;
    variant?: Variant;
    onclick?: (e: MouseEvent) => void;
  }

  // 3. Destructure with types
  let { 
    children, 
    variant = 'primary', 
    type = 'button', // TypeScript now knows this is a valid button type
    onclick,
    ...rest 
  } = $props<Props>();

  const baseStyles = "relative px-8 py-3 rounded-full font-bold transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 overflow-hidden group";
  
  // 4. Record<Variant, string> tells TS exactly how to index this object
  const variants: Record<Variant, string> = {
    primary: "bg-gradient-to-r from-pink-600 to-orange-500 text-white shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40",
    secondary: "glass border-white/10 text-white hover:bg-white/10",
    outline: "border-2 border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-white"
  };
</script>

<button 
  {type} 
  {onclick}
  class="{baseStyles} {variants[variant]}"
  {...rest}
>
  <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
  
  <span class="relative z-10 flex items-center gap-2">
    {@render children()}
  </span>
</button>