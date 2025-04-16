<script lang="ts">
  export let items: string[] = [];
</script>

<div class="marquee-wrapper">
  <div class="marquee">
    <div class="track">
      {#each [...items, ...items] as item, i}
        <span class="item">{item}</span>
      {/each}
    </div>
  </div>
</div>

<style>
  .marquee-wrapper {
    overflow: hidden;
    width: 100%;
    background: var(--color-accent-secondary);
    margin: 0;
  }

  .marquee {
    display: flex;
    white-space: nowrap;
    will-change: transform;
    pointer-events: auto;
    margin: 0;
  }

  .track {
    display: inline-block;
    white-space: nowrap;
    animation: scroll-left 20s linear infinite;
    margin: 0;
  }

  .marquee-wrapper:hover .track {
    animation-play-state: paused;
  }

  .item {
    font-family: var(--font-heading);
    display: inline-block;
    font-size: 3rem;
    color: var(--color-white-bone);
    margin-right: 20rem;
  }

  @keyframes scroll-left {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }
</style>
