import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import App from './App.tsx';
import './index.css';
import Donate from './components/Donate.tsx';
import AddMessage from './components/AddMessage.tsx';
import { Toaster } from './components/ui/toaster.tsx';
import Preview from './components/Preview.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/donate' element={<Donate />} />
        <Route path='/addnote' element={<AddMessage />} />
        <Route path='/addnote/preview' element={<Preview />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
