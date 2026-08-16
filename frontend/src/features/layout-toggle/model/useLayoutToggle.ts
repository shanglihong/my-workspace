import { useState, useEffect } from 'react';

const STORAGE_KEY = 'app_sidebar_collapsed';

export function useLayoutToggle(initialState = false) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(isCollapsed));
    } catch {
      // 捕获异常
    }
  }, [isCollapsed]);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return {
    isCollapsed,
    toggleSidebar,
    setIsCollapsed,
  };
}
