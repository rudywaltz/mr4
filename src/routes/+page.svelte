<script>
  import { podcast } from '$lib/store';
  import Show from '../components/show.svelte'
  import episodeFilter from '$lib/episodeFilter'
  export let data;


  let timer;
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

  const debounce = value => {
		clearTimeout(timer);
		timer = setTimeout(() => {
      updateSearchterm(value)
		}, 300);
	}

  function updateSearchterm (value) {
    searchTerm = value;
    const url = new URL(window.location);

    if (value) {
      url.searchParams.set('s', searchTerm);
    } else {
      url.searchParams.delete('s');
    }
    window.history.pushState({}, '', url);
  }
</script>

<header>
  <h1>MR4 rádió</h1>
</header>
<main>
  <input
    type="search"
    name="search"
    id="search"
    value="{data.searchString}"
    on:search={({ target: { value } }) => debounce(value)}
    on:keyup={({ target: { value } }) => debounce(value) }
  >
  {#each filteredEpisodes as show}
    <Show {...show} />
  {/each}
</main>
