<script lang="ts">
  import { goto } from '$app/navigation';

  let isMenuOpen = false;

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'Colecciones', href: '/colecciones' },
    { text: '¿Qué es Papaya?', href: '/sobre-nosotros' },
    { text: 'Contacto', href: '/contacto' },
  ];

  function navigate(href: string) {
    goto(href);
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    console.log('Menu toggled, isMenuOpen:', isMenuOpen);  // Verificar si el estado cambia
  }

  $: {
    console.log('isMenuOpen:', isMenuOpen);  // Comprobamos el valor de isMenuOpen cada vez que cambie
  }
</script>

<header class="topbar">
  <div class="logo-container">
    <a href="/"><img src="/icons/logo320x320.png" alt="Logo Papaya"></a>
  </div>
  <div class="center-section">
    <img src="/icons/title.png" alt="Título Papaya">
  </div>
  <div class="hamburger-menu" on:click={toggleMenu}>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <!-- Menú en pantalla pequeña (hamburguesa) -->
  <div class="mobile-menu" class:active={isMenuOpen}>
    {#if isMenuOpen}
      <nav class="mobile-nav">
        <ul>
          {#each menuItems as item}
            <li>
              <a href={item.href}>{item.text}</a>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}
  </div>

  <!-- Menú en escritorio -->
  <div class="desktop-menu">
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
  </div>
</header>

<style>
  .topbar {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .logo-container {
    position: absolute;
    top: 10px;
    left: 20px;
    z-index: 10;
  }

  .logo-container img {
    max-height: 7rem;
    margin-top: 1rem;
  }

  .center-section {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }

  .center-section img {
    max-height: 10rem;
  }

  /* Menú de escritorio */
  .desktop-menu .topbar-content {
    background-color: var(--color-white-bone);
    padding: 0rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    height: 5rem;
  }

  .desktop-menu .left-nav ul, .desktop-menu .right-nav ul {
    list-style: none;
    padding: 0;
    margin: 0 15rem;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .desktop-menu .left-nav li, .desktop-menu .right-nav li {
    margin: 0 1rem;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .desktop-menu .left-nav a, .desktop-menu .right-nav a {
    color: var(--color-accent-primary);
    text-decoration: none;
    font-size: 1.4rem;
    font-family: var(--font-heading);
    display: flex;
    align-items: center;
    height: 100%;
  }

  .desktop-menu .left-nav a:hover, .desktop-menu .right-nav a:hover {
    color: var(--color-accent-primary-light)
  }

  /* Menú hamburguesa (móvil) */
  .hamburger-menu {
    display: none; /* Oculto en pantallas grandes */
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 30px;
    height: 25px;
    cursor: pointer;
  }

  .hamburger-menu div {
    width: 100%;
    height: 4px;
    background-color: #333;
    border-radius: 5px;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    left: -100%; /* Ocultamos el menú fuera de la pantalla */
    width: 250px;
    height: 100%;
    background-color: var(--color-white-bone);
    box-shadow: 3px 0 6px rgba(0, 0, 0, 0.1);
    transition: left 0.3s ease-in-out;
    padding-top: 60px; /* Aseguramos que el contenido no se superponga con el logo */
  }

  .mobile-menu.active {
    left: 0; /* Desplaza el menú desde la izquierda */
    z-index: 10;
  }

  .mobile-nav ul {
    list-style: none;
    padding: 0;
    color: var(--color-accent-primary);
  }

  .mobile-nav li {
    padding: 15px;
    text-align: left;
    color: var(--color-accent-primary);
    font-family: var(--font-heading);
  }

  .mobile-nav a {
    text-decoration: none;
    color: var(--color-accent-primary);
    font-size: 1.5rem;
  }

  /* En pantallas más grandes que 768px, ocultar el menú hamburguesa */
  @media (max-width: 768px) {
    .desktop-menu {
      display: none; /* Ocultar el menú de escritorio */
    }

    .hamburger-menu {
      display: flex; /* Mostrar solo en pantallas pequeñas */
      position: absolute;
      top: 15px;
      left: 15px;
      z-index: 20;
    }

    /* Ocultar el logo en pantallas pequeñas */
    .logo-container img {
      display: none; /* Ocultar el logo */
    }

    /* Reducir el tamaño del título */
    .center-section img {
      max-height: 6rem; /* Ajusta el tamaño del título */
    }
  }

  /* Transición del menú hamburguesa */
  .topbar-content.responsive .hamburger-menu div:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .topbar-content.responsive .hamburger-menu div:nth-child(2) {
    opacity: 0;
  }

  .topbar-content.responsive .hamburger-menu div:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
</style>
