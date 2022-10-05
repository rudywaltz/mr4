import { readable, writable } from 'svelte/store';
import { env } from '$env/dynamic/public';

export const podcastMap = readable(JSON.parse(env.PUBLIC_PODCAST_MAP || {}));

export const podcast = writable({});
export const podcastData = writable({});
