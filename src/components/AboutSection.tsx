'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
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
    <section id="about" className="py-20 md:py-32">
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
            About
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="space-y-6 text-secondary leading-relaxed text-lg"
          >
            <p>
              Saya adalah seorang developer yang lahir dari rasa penasaran yang mendalam. Sejak kecil, saya selalu ingin tahu bagaimana sesuatu bekerja—mulai dari mekanisme sederhana hingga sistem yang kompleks. Rasa ingin tahu ini membawa saya ke dunia pemrograman, di mana saya menemukan passion untuk membangun solusi yang bermakna.
            </p>

            <p>
              Perjalanan belajar saya dimulai dengan HTML, CSS, dan JavaScript. Namun, yang benar-benar mengubah perspektif saya adalah ketika saya mulai memahami infrastruktur cloud dan bagaimana data mengalir melalui sistem yang terdistribusi. Saya menjadi obsesif dengan self-hosting, VPS management, dan membangun ekosistem digital yang dapat saya kontrol sepenuhnya.
            </p>

            <p>
              Hari ini, saya fokus pada pengembangan full-stack dan cloud infrastructure. Saya percaya bahwa teknologi terbaik adalah yang dapat disesuaikan, scalable, dan memberikan value nyata. SenaCloud adalah manifestasi dari filosofi ini—sebuah platform yang menggabungkan storage, API, deployment, dan berbagai layanan cloud dalam satu ekosistem yang kohesif.
            </p>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
          >
            {[
              { label: 'Age', value: '17' },
              { label: 'Location', value: 'Indonesia' },
              { label: 'Experience', value: '4+ Years' },
              { label: 'Projects', value: '20+' },
            ].map((stat) => (
              <div key={stat.label} className="glass p-4 rounded-lg text-center">
                <p className="text-accent font-bold text-2xl">{stat.value}</p>
                <p className="text-secondary text-sm mt-2">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
