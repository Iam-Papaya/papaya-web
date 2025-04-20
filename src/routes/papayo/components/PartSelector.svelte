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

    let activePart: PartKey = PARTS[0]; // Para la vista mobile
  
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
    
    function setActivePart(part: PartKey) {
    activePart = part;
  }
  
    function updatePart(part: PartKey, value: string) {
      partSelections.update((current) => ({ ...current, [part]: value }));
    }
  </script>
  
  <div class="selector-container">
    <div class="bar">
      {#each PARTS as part}
        <Selector {part} options={options[part]} />
      {/each}
    </div>
  
    <div class="mobile-tabs">
      <div class="tab-bar">
        {#each PARTS as part}
          <button
            class:active={activePart === part}
            on:click={() => setActivePart(part)}
          >
            {part.replace('_', ' ')}
          </button>
        {/each}
      </div>
      {#if activePart}
        <div class="selector-container-mobile">
          <Selector part={activePart} options={options[activePart]} hideLabel={true} />
        </div>
      {/if}
    </div>
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

    .mobile-tabs {
    display: none; /* Oculto por defecto en desktop */
  }


  @media (max-width: 1200px) {
    .selector-container {
      margin-top: 120px;
    }

    .bar {
      display: none; /* Ocultar en mobile */
    }

    .mobile-tabs {
      display: flex; /* Mostrar en mobile */
      flex-direction: column;
      width: 85%; /* Ocupa el 95% del ancho de la pantalla */
      margin-left: auto; /* Centra horizontalmente */
      margin-right: auto; /* Centra horizontalmente */
    }

    .mobile-tabs .tab-bar {
      display: flex;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      background-color: var(--color-accent-primary-light);
      border-radius: 0.5rem;
      padding: 0.25rem;
      gap: 0.5rem;
      width: 100%; /* El tab-bar ocupa el ancho del contenedor mobile-tabs */
    }

    .mobile-tabs .tab-bar button {
      flex: 1 0 auto; /* Los botones se expanden para llenar el espacio disponible */
      padding: 0.75rem 0.5rem; /* Reduzco el padding horizontal para más botones visibles */
      border: none;
      background: none;
      font-size: 0.9rem; /* Reduzco un poco la fuente para más botones visibles */
      font-family: var(--font-heading);
      cursor: pointer;
      color: var(--color-text-primary);
      white-space: nowrap;
      border-radius: 0.5rem; /* Reduzco un poco el radio del borde */
      transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
      text-align: center; /* Centra el texto dentro del botón */
    }

    .mobile-tabs .tab-bar button.active {
      background-color: var(--color-accent-secondary);
      color: white;
    }

    .mobile-tabs .tab-bar button:hover:not(.active) {
      background-color: rgba(var(--color-accent-secondary-rgb), 0.2);
    }

    .mobile-tabs .selector-container-mobile {
      margin-top: 1rem;
      padding: 1rem;
      background-color: var(--color-background-secondary);
      border-radius: 0.5rem;
    }
  }
  </style>