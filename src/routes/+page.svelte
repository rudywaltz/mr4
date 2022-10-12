<script>
  import { podcast } from '$lib/store';
  import Show from '$lib/show/Show.svelte';
  import Search from '$lib/search/Search.svelte';
  import episodeFilter from '$lib/episodeFilter';
  export let data;

  let searchTerm = data.searchString || '';
  let podcastJSON;

  podcast.subscribe((value) => {
    podcastJSON = Object.values(value)
      .flat()
      .sort(function (a, b) {
        return new Date(b.publishDate) - new Date(a.publishDate);
      });
  });

  $: filteredEpisodes = episodeFilter(podcastJSON, searchTerm);
</script>

<header>
  <h1>MR4 rádió</h1>
</header>
<main>
  <Search searchString={data.searchString} on:change={(event) => (searchTerm = event.detail)} />
  {#each filteredEpisodes as show}
    <Show {...show} />
  {:else}
    <h3>Nincs ilyen adás</h3>
  {/each}
</main>
