<script>
    // Importaremos más componentes (moléculas, organismos) aquí
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
  
  <svelte:window on:scroll={handleScroll} />
  
  <style>
    .hero {
      background-color: var(--color-grey-charcoal-light);
      text-align: center;
    }
  
    .hero-content {
      max-width: 800px;
      margin: 0 auto;
    }
  
    .video-placeholder {
      background-color: #ccc; /* Placeholder visual */
      width: 100%;
      height: 650px;
    }
  </style>

