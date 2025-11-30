import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group relative"
    >
      <div className="bg-black/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 h-full hover:border-purple-500/40">
        {/* Project Image */}
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            
            {/* Badge overlay on image */}
            <div className="absolute top-4 left-4">
              <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 px-4 py-1 text-sm font-semibold shadow-lg`}>
                {project.badge}
              </Badge>
            </div>
            
            {/* Date overlay on image */}
            <div className="absolute top-4 right-4">
              <Badge className="bg-black/60 backdrop-blur-sm text-purple-200 border-purple-400/30 text-sm">
                {project.date}
              </Badge>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-8">
          {/* Badge and Date (only if no image) */}
          {!project.image && (
            <div className="flex justify-between items-start mb-4">
              <Badge className={`bg-gradient-to-r ${project.gradient} text-white border-0 px-4 py-1 text-sm font-semibold shadow-lg`}>
                {project.badge}
              </Badge>
              <p className="text-purple-300 text-sm">{project.date}</p>
            </div>
          )}
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
            {project.title}
          </h3>
          <p className="text-lg text-purple-200 mb-4">{project.subtitle}</p>
          {/* Description */}
          <p className="text-purple-100/80 mb-6 leading-relaxed">
            {project.description}
          </p>
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {project.metrics.map((metric, i) => (
              <div 
                key={i} 
                className="bg-purple-600/10 rounded-xl p-3 border border-purple-400/20 hover:bg-purple-600/20 transition-colors"
              >
                <p className="text-purple-400 text-xs uppercase tracking-wider mb-1">
                  {metric.label}
                </p>
                <p className="text-white font-bold text-sm">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <Badge 
                key={tag} 
                className="bg-purple-600/20 text-purple-200 border-purple-400/30 hover:bg-purple-600/30 transition-colors text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>
      </div>
    </motion.div>
  );
}

