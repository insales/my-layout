(() => {
  const root = document.documentElement;
  const themes = ['light', 'dark'];
  const storageKey = 'my-layout:appearance';

  function readPreferences() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(storageKey)) || {}; } catch {}
    const theme = new URLSearchParams(location.search).get('theme') || saved.theme;
    return { theme: themes.includes(theme) ? theme : 'dark' };
  }

  function apply(appearance, persist = false) {
    root.dataset.theme = appearance.theme;
    root.style.colorScheme = appearance.theme;
    document.querySelector('meta[name="theme-color"]').content = appearance.theme === 'dark' ? '#151819' : '#dfe2d8';
    for (const button of document.querySelectorAll('[data-theme-choice]')) {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === appearance.theme));
    }
    const url = new URL(location.href);
    const legacyDesign = url.searchParams.has('design');
    url.searchParams.delete('design');
    if (persist) {
      try { localStorage.setItem(storageKey, JSON.stringify(appearance)); } catch {}
      url.searchParams.set('theme', appearance.theme);
    }
    if (persist || legacyDesign) history.replaceState(null, '', url);
    document.dispatchEvent(new CustomEvent('my-layout:appearance', { detail: { ...appearance, restore: !persist } }));
  }

  apply(readPreferences());
  document.addEventListener('DOMContentLoaded', () => {
    apply(readPreferences());
    document.querySelector('.theme-picker').addEventListener('click', (event) => {
      const button = event.target.closest('[data-theme-choice]');
      if (button) apply({ theme: button.dataset.themeChoice }, true);
    });
  });
  window.addEventListener('popstate', () => apply(readPreferences()));
})();
