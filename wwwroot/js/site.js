(function () {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  const language = document.getElementById('lang-switch');
  if (language) {
    language.addEventListener('change', function () {
      const code = this.value;
      const slug = this.dataset.slug;
      // All pages have the same, language-independent route slug.
      window.location.assign('/' + encodeURIComponent(code) + (slug ? '/' + slug : '') + window.location.hash);
    });
  }
})();
