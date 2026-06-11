'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SenaCloudNetwork } from './SenaCloudNetwork';
import Link from 'next/link';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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
    <section id="home" className="min-h-screen pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
          {/* Left Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-secondary text-sm md:text-base font-medium"
            >
              Halo, Saya
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="font-geist text-5xl md:text-7xl font-bold leading-tight"
            >
              ARSENA
              <br />
              LUCIENDRA.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-secondary text-lg md:text-xl max-w-md"
            >
              Full Stack Developer & Cloud Builder
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-accent text-base md:text-lg font-medium"
            >
              Sena adalah Sena.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-secondary text-base md:text-lg"
            >
              Currently Building <span className="text-accent font-semibold">SenaCloud</span>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <a
                href="#senacloud"
                className="group glass px-6 py-3 rounded-lg font-medium text-accent hover:text-accent-light transition-all hover:scale-105 inline-flex items-center gap-2 w-fit"
              >
                Lihat SenaCloud
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                className="group glass px-6 py-3 rounded-lg font-medium text-accent hover:text-accent-light transition-all hover:scale-105 inline-flex items-center gap-2 w-fit"
              >
                Lihat Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block h-full rounded-2xl overflow-hidden glass"
          >
            <SenaCloudNetwork />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-secondary"
      >
        <div className="w-6 h-10 border-2 border-secondary rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-secondary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
