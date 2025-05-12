// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Overview from './pages/Overview/overview.jsx'; // Make sure the path and filename are correct

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Overview />} />  {/* Capitalize the component */}
    </Routes>
  </BrowserRouter>
);
