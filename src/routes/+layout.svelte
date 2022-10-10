<script>
  import { env } from '$env/dynamic/public';
  import { podcastData } from '$lib/store';

  const slugs = env.PUBLIC_PODCAST_SLUGS.split(',');

  let podcasts = {}
    podcastData.subscribe(shows => podcasts = shows)
</script>

<nav>
  <!-- <img src="logo.jpeg" alt="MR4 rádió logója, sárga alapon fekete betűkkel: MR4" width="100" height="100"> -->
  <a href="/">MR4</a>
  {#each slugs as slug}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="/musorok/{slug}">{podcasts[slug].title}</a>
  {/each}
</nav>

<slot></slot>
