import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Mail, Linkedin, Github, MapPin, FileText, Calendar, Star, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ParticleBackground from './ParticleBackground';

const education = {
  school: 'Georgia State University',
  degree: 'BS/MA Economics, BS Mathematics',
  date: 'Expected Dec 2027',
  location: 'Atlanta, GA',
  gpa: 'GPA: 4.15',
  highlights: ['Presidential Scholarship (Full Ride)', "President's List", 'University Assistantship Program'],
  coursework: [
    'Intro to CS 2',
    'Statistical Methods',
    'Linear Algebra',
    'Calculus 3',
    'Discrete Math',
    'Econometrics',
    'Mathematical Statistics (Grad)',
    'Microeconomics Analysis (Grad)',
  ],
};

const research = [
  {
    title: 'Research Assistant to Dr. Soo Jin Kim',
    org: 'Department of Economics, GSU',
    location: 'Atlanta, GA',
    date: 'Aug 2025 - Present',
    bullets: [
      'Built balanced country-year panels from World Bank, OECD, and FRED data to study how U.S. Free Trade Agreements shape foreign aid flows.',
      'Ran OLS and robustness checks in Stata/Python to quantify policy impacts and support ongoing publication work.',
      'Cleaned and merged large-scale economic datasets for reproducible econometric analysis.',
    ],
    tone: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'RIMMES Program Researcher',
    org: 'Department of Mathematics, GSU',
    location: 'Atlanta, GA',
    date: 'Aug 2024 - May 2025',
    bullets: [
      'Led statistical and socioeconomic analysis of the Nepalese diaspora in the U.S. under Dr. Yichuan Zhao.',
      'Processed 300K+ ACS records with Python (NumPy, pandas) to surface demographic trends.',
    ],
    tone: 'from-sky-400 to-indigo-500',
  },
];

const work = [
  {
    title: 'Data Analytics Intern',
    org: 'Paperwork Solutions',
    location: 'Aldershot, UK',
    date: 'May 2025 - Aug 2025',
    bullets: [
      'Analyzed large financial datasets in Python and Excel to identify spending patterns, inefficiencies, and statistical signals across 30+ client portfolios.',
      'Migrated all client data from a single local machine to a secure cloud environment, improving accessibility, reducing downtime, and enabling remote collaboration for the team.',
      'Built automated preprocessing and reporting workflows that reduced data-processing errors by 15% and improved turnaround time by 20%, supporting more accurate client recommendations.',
    ],
    tone: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Research & Policy Intern',
    org: 'Nepal Economic Forum',
    location: 'Kathmandu, Nepal',
    date: 'Aug 2023 - Nov 2023',
    bullets: [
      'Authored macroeconomic reviews (GDP, inflation, fiscal policy) read by policymakers and financial institutions.',
      'Tracked economic indicators and summarized World Bank and national policy conference insights for consulting deliverables.',
    ],
    tone: 'from-amber-400 to-orange-500',
  },
];

const teaching = [
  {
    title: 'Supplemental Instruction Leader',
    org: 'Department of Mathematics, GSU',
    date: 'Aug 2025 - Present',
    bullets: [
      'Lead weekly Calculus I review for 120+ students, strengthening conceptual understanding and problem-solving.',
      'Create study materials and track performance patterns to improve session outcomes.',
    ],
    tone: 'from-blue-400 to-cyan-500',
  },
  {
    title: 'Undergraduate Lab Assistant',
    org: 'Department of Mathematics, GSU',
    date: 'Aug 2024 - May 2025',
    bullets: [
      'Tutored College Algebra and Precalculus students on coursework, assignments, and exam prep.',
      'Supported students in building strong math fundamentals for higher-level courses.',
    ],
    tone: 'from-indigo-400 to-slate-500',
  },
];

const leadership = [
  {
    title: 'Opportunities Director',
    org: 'Economics Club @ GSU',
    date: '2025 - Present',
    bullets: [
      "Built the club's first AI-powered internship web app (Python, Streamlit, OpenAI) to help 245+ students find roles.",
      'Curate 100+ internships and coordinate speaker events and cross-university collaborations.',
    ],
    tone: 'from-amber-400 to-orange-500',
  },
];

const skills = [
  {
    title: 'Programming',
    items: ['Python', 'Stata', 'R', 'SQL', 'Git/GitHub', 'VBA'],
    tone: 'from-cyan-400 to-blue-500',
  },
  {
    title: 'Data & Econometrics',
    items: [
      'Regression Analysis',
      'Causal Inference',
      'Statistical Modeling',
      'Econometric Analysis',
      'Time Series',
      'Forecasting',
      'Monte Carlo Simulation',
      'Data Cleaning',
      'Data Visualization',
    ],
    tone: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Libraries & Tools',
    items: ['NumPy', 'pandas', 'matplotlib', 'scikit-learn', 'Jupyter Notebook', 'Streamlit', 'LaTeX', 'Overleaf'],
    tone: 'from-indigo-400 to-slate-500',
  },
  {
    title: 'Finance & Analytics Tools',
    items: [
      'Microsoft Excel (advanced)',
      'VBA',
      'Bloomberg Terminal (if available)',
      'Financial Modeling',
      'Pivot Tables',
      'VLOOKUP/XLOOKUP',
      'Power Query',
      'Power BI (basic)',
      'Tableau (basic)',
    ],
    tone: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Economics & Research',
    items: [
      'International Trade',
      'Development Economics',
      'Macroeconomics',
      'Applied Microeconometrics',
      'Policy Analysis',
      'Literature Review',
      'Research Writing',
      'Mathematical Modeling',
    ],
    tone: 'from-fuchsia-400 to-pink-500',
  },
  {
    title: 'Mathematics',
    items: ['Calculus', 'Linear Algebra', 'Probability', 'Mathematical Statistics', 'Optimization', 'Real Analysis (in progress)'],
    tone: 'from-sky-400 to-blue-500',
  },
];

const certifications = [
  {
    title: 'FRED Data Practitioner Certification',
    link: 'https://www.linkedin.com/redir/redirect/?url=https%3A%2F%2Fwww.credly.com%2Fearner%2Fearned%2Fbadge%2F69d075c3-09a3-4fdf-b4cd-d4b8c3a665d2&urlhash=hMGu&isSdui=true&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6wBGWJrcQM22fmTZzodI3w%3D%3D',
  },
  {
    title: 'Cleaning Bad Data in R',
    link: 'https://www.linkedin.com/learning/certificates/9ec2109842793c2927c95834300d286e1c151ca4f878c9656c3a8247a883447d/?trk=share_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3B6wBGWJrcQM22fmTZzodI3w%3D%3D',
  },
  {
    title: 'R for Data Science: Analysis and Visualization',
    link: 'https://www.linkedin.com/learning/certificates/77134fd15ad4b9dd12446c5dc60669307032668938bc0f47a872249d62da85b6?u=76216298',
  },
];

const projectFilters = [
  { id: 'all', label: 'All Projects' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'ai', label: 'AI/Design' },
];

const projects = [
  {
    title: 'Debt-Relief',
    subtitle: 'Personalized debt repayment simulator',
    description:
      'Flask web app that uses the Capital One Nessie API plus user income/expense data to model payoff timelines, compare strategies, and visualize debt trajectories.',
    category: 'fintech',
    badge: 'HackGT 2025',
    date: '2025',
    gradient: 'from-[#1f2937] via-[#111827] to-[#0b1220]',
    link: 'https://github.com/Animeshav14/Debt-Relief',
    metrics: [
      { label: 'API', value: 'Capital One Nessie' },
      { label: 'Stack', value: 'Flask + Python' },
      { label: 'Focus', value: 'Payoff insights' },
    ],
    tags: ['Flask', 'Python', 'API', 'Data Viz'],
  },
  {
    title: 'Moodboard AI',
    subtitle: 'Prompt-to-moodboard visual generator',
    description:
      'Hackathon build that turns text prompts into curated visual moodboards for rapid concepting and collaboration, with fast iteration and clean exports.',
    category: 'ai',
    badge: 'AI ATL Hackathon',
    date: '2025',
    gradient: 'from-[#0f172a] via-[#111827] to-[#0b1220]',
    link: 'https://github.com/kshitizregmi/mootboard',
    metrics: [
      { label: 'Role', value: 'Builder' },
      { label: 'Focus', value: 'Fast ideation' },
      { label: 'Output', value: 'Shareable boards' },
    ],
    tags: ['AI', 'Design', 'Prompting', 'UI'],
  },
  {
    title: 'Recession Nowcasting Using the Treasury Yield Curve',
    subtitle: 'FRED Treasury spread model for recession risk',
    description:
      'Built a time-series model using FRED Treasury data to construct the 10y-3m spread and estimate twelve-month recession risk with logistic regression and random forests. Produced a concise memo with visualizations for economic interpretation and communication.',
    category: 'ai',
    badge: 'Research Memo',
    date: '2025',
    gradient: 'from-[#0b1220] via-[#111827] to-[#1f2937]',
    link: 'https://github.com/Animeshav14/recession-nowcasting/blob/main/memo/memo.pdf',
    metrics: [
      { label: 'Data', value: 'FRED Treasury' },
      { label: 'Models', value: 'Logit, RF' },
      { label: 'Focus', value: 'Yield curve spread' },
    ],
    tags: ['Time Series', 'Logistic Regression', 'Random Forests', 'FRED Data', 'Policy Memo'],
  },
  {
    title: 'Monte Carlo Simulation: Retirement Portfolio',
    subtitle: 'Simulation of retirement fund longevity across strategies',
    description:
      'Simulates retirement portfolio outcomes with user-defined inputs, estimating the likelihood of a fund lasting from a starting age to a target age while adjusting for inflation and comparing strategies.',
    category: 'fintech',
    badge: 'Simulation',
    date: '2025',
    gradient: 'from-[#0f172a] via-[#1f2937] to-[#0b1220]',
    link: 'https://github.com/Animeshav14/MonteCarlo_Simulation',
    metrics: [
      { label: 'Method', value: 'Monte Carlo' },
      { label: 'Factors', value: 'Inflation, spend' },
      { label: 'Goal', value: 'Fund longevity' },
    ],
    tags: ['Python', 'Simulation', 'Retirement', 'Finance Modeling'],
  },
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('all');
  const location = useLocation();
  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);
  const gameSrc = `${import.meta.env.BASE_URL}game/index.html`;

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    } else if (location.pathname === '/') {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-slate-100 relative z-10 overflow-hidden" id="hero">
      <ParticleBackground />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-[#0b0f16]/70 to-[#05070c] pointer-events-none" />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-4 md:px-10 pt-28 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-2 text-sm text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
              <Star className="w-4 h-4" />
              Presidential Scholar @ GSU | Research | Teaching
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 via-blue-200 to-white bg-clip-text text-transparent">
                Animesh Shrestha
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-200/90 max-w-2xl mx-auto md:mx-0">
              Presidential Scholar @ GSU | Economics & Mathematics | Research Assistant | Econometric & Data Analysis
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a href="mailto:ashrestha7@gsu.edu" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-cyan-500/20 border border-cyan-400/40 text-white hover:bg-cyan-500/30 px-5 py-3">
                  <Mail className="w-5 h-5 mr-2" />
                  Email
                </Button>
              </a>
              <a href="https://linkedin.com/in/animeshshr" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white hover:border-cyan-400/60 hover:text-cyan-100 px-5 py-3">
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </a>
              <a href="https://github.com/Animeshav14" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white hover:border-cyan-400/60 hover:text-cyan-100 px-5 py-3">
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
              </a>
              <a href="/assets/Animesh_CV.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-white/5 border border-cyan-400/40 text-white hover:bg-cyan-500/20 px-5 py-3">
                  <FileText className="w-5 h-5 mr-2" />
                  Download CV
                </Button>
              </a>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-200/80 justify-center md:justify-start">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-300" /> Atlanta, GA
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="w-4 h-4 text-cyan-300" /> animeshshrestha.com
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="relative w-full max-w-xl mx-auto md:mx-0"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-emerald-400/10 blur-3xl rounded-full" />
            <div className="relative bg-white/5 border border-white/10 rounded-3xl p-4 shadow-[0_0_60px_rgba(59,130,246,0.15)] backdrop-blur-lg space-y-4 overflow-hidden">
              <div className="overflow-hidden rounded-2xl border border-white/10" style={{ aspectRatio: '1 / 1' }}>
                <img
                  src="/assets/photo.png"
                  alt="Animesh Shrestha"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 0%', transform: 'scale(0.95)', transformOrigin: '50% 0%' }}
                />
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">At a glance</h3>
                <Badge className="bg-cyan-500/20 text-cyan-100 border-cyan-300/40">Research + Teaching</Badge>
              </div>
              <div className="space-y-3 text-slate-200/90">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <p>
                    Quantitative and research-focused background in econometrics, applied microeconometrics, and policy
                    analysis, supported by strong foundations in calculus, linear algebra, probability, statistics, and optimization.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <p>
                    Hands-on experience with empirical workflows using Python, Stata, SQL, and R for data cleaning,
                    visualization, statistical modeling, and building analytical tools such as Monte Carlo simulations and interactive
                    Streamlit apps.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                  <p>
                    Proven academic and teaching experience, including research assistance in economics and peer-led support in
                    Calculus and core mathematics, reinforcing deep conceptual understanding and clear communication of technical ideas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="relative py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-[0_0_50px_rgba(34,211,238,0.08)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-cyan-300" />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-semibold">{education.school}</h3>
                <p className="text-slate-200/90">{education.degree}</p>
              </div>
              <div className="text-slate-300/90">
                <p>{education.location}</p>
                <p>{education.date}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-cyan-500/20 text-cyan-100 border-cyan-300/40">{education.gpa}</Badge>
              {education.highlights.map((item) => (
                <Badge key={item} className="bg-white/5 text-slate-100 border-white/10">
                  {item}
                </Badge>
              ))}
              <a
                href="https://drive.google.com/file/d/17cH6FQPHSLabMgkvpMRrX54O3gWH1BVL/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-cyan-300/40 bg-cyan-500/10 text-cyan-100 text-sm hover:border-cyan-300 hover:bg-cyan-500/20"
              >
                Unofficial Transcript
              </a>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {education.coursework.map((course) => (
                  <Badge key={course} className="bg-white/5 text-slate-100 border-white/10">
                    {course}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="relative py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center gap-3 mb-10">
            <Star className="w-6 h-6 text-cyan-300" />
            <h2 className="text-3xl font-bold">Experience</h2>
          </header>

          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Research Experience</h3>
              <div className="grid gap-8">
                {research.map((role, idx) => (
                  <Card key={role.title} tone={role.tone} delay={idx * 0.05}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-semibold">{role.title}</h4>
                        <p className="text-slate-200/80">{role.org}</p>
                        <p className="text-sm text-slate-400">{role.location}</p>
                      </div>
                      <div className="text-sm text-slate-300/80">{role.date}</div>
                    </div>
                    <List bullets={role.bullets} />
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Work Experience</h3>
              <div className="grid gap-8">
                {work.map((role, idx) => (
                  <Card key={role.title} tone={role.tone} delay={idx * 0.05}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-semibold">{role.title}</h4>
                        <p className="text-slate-200/80">{role.org}</p>
                        <p className="text-sm text-slate-400">{role.location}</p>
                      </div>
                      <div className="text-sm text-slate-300/80">{role.date}</div>
                    </div>
                    <List bullets={role.bullets} />
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Teaching Experience</h3>
              <div className="grid gap-8">
                {teaching.map((role, idx) => (
                  <Card key={role.title} tone={role.tone} delay={idx * 0.05}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-semibold">{role.title}</h4>
                        <p className="text-slate-200/80">{role.org}</p>
                      </div>
                      <div className="text-sm text-slate-300/80">{role.date}</div>
                    </div>
                    <List bullets={role.bullets} />
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Leadership Experience</h3>
              <div className="grid gap-8">
                {leadership.map((item, idx) => (
                  <Card key={item.title} tone={item.tone} delay={idx * 0.05}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h4 className="text-xl font-semibold">{item.title}</h4>
                        <p className="text-slate-200/80">{item.org}</p>
                      </div>
                      <div className="text-sm text-slate-300/80">{item.date}</div>
                    </div>
                    <List bullets={item.bullets} />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="relative py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-cyan-300" />
            <h2 className="text-3xl font-bold">Featured Projects</h2>
          </header>
          <p className="text-slate-200/80 mb-8">Hackathon builds focused on finance and AI-first design.</p>

          <div className="flex flex-wrap gap-3 mb-8">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-100 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'bg-white/5 border-white/10 text-slate-100 hover:border-cyan-400/40'
                }`}
              >
                <Filter className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center gap-3 mb-3">
            <Star className="w-6 h-6 text-cyan-300" />
            <h2 className="text-4xl font-bold">Technical Skills</h2>
          </header>
          <p className="text-slate-200/90 text-lg mb-8">
            Core tools and domains for economics, mathematics, research, finance, and data analysis.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.06)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{group.title}</h3>
                  <span className={`h-2 w-14 rounded-full bg-gradient-to-r ${group.tone}`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge
                      key={item}
                      className="bg-white/5 text-slate-50 border-white/10 text-xs md:text-sm px-3 py-1.5 rounded-full"
                    >
                      {item.replace(/\s*\(.*?\)/g, '')}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="relative py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-cyan-300" />
            <h2 className="text-4xl font-bold">Certifications</h2>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-[0_0_30px_rgba(34,211,238,0.06)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{cert.title}</h3>
                  <span className="h-2 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                </div>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-200 hover:text-white underline underline-offset-4"
                >
                  View credential
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Presentation */}
      <section id="conference" className="relative py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center gap-3 mb-8">
            <Star className="w-6 h-6 text-cyan-300" />
            <h2 className="text-3xl font-bold">Conference Presentation</h2>
          </header>
          <Card tone="from-emerald-400 to-teal-500" delay={0}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold">A Socioeconomic and Demographic Analysis of Nepalese Diaspora in the United States</h3>
                <p className="text-slate-200/80">Georgia State University Undergraduate Research Conference, Atlanta, GA — April 2025</p>
              </div>
              <a href="/assets/shrestha_animesh_rimmes_poster.pdf" download className="flex items-center gap-2 text-cyan-100 hover:text-white">
                <Download className="w-5 h-5" />
                Download Poster
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Game */}
      <section className="relative py-16 px-4 md:px-10 scroll-mt-24" id="game">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-cyan-300" />
            <h2 className="text-3xl font-bold">Mini Game</h2>
          </header>
          <p className="text-slate-200/90 text-lg mb-6">
            Thank you for visiting my website. Here is a small game as a reward.
          </p>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(34,211,238,0.12)]">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-emerald-400/10 pointer-events-none" />
            <div className="relative p-3 md:p-6 flex justify-center">
              <iframe
                title="Dino Game"
                src={gameSrc}
                className="w-full max-w-5xl aspect-[16/9] rounded-2xl border border-white/10 bg-[#0f0f0f]"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-16 px-4 md:px-10 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <Card tone="from-cyan-400 to-blue-500" delay={0}>
            <div className="grid md:grid-cols-3 gap-6">
              <ContactCard
                href="mailto:ashrestha7@gsu.edu"
                title="Email"
                subtitle="ashrestha7@gsu.edu"
                icon={<Mail className="w-6 h-6 text-cyan-100" />}
              />
              <ContactCard
                href="https://linkedin.com/in/animeshshr"
                title="LinkedIn"
                subtitle="linkedin.com/in/animeshshr"
                icon={<Linkedin className="w-6 h-6 text-cyan-100" />}
              />
              <ContactCard
                href="https://github.com/Animeshav14"
                title="GitHub"
                subtitle="github.com/Animeshav14"
                icon={<Github className="w-6 h-6 text-cyan-100" />}
              />
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 text-slate-100/80 grid sm:grid-cols-2 gap-3">
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-200" /> Atlanta, GA
              </span>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function Card({ children, tone, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="relative bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${tone} opacity-5`} />
      <div className="relative space-y-4">{children}</div>
    </motion.div>
  );
}

function List({ bullets }) {
  return (
    <ul className="space-y-3 text-slate-200/90">
      {bullets.map((bullet) => (
        <li key={bullet} className="flex gap-3">
          <span className="h-2 w-2 mt-2 rounded-full bg-cyan-300" />
          <p>{bullet}</p>
        </li>
      ))}
    </ul>
  );
}

function ContactCard({ href, title, subtitle, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-cyan-400/50 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-full bg-white/5 border border-white/10">{icon}</div>
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <p className="text-sm text-slate-200/80 group-hover:text-cyan-100">{subtitle}</p>
    </a>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
    >
      <div className={`h-44 bg-gradient-to-r ${project.gradient} relative`}>
        <div className="absolute top-4 left-4">
          <Badge className="bg-cyan-500/20 text-cyan-100 border-cyan-300/40">{project.badge}</Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-black/50 text-slate-100 border-white/20">{project.date}</Badge>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">{project.title}</h3>
            <p className="text-slate-200/90 mb-2">{project.subtitle}</p>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-cyan-200 hover:text-white underline underline-offset-4"
            >
              View
            </a>
          )}
        </div>
        <p className="text-slate-200/80 leading-relaxed">{project.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-center text-slate-100"
            >
              <p className="text-[11px] uppercase tracking-wide text-slate-300">{metric.label}</p>
              <p className="font-semibold">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} className="bg-white/5 text-slate-100 border-white/10">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
