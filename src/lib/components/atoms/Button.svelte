<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' | undefined = 'button';
    export let onClick: () => void = () => {};
    export let className: string = '';
    export let primary: boolean = false;
  </script>
  
  <button {type} on:click={onClick} class="button {className} {primary ? 'button-primary' : ''}">
    <slot></slot>
  </button>


  <style>
  button {
    padding: 0.8rem 1.5rem;
    border-radius: 2rem;
    cursor: pointer;
    font-family: var(--font-heading);
    font-size: 1rem;
    border: none;
    transition: background-color 0.3s ease;
    background-color: var(--color-accent-secondary);
  }

  .button:hover {
	background-color: var(--color-accent-primary-darker);
}
</style>