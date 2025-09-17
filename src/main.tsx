import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BookingProvider } from './context/BookingContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingProvider>
    <App />
    </BookingProvider>
  </StrictMode>,
)
