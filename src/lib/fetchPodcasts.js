import { env } from '$env/dynamic/public';
import podcastFormatter from '$lib/podcastFormatter';
import { podcast, podcastData } from '$lib/store';

class FetchPodcast {
  #fetch;

  constructor(fetch) {
    this.#fetch = fetch;
  }

  async setPodcast() {
    const fetchArray = Object.values(JSON.parse(env.PUBLIC_PODCAST_MAP)).map(({ url }) => {
      return this.#fetch(`${env.PUBLIC_API_ENDPOINT}/feed?q=${url}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    const [gombapresszoResponse, mindenkiboldogResponse, spagettilakoautoResponse] =
      await Promise.all(fetchArray);

    const { shows: gombapresszo, ...gombapresszoData } = await podcastFormatter(
      gombapresszoResponse,
      'gombapresszo'
    );

    const { shows: spagettilakoauto, ...spagettilakoautoData } = await podcastFormatter(
      spagettilakoautoResponse,
      'spagettilakoauto'
    );

    const { shows: mindenkiboldog, ...mindenkiboldogData } = await podcastFormatter(
      mindenkiboldogResponse,
      'mindenkiboldog'
    );

    podcastData.set({
      gombapresszo: gombapresszoData,
      spagettilakoauto: spagettilakoautoData,
      mindenkiboldog: mindenkiboldogData
    });

    podcast.set({
      gombapresszo,
      spagettilakoauto,
      mindenkiboldog
    });
  }
}

export default FetchPodcast;
