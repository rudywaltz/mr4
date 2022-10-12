import { get } from 'svelte/store';
import { podcastData } from '$lib/store';
import FetchPodcasts from '$lib/fetchPodcasts';

export async function load({ fetch, url }) {
  const searchString = url.searchParams.get('s');

  if (!Object.keys(get(podcastData)).length) {
    const fetchPodcasts = new FetchPodcasts(fetch);
    await fetchPodcasts.setPodcast();
  }

  return { searchString };
}
