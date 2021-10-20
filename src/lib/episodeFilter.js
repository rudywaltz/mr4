export default function episodeFilter(shows, searchTerm) {
  const filtered = shows.filter((episode) => {
    return normailezeString(JSON.stringify(episode)).includes(searchTerm);
  });

  return filtered;
}

function normailezeString(str) {
  return str.length
    ? str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    : str;
}
