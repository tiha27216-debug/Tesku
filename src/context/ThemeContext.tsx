'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 
  | 'midnight' | 'forest' | 'ocean' | 'monochrome' | 'crimson' 
  | 'volcano' | 'lavender' | 'emerald' | 'abyss' | 'frost' 
  | 'cloud' | 'paper' | 'sand' | 'pearl' | 'sky' 
  | 'mint' | 'rose' | 'aurora' | 'nebula' | 'prism' | 'obsidian';

const THEMES: Theme[] = [
  'midnight', 'forest', 'ocean', 'monochrome', 'crimson',
  'volcano', 'lavender', 'emerald', 'abyss', 'frost',
  'cloud', 'paper', 'sand', 'pearl', 'sky',
  'mint', 'rose', 'aurora', 'nebula', 'prism', 'obsidian'
];

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('volcano');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && THEMES.includes(savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'volcano');
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
