'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, X, ChevronLeft } from 'lucide-react';
import { TypingRace } from './playground/TypingRace';
import { Quiz } from './playground/Quiz';
import { CodePuzzle } from './playground/CodePuzzle';

type PlaygroundMode = 'menu' | 'typing' | 'quiz' | 'puzzle';

export function Playground() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<PlaygroundMode>('menu');

  const handleBack = () => {
    setMode('menu');
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-30 glass p-3 rounded-lg text-accent hover:text-accent-light transition-colors"
        title="Playground"
      >
        <Code2 size={20} />
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
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-20 left-6 z-50 glass rounded-xl w-96 max-h-[70vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-primary">
                <div className="flex items-center gap-2">
                  {mode !== 'menu' && (
                    <button
                      onClick={handleBack}
                      className="text-secondary hover:text-accent transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  <h3 className="font-bold text-accent">
                    {mode === 'menu' && 'Playground'}
                    {mode === 'typing' && 'Typing Race'}
                    {mode === 'quiz' && 'Quiz'}
                    {mode === 'puzzle' && 'Code Puzzle'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-secondary hover:text-accent transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4">
                {mode === 'menu' && (
                  <div className="space-y-3">
                    <button
                      onClick={() => setMode('typing')}
                      className="w-full glass p-4 rounded-lg text-left hover:border-accent transition-all group"
                    >
                      <p className="font-semibold text-accent group-hover:text-accent-light">Typing Race</p>
                      <p className="text-xs text-secondary mt-1">Test your typing speed and accuracy</p>
                    </button>
                    <button
                      onClick={() => setMode('quiz')}
                      className="w-full glass p-4 rounded-lg text-left hover:border-accent transition-all group"
                    >
                      <p className="font-semibold text-accent group-hover:text-accent-light">Quiz</p>
                      <p className="text-xs text-secondary mt-1">Challenge your knowledge</p>
                    </button>
                    <button
                      onClick={() => setMode('puzzle')}
                      className="w-full glass p-4 rounded-lg text-left hover:border-accent transition-all group"
                    >
                      <p className="font-semibold text-accent group-hover:text-accent-light">Code Puzzle</p>
                      <p className="text-xs text-secondary mt-1">Solve coding challenges</p>
                    </button>
                  </div>
                )}

                {mode === 'typing' && <TypingRace />}
                {mode === 'quiz' && <Quiz />}
                {mode === 'puzzle' && <CodePuzzle />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
