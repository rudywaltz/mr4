<script>
  export let title, sub, description, duration, image, url, publishDate
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

{#if image} <img src="{image}" alt="{title}" loading=lazy width="100"> {/if}
<h2>{title}</h2>
{#if sub} <h3>{sub}</h3> {/if}
<datetime>{new Date(publishDate).toLocaleDateString('hu-HU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</datetime>
<div><small>{format(duration)}</small></div>
<section>{@html description}</section>
<a href={url}>{title}</a>
<hr>
