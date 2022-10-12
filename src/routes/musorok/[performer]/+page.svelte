<script>
  import { podcast, podcastData } from '$lib/store';
  import Search from '$lib/search/Search.svelte';
  import Show from '$lib/show/Show.svelte';
  import episodeFilter from '$lib/episodeFilter';

  export let data;

  let podcastInfo = {};
  let episodes = [];
  let searchTerm = '';

  $: {
    podcast.subscribe((podcast) => {
      episodes = podcast[data.performer];
    });

    podcastData.subscribe((podcast) => {
      podcastInfo = podcast[data.performer];
    });
  }
  $: filteredEpisodes = episodeFilter(episodes, searchTerm);
</script>

<svelte:head>
  <title>{podcastInfo.title}</title>
</svelte:head>

<img src={podcastInfo.logoUrl} alt="" width="100" height="100" />
<header>
  <h1>{podcastInfo.title}</h1>
  <div>
    {podcastInfo.description}
  </div>
</header>

<Search searchString={data.searchString} on:change={(event) => (searchTerm = event.detail)} />

{#each filteredEpisodes as show}
  <Show {...show} />
{/each}
