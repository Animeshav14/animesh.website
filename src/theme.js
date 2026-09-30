// Theme: 'dark' (the default, black canvas) or 'light' (paper). A stored
// choice is applied before first paint by the inline script in index.html.

const KEY = 'theme';

export function currentTheme() {
  const set = document.documentElement.dataset.theme;
  if (set) return set;
  return 'dark';
}

export function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: the choice lasts for this page only */
    }
    window.dispatchEvent(new CustomEvent('themechange', { detail: next }));
  };
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (document.startViewTransition && !calm) document.startViewTransition(apply);
  else apply();
  return next;
}
