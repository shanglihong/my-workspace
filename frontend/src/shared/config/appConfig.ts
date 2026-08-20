export const APP_CONFIG = {
  appName: 'Antigravity Workspace',
  version: '0.1.0',
  defaultTheme: 'light' as const,
  apiTimeout: 10000,
  maxSearchHistory: 10,
  storageKeys: {
    theme: 'app_theme_mode',
    sidebarCollapsed: 'app_sidebar_collapsed',
  },
} as const;
