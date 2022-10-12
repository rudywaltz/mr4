<script>
  import extractSlug from '$lib/extractSlug.js';
  import normalizeString from '$lib/normalizeString.js';

  export let title, subtitle, description, duration, image, publishDate, url, slug;

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
  <header>
    <h2><a href="/musorok/{slug}/{normalizeString(title)}">{title}</a></h2>
    {#if subtitle}<h3>{subtitle}</h3>{/if}
    <div>
      <time datetime={publishDate}
        >{new Date(publishDate).toLocaleDateString('hu-HU', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</time
      >
    </div>
  </header>
  {duration}

  <a href="/musorok/{slug}"><strong>{extractSlug(slug)}</strong></a>
  <a href={url}>{title}</a>
  <section>
    {@html description}
  </section>
</article>
