<script lang="ts">
    import { onMount } from 'svelte';
    import { partSelections, type PartKey } from '$lib/stores/partSelections';
    import { get } from 'svelte/store';
    import Selector from '../../../lib/components/atoms/Selector.svelte'; // Importa el nuevo componente
  
    const PARTS: PartKey[] = ['HEAD', 'HEAD_TOP', 'TORSO', 'ARM_L', 'ARM_R', 'LEG_L', 'LEG_R', 'PANTS'];
  
    let options: Record<PartKey, string[]> = {
      HEAD: [],
      HEAD_TOP: [],
      TORSO: [],
      ARM_L: [],
      ARM_R: [],
      LEG_L: [],
      LEG_R: [],
      PANTS: []
    };
  
    async function fetchOptionsForPart(part: PartKey) {
      const res = await fetch(`/api/models/${part}`);
      if (res.ok) {
        const data = await res.json();
        options[part] = data;
      } else {
        console.error(`Failed to fetch options for ${part}:`, res.status);
        options[part] = [];
      }
    }
  
    onMount(async () => {
      await Promise.all(PARTS.map(fetchOptionsForPart));
    });
  
    function updatePart(part: PartKey, value: string) {
      partSelections.update((current) => ({ ...current, [part]: value }));
    }
  </script>
  
  <div class="bar">
    {#each PARTS as part}
      <Selector {part} options={options[part]} />
    {/each}
  </div>
  
  <style>
    

    .bar {
      display: flex;
      gap: 2rem; /* Ajusta el espacio entre los selectores */
      padding: 0.5rem;
      background-color: var(--color-accent-primary-light); /* Un fondo claro */
      align-items: center;
      font-size: 1.2rem;
      font-family: var(--font-heading);
      margin-top: 100px; /* Ajusta el margen superior */
      justify-content: center; /* Centra los selectores horizontalmente */
      border-radius: 1rem;
  width: auto;
    }


    @media (max-width: 1200px) {
  .bar {
    gap: 0.5rem;
    font-size: 0.9rem;
    margin-top: 120px;
    width: 80%;
    justify-content: flex-start; /* Alinea los elementos al inicio para el scroll */
    overflow-x: auto; /* Añade scroll horizontal si el contenido se desborda */
    -webkit-overflow-scrolling: touch; /* Para un scroll suave en iOS */
  }

  /* Ajusta el ancho del selector en pantallas pequeñas */
  :global(.rubber-hose-selector .custom-select) {
    width: 100px;
  }

  :global(.rubber-hose-selector .selector-label) {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }
}
  </style>