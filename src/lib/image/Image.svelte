<script>
  export let src;
  export let alt;
  import { onMount } from 'svelte';
  let loaded = false;
  let thisImage;

  onMount(() => {
    thisImage.onload = () => {
      loaded = true;
    };
  });
</script>

<img {src} {alt} class:loaded bind:this={thisImage} loading="lazy" />

<style>
  img {
    width: 100%;
    opacity: 0;
    transition: opacity 200ms ease-out;
  }
  img.loaded {
    opacity: 1;
  }
</style>
