<script>
    import Topbar from '$lib/components/organisms/Topbar.svelte';
    import Footer from '$lib/components/organisms/Footer.svelte';
    import '../app.css'; // Asegúrate de importar tus estilos globales
  </script>
  
  <div class="layout">
    <Topbar />
    <main class="content">
      <slot /> </main>
    <Footer />
  </div>
  
  <style>
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh; /* Asegura que el layout ocupe al menos la altura de la ventana */
    }
  
    .content {
      flex-grow: 1; /* Permite que el contenido principal crezca y empuje el footer hacia abajo */
    }
  </style>