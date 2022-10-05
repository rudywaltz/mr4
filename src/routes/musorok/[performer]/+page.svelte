<script>
import { podcast } from '$lib/store';
import Show from '../../../components/show.svelte'

  export let data;

  let dddd = []
  podcast.subscribe(podcast => {
    dddd = podcast[data.performer]
  })
</script>


{#each dddd as show}
<Show {...show} />
{/each}
