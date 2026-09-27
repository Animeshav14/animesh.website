import React from 'react';
import { Link } from 'react-router-dom';
import { person } from '../content.js';

export default function Footer({ openPalette }) {
  return (
    <footer className="colophon">
      <div className="frame">
        <p>
          <Link to="/">Animesh Shrestha</Link>
          <br />
          {person.city}
        </p>
        <div>
          <p>
            Set in Newsreader and IBM Plex Sans. Built with React and Vite; the{' '}
            <a href="https://github.com/Animeshav14/animesh.website">source is on GitHub</a>. Last updated {person.updated}.
          </p>
        </div>
        <p>
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <br />
          <a href={person.cv} target="_blank" rel="noopener">
            CV
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
