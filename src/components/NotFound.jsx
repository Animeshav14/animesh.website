import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Horizon from './Horizon.jsx';

export default function NotFound() {
  const { pathname } = useLocation();
  return (
    <>
    <Horizon compact />
    <div className="frame">
      <div className="row not-found">
        <p className="label section-head">Error 404</p>
        <div>
          <h1 className="nf-title">
            No observations at <code>{pathname}</code>
          </h1>
          <p className="muted nf-body">
            This page isn’t in the sample. It may have moved when the site was rebuilt. The research, CV, and
            everything else are on the <Link to="/">home page</Link>, or press <kbd>Ctrl</kbd> <kbd>K</kbd> to jump
            somewhere directly.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
