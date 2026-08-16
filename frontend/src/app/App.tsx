import React from 'react';
import { LayoutProvider } from './providers/LayoutProvider';
import { WorkspacePage } from '@/pages/workspace';

export const App: React.FC = () => {
  return (
    <LayoutProvider>
      <WorkspacePage />
    </LayoutProvider>
  );
};
