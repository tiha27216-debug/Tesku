'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function SenaCloudSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="senacloud" className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            SenaCloud
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="glass rounded-2xl overflow-hidden border border-primary"
          >
            <img
              src="https://senacloud.my.id/u/81f850567795af27.jpg"
              alt="SenaCloud"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'File Hosting', desc: 'Secure cloud storage' },
                { title: 'Cloud Services', desc: 'Scalable infrastructure' },
                { title: 'Storage Infrastructure', desc: 'Reliable data management' },
              ].map((item) => (
                <div key={item.title} className="glass p-4 rounded-lg">
                  <p className="font-bold text-accent">{item.title}</p>
                  <p className="text-secondary text-sm mt-2">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="glass p-6 rounded-lg">
              <p className="text-secondary mb-4">
                SenaCloud adalah platform cloud terpadu yang dirancang untuk memenuhi kebutuhan developer modern. Dengan fokus pada kemudahan penggunaan, keamanan, dan skalabilitas, SenaCloud menyediakan solusi lengkap untuk file hosting, API management, deployment, dan infrastructure management.
              </p>
              <p className="text-accent font-semibold mb-4">Status: Active Development</p>
              <a
                href="https://senacloud.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass px-6 py-3 rounded-lg font-medium text-accent hover:text-accent-light transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Kunjungi SenaCloud
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
