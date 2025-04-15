<script lang="ts">
    export let items: string[] = [];
    export let slidesToShow: number = 3;
    export const slideGap: string = '2rem';
    export let separator: string = '|';
    export let scrollSpeed: number = 50; // Píxeles por segundo (aumenté la velocidad para probar)
    export let loop: boolean = true;
  
    let container: HTMLDivElement;
    let startTime: number | null = null;
    let animationFrameId: number | null = null;
    let contentWidth: number = 0;
    let viewportWidth: number = 0;
  
    $: numVisibleSlides = Math.min(slidesToShow, items.length);
    $: slideWidth = numVisibleSlides > 0 ? `calc((100% / ${numVisibleSlides}))` : '0';
  
    function updateDimensions() {
      if (container) {
        viewportWidth = container.offsetWidth;
        contentWidth = container.scrollWidth;
      }
    }
  
    function scrollContinuously(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const scrollAmount = (elapsed / 1000) * scrollSpeed;
  
      if (container) {
        container.scrollLeft = scrollAmount;
  
        if (loop && container.scrollLeft > contentWidth - viewportWidth && contentWidth > viewportWidth) {
          container.scrollLeft -= (contentWidth - viewportWidth);
          startTime = performance.now(); // Reiniciar startTime para un bucle suave
        }
      }
  
      animationFrameId = requestAnimationFrame(scrollContinuously);
    }
  
    onMount(() => {
      updateDimensions();
      if (items.length > slidesToShow) {
        animationFrameId = requestAnimationFrame(scrollContinuously);
      }
    });
  
    onDestroy(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });
  
    $: items.length, slidesToShow, updateDimensions();
  </script>
  
  <div class="carousel-wrapper">
    <div class="carousel-container" bind:this={container}>
      {#each items as item, index (index)}
        <div class="carousel-slide" style="width: {slideWidth}; margin-right: {index < items.length - 1 ? slideGap : '0'};">
          <span>{item}</span>
          {#if index < items.length - 1}
            <span class="separator">{separator}</span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
  
  <style>
    .carousel-wrapper {
      overflow: hidden;
      padding: 1rem 0;
    }
  
    .carousel-container {
      display: flex;
      align-items: center;
      font-family: var(--font-body);
      scroll-behavior: auto;
    }
  
    .carousel-slide {
      flex-shrink: 0;
      box-sizing: border-box;
      padding: 1rem;
      text-align: center;
      white-space: nowrap;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .carousel-slide span {
      font-size: 1.2rem;
    }
  
    .carousel-slide .separator {
      margin: 0 1rem;
      font-size: 1.2rem;
      color: var(--color-accent-primary);
    }
  </style>
  
  <script context="module">
    import { onMount, onDestroy } from 'svelte';
  </script>