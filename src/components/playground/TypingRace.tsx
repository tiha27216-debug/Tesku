'use client';

import { useState, useEffect } from 'react';

const snippets = {
  javascript: 'const greeting = () => console.log("Hello, World!");',
  html: '<div class="container"><h1>Welcome</h1></div>',
  css: '.button { background: linear-gradient(45deg, #ff6b6b, #4ecdc4); }',
  python: 'def fibonacci(n): return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)',
  nodejs: 'const express = require("express"); const app = express();',
  linux: 'find . -name "*.js" -type f | xargs grep "function"',
};

type Language = keyof typeof snippets;

export function TypingRace() {
  const [language, setLanguage] = useState<Language>('javascript');
  const [input, setInput] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, time: 0 });

  const snippet = snippets[language];
  const isComplete = input === snippet;

  useEffect(() => {
    if (isActive && !startTime) {
      setStartTime(Date.now());
    }
  }, [isActive, startTime]);

  useEffect(() => {
    if (isComplete && startTime) {
      const timeSeconds = (Date.now() - startTime) / 1000;
      const words = input.split(' ').length;
      const wpm = Math.round((words / timeSeconds) * 60);
      const correct = input.split('').filter((char, i) => char === snippet[i]).length;
      const accuracy = Math.round((correct / snippet.length) * 100);

      setStats({ wpm, accuracy, time: Math.round(timeSeconds) });
      setIsActive(false);
    }
  }, [isComplete, input, snippet, startTime]);

  const handleReset = () => {
    setInput('');
    setIsActive(false);
    setStartTime(null);
    setStats({ wpm: 0, accuracy: 0, time: 0 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    if (!isActive && value.length > 0) {
      setIsActive(true);
    }
  };

  return (
    <div className="space-y-4">
      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value as Language);
          handleReset();
        }}
        className="w-full bg-tertiary text-primary p-2 rounded text-sm border border-primary"
      >
        {Object.keys(snippets).map((lang) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>

      <div className="bg-tertiary p-3 rounded text-sm font-mono text-accent overflow-x-auto">
        {snippet}
      </div>

      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing..."
        className="w-full bg-tertiary text-primary p-3 rounded text-sm font-mono border border-primary focus:border-accent focus:outline-none resize-none h-20"
      />

      {isComplete && (
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-tertiary p-2 rounded">
            <p className="text-accent font-bold">{stats.wpm}</p>
            <p className="text-xs text-secondary">WPM</p>
          </div>
          <div className="bg-tertiary p-2 rounded">
            <p className="text-accent font-bold">{stats.accuracy}%</p>
            <p className="text-xs text-secondary">Accuracy</p>
          </div>
          <div className="bg-tertiary p-2 rounded">
            <p className="text-accent font-bold">{stats.time}s</p>
            <p className="text-xs text-secondary">Time</p>
          </div>
        </div>
      )}

      <button
        onClick={handleReset}
        className="w-full bg-accent text-white p-2 rounded text-sm font-medium hover:bg-accent-light transition-colors"
      >
        {isComplete ? 'Try Again' : 'Reset'}
      </button>
    </div>
  );
}
