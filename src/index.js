// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Overview from './pages/Overview/overview.jsx'; // Make sure the path and filename are correct
import Question from './pages/Question/question.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Overview />} />  
      <Route path="/" element={<Question />} />  

      
    </Routes>
  </BrowserRouter>
);
