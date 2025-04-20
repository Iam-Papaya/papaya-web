<script lang="ts">
  import Carousel from '$lib/components/organisms/Carusel.svelte';
  import Button from '$lib/components/atoms/Button.svelte';
  import { goto } from '$app/navigation';

  const phrases = [
    "Nostalgia Reimagined",
    "Coleccionables Únicos",
    "Ediciones Limitadas",
    "¡Nunca Dejes de Jugar!",
    "Descubre la Colección",
  ];

  let videoRef: HTMLVideoElement | null = null;
  let videoEnded = false;
  let forceUpdate = 0;

  function handleVideoEnded() {
    videoEnded = true; // Establece que el video ha terminado
  }

  function restartVideo() {
    if (videoRef) {
      console.log('Función restartVideo llamada');
      videoRef.pause();
      videoRef.currentTime = 0;
      videoRef.play();
      forceUpdate += 1; // Actualiza la variable para forzar la re-renderización
      console.log('currentTime después de play:', videoRef.currentTime);
      console.log('paused después de play:', videoRef.paused);
    }
    videoEnded = false;
  }
  function handlePapayoClick() {
    goto('/papayo');
  }

  function handleScroll() {
    // Aquí puedes añadir lógica para el carrusel inferior cuando el video termine
  }
</script>

<svelte:head>
  <title>PAPAYA - NEVER STOP PLAYING</title>
  <meta name="description" content="Juguetes coleccionables para millenials.">
</svelte:head>
{#key forceUpdate}
<section class="hero">
  <div class="hero-content">
    <video
      bind:this={videoRef}
      src="/videos/herovideo.mkv"
      autoplay
      muted
      playsinline
      on:ended={handleVideoEnded}
      class="hero-video desktop-video"
    ></video>
    <video
      bind:this={videoRef}
      src="/videos/herovideoV.mp4"
      autoplay
      muted
      playsinline
      on:ended={handleVideoEnded}
      class="hero-video mobile-video"
    ></video>
  </div>
</section>
{/key}
<section class="phrase-carousel">
  <Carousel items={phrases} />
</section>

{#if videoEnded}
  <div class="video-overlay">
    <Button onClick={handlePapayoClick} >Descubre a Papayo</Button>
    <Button onClick={restartVideo} color="yellow">Reiniciar Video</Button>
  </div>
{/if}

<svelte:window on:scroll={handleScroll} />

<style>
.hero {
  background-color: var(--color-white-bone);
  text-align: center;
  display: flex; /* Activamos flexbox */
  justify-content: center; /* Centra el contenido horizontalmente */
  align-items: center; /* Centra el contenido verticalmente */
}

.hero-content {
  max-width: 1280px; /* Limita el tamaño máximo */
  margin: 0;
}

  .hero-video {
    width: 100%;
    height: 100%;
    position: center;
  }

  video {
  width: 100%; /* El video ocupa el 100% del contenedor */
  height: auto; /* Mantiene la proporción del video */
}

section {
  margin: 0;
  padding: 0;
}
  .phrase-carousel {
    margin: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .video-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 6px;
  }
  .desktop-video {
    display: block;
  }

  .mobile-video {
    display: none;
  }

  @media (max-width: 1199px) {
    .desktop-video {
      display: none;
    }

    .mobile-video {
      display: block;
    }
  }
</style>
