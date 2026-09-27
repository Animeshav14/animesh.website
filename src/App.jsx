import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home.jsx';
import Writing from './components/Writing.jsx';
import NotFound from './components/NotFound.jsx';
import Navigation from './components/Navigation.jsx';
import Footer from './components/Footer.jsx';
import CommandPalette from './components/CommandPalette.jsx';

const SITE = 'https://www.animeshshrestha.com';

const titles = {
  '/': 'Animesh Shrestha',
  '/writing': 'Writing · Animesh Shrestha',
};

// Scroll to the hash on every navigation (location.key changes even when the
// hash does not), or to the top on a plain page change. A hash present on the
// first load jumps instantly; later jumps follow the CSS scroll-behavior,
// which is smooth unless reduced motion is requested.
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const firstLoad = useRef(true);

  useLayoutEffect(() => {
    document.title = titles[pathname] || 'Not found · Animesh Shrestha';
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = SITE + pathname;
  }, [pathname]);

  useEffect(() => {
    const initial = firstLoad.current;
    firstLoad.current = false;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ block: 'start', behavior: initial ? 'instant' : 'auto' });
    const title = el.matches('h1, h2, h3, h4') ? el : el.querySelector('h1, h2, h3, h4');
    if (!title) return;
    title.classList.remove('arrived');
    void title.offsetWidth;
    title.classList.add('arrived');
  }, [pathname, hash, key]);

  return null;
}

function Shell() {
  const [palette, setPalette] = useState(false);
  const { pathname } = useLocation();
  const open = () => setPalette(true);

  return (
    <>
      <ScrollManager />
      <Navigation openPalette={open} />
      <main id="main" key={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/blogs" element={<Navigate to="/writing" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer openPalette={open} />
      <CommandPalette open={palette} setOpen={setPalette} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
