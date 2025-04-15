<script lang="ts">
    import { goto } from '$app/navigation';
  
    const menuItems = [
      { text: 'Home', href: '/' },
      { text: 'Colecciones', href: '/colecciones' },
      { text: '¿Qué es Papaya?', href: '/sobre-nosotros' },
      { text: 'Contacto', href: '/contacto' },
    ];
  
    function navigate(href: string) {
      goto(href);
    }
  </script>
  
  <header class="topbar">
    <div class="logo-container">
      <a href="/"><img src="/icons/logo320x320.png" alt="Logo Papaya"></a>
    </div>
    <div class="center-section">
      <img src="/icons/title.png" alt="Título Papaya">
    </div>
    <div class="topbar-content">
      <nav class="left-nav">
        <ul>
          {#each menuItems.slice(0, 2) as item}
            <li>
              <a href={item.href}>{item.text}</a>
            </li>
          {/each}
        </ul>
      </nav>
      <nav class="right-nav">
        <ul>
          {#each menuItems.slice(2) as item}
            <li>
              <a href={item.href}>{item.text}</a>
            </li>
          {/each}
        </ul>
      </nav>
    </div>
  </header>
  
  <style>
    .topbar {
      position: relative; /* Establecer como contenedor relativo */
      display: flex;
      flex-direction: column; /* Apilar verticalmente */
      width: 100%;
      align-items: center; /* Centrar horizontalmente el contenido */
    }
  
    .logo-container {
      position: absolute; /* Posicionar absolutamente */
      top: 10px; /* Ajustar la posición vertical */
      left: 20px; /* Ajustar la posición horizontal */
      z-index: 10; /* Asegurar que esté por encima de la franja */
    }
  
    .logo-container img {
      max-height: 70px; 
      margin-top: 1rem; /* Empujar la franja hacia abajo */
    }
  
    .center-section {
      position: absolute; /* Posicionar absolutamente */
      top: 15px; /* Ajustar la posición vertical */
      left: 50%; /* Centrar horizontalmente */
      transform: translateX(-50%); /* Ajuste fino para el centrado */
      z-index: 10; /* Asegurar que esté por encima de la franja */
    }
  
    .center-section img {
      max-height: 100px; /* Ajusta el tamaño del título */
    }
  
    .topbar-content {
      background-color: var(--color-accent-primary);
      padding: 0rem;
      display: flex;
      justify-content: space-between; /* Espaciar los menús */
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      height: 4rem; /* Altura de la franja naranja */
    }
  
    .left-nav ul, .right-nav ul {
      list-style: none;
      padding: 0;
      margin: 6em;
      margin-left: 10rem;
      display: flex;
      align-items: center;
      height: 100%;
    }
  
    .left-nav li, .right-nav li {
      margin: 0 1rem;
      display: flex;
      align-items: center;
      height: 100%;
    }
  
    .left-nav a, .right-nav a {
      color: var(--color-white-bone);
      text-decoration: none;
      font-size: 1.2rem;
      font-family: var(--font-heading);
      display: flex;
      align-items: center;
      height: 100%;
    }
  
    .left-nav a:hover, .right-nav a:hover {
      text-decoration: underline;
    }
  </style>