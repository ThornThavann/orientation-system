// index.js
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Overview from './pages/Overview/overview.jsx'; 
import Question from './pages/Question/question.jsx';
import ViewQuestion from './pages/ViewQuestion/viewquestio.jsx';
import CreateQuestion from './pages/CreateQuestion/createquestion.jsx';
import UpdateQuestion from './pages/UpdateQuestion/updatequestion.jsx';
import Skill from './pages/Skill/skill.jsx';
import ViewSkill from './pages/ViewSkill/viewskill.jsx';
import UpdateSkill from './pages/UpdateSkill/updateskill.jsx';
import CreateSkill from './pages/CreateSkill/createskill.jsx';
import Member from './pages/Member/member.jsx';
import CreateMember from './pages/Member/createmember.jsx';
import DeleteMember from './pages/Member/deletemember.jsx';
import ViewMember from './pages/Member/viewmember.jsx';

import Overview from './pages/Overview/overview.jsx'; // Make sure the path and filename are correct
// import Question from './pages/Question/question.jsx';
import DashboardPage from './pages/Dashboard/dashboard.jsx'; // Make sure the path and filename are correct
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<DashboardPage />} />  
      <Route path="/overview/" element={<Overview />} />  
      <Route path="/question" element={<Question />} />  
      <Route path="/viewquestion" element={<ViewQuestion />} />  
      <Route path="/createquestion" element={<CreateQuestion />} />  
      <Route path="/updatequestion" element={<UpdateQuestion />} />  
      <Route path="/skill" element={<Skill />} />  
      <Route path="/viewskill" element={<ViewSkill />} />  
      <Route path="/updateskill" element={<UpdateSkill />} /> 
      <Route path="/createskill" element={<CreateSkill />} /> 
        <Route path="/member" element={<Member />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/member" element={<Member />} />
      <Route path="/deletemember" element={<DeleteMember />} />
      <Route path="/viewmember" element={<ViewMember />} />







      {/* <Route path="/" element={<Question />} />   */}

      
    </Routes>
  </BrowserRouter>
);
