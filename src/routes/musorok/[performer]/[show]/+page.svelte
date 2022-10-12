<script>
  import { podcast } from '$lib/store';
  import normalizeString from '$lib/normalizeString.js';
  import Show from '$lib/show/Show.svelte';

  export let data;

  let actualShow = {};
  podcast.subscribe((podcast) => {
    const show = podcast[data.performer];
    actualShow = show.find((show) => normalizeString(show.title) === data.show);
  });
</script>

<Show {...actualShow} />
