<script>
  import { podcast, podcastData } from '$lib/store';
	import Search from '../../../components/Search.svelte';
  import Show from '../../../components/show.svelte';
  import episodeFilter from '$lib/episodeFilter';

  export let data;

  let podcastInfo = {};
  let episodes = [];
  let searchTerm = '';

  $: {
    podcast.subscribe(podcast => {
      episodes = podcast[data.performer]
    });

      podcastData.subscribe(podcast => {
      podcastInfo = podcast[data.performer]
    });

  }
  $: filteredEpisodes = episodeFilter(episodes, searchTerm);


</script>
  <section>
      <img src="{podcastInfo.logoUrl}" alt="" width="100" height="100">
    <div>
      <h1>{podcastInfo.title}</h1>
      <div>
        {podcastInfo.description}
      </div>
    </div>
  </section>



<Search searchString={data.searchString} on:change={event => searchTerm = event.detail} />

{#each filteredEpisodes as show}
<Show {...show} />
{/each}
