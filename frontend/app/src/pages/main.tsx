import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/index.css';
import App from './App'; // No need to specify .tsx, it will resolve automatically

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
