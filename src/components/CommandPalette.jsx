import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { person, research, projects, questions } from '../content.js';
import { toggleTheme } from '../theme.js';

// Ctrl/⌘ K. A shortcut layer over the normal navigation, never a replacement.

function matches(query, text) {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let k = 0;
  for (const ch of t) if (ch === q[k]) k += 1;
  return k === q.length;
}

export default function CommandPalette({ open, setOpen }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState('');
  const inputRef = useRef(null);
  const returnFocus = useRef(null);

  const go = (hash) => {
    navigate({ pathname: '/', hash });
  };

  const commands = useMemo(() => {
    const entries = [
      ...research.map((r) => ({ id: r.id, title: r.title })),
      ...projects.flatMap((g) => g.items).filter((p) => p.id).map((p) => ({ id: p.id, title: p.title })),
    ];
    return [
      { group: 'Go to', label: 'Research', run: () => go('#research') },
      { group: 'Go to', label: 'Experience', run: () => go('#experience') },
      { group: 'Go to', label: 'Education', run: () => go('#education') },
      { group: 'Go to', label: 'Leadership', run: () => go('#leadership') },
      { group: 'Go to', label: 'Projects', run: () => go('#projects') },
      { group: 'Go to', label: 'Writing', run: () => navigate('/blogs') },
      { group: 'Go to', label: 'News', run: () => go('#news') },
      { group: 'Go to', label: 'Skills', run: () => go('#skills') },
      { group: 'Go to', label: 'Contact', run: () => go('#contact') },
      { group: 'Open', label: 'CV (PDF)', hint: 'new tab', run: () => window.open(person.cv, '_blank', 'noopener') },
      {
        group: 'Open',
        label: 'Copy email address',
        hint: person.email,
        keep: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(person.email);
            setFlash('Copied ' + person.email);
          } catch {
            setFlash(person.email);
          }
        },
      },
      { group: 'Open', label: 'GitHub', hint: 'github.com/Animeshav14', run: () => window.open(person.github, '_blank', 'noopener') },
      { group: 'Open', label: 'LinkedIn', run: () => window.open(person.linkedin, '_blank', 'noopener') },
      {
        group: 'Wander',
        label: 'Current questions',
        hint: `${questions.length} of them`,
        run: () => go('#questions'),
      },
      {
        group: 'Wander',
        label: 'Random project',
        run: () => {
          const pick = entries[Math.floor(Math.random() * entries.length)];
          go('#' + pick.id);
        },
      },
      { group: 'Wander', label: 'Read the line under my name', run: () => go('#yield-curve') },
      {
        group: 'Wander',
        label: 'Play the game',
        run: () => {
          go('#intermission');
          setTimeout(() => {
            const d = document.getElementById('intermission');
            if (d) d.open = true;
          }, 60);
        },
      },
      { group: 'Settings', label: 'Switch light / dark', run: () => toggleTheme() },
    ];
  }, []);

  const shown = commands.filter((c) => matches(query, `${c.group} ${c.label} ${c.hint || ''}`));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      returnFocus.current = document.activeElement;
      setQuery('');
      setActive(0);
      setFlash('');
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (returnFocus.current && returnFocus.current.focus) {
      returnFocus.current.focus();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  if (!open) return null;

  const run = (c) => {
    if (!c) return;
    c.run();
    if (!c.keep) setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(shown.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + shown.length) % Math.max(shown.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      run(shown[active]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  let lastGroup = null;

  return (
    <div className="palette-scrim" onMouseDown={() => setOpen(false)}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <input
          ref={inputRef}
          className="palette-input"
          type="text"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={shown[active] ? `cmd-${active}` : undefined}
          placeholder="Jump to a section, open the CV, copy the email…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          spellCheck="false"
          autoComplete="off"
        />
        <ul id="palette-list" className="palette-list" role="listbox">
          {shown.map((c, i) => {
            const head = c.group !== lastGroup ? c.group : null;
            lastGroup = c.group;
            return (
              <React.Fragment key={c.group + c.label}>
                {head && (
                  <li className="palette-group" role="presentation">
                    {head}
                  </li>
                )}
                <li
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className="palette-item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(c)}
                >
                  <span>{c.label}</span>
                  {c.hint && <span className="palette-hint">{c.hint}</span>}
                </li>
              </React.Fragment>
            );
          })}
          {shown.length === 0 && <li className="palette-empty">Nothing by that name. Try “cv” or “research”.</li>}
        </ul>
        <div className="palette-foot">
          <span>{flash || '↑↓ to move · Enter to open · Esc to close'}</span>
        </div>
      </div>
    </div>
  );
}
