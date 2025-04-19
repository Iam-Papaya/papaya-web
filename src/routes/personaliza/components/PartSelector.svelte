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
  
    // Cargamos dinámicamente las opciones por fetch a cada carpeta de modelos
    async function fetchOptionsForPart(part: PartKey) {
      const res = await fetch(`/models/${part}/`);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      const links = Array.from(doc.querySelectorAll('a'))
        .map((a) => a.getAttribute('href'))
        .filter((href) => href && href.endsWith('.glb')) as string[];
      
      options[part] = links.map((f) => f.replace('.glb', ''));
    }
  
    onMount(async () => {
      await Promise.all(PARTS.map(fetchOptionsForPart));
    });
  
    function updatePart(part: PartKey, value: string) {
      partSelections.update((current) => ({ ...current, [part]: value }));
    }
  </script>
  
  {#each PARTS as part}
    <div class="dropdown">
        <label for={"select-" + part}>{part}</label>
      <select on:change={(e) => updatePart(part, (e.target as HTMLSelectElement).value)}>

        {#each options[part] as opt}
          <option value={opt} selected={opt === get(partSelections)[part]}>{opt}</option>
        {/each}
      </select>
    </div>
  {/each}
  
  <style>
    .dropdown {
      margin: 0.5rem 0;
    }
  </style>
  