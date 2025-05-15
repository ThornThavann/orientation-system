// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Overview from './pages/Overview/overview.jsx'; 
import Question from './pages/Question/question.jsx';
import ViewQuestion from './pages/ViewQuestion/viewquestio.jsx';
import CreateQuestion from './pages/CreateQuestion/createquestion.jsx';
import UpdateQuestion from './pages/UpdateQuestion/updatequestion.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Overview />} />  
      <Route path="/question" element={<Question />} />  
      <Route path="/viewquestion" element={<ViewQuestion />} />  
      <Route path="/createquestion" element={<CreateQuestion />} />  
      <Route path="/updatequestion" element={<UpdateQuestion />} />  




      
    </Routes>
  </BrowserRouter>
);
