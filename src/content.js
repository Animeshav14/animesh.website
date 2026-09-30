// Everything factual on the site lives here. The CV (public/assets/Animesh_CV.pdf)
// is the source of truth; when it changes, change this file to match.

export const person = {
  name: 'Animesh Shrestha',
  email: 'ashrestha7@gsu.edu',
  city: 'Atlanta, Georgia',
  cv: '/assets/Animesh_CV.pdf',
  github: 'https://github.com/Animeshav14',
  linkedin: 'https://www.linkedin.com/in/animeshshr/',
  transcript: 'https://drive.google.com/file/d/17cH6FQPHSLabMgkvpMRrX54O3gWH1BVL/view?usp=drive_link',
  updated: 'September 2026',
  cvUpdated: 'August 2026',
};

// Questions the projects below have actually asked. Each points at its entry.
export const questions = [
  { text: 'When one country spends more on health care than another, how much of the gap is price and how much is quantity?', href: '#health-ppp' },
  { text: 'Do U.S. free trade agreements change how much aid and capital flow to partner countries?', href: '#fta' },
  { text: 'What does the slope of the yield curve say about the next twelve months?', href: '#yield-curve' },
  { text: 'How have Nepali immigrants fared in the U.S. relative to other South Asian immigrants?', href: '#diaspora' },
];

export const penn = {
  where: 'University of Pennsylvania, Leonard Davis Institute & Wharton',
  program: 'Summer Undergraduate Mentored Research (SUMR)',
  profile: 'https://ldi.upenn.edu/education/penn-ldi-training-programs/sumr/sumr-scholars/animesh-shrestha/',
  mentors: 'Claudio Lucarelli (Wharton) and Divya Pandey (Penn Medicine)',
  when: 'May – Aug 2026',
};

export const research = [
  {
    id: 'health-ppp',
    weight: 'lead',
    title: 'A purchasing-power-parity index for health services',
    setting: 'Penn LDI & Wharton · SUMR',
    when: 'Summer 2026',
    question:
      'Health spending per person differs enormously across rich countries. Comparing it in dollars at market exchange rates mixes up two things: how much care people receive and what that care costs. A price index built for health services is one way to separate them.',
    rows: [
      ['Data', 'OECD health expenditure and utilization data for 26 countries.'],
      ['Method', 'Bilateral Fisher price indices between every pair of countries, made transitive with the EKS multilateral procedure; results benchmarked against published health price-level measures.'],
      ['My part', 'Built and validated the index: assembled the country data, computed the bilateral and multilateral indices, and compared the output against existing estimates.'],
      ['Status', 'Experimental index, built over the summer program.'],
    ],
    links: [{ label: 'Symposium presentation', href: 'https://upenn.app.box.com/s/jfh7cvq5stz32bvbrf8fjuyi3mbepr5y' }],
    note: 'fisher',
  },
  {
    id: 'fta',
    weight: 'lead',
    title: 'U.S. free trade agreements, foreign aid, and cross-border capital',
    setting: 'Department of Economics, Georgia State · with Soojin Kim',
    when: 'Aug 2025 – May 2026',
    question:
      'The United States signs free trade agreements with a small set of partners. Whether aid, investment, and other capital flows to those partners change after an agreement takes effect is an empirical question with a natural before-and-after structure.',
    rows: [
      ['Data', 'Country-year panel for 46 countries from the World Bank, OECD, FRED, and BEA.'],
      ['Method', 'Event-time panels around each agreement’s entry into force; regression and event-study models in R and Stata to compare pre- and post-agreement paths.'],
      ['My part', 'Extracted, cleaned, merged, and validated the macroeconomic and financial series; estimated the models; produced figures and short summaries comparing trends across countries and industries, which I presented to faculty.'],
      ['Status', 'Faculty research project; I worked on it as an undergraduate research assistant.'],
    ],
  },
  {
    id: 'yield-curve',
    weight: 'figure',
    title: 'Nowcasting U.S. recession risk with the yield curve',
    setting: 'Independent research memo',
    when: 'Nov 2025',
    question:
      'An inverted yield curve, with short rates above long rates, has preceded every U.S. recession since the late 1960s. How much does the 10-year minus 3-month spread say about the next twelve months on its own?',
    rows: [
      ['Data', 'Monthly 10-year and 3-month Treasury rates and the NBER recession indicator, from FRED.'],
      ['Method', 'Logistic regression and a random forest predicting whether a recession begins within twelve months; trained on data through about 2004 and tested on the most recent twenty years.'],
      ['Result', 'Test-period AUC of about 0.64 (logit) and 0.66 (random forest). Both models raise the predicted probability ahead of 2008 and 2020, but the test window also includes the 2022–24 inversion, which was not followed by a recession. A single predictor is the main limitation.'],
    ],
    links: [
      { label: 'Memo (PDF)', href: 'https://github.com/Animeshav14/recession-nowcasting/blob/main/memo/memo.pdf' },
      { label: 'Code and data', href: 'https://github.com/Animeshav14/recession-nowcasting' },
    ],
  },
  {
    id: 'diaspora',
    weight: 'figure',
    title: 'The Nepali population in the United States',
    setting: 'RIMMES, Department of Mathematics & Statistics, Georgia State · with Yichuan Zhao',
    when: 'Aug 2024 – May 2025',
    question:
      'Nepali migration to the U.S. grew quickly over the 2010s, mostly through student and other non-immigrant visas. How do Nepali immigrants compare with other South Asian immigrants in education, occupation, and income?',
    rows: [
      ['Data', 'American Community Survey microdata via IPUMS, 2007–2020 one-year samples: 11,249 people born in Nepal and 358,594 immigrants from seven South Asian countries.'],
      ['Findings', 'Nearly half of Nepali-born adults 25 and over held a bachelor’s degree or higher; median personal income was $43,486 over 2018–2020, with a persistent gender gap at each education level.'],
      ['Output', 'Poster, Georgia State Undergraduate Research Conference, April 2025.'],
    ],
    links: [{ label: 'Poster (PDF)', href: '/assets/shrestha_animesh_rimmes_poster.pdf' }],
  },
  {
    id: 'mental-models',
    weight: 'minor',
    title: 'Mental models and health behavior: a scoping review',
    setting: 'Penn LDI · SUMR',
    when: 'Summer 2026',
    summary:
      'Screened and synthesized studies for a scoping review of how people’s mental models shape health behavior; contributed to evidence extraction and to drafting the manuscript.',
  },
];

// U.S. free trade agreements by year of entry into force (USTR). Context for
// the trade study's event-time design, not a list of its sample.
export const ftaEvents = [
  [1985, ['Israel']],
  [1989, ['Canada']],
  [1994, ['Mexico']],
  [2001, ['Jordan']],
  [2004, ['Chile', 'Singapore']],
  [2005, ['Australia']],
  [2006, ['Morocco', 'El Salvador', 'Honduras', 'Nicaragua', 'Guatemala', 'Bahrain']],
  [2007, ['Dominican Republic']],
  [2009, ['Costa Rica', 'Oman', 'Peru']],
  [2012, ['Korea', 'Colombia', 'Panama']],
];

export const experience = [
  {
    group: 'Research',
    items: [
      {
        when: 'May – Aug 2026',
        role: 'Research Scholar (SUMR)',
        org: 'University of Pennsylvania, Leonard Davis Institute & Wharton',
        place: 'Philadelphia',
        text: 'Twelve weeks on health economics and health policy with Claudio Lucarelli and Divya Pandey. Presented at the SUMR research symposium; attended the AcademyHealth Annual Research Meeting in Seattle.',
        see: '#health-ppp',
      },
      {
        when: 'Aug 2025 – May 2026',
        role: 'Research Assistant',
        org: 'Department of Economics, Georgia State University',
        place: 'Atlanta',
        text: 'Trade agreements, foreign aid, and capital flows with Soojin Kim.',
        see: '#fta',
      },
      {
        when: 'Aug 2024 – May 2025',
        role: 'Undergraduate Researcher, RIMMES',
        org: 'Department of Mathematics & Statistics, Georgia State University',
        place: 'Atlanta',
        text: 'Census microdata study of Nepali immigrants with Yichuan Zhao; supported by RIMMES and the University Assistantship Program.',
        see: '#diaspora',
      },
    ],
  },
  {
    group: 'Markets and policy',
    items: [
      {
        when: 'Feb 2026 – now',
        role: 'Chief Economist',
        org: 'Portfolio Management Group (student-managed fund, $1.6M)',
        place: 'Atlanta',
        text: 'Track macroeconomic indicators, sector trends, and market conditions to flag risks and opportunities for asset allocation. Built a regime-classification pipeline in Python (PCA and k-means) whose readings feed the recommendations I present to the investment team.',
        see: '#pmg',
      },
      {
        when: 'May – Aug 2025',
        role: 'Data Analytics Intern',
        org: 'Paperwork Solutions',
        place: 'Aldershot, UK',
        text: 'Analyzed client financial data in Python and Excel across 30+ portfolios, automated the preprocessing and reporting steps, and moved the firm’s client records from a single local machine to cloud storage.',
      },
      {
        when: 'Aug – Nov 2023',
        role: 'Research & Policy Intern',
        org: 'Nepal Economic Forum',
        place: 'Kathmandu',
        text: 'Wrote macroeconomic reviews on growth, inflation, and fiscal policy; tracked indicators and summarized World Bank and national policy conferences for the Forum’s reports.',
        see: '/writing',
      },
    ],
  },
  {
    group: 'Teaching',
    items: [
      {
        when: 'From Aug 2025',
        role: 'Supplemental Instruction Leader, Calculus I',
        org: 'Department of Mathematics, Georgia State University',
        place: 'Atlanta',
        text: 'Weekly review sessions for a course of 120+ students, with study materials I prepare.',
      },
      {
        when: 'Aug 2024 – May 2025',
        role: 'Undergraduate Lab Assistant',
        org: 'Math Lab, Georgia State University',
        place: 'Atlanta',
        text: 'Tutored College Algebra and Precalculus.',
      },
    ],
  },
];

export const education = {
  school: 'Georgia State University',
  degree: 'B.S., Economics and Mathematics',
  when: 'Expected May 2028',
  standing: 'GPA 4.0 · President’s List',
  coursework: [
    {
      area: 'Mathematics',
      courses: [
        { name: 'Real Analysis', grad: true },
        { name: 'Probability & Mathematical Statistics', grad: true },
        { name: 'Linear Algebra' },
        { name: 'Discrete Mathematics' },
        { name: 'Calculus III' },
      ],
    },
    {
      area: 'Economics',
      courses: [
        { name: 'Microeconomic Analysis', grad: true },
        { name: 'Econometrics' },
        { name: 'Macroeconomics' },
      ],
    },
    {
      area: 'Computing & statistics',
      courses: [{ name: 'Python Programming' }, { name: 'Statistical Methods' }, { name: 'Intro to Computer Science II' }],
    },
  ],
  awards: [
    { name: 'Presidential Scholarship', detail: 'full ride, merit-based' },
    { name: 'Zeinah Danielle Aouani Scholarship for Economics Research' },
    { name: 'University Assistantship Program', detail: 'funded undergraduate research' },
  ],
  earlier: {
    name: 'A Levels, Little Angels’ College, Nepal',
    detail: 'Top in Nepal in Economics, GCE A Levels. Gold medal, Business Case Analysis round, Third Nepal Economic Olympiad (2022).',
  },
};

export const leadership = {
  org: 'Economics Club @ GSU',
  roles: [
    { title: 'President', when: 'May 2026 – now' },
    { title: 'Opportunities Director', when: '2025 – 2026' },
  ],
  scope: '245+ members interested in economics, finance, consulting, and policy.',
  items: [
    'Plan the year’s programming: speaker events, partnerships with other universities’ clubs, and career sessions.',
    'Built the club’s internship finder: a Streamlit app that loads a curated sheet of 100+ internships, filters by major, graduation year, industry, and location, and uses the OpenAI API to answer questions and give feedback on how a résumé fits a posting.',
  ],
};

export const projects = [
  {
    group: 'Economics and finance',
    items: [
      {
        id: 'pmg',
        title: 'Market-regime classification',
        context: 'Portfolio Management Group · 2026',
        text: 'Reduces a set of growth-momentum indicators and a set of inflation and policy indicators to principal components, then groups periods into regimes with k-means. The output feeds the fund’s portfolio discussions.',
        stack: 'Python · scikit-learn · pandas',
        link: 'https://github.com/Animeshav14/PMG-Econ',
      },
      {
        id: 'monte-carlo',
        title: 'Retirement portfolio Monte Carlo',
        context: '2025',
        text: 'Simulates whether a retirement fund lasts from a starting age to a target age under inflation-adjusted withdrawals, and compares investment strategies by their probability of running out.',
        stack: 'Python · Jupyter',
        link: 'https://github.com/Animeshav14/MonteCarlo_Simulation',
      },
      {
        id: 'nowcasting',
        title: 'Recession nowcasting',
        context: '2025',
        text: 'Yield-curve model and memo; described under Research.',
        see: '#yield-curve',
        link: 'https://github.com/Animeshav14/recession-nowcasting',
      },
      {
        id: 'debt-relief',
        title: 'Debt-Relief',
        context: 'HackGT 2025',
        text: 'A Flask app that combines the Capital One Nessie API with a user’s income, expenses, and debts to project payoff timelines and compare repayment strategies.',
        stack: 'Python · Flask',
        link: 'https://github.com/Animeshav14/Debt-Relief',
      },
    ],
  },
];

export const writing = [
  {
    title: 'Keynesian Economics and Its Influence on U.S. Economic Policy',
    venue: 'Research paper',
    when: 'Dec 2025',
    summary:
      'How Keynesian theory has shaped fiscal and monetary policy decisions in the United States.',
    href: 'https://drive.google.com/file/d/1wLSfM4lM7SYYrhLIzq4xkYsZZhbKpTZ6/view',
    kind: 'PDF',
  },
  {
    title: 'Nowcasting U.S. Recession Risk with the Yield Curve and Machine Learning',
    venue: 'Research memo',
    when: 'Nov 2025',
    summary: 'Three pages on how much the 10-year minus 3-month spread says about near-term recession risk.',
    href: 'https://github.com/Animeshav14/recession-nowcasting/blob/main/memo/memo.pdf',
    kind: 'PDF',
  },
  {
    title: 'The Digital Payment System in Nepal: From Cash to Cashless Economy',
    venue: 'Nepal Economic Forum',
    when: 'Nov 2023',
    summary:
      'Nepal’s move toward digital payments: the policy measures behind adoption and the infrastructure gaps that remain.',
    href: 'https://nepaleconomicforum.org/the-digital-payment-system-in-nepal-from-cash-to-cashless-economy/',
    kind: 'Article',
  },
];

export const presentations = [
  {
    title: 'Summer research presentation',
    venue: 'Penn LDI SUMR Research Symposium, Philadelphia',
    when: 'Summer 2026',
    href: 'https://upenn.app.box.com/s/jfh7cvq5stz32bvbrf8fjuyi3mbepr5y',
  },
  {
    title: 'Nepalese Population in the United States: A Demographic and Socioeconomic Analysis',
    venue: 'Georgia State Undergraduate Research Conference, Atlanta (poster)',
    when: 'Apr 2025',
    href: '/assets/shrestha_animesh_rimmes_poster.pdf',
  },
];

export const news = [
  {
    when: 'Sep 2026',
    text: 'The Andrew Young School of Policy Studies wrote about my summer at Penn.',
    source: 'AYSPS on LinkedIn',
    href: 'https://www.linkedin.com/feed/update/urn:li:share:7506110409913917441/',
  },
  {
    when: 'Summer 2026',
    text: 'SUMR scholar profile, Penn Leonard Davis Institute of Health Economics.',
    source: 'Penn LDI',
    href: penn.profile,
  },
  {
    when: 'Oct 2025',
    text: 'Quoted in “Students Pop-In to Discover What the Honors College Has in Store.”',
    source: 'Georgia State News',
    href: 'https://news.gsu.edu/2025/10/13/students-pop-in-to-discover-what-the-honors-college-has-in-store/',
  },
  {
    when: 'Jul 2025',
    text: 'Featured in “Beyond Expectations: How Georgia State’s Top Scholars Thrive in the Honors College.”',
    source: 'Georgia State News',
    href: 'https://news.gsu.edu/2025/07/14/beyond-expectations-how-georgia-states-top-scholars-thrive-in-the-honors-college/',
  },
  {
    when: 'Nov 2024',
    text: 'Featured in the Honors College’s post on the Stamps and Presidential Scholarships.',
    source: 'GSU Honors on Instagram',
    href: 'https://www.instagram.com/p/DCCT9Rtxhgl/',
  },
  {
    when: 'Mar 2022',
    text: 'Gold medal, Business Case Analysis round, Third Nepal Economic Olympiad.',
    source: 'LAC A Level',
    href: 'https://www.facebook.com/LacAlevel/posts/272840145024419/',
  },
];

export const skills = [
  ['Languages & tools', 'R, Stata, Python (pandas, NumPy, matplotlib, scikit-learn), SQL, Excel, LaTeX, Git, Jupyter'],
  ['Econometrics', 'Panel data, event studies, regression and hypothesis testing, time series'],
  ['Measurement', 'Index numbers (Fisher, EKS), cross-country data harmonization, survey microdata (ACS/IPUMS)'],
  ['Other methods', 'Principal components, k-means clustering, Monte Carlo simulation, classification models'],
  ['Spoken', 'English (fluent), Nepali (native)'],
];

export const certifications = [
  {
    title: 'FRED Data Practitioner',
    issuer: 'Federal Reserve Bank of St. Louis',
    href: 'https://www.credly.com/earner/earned/badge/69d075c3-09a3-4fdf-b4cd-d4b8c3a665d2',
  },
];
