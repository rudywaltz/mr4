<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */

  export async function load({ page, fetch, session, context }) {
    const {
      params: {
        slug
      }
    } = page
    const podcastMap = {
      gombapresszo: 'https://feeds.feedburner.com/gombapresszo',
      mindenkiboldog: 'https://anchor.fm/s/1a6213c0/podcast/rss',
      spagettilakoauto: 'https://anchor.fm/s/d180c9c/podcast/rss'
    }

    if (!podcastMap.hasOwnProperty(slug)) {
      return {}
    }

    const response = await fetch(`https://mr4-radio-api.herokuapp.com/feed?q=${podcastMap[slug]}`,{ headers: {
        "Content-Type": "application/json"
      }});
    if (response.ok) {
      const podcastFeed = await response.text()
      return {
        props: {
          podcast: JSON.parse(podcastFeed)[0],
          searchTerm: page.query.get('q') || ''
        }
      };
    }
  }
</script>

<script>
  import Episode from '$lib/Episode.svelte'
  export let podcast
  export let searchTerm = ''

  $: filteredEpisodes = podcast.shows

	let timer;

	const debounce = value => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			searchTerm = value;
		}, 750);
	}
  $: filteredEpisodes =  filterEpisode(searchTerm)

  function  filterEpisode(searchTerm2) {
    const filtered = podcast.shows.filter(episode => {
      return normailezeString(JSON.stringify(episode)).includes(searchTerm2)
    })

    return filtered
  }

  function normailezeString(str) {
  return str.length
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    : str;
}

</script>
<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
  <a href="../musorok"> &#8592; Műsorok</a>

  <h3>Keresés</h3>
  <input type="text" value="{searchTerm}" on:keyup={({ target: { value } }) => debounce(value)}>
  <aside>
    Találatok: {filteredEpisodes.length}
  </aside>
  <h1>{podcast.title}</h1>
  <p><em>{podcast.description}</em></p>
  {#each filteredEpisodes as episode}
  <Episode {...episode} />
  {/each}
</section>
