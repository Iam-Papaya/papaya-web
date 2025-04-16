<script lang="ts">
    import Icon from '@iconify/svelte';
  </script>
  
  <footer class="footer">
    <div class="social-links">
      <a href="https://www.youtube.com/@iam_papaya"><Icon icon="cib:youtube" /></a>
      <a href="#"><Icon icon="cib:instagram" /></a>
      <a href="#"><Icon icon="cib:etsy" /></a>
      <a href="https://x.com/_iampapaya"><Icon icon="cib:twitter" /></a>
      <a href="#"><Icon icon="cib:mail" /></a>
    </div>
    <p class="copyright">
      &copy; {new Date().getFullYear()} PAPAYA. Todos los derechos reservados.
    </p>
  </footer>
  
  <style>
    .footer {
      background-color: var(--color-grey-charcoal-dark);
      color: var(--color-white-bone);
      padding: 1rem;
      text-align: center;
      margin: 0;
    }
  
    .social-links a {
      color: var(--color-white-bone);
      font-size: 1rem; /* Esto afectará al tamaño del contenedor del icono */
      margin: 0 0.5rem;
      text-decoration: none;
      display: inline-flex; /* Para centrar el icono verticalmente dentro del enlace */
      align-items: center;
      justify-content: center;
    }
  
    .social-links a:hover {
      opacity: 0.8;
    }
  
    .copyright {
      font-size: 0.8rem;
      margin-top: 0.5rem;
      font-family: var(--font-body);
    }
  </style>