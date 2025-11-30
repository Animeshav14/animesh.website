import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/#hero', type: 'anchor' },
  { label: 'Education', href: '/#education', type: 'anchor' },
  { label: 'Experience', href: '/#experience', type: 'anchor' },
  { label: 'Projects', href: '/#projects', type: 'anchor' },
  { label: 'Skills', href: '/#skills', type: 'anchor' },
  { label: 'Blogs', href: '/blogs', type: 'route' },
  { label: 'Contact', href: '/#contact', type: 'anchor' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleAnchorClick = (event, href) => {
    const targetId = href.split('#')[1];
    if (location.pathname === '/') {
      event.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuOpen(false);
  };

  const linkClasses = (isActive) =>
    `px-3 py-2 rounded-full border transition-colors ${
      isActive
        ? 'border-cyan-400/50 text-cyan-100 bg-cyan-500/10'
        : 'border-transparent hover:border-cyan-400/50 hover:text-cyan-100'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 md:px-10">
        <div className="mt-4 rounded-2xl md:rounded-full bg-black/70 border border-white/10 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between px-4 py-3 md:px-6">
            <Link to="/" className="font-semibold text-slate-50" onClick={() => setMenuOpen(false)}>
              Animesh Shrestha
            </Link>
            <button
              className="md:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 text-slate-100 hover:border-cyan-400/50"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-sm">{menuOpen ? 'Close' : 'Menu'}</span>
            </button>
            <nav
              className={`${
                menuOpen ? 'flex' : 'hidden'
              } md:flex flex-col md:flex-row flex-wrap gap-2 text-sm text-slate-200 md:items-center md:static absolute left-0 right-0 md:right-auto top-full md:top-auto px-4 pb-4 md:px-0 md:pb-0 bg-black/80 md:bg-transparent border-t md:border-0 border-white/10`}
            >
              {navItems.map((item) => {
                const isActive =
                  (item.type === 'route' && location.pathname === item.href) ||
                  (item.type === 'anchor' && location.hash === `#${item.href.split('#')[1]}` && location.pathname === '/');

                if (item.type === 'route') {
                  return (
                    <Link key={item.href} to={item.href} className={linkClasses(isActive)} onClick={() => setMenuOpen(false)}>
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={linkClasses(isActive)}
                    onClick={(event) => handleAnchorClick(event, item.href)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
