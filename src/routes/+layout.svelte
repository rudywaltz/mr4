<script>
  import Nav from '$lib/nav/Nav.svelte';
</script>

<Nav />

<div class="container">
  <slot />
</div>

<style>
  .container {
    /* max-width: 80ch; */
    margin-inline: auto;
    padding: 16px 8px;
  }
</style>
