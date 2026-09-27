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
          <h1 className="nf-title">Page not found</h1>
          <p className="muted nf-body">
            Nothing lives at <code>{pathname}</code>. The research, CV, and everything else are on the{' '}
            <Link to="/">home page</Link>.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
