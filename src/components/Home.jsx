import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Horizon from './Horizon.jsx';
import SpreadChart from './SpreadChart.jsx';
import {
  person,
  questions,
  penn,
  research,
  experience,
  education,
  leadership,
  projects,
  writing,
  presentations,
  news,
  skills,
  certifications,
} from '../content.js';

const isExternal = (href) => /^https?:/.test(href);

function A({ href, children, className = '', ...rest }) {
  if (isExternal(href)) {
    return (
      <a href={href} className={`ext ${className}`} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith('#')) {
    return (
      <Link to={{ pathname: '/', hash: href }} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  if (href.startsWith('/') && !href.startsWith('/assets')) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

function Section({ id, no, title, children, wide = false }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-h`}>
      <div className="frame row">
        <header className="section-head">
          <span className="label sec-no">§ {no}</span>
          <h2 id={`${id}-h`}>{title}</h2>
        </header>
        <div className={wide ? 'section-body wide' : 'section-body'}>{children}</div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- intro */

function Intro() {
  return (
    <section className="intro" aria-label="Introduction">
      <div className="frame intro-top">
        <p className="label intro-kicker">
          Economics &amp; mathematics <span className="sep">/</span> Georgia State University
        </p>
        <h1 className="intro-name">
          Animesh <span className="intro-surname">Shrestha</span>
        </h1>
      </div>

      <Horizon />

      <div className="frame intro-grid">
        <aside className="intro-now" aria-label="Currently">
          <span className="label">Now</span>
          <ul className="meta">
            <li>Junior, B.S. expected 2028</li>
            <li>Chief Economist, Portfolio Management Group</li>
            <li>President, Economics Club</li>
          </ul>
        </aside>

        <div className="intro-main">
          <p className="lede">
            I study economics and mathematics at Georgia State University. My interests are in macroeconomics,
            development, and political economy, and so far most of my work has been empirical.
          </p>
          <p className="lede">
            This past summer I was a research scholar at the University of Pennsylvania, where I built a
            purchasing-power-parity index for health services across 26 countries. Before that I spent a year as a research assistant in Georgia
            State’s economics department, assembling a 46-country panel to study U.S. free trade agreements, foreign
            aid, and capital flows. I intend to go on to a PhD in economics.
          </p>
          <ul className="intro-links">
            <li>
              <a href={person.cv} target="_blank" rel="noopener">
                CV
              </a>{' '}
              <span className="meta">PDF, one page</span>
            </li>
            <li>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </li>
            <li>
              <A href={person.github}>GitHub</A>
            </li>
            <li>
              <A href={person.linkedin}>LinkedIn</A>
            </li>
          </ul>
        </div>

        <figure className="portrait">
          <picture>
            <source type="image/webp" srcSet="/assets/portrait-480.webp 480w, /assets/portrait-960.webp 960w" sizes="(min-width: 72rem) 15rem, 7rem" />
            <img
              src="/assets/portrait-480.jpg"
              srcSet="/assets/portrait-480.jpg 480w, /assets/portrait-960.jpg 960w"
              sizes="(min-width: 72rem) 15rem, 7rem"
              width="480"
              height="600"
              alt="Animesh Shrestha, in sunglasses, on a bridge above a highway with the Atlanta skyline behind him."
            />
          </picture>
          <figcaption>Atlanta, looking toward downtown.</figcaption>
        </figure>
      </div>

      <div className="frame intro-grid">
        <div className="questions" id="questions">
          <span className="label">Questions my work has asked</span>
          <ol>
            {questions.map((q) => (
              <li key={q.href}>
                <A href={q.href}>{q.text}</A>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- research */

function FisherNote() {
  return (
    <aside className="note" aria-label="Index formulas">
      <span className="label">The two formulas</span>
      <p>Fisher: the geometric mean of the Laspeyres and Paasche indices between countries <i>j</i> and <i>k</i>,</p>
      <math display="block" className="math">
        <mrow>
          <msubsup>
            <mi>P</mi>
            <mrow>
              <mi>j</mi>
              <mi>k</mi>
            </mrow>
            <mi mathvariant="normal">F</mi>
          </msubsup>
          <mo>=</mo>
          <msup>
            <mrow>
              <mo>(</mo>
              <msubsup>
                <mi>P</mi>
                <mrow>
                  <mi>j</mi>
                  <mi>k</mi>
                </mrow>
                <mi mathvariant="normal">L</mi>
              </msubsup>
              <mo>·</mo>
              <msubsup>
                <mi>P</mi>
                <mrow>
                  <mi>j</mi>
                  <mi>k</mi>
                </mrow>
                <mi mathvariant="normal">P</mi>
              </msubsup>
              <mo>)</mo>
            </mrow>
            <mrow>
              <mn>1</mn>
              <mo>/</mo>
              <mn>2</mn>
            </mrow>
          </msup>
        </mrow>
      </math>
      <p>
        EKS: chain every comparison through every third country, so that all 325 pairwise comparisons among the 26
        countries are consistent with one another,
      </p>
      <math display="block" className="math">
        <mrow>
          <msubsup>
            <mi>P</mi>
            <mrow>
              <mi>j</mi>
              <mi>k</mi>
            </mrow>
            <mi mathvariant="normal">EKS</mi>
          </msubsup>
          <mo>=</mo>
          <munderover>
            <mo>∏</mo>
            <mrow>
              <mi>l</mi>
              <mo>=</mo>
              <mn>1</mn>
            </mrow>
            <mi>N</mi>
          </munderover>
          <msup>
            <mrow>
              <mo>(</mo>
              <msubsup>
                <mi>P</mi>
                <mrow>
                  <mi>j</mi>
                  <mi>l</mi>
                </mrow>
                <mi mathvariant="normal">F</mi>
              </msubsup>
              <mo>·</mo>
              <msubsup>
                <mi>P</mi>
                <mrow>
                  <mi>l</mi>
                  <mi>k</mi>
                </mrow>
                <mi mathvariant="normal">F</mi>
              </msubsup>
              <mo>)</mo>
            </mrow>
            <mrow>
              <mn>1</mn>
              <mo>/</mo>
              <mi>N</mi>
            </mrow>
          </msup>
        </mrow>
      </math>
    </aside>
  );
}

function Facts({ rows }) {
  return (
    <dl className="facts">
      {rows.map(([k, v]) => (
        <React.Fragment key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

function Study({ s, index }) {
  const cls = `study is-${s.weight}${s.note ? ' has-note' : ''}`;
  if (s.weight === 'minor') {
    return (
      <article id={s.id} className={cls}>
        <div className="study-main">
          <p className="study-meta meta">
            <span className="tnum">1.{index}</span>
            <span>{s.setting}</span>
            <span>{s.when}</span>
          </p>
          <h3>{s.title}</h3>
          <p>{s.summary}</p>
        </div>
      </article>
    );
  }
  return (
    <article id={s.id} className={cls}>
      <div className="study-main">
        <p className="study-meta meta">
          <span className="tnum">1.{index}</span>
          <span>{s.setting}</span>
          <span>{s.when}</span>
        </p>
        <h3>{s.title}</h3>
        <p className="question">{s.question}</p>
        <Facts rows={s.rows} />

        {s.id === 'yield-curve' && (
          <figure className="figure">
            <SpreadChart />
            <figcaption>
              <b>Figure.</b> 10-year minus 3-month Treasury spread, monthly, 1962–2025, percentage points. Shaded:
              NBER recessions. Blue: inversions. This is also the line drawn under my name at the top of the page.
              Data: FRED (GS10, TB3MS, USREC).
            </figcaption>
          </figure>
        )}

        {s.id === 'diaspora' && (
          <figure className="figure">
            <a className="poster-thumb" href="/assets/shrestha_animesh_rimmes_poster.pdf" target="_blank" rel="noopener">
              <picture>
                <source type="image/webp" srcSet="/assets/poster-thumb.webp" />
                <img
                  src="/assets/poster-thumb.jpg"
                  width="1080"
                  height="702"
                  loading="lazy"
                  decoding="async"
                  alt="The research poster: abstract, data, results with charts of visas, income, occupation and state of residence, conclusions, and references."
                />
              </picture>
            </a>
            <figcaption>
              <b>Poster.</b> Georgia State Undergraduate Research Conference, April 2025. Opens the full PDF.
            </figcaption>
          </figure>
        )}

        {s.links && (
          <p className="links">
            {s.links.map((l) => (
              <A key={l.href} href={l.href}>
                {l.label}
              </A>
            ))}
          </p>
        )}
      </div>
      {s.note === 'fisher' && <FisherNote />}
    </article>
  );
}

function Research() {
  return (
    <Section id="research" no="1" title="Research" wide>
      <p className="section-intro">
        Most of this is work on faculty projects, where I built data and ran estimates; the recession memo and the
        census study were my own questions, the second under a faculty mentor. The Penn projects were part of the{' '}
        <A href={penn.profile}>{penn.program}</A> program with {penn.mentors}.
      </p>
      {research.map((s, i) => (
        <Study key={s.id} s={s} index={i + 1} />
      ))}
    </Section>
  );
}

/* --------------------------------------------------------- experience */

function Experience() {
  return (
    <Section id="experience" no="2" title="Experience" wide>
      {experience.map((g) => (
        <div key={g.group} className="sub">
          <h3 className="label">{g.group}</h3>
          <ol className="ledger xp">
            {g.items.map((it) => (
              <li key={it.role + it.org}>
                <span className="when">{it.when}</span>
                <div className="xp-who">
                  <h4>{it.role}</h4>
                  <p className="org">{it.org}</p>
                  <p className="meta">{it.place}</p>
                </div>
                <p className="body">
                  {it.text}{' '}
                  {it.see && (
                    <A className="see" href={it.see}>
                      {it.see === '/blogs' ? 'Writing' : 'More'}&nbsp;→
                    </A>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </Section>
  );
}

/* ---------------------------------------------------------- education */

function Education() {
  return (
    <Section id="education" no="3" title="Education">
      <div className="degree">
        <h3>{education.school}</h3>
        <p>
          {education.degree} <span className="muted">· {education.when}</span>
        </p>
        <p className="meta">
          {education.standing} ·{' '}
          <A href={person.transcript}>Unofficial transcript</A>
        </p>
      </div>

      <div className="course-table">
        {education.coursework.map((c) => (
          <div key={c.area}>
            <h4>{c.area}</h4>
            <ul>
              {c.courses.map((k) => (
                <li key={k.name}>
                  {k.name}
                  {k.grad && (
                    <abbr className="grad" title="Graduate-level course">
                      grad
                    </abbr>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="sub">
        <h3 className="label">Scholarships and awards</h3>
        <ul className="honors">
          {education.awards.map((a) => (
            <li key={a.name}>
              {a.name}
              {a.detail && <span className="detail"> ({a.detail})</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="sub">
        <h3 className="label">Before Georgia State</h3>
        <p className="honors-line">
          {education.earlier.name}. <span className="muted">{education.earlier.detail}</span>
        </p>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------- leadership */

function Leadership() {
  return (
    <Section id="leadership" no="4" title="Leadership">
      <h3 className="org-title">{leadership.org}</h3>
      <p className="meta">
        {leadership.roles.map((r, i) => (
          <React.Fragment key={r.title}>
            {i > 0 && ' · previously '}
            {r.title}, {r.when}
          </React.Fragment>
        ))}
      </p>
      <p className="muted scope">{leadership.scope}</p>
      <ul className="plain-list">
        {leadership.items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </Section>
  );
}

/* ----------------------------------------------------------- projects */

function Projects() {
  return (
    <Section id="projects" no="5" title="Projects">
      {projects.map((g) => (
        <div key={g.group} className="sub">
          <h3 className="label">{g.group}</h3>
          {g.items.map((p) => (
            <article key={p.title} id={p.id} className="project">
              <h4>
                {p.link ? (
                  <A className="quiet" href={p.link}>
                    {p.title}
                  </A>
                ) : (
                  p.title
                )}
                <span className="meta ctx">{p.context}</span>
              </h4>
              <p>
                {p.text}
                {p.see && (
                  <>
                    {' '}
                    <A href={p.see}>See §1.{research.findIndex((r) => `#${r.id}` === p.see) + 1}&nbsp;→</A>
                  </>
                )}
              </p>
              {p.stack && <p className="meta stack">{p.stack}</p>}
            </article>
          ))}
        </div>
      ))}
    </Section>
  );
}

/* ------------------------------------------- writing, talks, and news */

// Two short lists side by side on wide screens: a change of rhythm after the
// long single-column sections above.
function Desk() {
  return (
    <section className="section desk" aria-label="Writing, presentations, and news">
      <div className="frame desk-grid">
        <div id="writing" className="desk-col">
          <header className="desk-head">
            <span className="label sec-no">§ 6</span>
            <h2>Writing &amp; talks</h2>
          </header>
          <ol className="ledger compact">
            {writing.map((w) => (
              <li key={w.title}>
                <span className="when">{w.when}</span>
                <p>
                  <A className="quiet" href={w.href}>
                    {w.title}
                  </A>{' '}
                  <span className="src">{w.venue}</span>
                </p>
              </li>
            ))}
            <li className="ledger-divider" aria-hidden="true">
              <span className="label">Talks</span>
            </li>
            {presentations.map((p) => (
              <li key={p.title}>
                <span className="when">{p.when}</span>
                <p>
                  {p.href ? (
                    <A className="quiet" href={p.href}>
                      {p.title}
                    </A>
                  ) : (
                    p.title
                  )}{' '}
                  <span className="src">{p.venue}</span>
                </p>
              </li>
            ))}
          </ol>
          <p className="meta more">
            <Link to="/blogs">Writing, with summaries &rarr;</Link>
          </p>
        </div>

        <div id="news" className="desk-col">
          <header className="desk-head">
            <span className="label sec-no">§ 7</span>
            <h2>News</h2>
          </header>
          <ol className="ledger compact">
            {news.map((n) => (
              <li key={n.href}>
                <span className="when">{n.when}</span>
                <p>
                  <A className="quiet" href={n.href}>
                    {n.text}
                  </A>{' '}
                  <span className="src">{n.source}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <Section id="skills" no="8" title="Skills">
      <dl className="skills">
        {skills.map(([k, v]) => (
          <React.Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </React.Fragment>
        ))}
      </dl>
      <div className="sub" id="certifications">
        <h3 className="label">Certifications</h3>
        <ul className="honors">
          {certifications.map((c) => (
            <li key={c.title}>
              <A href={c.href}>{c.title}</A>
              <span className="detail">, {c.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Contact() {
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable: the address is on screen anyway */
    }
  };
  return (
    <Section id="contact" no="9" title="Contact" wide>
      <p className="contact-lede">
        Email is best. I am glad to hear about research assistant, predoctoral, and internship positions, and about
        any of the questions near the top of this page.
      </p>
      <p className="big-email">
        <a href={`mailto:${person.email}`}>{person.email}</a>
        <button type="button" className="copy" onClick={copy} aria-live="polite">
          {copied ? 'Copied' : 'Copy'}
        </button>
      </p>
      <dl className="contact-list">
        <dt>CV</dt>
        <dd>
          <a href={person.cv} target="_blank" rel="noopener">
            Animesh_CV.pdf
          </a>{' '}
          <span className="meta">one page, updated {person.cvUpdated}</span>
        </dd>
        <dt>GitHub</dt>
        <dd>
          <A href={person.github}>Animeshav14</A>
        </dd>
        <dt>LinkedIn</dt>
        <dd>
          <A href={person.linkedin}>animeshshr</A>
        </dd>
        <dt>Based in</dt>
        <dd>{person.city}</dd>
      </dl>

      <details
        id="intermission"
        className="intermission sub"
        onToggle={(e) => e.currentTarget.open && setLoaded(true)}
      >
        <summary>Intermission: a small game, kept from an earlier version of this site</summary>
        <p className="meta">Space or tap to jump. It doesn’t keep score between visits.</p>
        {loaded && (
          <div className="game-frame">
            <iframe title="Dinosaur runner game" src="/game/index.html" loading="lazy" />
          </div>
        )}
      </details>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Intro />
      <Research />
      <Experience />
      <Education />
      <Leadership />
      <Projects />
      <Desk />
      <Skills />
      <Contact />
    </>
  );
}
