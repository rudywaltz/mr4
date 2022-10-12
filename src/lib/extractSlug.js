export default function extractSlug(slug) {
  const slugMatcher = {
    gombapresszo: 'Gombapresszó',
    mindenkiboldog: 'Vendeglő A Világ Végén',
    spagettilakoauto: 'Sapegetti Lakóautó'
  };

  return slugMatcher[slug];
}
