<script>
  import Episode from '$lib/Episode.svelte'
  import { createEventDispatcher } from 'svelte';

  export let data = []
  export let page = 0
  const dispatch = createEventDispatcher()
  $: nextPage = Number(page) + 20
  $: slice = data.slice(page, nextPage)
  $: isItLast = data.length <= nextPage
</script>

{#each slice as episode }

<Episode {...episode}></Episode>
{/each}

{#if !isItLast}
  <button type="button" on:click="{() => dispatch('nextPage', { page: nextPage })}">További Részek</button>
{/if}
