<script lang="ts">
    import { get } from 'svelte/store';
    import { partSelections, type PartKey } from '$lib/stores/partSelections';
    import { onMount } from 'svelte';

    export let part: PartKey;
    export let options: string[];
    export let hideLabel: boolean = false;
  
    let isOpen = false;
    let selectedOption = get(partSelections)[part] || options[0] || '';
    let selectElement: HTMLDivElement; // Referencia al div personalizado del select
  
    function toggleOpen() {
      isOpen = !isOpen;
    }
  
    function selectOption(option: string) {
      selectedOption = option;
      partSelections.update((current) => ({ ...current, [part]: option }));
      isOpen = false;
    }
    // Cierra el dropdown si se hace clic fuera del componente
  function handleClickOutside(event: MouseEvent) {
    if (selectElement && !selectElement.contains(event.target as Node)) {
      isOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  
    $: if (get(partSelections)[part] && get(partSelections)[part] !== selectedOption) {
      selectedOption = get(partSelections)[part];
    }
  </script>
  
  <div class="rubber-hose-selector">
    {#if !hideLabel}
      <label for={"select-" + part} class="selector-label">{part.replace('_', ' ')}</label>
    {/if}
    <div class="custom-select" bind:this={selectElement} on:click={toggleOpen}>
      <span class="selected-value">{selectedOption.replace('_', ' ')}</span>
      <div class="dropdown-arrow">▼</div>
      {#if isOpen}
        <ul class="options-list">
          {#each options as option}
            <li
              class:is-selected={option === selectedOption}
              on:click={() => selectOption(option)}
              on:keydown={(e) => {
                if (e.key === 'Enter') {
                  selectOption(option);
                }
              }}
              tabindex="0"
            >
              {option.replace('_', ' ')}
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
  
  <style>
    .rubber-hose-selector {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.5rem;
    }
  
    .selector-label {
      font-family: var(--font-heading); /* Usa la fuente de tu logo */
      font-size: 1.2rem;
      margin-bottom: 0.3rem;
      color: var(--color-grey-charcoal); /* Un color oscuro */
    }
  
    .custom-select {
      position: relative;
      width: 70px; /* Ajusta el ancho según necesites */
      border: 3px solid var(--color-grey-charcoal); /* Borde grueso como contorno */
      border-radius: 8px;
      background-color: var(--color-white-bone);
      padding: 0.5rem 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: var(--font-body); /* Una fuente más legible para las opciones */
      z-index: 1;
      font-size: 0.7rem;
    }
  
    .selected-value {
      flex-grow: 1;
    }
  
    .dropdown-arrow {
      margin-left: 0.5rem;
      font-size: 0.9rem;
      color: var(--color-grey-charcoal);
    }
  
    .options-list {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 0.2rem;
      border: 3px solid var(--color-grey-charcoal);
      border-radius: 8px;
      background-color: var(--color-white-bone);
      list-style: none;
      padding: 0;
      font-size: 0.9rem;
      z-index: 10;
      overflow-y: auto; /* Evita que los bordes redondeados se vean mal */
    }
  
    .options-list li {
      padding: 0.5rem 1rem;
      cursor: pointer;
      font-family: var(--font-body);
    }
  
    .options-list li:hover {
      background-color: var(--color-white-bone);
    }
  
    .options-list li.is-selected {
      font-weight: bold;
      background-color: var(--color-white-bone);
    }

     /* Estilos para pantallas más pequeñas (móviles) */
  @media (max-width: 1200px) {
    .selector-label {
      font-size: 1rem;
      margin-bottom: 0.3rem;
    }

    .custom-select {
      width: 90px; /* Ancho más pequeño en móviles */
      padding: 0.3rem 0.6rem;
      border-width: 2px; /* Borde más fino en móviles */
      border-radius: 6px;
    }

    .selected-value {
      font-size: 0.8rem;
    }

    .dropdown-arrow {
      font-size: 0.6rem;
      margin-left: 0.3rem;
    }

    .options-list {
      margin-top: 0.1rem;
      border-width: 2px;
      border-radius: 6px;
      max-height: 120px;
    }

    .options-list li {
      padding: 0.3rem 0.6rem;
      font-size: 0.8rem;
    }
  }
  </style>