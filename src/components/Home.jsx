import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Horizon from './Horizon.jsx';
import SpreadChart from './SpreadChart.jsx';
import {
  person,
  questions,
  penn,
  research,
  ftaEvents,
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
        <span className="sr-only"> (opens in new tab)</span>
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

/* Small MathML helpers: the formulas below are long enough without them. */
const I = ({ children }) => <mi>{children}</mi>;
const O = ({ children }) => <mo>{children}</mo>;
const N = ({ children }) => <mn>{children}</mn>;
const Sub = ({ b, s }) => (
  <msub>
    {b}
    {s}
  </msub>
);
const ij = (a, b) => (
  <mrow>
    <I>{a}</I>
    <I>{b}</I>
  </mrow>
);
const P = (sup, a, b) => (
  <msubsup>
    <I>P</I>
    {ij(a, b)}
    <mi mathvariant="normal">{sup}</mi>
  </msubsup>
);

/* -------------------------------------------------------------- intro */

function Intro() {
  const name = (
    <div className="hero-name">
      <p className="hero-kicker">Economics &amp; mathematics, Georgia State University</p>
      <h1 className="name">
        <span>Animesh</span> <span>Shrestha</span>
      </h1>
    </div>
  );

  return (
    <section className="hero" aria-label="Introduction">
      <Horizon head={name} />

      <div className="frame intro-body">
        <div className="intro-main">
          <p className="lede">
            I study economics and mathematics at Georgia State University. My interests are in macroeconomics,
            development, and political economy, and so far most of my work has been empirical.
          </p>
          <p className="lede-2">
            This past summer I was a research scholar at the University of Pennsylvania, where I built a
            purchasing-power-parity index for health services across 26 countries. Before that I spent a year as a
            research assistant in Georgia State’s economics department, assembling a 46-country panel to study U.S.
            free trade agreements, foreign aid, and capital flows. I intend to go on to a PhD in economics.
          </p>
          <ul className="intro-links">
            <li>
              <a href={person.cv} target="_blank" rel="noopener">
                CV
                <span className="sr-only"> (opens in new tab)</span>
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
            <source
              type="image/webp"
              srcSet="/assets/portrait-480.webp 480w, /assets/portrait-960.webp 960w"
              sizes="(min-width: 60rem) 20rem, 8rem"
            />
            <img
              src="/assets/portrait-480.jpg"
              srcSet="/assets/portrait-480.jpg 480w, /assets/portrait-960.jpg 960w"
              sizes="(min-width: 60rem) 20rem, 8rem"
              width="480"
              height="600"
              alt="Animesh Shrestha, in sunglasses, on a bridge above a highway with the Atlanta skyline behind him."
            />
          </picture>
          <figcaption>Atlanta, looking toward downtown.</figcaption>
        </figure>

        <aside className="intro-now" aria-label="Currently">
          <span className="label">Now</span>
          <ul>
            <li>Junior, B.S. expected 2028</li>
            <li>Chief Economist, Portfolio Management Group</li>
            <li>President, Economics Club</li>
          </ul>
        </aside>
      </div>

      <div className="frame asks" id="questions">
        <h2 className="label">Questions my work has asked</h2>
        <ol>
          {questions.map((q) => (
            <li key={q.href}>
              <A href={q.href}>{q.text}</A>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- research */

// Health PPP: the two index formulas, set large.
function IndexArt() {
  return (
    <figure className="art art-math" aria-label="Index formulas">
      <p className="art-label">Fisher, between countries j and k</p>
      <math display="block" className="math">
        <mrow>
          {P('F', 'j', 'k')}
          <O>=</O>
          <msup>
            <mrow>
              <O>(</O>
              {P('L', 'j', 'k')}
              <O>·</O>
              {P('P', 'j', 'k')}
              <O>)</O>
            </mrow>
            <mrow>
              <N>1</N>
              <mo lspace="0" rspace="0">/</mo>
              <N>2</N>
            </mrow>
          </msup>
        </mrow>
      </math>
      <p className="art-label">EKS, through every third country l</p>
      <math display="block" className="math">
        <mrow>
          {P('EKS', 'j', 'k')}
          <O>=</O>
          <munderover>
            <O>∏</O>
            <mrow>
              <I>l</I>
              <O>=</O>
              <N>1</N>
            </mrow>
            <I>N</I>
          </munderover>
          <msup>
            <mrow>
              <O>(</O>
              {P('F', 'j', 'l')}
              <O>·</O>
              {P('F', 'l', 'k')}
              <O>)</O>
            </mrow>
            <mrow>
              <N>1</N>
              <mo lspace="0" rspace="0">/</mo>
              <I>N</I>
            </mrow>
          </msup>
        </mrow>
      </math>
      <p className="art-label">Pairs to reconcile</p>
      <math display="block" className="math">
        <mrow>
          <mrow>
            <O>(</O>
            <mfrac linethickness="0">
              <N>26</N>
              <N>2</N>
            </mfrac>
            <O>)</O>
          </mrow>
          <O>=</O>
          <N>325</N>
        </mrow>
      </math>
      <figcaption>
        The Fisher index is the geometric mean of the Laspeyres and Paasche indices. EKS makes all 325 pairwise
        comparisons among the 26 countries consistent with one another.
      </figcaption>
    </figure>
  );
}

// Trade agreements: the events on a time rail, then the usual event-study form.
const RAIL_FROM = 1983;
const RAIL_TO = 2014;

function EventsArt() {
  const total = ftaEvents.reduce((s, [, c]) => s + c.length, 0);
  return (
    <figure className="art art-events">
      <p className="art-label">
        U.S. free trade agreements by year of entry into force, {ftaEvents[0][0]}–{ftaEvents[ftaEvents.length - 1][0]}
      </p>
      <div className="rail" aria-hidden="true">
        {ftaEvents.map(([yr, cs]) =>
          cs.map((c, k) => (
            <span
              key={c}
              className="rail-dot"
              style={{ left: `${((yr - RAIL_FROM) / (RAIL_TO - RAIL_FROM)) * 100}%`, bottom: `${k * 0.75}rem` }}
            />
          ))
        )}
        {[1985, 1995, 2005].map((yr) => (
          <span key={yr} className="rail-tick" style={{ left: `${((yr - RAIL_FROM) / (RAIL_TO - RAIL_FROM)) * 100}%` }}>
            {yr}
          </span>
        ))}
      </div>
      <ol className="events">
        {ftaEvents.map(([yr, cs]) => (
          <li key={yr}>
            <span className="yr">{yr}</span>
            <span>{cs.join(', ')}</span>
          </li>
        ))}
      </ol>
      <p className="art-label">The usual event-study form</p>
      <math display="block" className="math">
        <mrow>
          <Sub b={<I>y</I>} s={ij('i', 't')} />
          <O>=</O>
          <Sub b={<I>α</I>} s={<I>i</I>} />
          <O>+</O>
          <Sub b={<I>λ</I>} s={<I>t</I>} />
          <O>+</O>
          <munder>
            <O>∑</O>
            <mrow>
              <I>k</I>
              <O>≠</O>
              <N>−1</N>
            </mrow>
          </munder>
          <Sub b={<I>β</I>} s={<I>k</I>} />
          <mn>𝟙</mn>
          <mrow>
            <O>[</O>
            <I>t</I>
            <O>−</O>
            <Sub b={<I>E</I>} s={<I>i</I>} />
            <O>=</O>
            <I>k</I>
            <O>]</O>
          </mrow>
          <O>+</O>
          <Sub b={<I>ε</I>} s={ij('i', 't')} />
        </mrow>
      </math>
      <figcaption>
        {total} partner countries; the rail stacks agreements that took effect in the same year. In the equation,
        country <i>i</i> is observed in year <i>t</i>, <i>E</i>
        <sub>
          <i>i</i>
        </sub>{' '}
        is the year its agreement took effect, and the year before entry is the reference. Dates: USTR.
      </figcaption>
    </figure>
  );
}

function DiasporaArt() {
  return (
    <figure className="art art-poster">
      <a className="poster-thumb" href="/assets/shrestha_animesh_rimmes_poster.pdf" target="_blank" rel="noopener">
        <span className="sr-only">Open the poster as a PDF (opens in new tab)</span>
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
        Poster, Georgia State Undergraduate Research Conference, April 2025. Opens the full PDF.
      </figcaption>
    </figure>
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

function StudyHead({ s }) {
  return (
    <>
      <p className="study-meta">
        <span>{s.setting}</span>
        <span className="tnum">{s.when}</span>
      </p>
      <h3>{s.title}</h3>
    </>
  );
}

function Links({ links }) {
  if (!links) return null;
  return (
    <p className="links">
      {links.map((l) => (
        <A key={l.href} href={l.href}>
          {l.label}
        </A>
      ))}
    </p>
  );
}

// Each study is laid out as a spread: text on one side, an artifact from the
// work itself on the other, alternating. The yield-curve study is the
// exception: its figure runs the full width under the text.
const ART = { 'health-ppp': IndexArt, fta: EventsArt, diaspora: DiasporaArt };

function Study({ s, flip }) {
  if (s.id === 'yield-curve') {
    return (
      <article id={s.id} className="study study-wide">
        <div className="study-top">
          <div className="study-main">
            <StudyHead s={s} />
            <p className="question">{s.question}</p>
            <Links links={s.links} />
          </div>
          <Facts rows={s.rows} />
        </div>
        <figure className="figure">
          <SpreadChart />
          <figcaption>
            10-year minus 3-month Treasury spread, monthly, 1962–2025, percentage points. Shaded: NBER recessions.
            Blue: inversions. Data: FRED (GS10, TB3MS, USREC).
          </figcaption>
        </figure>
      </article>
    );
  }
  const Art = ART[s.id];
  return (
    <article id={s.id} className={`study spread${flip ? ' flip' : ''}`}>
      <div className="study-main">
        <StudyHead s={s} />
        <p className="question">{s.question}</p>
        <Facts rows={s.rows} />
        <Links links={s.links} />
      </div>
      {Art && <Art />}
    </article>
  );
}

function Research() {
  const major = research.filter((s) => s.weight !== 'minor');
  const minor = research.filter((s) => s.weight === 'minor');
  return (
    <section id="research" className="section research" aria-labelledby="research-h">
      <div className="frame">
        <header className="sec-head split">
          <h2 id="research-h" className="sec-title xl">
            Research
          </h2>
          <p className="sec-intro">
            Most of this is work on faculty projects, where I built data and ran estimates; the recession memo and the
            census study were my own questions, the second under a faculty mentor. The Penn projects were part of the{' '}
            <A href={penn.profile}>{penn.program}</A> program with {penn.mentors}.
          </p>
        </header>
        {major.map((s) => (
          <Study key={s.id} s={s} flip={s.id === 'fta'} />
        ))}
        {minor.map((s) => (
          <article key={s.id} id={s.id} className="study study-minor">
            <p className="study-meta">
              <span>{s.setting}</span>
              <span className="tnum">{s.when}</span>
            </p>
            <div>
              <h3>{s.title}</h3>
              <p>{s.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- experience */

function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-h">
      <div className="frame">
        <header className="sec-head">
          <h2 id="experience-h" className="sec-title l">
            Experience
          </h2>
        </header>
        {experience.map((g) => (
          <div key={g.group} className="register-group">
            <h3 className="label">{g.group}</h3>
            <ol className="register">
              {g.items.map((it) => (
                <li key={it.role + it.org}>
                  <span className="when tnum">{it.when}</span>
                  <div className="who">
                    <h4>{it.role}</h4>
                    <p className="org">{it.org}</p>
                  </div>
                  <p className="body">
                    {it.text}{' '}
                    {it.see && (
                      <A className="see" href={it.see}>
                        {it.see === '/writing' ? 'Writing' : 'More'}&nbsp;→
                      </A>
                    )}
                  </p>
                  <span className="where">{it.place}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- education */

function Education() {
  return (
    <section id="education" className="section record" aria-labelledby="education-h">
      <div className="frame record-grid">
        <h2 id="education-h" className="sec-label">
          Education
        </h2>
        <div className="record-main">
          <h3 className="record-title">{education.school}</h3>
          <p className="record-line">
            {education.degree} <span className="muted">· {education.when}</span>
          </p>
          <p className="meta">
            {education.standing} · <A href={person.transcript}>Unofficial transcript</A>
          </p>

          <div className="courses">
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

          <div className="record-foot">
            <div>
              <h4>Scholarships and awards</h4>
              <ul className="honors">
                {education.awards.map((a) => (
                  <li key={a.name}>
                    {a.name}
                    {a.detail && <span className="detail"> ({a.detail})</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Before Georgia State</h4>
              <p className="honors-line">
                {education.earlier.name}. <span className="muted">{education.earlier.detail}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- leadership */

function Leadership() {
  return (
    <section id="leadership" className="section record" aria-labelledby="leadership-h">
      <div className="frame record-grid">
        <h2 id="leadership-h" className="sec-label">
          Leadership
        </h2>
        <div className="record-main">
          <h3 className="record-title">{leadership.org}</h3>
          <p className="record-line">
            {leadership.roles.map((r, i) => (
              <React.Fragment key={r.title}>
                {i > 0 && <span className="muted"> · previously </span>}
                {r.title}, <span className="tnum">{r.when}</span>
              </React.Fragment>
            ))}
          </p>
          <p className="meta">{leadership.scope}</p>
          <ul className="plain-list">
            {leadership.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- projects */

// Each project is set beside the one line of mathematics it runs on.
const PROJECT_MATH = {
  pmg: (
    <math display="block" className="math">
      <mrow>
        <Sub b={<I>z</I>} s={<I>t</I>} />
        <O>=</O>
        <msup>
          <I>W</I>
          <O>⊤</O>
        </msup>
        <Sub b={<I>x</I>} s={<I>t</I>} />
        <O>,</O>
        <mspace width="0.8em" />
        <Sub b={<I>r</I>} s={<I>t</I>} />
        <O>=</O>
        <munder>
          <mo movablelimits="false">arg min</mo>
          <I>j</I>
        </munder>
        <msup>
          <mrow>
            <O>‖</O>
            <Sub b={<I>z</I>} s={<I>t</I>} />
            <O>−</O>
            <Sub b={<I>μ</I>} s={<I>j</I>} />
            <O>‖</O>
          </mrow>
          <N>2</N>
        </msup>
      </mrow>
    </math>
  ),
  'monte-carlo': (
    <math display="block" className="math">
      <mrow>
        <Sub b={<I>W</I>} s={<mrow><I>t</I><O>+</O><N>1</N></mrow>} />
        <O>=</O>
        <mrow>
          <O>(</O>
          <N>1</N>
          <O>+</O>
          <Sub b={<I>r</I>} s={<mrow><I>t</I><O>+</O><N>1</N></mrow>} />
          <O>)</O>
        </mrow>
        <mrow>
          <O>(</O>
          <Sub b={<I>W</I>} s={<I>t</I>} />
          <O>−</O>
          <I>c</I>
          <msup>
            <mrow>
              <O>(</O>
              <N>1</N>
              <O>+</O>
              <I>π</I>
              <O>)</O>
            </mrow>
            <I>t</I>
          </msup>
          <O>)</O>
        </mrow>
      </mrow>
    </math>
  ),
  nowcasting: (
    <math display="block" className="math">
      <mrow>
        <mi mathvariant="normal">Pr</mi>
        <mrow>
          <O>(</O>
          <Sub b={<I>R</I>} s={<mrow><I>t</I><O>,</O><I>t</I><O>+</O><N>12</N></mrow>} />
          <O>=</O>
          <N>1</N>
          <O>)</O>
        </mrow>
        <O>=</O>
        <mi mathvariant="normal">Λ</mi>
        <mrow>
          <O>(</O>
          <Sub b={<I>β</I>} s={<N>0</N>} />
          <O>+</O>
          <Sub b={<I>β</I>} s={<N>1</N>} />
          <Sub b={<I>S</I>} s={<I>t</I>} />
          <O>)</O>
        </mrow>
      </mrow>
    </math>
  ),
};

function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-h">
      <div className="frame">
        <header className="sec-head split">
          <h2 id="projects-h" className="sec-title l">
            Projects
          </h2>
          <p className="sec-intro">
            Programs for the student fund, a hackathon, and my own questions. Most are Python; the source is on <A href={person.github}>GitHub</A>.
          </p>
        </header>
        {projects.map((g) => (
          <ol key={g.group} className="index" aria-label={g.group}>
            {g.items.map((p) => (
              <li key={p.title} id={p.id} className="index-row">
                <div className="index-head">
                  <p className="index-ctx">{p.context}</p>
                  <h3>
                    {p.link ? (
                      <A className="index-link" href={p.link}>
                        {p.title}
                      </A>
                    ) : (
                      p.title
                    )}
                  </h3>
                </div>
                <div className="index-body">
                  <p>
                    {p.text}
                    {p.see && (
                      <>
                        {' '}
                        <A className="see" href={p.see}>
                          See Research&nbsp;→
                        </A>
                      </>
                    )}
                  </p>
                  {p.stack && <p className="stack">{p.stack}</p>}
                </div>
                <div className="index-math">{PROJECT_MATH[p.id] || null}</div>
              </li>
            ))}
          </ol>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------- writing, talks, and news */

function Desk() {
  return (
    <section className="section desk" aria-label="Writing, presentations, and news">
      <div className="frame desk-grid">
        <div id="writing" className="desk-col">
          <h2 className="sec-title m">Writing &amp; talks</h2>
          <ol className="ledger">
            {writing.map((w) => (
              <li key={w.title}>
                <span className="when tnum">{w.when}</span>
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
                <span className="when tnum">{p.when}</span>
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
          <p className="more">
            <Link to="/writing">Writing, with summaries &rarr;</Link>
          </p>
        </div>

        <div id="news" className="desk-col">
          <h2 className="sec-title m">News</h2>
          <ol className="ledger">
            {news.map((n) => (
              <li key={n.href}>
                <span className="when tnum">{n.when}</span>
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
    <section id="skills" className="section compact" aria-labelledby="skills-h">
      <div className="frame record-grid">
        <h2 id="skills-h" className="sec-label">
          Skills
        </h2>
        <div className="skills-wrap">
          <dl className="skills">
            {skills.map(([k, v]) => (
              <React.Fragment key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </React.Fragment>
            ))}
          </dl>
          <div id="certifications" className="certs">
            <h3>Certifications</h3>
            <ul>
              {certifications.map((c) => (
                <li key={c.title}>
                  <A href={c.href}>{c.title}</A>
                  <span className="detail">, {c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
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
    <section id="contact" className="section contact" aria-labelledby="contact-h">
      <div className="frame">
        <h2 id="contact-h" className="sec-label">
          Contact
        </h2>
        <p className="big-email">
          <a href={`mailto:${person.email}`}>{person.email}</a>
        </p>
        <div className="contact-grid">
          <p className="contact-lede">
            Email is best. I am glad to hear about research assistant, predoctoral, and internship positions, and about
            any of the questions near the top of this page.{' '}
            <button type="button" className="linklike copy" onClick={copy}>
              {copied ? 'Copied' : 'Copy the address'}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied' : ''}
            </span>
          </p>
          <dl className="contact-list">
            <dt>CV</dt>
            <dd>
              <a href={person.cv} target="_blank" rel="noopener">
                Animesh_CV.pdf
                <span className="sr-only"> (opens in new tab)</span>
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
        </div>
      </div>
    </section>
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
