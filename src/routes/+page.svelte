<script>
  import { podcast } from '$lib/store';
  import Show from '../components/show.svelte'
  import Search from '../components/Search.svelte'
  import episodeFilter from '$lib/episodeFilter'
  export let data;


  let searchTerm = data.searchString || '';
  let podcastJSON

  podcast.subscribe(value => {
    podcastJSON = Object
      .values(value)
      .flat()
      .sort(function(a,b) {
        return new Date(b.publishDate) - new Date(a.publishDate);
      })
  })

  $: filteredEpisodes = episodeFilter(podcastJSON, searchTerm);
</script>

<header>
  <h1>MR4 rádió</h1>
</header>
<main>
  <Search searchString={data.searchString} on:change={event => searchTerm = event.detail} />
  {#each filteredEpisodes as show}
    <Show {...show} />
  {/each}
</main>
