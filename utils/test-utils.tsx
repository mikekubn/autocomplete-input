import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { NotificationProvider } from '@/provider/NotificationProvider';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>
    <NotificationProvider>
      {children}
    </NotificationProvider>
  </ThemeProvider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender };
