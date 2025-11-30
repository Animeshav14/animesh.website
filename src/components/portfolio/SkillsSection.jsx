import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Code2, Award } from 'lucide-react';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '💻',
      skills: ['Python', 'JavaScript/TypeScript', 'Java', 'C++', 'Swift/SwiftUI', 'SQL'],
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'AI/ML & Data Science',
      icon: '🤖',
      skills: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Hugging Face', 'Transformers', 'XGBoost', 'Neural Networks', 'Computer Vision', 'NLP'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Web & Full-Stack',
      icon: '🌐',
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'Flask', 'FastAPI', 'HTML', 'CSS', 'Tailwind CSS'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Databases',
      icon: '💾',
      skills: ['PostgreSQL', 'MongoDB', 'Firebase', 'Vector Databases'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Cloud & DevOps',
      icon: '☁️',
      skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Heroku'],
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const certifications = [
    'The Complete Web Development Bootcamp',
    'Andrew Ng Machine Learning Specialization',
    'Deep Learning Specialization',
    'Mastering Data Structures & Algorithms',
    'Kode With Klossy Scholar',
    'Prompt Engineering & Programming with OpenAI'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-12">
        <Code2 className="w-8 h-8 text-purple-400" />
        <h2 className="text-4xl md:text-5xl font-bold text-white">Technical Skills</h2>
      </div>
      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -5 }}
            className="group relative"
          >
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 border border-purple-500/20 shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 h-full hover:border-purple-500/40">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {category.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge
                    key={skill}
                    className={`bg-gradient-to-r ${category.gradient} text-white border-0 hover:scale-110 transition-transform text-xs`}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Award className="w-8 h-8 text-purple-400" />
          <h3 className="text-3xl font-bold text-white">Certifications</h3>
        </div>
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start gap-3 group/cert"
              >
                <div className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex-shrink-0 group-hover/cert:scale-150 transition-transform"></div>
                <p className="text-purple-100 leading-relaxed group-hover/cert:text-white transition-colors">
                  {cert}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

