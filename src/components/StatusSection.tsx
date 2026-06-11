'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const statuses = [
  'Open To Collaboration',
  'Building SenaCloud',
  'Learning Every Day',
];

export function StatusSection() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="status" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          <motion.h2
            variants={itemVariants}
            className="font-geist text-4xl md:text-5xl font-bold text-accent"
          >
            Status
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statuses.map((status) => (
              <motion.div
                key={status}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-lg flex items-center gap-4"
              >
                <CheckCircle2 size={28} className="text-accent flex-shrink-0" />
                <p className="text-primary font-semibold">{status}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
