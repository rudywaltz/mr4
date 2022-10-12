<script>
	import { page } from '$app/stores';
  import { env } from '$env/dynamic/public';
  import { podcastData } from '$lib/store';
  import './style.css'
  import logo from './logo.jpeg';

  const slugs = env.PUBLIC_PODCAST_SLUGS.split(',');

  let podcasts = {}
    podcastData.subscribe(shows => podcasts = shows)
</script>

<nav>
  <a href="/">
    <img src="{logo}" alt="MR4 rádió logója, sárga alapon fekete betűkkel: MR4" width="100" height="100">
  </a>
  <a href="/" class:active={$page.url.pathname === '/'} >MR4</a>
  {#each slugs as slug}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <a href="/musorok/{slug}" class:active={$page.url.pathname === `/musorok/${slug}`}>{podcasts[slug].title}</a>
  {/each}
</nav>


<style>

  nav {
    margin-bottom: 32px;
  }

  a.active {
    font-weight: bold;
  }
  </style>
