import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

export default function ExperienceCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative"
    >
      <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 hover:scale-[1.01] hover:border-purple-500/40">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {experience.title}
            </h3>
            <p className="text-xl text-purple-200 mb-3">{experience.role}</p>
            <p className="text-lg text-purple-300 italic mb-4">{experience.description}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-purple-300">
            <MapPin className="w-4 h-4" />
            {experience.location}
          </div>
          <div className="flex items-center gap-2 text-purple-300">
            <Calendar className="w-4 h-4" />
            {experience.date}
          </div>
        </div>
        {/* Highlights */}
        <div className="space-y-3">
          {experience.highlights.map((highlight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 * i }}
              className="flex items-start gap-3 group/item"
            >
              <div className={`mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r ${experience.gradient} flex-shrink-0 group-hover/item:scale-150 transition-transform`}></div>
              <p className="text-purple-100/90 leading-relaxed group-hover/item:text-white transition-colors">
                {highlight}
              </p>
            </motion.div>
          ))}
        </div>
        {/* Gradient overlay effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${experience.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl pointer-events-none`}></div>
      </div>
    </motion.div>
  );
}

