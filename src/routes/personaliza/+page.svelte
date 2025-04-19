<script>
    import Customizer3D from './components/Customizer3D.svelte';
    import PartSelector from './components/PartSelector.svelte';
  </script>
  
  <div class="customizer-page">
    <PartSelector />
    <Customizer3D />
  </div>
  
  <style>
  .customizer-page {
    display: flex;
    flex-direction: column; /* Para apilar los elementos verticalmente */
    justify-content: center; /* Centra los elementos hijos verticalmente */
    align-items: center; /* Centra los elementos hijos horizontalmente (opcional) */
  }
  </style>