<script lang="ts">
    export let type: 'button' | 'submit' | 'reset' | undefined = 'button';
    export let onClick: () => void = () => {};
    export let className: string = '';
    export let primary: boolean = false;
  </script>
  
  <button {type} on:click={onClick} class="button {className} {primary ? 'button-primary' : ''}">
    <slot></slot>
  </button>
  