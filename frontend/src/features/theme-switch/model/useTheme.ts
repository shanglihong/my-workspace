import { useState, useEffect } from 'react';

export type ThemeMode = 'light' | 'dark';
const THEME_STORAGE_KEY = 'app_theme_mode';

export function useTheme(defaultTheme: ThemeMode = 'light') {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
      return saved === 'light' || saved === 'dark' ? saved : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // 忽略存储失败
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
