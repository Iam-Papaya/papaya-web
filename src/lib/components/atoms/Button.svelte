<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' | undefined = 'button';
  export let onClick: () => void = () => {};
  export let className: string = '';
  export let primary: boolean = false;
  export let color: 'secondary' | 'primary' | 'red' | 'yellow' = 'secondary'; // Añadimos la prop 'color'
</script>

<button
  {type}
  on:click={onClick}
  class="button {className}
         {primary ? 'button-primary' : ''}
         {color === 'yellow' ? 'button-yellow' : ''}"
>
  <slot></slot>
</button>

<style>
  button {
    padding: 0.8rem 1.5rem;
    margin: 1rem;
    border-radius: 2rem;
    cursor: pointer;
    font-family: var(--font-heading);
    font-size: 1rem;
    border: none;
    transition: background-color 0.3s ease;
    background-color: var(--color-accent-primary); /* Color por defecto */
    color: var(--color-white-bone); /* Color de texto por defecto */
    z-index: 10;
  }

  .button:hover {
    background-color: var(--color-accent-primary-darker);
  }

  .button-yellow {
    background-color: var(--color-accent-secondary); /* Define tu variable de color amarillo */
    color: var(--color-grey-charcoal); /* Texto oscuro para el amarillo */
  }

  .button-yellow:hover {
    background-color: var(--color-accent-primary-darker); /* Define tu variable de color amarillo oscuro */
  }
</style>