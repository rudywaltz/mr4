export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

function imageURLFix(imageURL) {
  return imageURL?.startsWith('http://') ? `${API_ENDPOINT}/image?url=${imageURL}` : imageURL;
}

export default async function createJSON(podcast, slug) {
  if (!podcast.ok) {
    return {};
  }

  const podcastFeed = await podcast.text();
  const podcastJSON = JSON.parse(podcastFeed)[0];
  podcastJSON.logoUrl = imageURLFix(podcastJSON.logoUrl);
  podcastJSON.shows = podcastJSON.shows.map((show) => {
    show.image = imageURLFix(show.image);
    show.slug = slug;
    return show;
  });
  return podcastJSON;
}
