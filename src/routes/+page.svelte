<script>
      import Carousel from '$lib/components/organisms/Carusel.svelte';

const phrases = [
  "Nostalgia Reimagined",
  "Diseño con Alma",
  "Coleccionables Únicos",
  "Rubber Hose Revival",
  "Ediciones Limitadas",
  "Para el Niño Interior",
  "¡Nunca Dejes de Jugar!",
  "Papaya te Inspira",
  "Descubre la Colección",
];
    function handleScroll() {
      // Aquí puedes añadir lógica para el carrusel inferior cuando el video termine
    }
  </script>
  
  <svelte:head>
    <title>PAPAYA - NEVER STOP PLAYING</title>
    <meta name="description" content="Juguetes coleccionables para adultos con estética Rubber Hose.">
  </svelte:head>
  
  <section class="hero">
    <div class="hero-content">
      <div class="video-placeholder">
        [Aquí irá el reproductor de video o la imagen de carga]
      </div>
    </div>
  </section>
  
  <section class="phrase-carousel">
    <Carousel items={phrases}  />
  </section>

  <svelte:window on:scroll={handleScroll} />
  
  <style>
    .hero {
      background-color: var(--color-grey-charcoal-light);
      text-align: center;
    }
  
    .hero-content {
      max-width: 800px;
      margin: 0;
    }
  
    .video-placeholder {
      background-color: #ccc; 
      width: 100%;
      height: 720px;
      width: 1280px;
    }

    .phrase-carousel {
    padding: 0.5 rem;
    text-align: center;
    background-color: var(--color-grey-charcoal-light);
    color: var(--color-white-bone);
  }
  </style>

