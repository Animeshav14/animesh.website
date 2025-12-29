import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, PenSquare, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ParticleBackground from './ParticleBackground';
import Footer from './Footer';

const blogPosts = [
  {
    title: 'The Digital Payment System in Nepal: From Cash to Cashless Economy',
    source: 'Nepal Economic Forum',
    date: 'Nov 2023',
    summary:
      'Explores Nepal’s transition toward cashless payments, the policy levers accelerating adoption, and the infrastructure gaps that still need attention.',
    gradient: 'from-[#0f172a] via-[#111827] to-[#0b1220]',
    link: 'https://nepaleconomicforum.org/the-digital-payment-system-in-nepal-from-cash-to-cashless-economy/',
    tags: ['Digital Payments', 'Policy', 'Nepal'],
  },
  {
    title: 'Keynesian Economics and Its Influence on U.S. Economic Policy',
    source: 'Research Paper',
    date: 'Dec 2025',
    summary:
      'An analysis of Keynesian economic theory and how it has shaped fiscal and monetary policy decisions in the United States. Full paper available via the linked PDF.',
    gradient: 'from-[#061017] via-[#0b1720] to-[#051423]',
    link: 'https://drive.google.com/file/d/1wLSfM4lM7SYYrhLIzq4xkYsZZhbKpTZ6/view',
    tags: ['Economics', 'Keynesian', 'US Policy'],
  },
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-slate-100 relative z-10 overflow-hidden" id="blogs">
      <ParticleBackground />
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-[#0b0f16]/70 to-[#05070c] pointer-events-none" />

      <main className="relative max-w-5xl mx-auto px-4 md:px-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 space-y-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-white/5 px-4 py-2 text-sm text-cyan-200">
            <PenSquare className="w-4 h-4" />
            Writing & Research Links
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Blogs</h1>
        </motion.div>

        <div className="grid gap-6">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            >
              <div className={`h-32 bg-gradient-to-r ${post.gradient} relative`}>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-cyan-500/20 text-cyan-100 border-cyan-300/40 inline-flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {post.source}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-black/50 text-slate-100 border-white/20">{post.date}</Badge>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">{post.title}</h3>
                    <p className="text-slate-200/80">{post.source}</p>
                  </div>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cyan-200 hover:text-white underline underline-offset-4"
                  >
                    Read <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-slate-200/80 leading-relaxed">{post.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} className="bg-white/5 text-slate-100 border-white/10">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
