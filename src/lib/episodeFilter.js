export default function episodeFilter(shows, searchTerm) {
  if (!searchTerm) {
    return shows;
  }

  const filtered = shows.filter((episode) =>
    normalizeString(JSON.stringify(episode)).includes(normalizeString(searchTerm))
  );

  return filtered;
}

function normalizeString(str) {
  return str.length
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    : str;
}
