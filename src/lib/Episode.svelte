<script>
  export let title, subtitle, description, duration, image, url, publishDate, slug
  function pad(num) {
  return String(num).padStart(2, '0');
}


export function format(time) {
  if (isNaN(time)) return time;
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.ceil(time % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

import ImageLoader from '$lib/image/ImageLoader.svelte'

const slugMatcher = {
  gombapresszo: "Gombapresszó",
  mindenkiboldog: "Vendeglő A Világ Végén",
  spagettilakoauto: "Sapegetti Lakóautó"
}
</script>

<section class="episode">
  {#if image}
  <div class="episode__cover" width="150" height="150">
    <ImageLoader src="{image}" alt="{title}"></ImageLoader>
  </div>
  {/if}
  <div class="episode__content">
    <h2 class="episode__title">{title}</h2>
    {#if subtitle}<h3 class="episode__subtitle">{subtitle}</h3> {/if}
    <datetime>{new Date(publishDate).toLocaleDateString('hu-HU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</datetime>
    &nbsp;|&nbsp;
    <span class="episode__duration">{format(duration)}</span>
    <div>
      <a href="/musorok/{slug}"><strong>{slugMatcher[slug]}</strong></a>
    </div>
    <section class="episode__descriptions">{@html description}</section>
    <a href={url}>{title}</a>
  </div>
</section>


<style lang="scss">
  .episode {
    /* background-color: #bbbb; */
    border-bottom: 1px solid #55c4c2;
    display: grid;
    grid-template-columns: 150px 1fr;
    margin-bottom: 1rem;
    padding: 0 1rem 1rem;

    &__content {
      overflow-wrap: break-word;
      padding: 0 1rem;
    }

    &__title,
    &__subtitle {
      margin: 0;
    }

    &__cover {
      place-self: top;
      /* margin: -1rem -1rem 0 -1rem; */
    }
  }

  @media screen and (max-width: 500px) {
    .episode {
      display: block;
      font-size: 0;

      &__cover {
        height: auto;
        width: 100%;
      }

      &__content {
        background: rgba(#bbb, .9);
        font-size: 1rem;
        margin-top: -15rem;
        min-height: 13rem;
        position: relative;
      }
    }
  }
</style>
