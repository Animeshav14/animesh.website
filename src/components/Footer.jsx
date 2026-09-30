import React from 'react';
import { Link } from 'react-router-dom';
import { person } from '../content.js';
import { SpreadRule } from './Horizon.jsx';

export default function Footer({ openPalette }) {
  return (
    <footer className="colophon">
      <SpreadRule />
      <div className="frame">
        <p>
          <Link to="/">Animesh Shrestha</Link>
          <br />
          {person.city}
        </p>
        <div>
          <p>
            Built with React and Vite; the{' '}
            <a href="https://github.com/Animeshav14/animesh.website">source is on GitHub</a>. Last updated {person.updated}.
          </p>
        </div>
        <p>
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <br />
          <a href={person.cv} target="_blank" rel="noopener">
            CV
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          {' · '}
          <a href={person.github}>GitHub</a>
          {' · '}
          <a href={person.linkedin}>LinkedIn</a>
          <br />
          <button type="button" className="linklike" onClick={openPalette}>
            Command menu
          </button>
        </p>
      </div>
    </footer>
  );
}
