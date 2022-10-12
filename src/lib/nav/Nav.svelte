<script>
  import { page } from '$app/stores';
  import { env } from '$env/dynamic/public';
  import { podcastData } from '$lib/store';
  import './style.css';
  import logo from './logo.jpeg';

  const slugs = env.PUBLIC_PODCAST_SLUGS.split(',');

  let podcasts = {};
  podcastData.subscribe((shows) => (podcasts = shows));
</script>

<nav>
  <a href="/">
    <img
      src={logo}
      alt="MR4 rádió logója, sárga alapon fekete betűkkel: MR4"
      width="50"
      height="50"
    />
  </a>
  {#each slugs as slug}
    <a
      href="/musorok/{slug}"
      class:active={$page.url.pathname === `/musorok/${slug}`}
    >{podcasts[slug].title}</a>
  {/each}
</nav>

<style>
  nav {
    align-items: center;
    background-color: var(--navigation-bg-color);
    display: flex;
    margin-bottom: 32px;
    padding: 16px;
    gap: 32px;
  }

  a {
    color: var(--navigation-text-color);
    border-radius: 8px;
    font-size: 24px;
    font-weight: bold;
    padding: 16px;
    transition: background-color .2s ease-in-out;
    text-decoration: none;
  }

  a:hover,
  a:focus,
  a.active {
    background-color: var(--navigation-hover-color);
  }

  a:focus {
    outline: none;
  }
  a:focus-visible {
    outline: 3px dotted var(--navigation-outline-color);
    outline-offset: 3px;
  }


  a:has(img) {
    padding: 0;
    font-size: 0;
  }

</style>
