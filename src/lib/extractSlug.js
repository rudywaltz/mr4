export default function extractSlug(slug) {
  const slugMatcher = {
    gombapresszo: 'Gombapresszó',
    mindenkiboldog: 'Vendeglő A Világ Végén',
    spagettilakoauto: 'Spagetti Lakóautó'
  };

  return slugMatcher[slug];
}
