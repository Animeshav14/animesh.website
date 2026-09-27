import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { person } from '../content.js';
import { currentTheme, toggleTheme } from '../theme.js';

const sections = [
  ['Research', 'research'],
  ['Experience', 'experience'],
  ['Education', 'education'],
  ['Projects', 'projects'],
  ['News', 'news'],
  ['Contact', 'contact'],
];

export default function Navigation({ openPalette }) {
  const { pathname } = useLocation();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(currentTheme());
    const onChange = () => setTheme(currentTheme());
    window.addEventListener('themechange', onChange);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', onChange);
    return () => {
      window.removeEventListener('themechange', onChange);
      mq.removeEventListener?.('change', onChange);
    };
  }, []);

  return (
    <header className="masthead">
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="frame masthead-inner">
        <Link to="/" className="wordmark" aria-label="Animesh Shrestha, home">
          Animesh Shrestha
        </Link>
        <div className="masthead-tools">
          <a className="tools-cv" href={person.cv} target="_blank" rel="noopener">
            CV
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <button
            type="button"
            className="theme-toggle"
            onClick={() => setTheme(toggleTheme())}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span className="theme-glyph" aria-hidden="true" />
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
        </div>
        <nav className="nav" aria-label="Sections">
          {sections.map(([label, id]) => (
            <Link key={id} to={{ pathname: '/', hash: `#${id}` }}>
              {label}
            </Link>
          ))}
          <Link to="/blogs" aria-current={pathname === '/blogs' || pathname === '/writing' ? 'page' : undefined}>
            Writing
          </Link>
          <a className="nav-cv" href={person.cv} target="_blank" rel="noopener">
            CV<span className="nav-cv-meta">PDF</span>
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
