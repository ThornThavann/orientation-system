// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Overview from './pages/Overview/overview.jsx';
import View from './pages/Overview/viewOverview.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Overview />} />  
      {/* <Route path="/" element={<Question />} />   */}
      
       <Route path="/view" element={<View />} />  

    </Routes>
  </BrowserRouter>
);
