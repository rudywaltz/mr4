<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */

  export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
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

    const response = await fetch(`${API_ENDPOINT}/feed?q=${podcastMap[slug]}`,{ headers: {
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
  import Header from '$lib/Header.svelte'
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

<!-- <Header /> -->

<section class="podcast">
  <img src="{podcast.logoUrl}" alt="{podcast.title}" width="200px" height="200px" class="podcast__image">
  <div class="podcast__content">
    <h1 class="podcast__title">{podcast.title}</h1>
    <p class="podcast__description">{podcast.description}</p>
  </div>
</section>
<section  class="page">
  <!-- <a href="../musorok"> &#8592; Műsorok</a> -->
<!--
  <form class="searchForm">
    <label for="searchInput">Keresés</label>
    <input type="text" id="searchInput" value="{searchTerm}" on:keyup={({ target: { value } }) => debounce(value)}>
    <aside>
      Találatok: {filteredEpisodes.length}
    </aside>
  </form> -->
  {#each filteredEpisodes as episode}
  <Episode {...episode} />
  {/each}
</section>

<style lang="scss">
  .page {
    padding: 0 1rem;
    background: #efefef;
  }

  .searchForm {
    margin-bottom: 1rem;
  }

  .podcast {
    background-color: #2e2e2e;
    display: flex;
    margin-bottom: 1rem;

    &__content {
      color: #fff;
      padding: 1rem;
      font-size: 1.2rem;
      line-height: 1.5rem;
    }

    &__title {
      margin: 0 0 1rem;
    }
    &__description {
      margin: 0;
    }

  }

</style>
