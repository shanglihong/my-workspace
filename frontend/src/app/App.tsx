import React from 'react';
import { LayoutProvider } from './providers/LayoutProvider';
import { WorkspaceLayout } from './layout';

export const App: React.FC = () => {
  return (
    <LayoutProvider>
      <WorkspaceLayout />
    </LayoutProvider>
  );
};

