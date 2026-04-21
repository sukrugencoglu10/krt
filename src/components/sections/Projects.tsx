"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '@/content/projects.json';
import Image from 'next/image';
import Link from 'next/link';

const categories = ['Hepsi', ...Array.from(new Set(projectsData.map(p => p.category)))];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('Hepsi');

  const filteredProjects = projectsData.filter(project => 
    activeCategory === 'Hepsi' ? true : project.category === activeCategory
  );

  return (
    <section className="py-32 bg-slate-950 px-4">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-indigo-500 font-bold tracking-widest text-sm uppercase mb-3"
          >
            Neler Yaptık?
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-white mb-6"
          >
            Başarı Hikayelerimiz
          </motion.h3>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-indigo-600 text-white shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: 'spring' }}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-[4/3] shadow-2xl block"
              >
                <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-40 cursor-pointer" aria-label={`${project.client_name} detay sayfasına git`}></Link>
                
                {/* Fallback space when image loads/doesn't exist initially */}
                <div className="absolute inset-0 bg-slate-800 z-0"></div>
                
                {/* Image */}
                <Image 
                  src={project.cover_image} 
                  alt={project.client_name}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 z-10 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 z-20"></div>

                {/* Project Info Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500 z-30 pointer-events-none">
                  <div className="flex gap-2 items-center mb-2">
                    <span className="text-indigo-400 font-bold text-xs tracking-widest uppercase">
                      {project.category}
                    </span>
                    <span className="text-slate-500 text-xs font-bold px-2 border-l border-slate-700">{project.year}</span>
                  </div>
                  <h4 className="text-3xl font-black text-white mb-3 flex items-center justify-between">
                    {project.client_name}
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </div>
                  </h4>
                  <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 font-medium line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
