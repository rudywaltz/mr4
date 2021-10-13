<script>
  export let title, subtitle, description, duration, image, url, publishDate
  function pad(num) {
  return String(num).padStart(2, '0');
}


export function format(time) {
  if (isNaN(time)) return '--:--:--';
  const hours = Math.floor(time / (60 * 60));
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.ceil(time % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}


</script>

<section class="episode">
  <div class="episode__content">
    <datetime>{new Date(publishDate).toLocaleDateString('hu-HU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</datetime>
    <h2 class="episode__title">{title}</h2>
    {#if subtitle}<h3 class="episode__subtitle">{subtitle}</h3> {/if}
    <div class="episode__duration">{format(duration)}</div>
    <section class="episode__descriptions">{@html description}</section>
    <a href={url}>{title}</a>
  </div>
  {#if image} <img src="{image}" alt="{title}" class="episode__cover" loading=lazy width="150" height="150px"> {/if}
</section>


<style lang="scss">
  .episode {
    background-color: #666;
    display: grid;
    grid-template-columns: 200px auto;
    margin-bottom: 1rem;

    &__content {
      overflow-wrap: break-word;
      padding: 1rem;
    }

    &__title,
    &__subtitle {
      margin: 0;
    }

    &__cover {
      place-self: center;
    }
  }

  @media screen and (max-width: 500px) {
    .episode {
      display: block;

      &__cover {
        width: 100%;
      height: auto;
      }
    }
  }
</style>
