import React from 'react';
import { Link } from 'react-router-dom';
import { writing } from '../content.js';
import Horizon from './Horizon.jsx';

export default function Blogs() {
  return (
    <>
    <Horizon compact />
    <div className="frame">
      <div className="row page-head">
        <p className="label section-head">Writing</p>
        <div>
          <h1>Writing</h1>
          <p>
            A policy article from my internship at the Nepal Economic Forum, a research paper, and a short research
            memo. Longer research is described on the <Link to={{ pathname: '/', hash: '#research' }}>home page</Link>.
          </p>
        </div>
      </div>

      <div className="row writing-list">
        <span aria-hidden="true" />
        <div>
          {writing.map((w) => (
            <article key={w.title} className="essay">
              <p className="meta">
                <span className="tnum">{w.when}</span> · {w.venue} · {w.kind}
              </p>
              <h2>
                <a className="ext" href={w.href} target="_blank" rel="noopener noreferrer">
                  {w.title}
                </a>
              </h2>
              <p>{w.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
