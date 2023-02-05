<script>
  import ImageLoader from '$lib/image/ImageLoader.svelte';
  import extractSlug from '$lib/extractSlug.js';
  import normalizeString from '$lib/normalizeString.js';

  export let title, subtitle, description, duration, image, publishDate, downloadUrl, slug;

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
</script>

<article>
  <div class="content-wrapper">
    <header>
      <h2><a href="/musorok/{slug}/{normalizeString(title)}">{title}</a></h2>
      {#if subtitle}<h3>{subtitle}</h3>{/if}
      <div>
        <time datetime={new Date(publishDate).toISOString()}
          >{new Date(publishDate).toLocaleDateString('hu-HU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</time
        >
      </div>
    </header>
    <div>
      {@html description}
    </div>
    <footer>
      {format(duration)}
      <a href="/musorok/{slug}"><strong>{extractSlug(slug)}</strong></a>&nbsp;|&nbsp;
      <a href={downloadUrl} download="{normalizeString(title)}.mp3">{title} (letöltés)</a>
    </footer>
  </div>
  <div class="image-wrapper">
    <ImageLoader src={image} />
  </div>
</article>

<style>
  article {
    display: flex;
    border-bottom: 1px solid #000;
    margin-block-end: 32px;
    padding-block-end: 24px;
    overflow-wrap: break-word;
  }

  .content-wrapper {
    flex-basis: 100%;
  }

  .image-wrapper {
    flex-shrink: 0;
    margin-inline-start: 16px;
    width: min(300px, 100%);
  }

  footer {
    margin-block-start: 16px;
  }

  @media screen and (max-width: 500px) {
    article {
      display: block;
    }

    .image-wrapper {
      margin-block-start: 16px;
    }
  }
</style>
