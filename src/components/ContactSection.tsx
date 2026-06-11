'use client';

import { motion } from 'framer-motion';
import { Mail, Send, GitBranch } from 'lucide-react';
const GithubIcon = GitBranch;

const contacts = [
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'senaczk',
    url: 'https://github.com/senaczk',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '@senaczk',
    url: 'https://t.me/senaczk',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@senaczk.com',
    url: 'mailto:contact@senaczk.com',
  },
];

export function ContactSection() {
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
    <section id="contact" className="py-20 md:py-32 bg-secondary/20">
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
            Contact
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <motion.a
                  key={contact.label}
                  href={contact.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  className="glass p-6 rounded-lg flex flex-col items-center text-center gap-4 group hover:border-accent transition-all"
                >
                  <Icon size={32} className="text-accent group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-secondary text-sm mb-1">{contact.label}</p>
                    <p className="text-primary font-semibold group-hover:text-accent transition-colors">
                      {contact.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
