import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Router } from './Router.tsx';
import { BasilnProvider } from '@basiln/design-system';
import '@basiln/design-system/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BasilnProvider>
        <Router />
      </BasilnProvider>
    </BrowserRouter>
  </StrictMode>
);
