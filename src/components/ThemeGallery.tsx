'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  const themeLabels: Record<string, string> = {
    midnight: 'Midnight',
    forest: 'Forest',
    ocean: 'Ocean',
    monochrome: 'Monochrome',
    crimson: 'Crimson',
    volcano: 'Volcano',
    lavender: 'Lavender',
    emerald: 'Emerald',
    abyss: 'Abyss',
    frost: 'Frost',
    cloud: 'Cloud',
    paper: 'Paper',
    sand: 'Sand',
    pearl: 'Pearl',
    sky: 'Sky',
    mint: 'Mint',
    rose: 'Rose',
    aurora: 'Aurora',
    nebula: 'Nebula',
    prism: 'Prism',
    obsidian: 'Obsidian',
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-6 z-30 glass p-3 rounded-lg text-accent hover:text-accent-light transition-colors"
        title="Theme Gallery"
      >
        <Palette size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 glass rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-geist text-2xl font-bold text-accent">Theme Gallery</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-secondary hover:text-accent transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {themes.map((t) => (
                  <motion.button
                    key={t}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setTheme(t as any);
                      setIsOpen(false);
                    }}
                    className={`p-3 rounded-lg transition-all ${
                      theme === t
                        ? 'ring-2 ring-accent scale-105'
                        : 'hover:scale-105'
                    }`}
                    style={{
                      backgroundColor: `hsl(${Math.random() * 360}, 70%, 20%)`,
                    }}
                  >
                    <span className="text-xs font-medium text-white text-center block">
                      {themeLabels[t]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
