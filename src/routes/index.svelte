<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */

  export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  import createJSON from '$lib/createEpisodesJson'
  import { PODCAST_MAP } from '$lib/podcastMap'

  export async function load({ page, fetch }) {
    const fetchArray = Object.values(PODCAST_MAP).map(({ url }) => {
      return fetch(`${API_ENDPOINT}/feed?q=${url}`, { headers: {
        "Content-Type": "application/json"
      }})
    })
    const [
      gombapresszo,
      mindenkiboldog,
      spagettilakoauto
    ] = await Promise.all(fetchArray)


    return {
      props: {
        podcast: {
          gombapresszo: await createJSON(gombapresszo, 'gombapresszo'),
          mindenkiboldog: await createJSON(mindenkiboldog, 'mindenkiboldog'),
          spagettilakoauto: await createJSON(spagettilakoauto, 'spagettilakoauto')
        },
        searchTerm: page.query.get('q') || ''
      }
    }
  }
</script>

<script>
  export let podcast, searchTerm
  import Episode from '$lib/Episode.svelte'
  import Search from '$lib/Search.svelte'
  import LazyLoad from '$lib/LazyLoad.svelte'
  import episodeFilter from '$lib/episodeFilter'

    const {
      gombapresszo: {
        shows: gombapresszoEpisodes
      },
      mindenkiboldog: {
        shows: mindenkiboldogEpisodes
      },
      spagettilakoauto: {
        shows: spagettilakoautoEpisodes
      }
    } = podcast

    const allEpisodes = gombapresszoEpisodes.concat(mindenkiboldogEpisodes, spagettilakoautoEpisodes)
    allEpisodes.sort(function(a,b) {
      return new Date(b.publishDate) - new Date(a.publishDate);
    })

    $: filteredEpisodes = episodeFilter(allEpisodes, searchTerm)
</script>
<section  class="page">
  <Search searchTerm="{searchTerm}" on:searchTerm="{({ detail }) => searchTerm = detail }" />

  <LazyLoad data="{filteredEpisodes}" page="0" on:nextPage="{console.log}"/>
  <!-- {#each filteredEpisodes as episode}
  <Episode {...episode} />
  {/each} -->
</section>
