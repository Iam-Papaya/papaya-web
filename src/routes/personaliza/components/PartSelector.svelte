<script lang="ts">
    import { onMount } from 'svelte';
    import { partSelections, type PartKey } from '$lib/stores/partSelections';
    import { get } from 'svelte/store';
  
    const PARTS: PartKey[] = ['HEAD', 'HEAD_TOP', 'TORSO', 'ARM_L', 'ARM_R', 'LEG_L', 'LEG_R', 'PANTS'];
  
    // Almacenamos las opciones disponibles para cada parte
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
  <div class="topbar">
    {#each PARTS as part}
      <div class="part-selector">
        <label for={"select-" + part}>{part}</label>
        <select on:change={(e) => updatePart(part, (e.target as HTMLSelectElement).value)}>
          {#each options[part] as opt}
            <option value={opt} selected={opt === get(partSelections)[part]}>{opt}</option>
          {/each}
        </select>
      </div>
    {/each}
  </div>
  
  <style>
    .topbar {
      display: flex; /* Dispone los elementos hijos en una fila */
      gap: 4rem;      /* Espacio entre los elementos (ajusta según necesites) */
      padding: 1rem;   /* Añade un poco de espacio alrededor de la barra */
      background-color: #ff4500; /* Un fondo sutil para la barra (opcional) */
      align-items: center; /* Alinea verticalmente los elementos (opcional) */
      font-size: 2rem;
      font-family: var(--font-heading);
      margin-top: 100px;
    }
  
    .part-selector {
      display: flex;       /* Dispone la etiqueta y el select en una columna */
      flex-direction: column;
      align-items: center; /* Centra horizontalmente la etiqueta y el select (opcional) */
    }
  
    .part-selector label {
      margin-bottom: 0.25rem; /* Espacio entre la etiqueta y el select */
      font-size: 0.8rem;      /* Reduce un poco el tamaño de la fuente de la etiqueta (opcional) */
    }
  </style>
  