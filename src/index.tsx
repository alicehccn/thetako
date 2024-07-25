import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Albums from './components/Albums';
import Photos from './components/Photos';
import Home from './components/Home';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/albums/:albumId' element={<Photos />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
