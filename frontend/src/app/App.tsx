import React from 'react';
import { AppProvider } from './providers/AppProvider';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <div id="app"></div>
    </AppProvider>
  );
};
