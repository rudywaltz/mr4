<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
   import createJSON from '$lib/createEpisodesJson'
   import {PODCAST_MAP} from '$lib/podcastMap'
  export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  export async function load({ page, fetch }) {
    const {
      params: {
        slug
      }
    } = page

    if (!Object.hasOwnProperty.call(PODCAST_MAP, slug)) {
      return {}
    }

    const response = await fetch(`${API_ENDPOINT}/feed?q=${PODCAST_MAP[slug].url}`,{ headers: {
        "Content-Type": "application/json"
      }});

      return {
        props: {
          podcast: await createJSON(response, slug),
          searchTerm: page.query.get('q') || ''
        }
      };
  }
</script>

<script>
  import Episode from '$lib/Episode.svelte'
  import Search from '$lib/Search.svelte'
  import episodeFilter from '$lib/episodeFilter'
  export let podcast
  export let searchTerm = ''

  $: filteredEpisodes = podcast.shows
  $: filteredEpisodes =  episodeFilter(podcast.shows, searchTerm)

</script>
<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="podcast">
  <img src="{podcast.logoUrl}" alt="{podcast.title}" width="200" height="200" class="podcast__image">
  <div class="podcast__content">
    <h1 class="podcast__title">{podcast.title}</h1>
    <p class="podcast__description">{podcast.description}</p>
  </div>
</section>
<section  class="page">
  <Search searchTerm="{searchTerm}" on:searchTerm="{({ detail }) => searchTerm = detail }" />
  <!-- <a href="../musorok"> &#8592; Műsorok</a> -->

  {#each filteredEpisodes as episode}
  <Episode {...episode} />
  {/each}
</section>
