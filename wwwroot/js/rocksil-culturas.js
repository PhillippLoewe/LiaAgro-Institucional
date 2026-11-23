/* Acessível: cada cultura abre sua ficha sem recarregar a página. */
(() => {
  'use strict';
  const tiles = Array.from(document.querySelectorAll('[data-rocksil-culture]'));
  const container = document.getElementById('rocksil-culture-details');
  const closeButton = container?.querySelector('[data-rocksil-close]');
  if (!container || !tiles.length || !closeButton) return;
  const entries = Array.from(container.querySelectorAll('[data-rocksil-entry]'));
  let active = null;
  const hideDetails = (returnFocus = false) => {
    container.hidden = true;
    entries.forEach((entry) => { entry.hidden = true; });
    tiles.forEach((tile) => { tile.setAttribute('aria-expanded', 'false'); });
    const previous = active;
    active = null;
    if (returnFocus && previous) previous.focus();
  };
  tiles.forEach((tile) => tile.addEventListener('click', () => {
    const culture = tile.dataset.rocksilCulture;
    if (active === tile) { hideDetails(true); return; }
    entries.forEach((entry) => { entry.hidden = entry.dataset.rocksilEntry !== culture; });
    tiles.forEach((other) => { other.setAttribute('aria-expanded', String(other === tile)); });
    active = tile;
    container.hidden = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The details panel may be below the fold, especially on small screens.
    container.scrollIntoView({behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest'});
  }));
  closeButton.addEventListener('click', () => hideDetails(true));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !container.hidden) hideDetails(true);
  });
})();
