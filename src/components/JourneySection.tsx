'use client';

import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2022',
    title: 'Started Learning',
    description: 'Began my journey with HTML, CSS, and JavaScript.',
  },
  {
    year: '2023',
    title: 'First Bot Project',
    description: 'Built my first WhatsApp Bot, opening doors to backend development.',
  },
  {
    year: '2024',
    title: 'Infrastructure Era',
    description: 'Dove deep into VPS management and self-hosting infrastructure.',
  },
  {
    year: '2025',
    title: 'Exploration Break',
    description: 'Took time to explore new directions and consolidate knowledge.',
  },
  {
    year: '2026',
    title: 'SenaCloud Launch',
    description: 'Building SenaCloud—a comprehensive cloud platform ecosystem.',
  },
];

export function JourneySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="journey" className="py-20 md:py-32 bg-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-12"
        >
          <motion.h2
            variants={itemVariants}
            className="font-geist text-4xl md:text-5xl font-bold text-accent"
          >
            Journey
          </motion.h2>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                variants={itemVariants}
                className="flex gap-6 md:gap-8"
              >
                {/* Timeline marker */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-accent mt-2" />
                  {index !== timeline.length - 1 && (
                    <div className="w-1 h-24 bg-gradient-to-b from-accent to-transparent mt-4" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 flex-1">
                  <div className="glass p-6 rounded-lg">
                    <p className="text-accent font-bold text-lg">{item.year}</p>
                    <h3 className="text-xl font-bold text-primary mt-2">{item.title}</h3>
                    <p className="text-secondary mt-3">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
