// index.js
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Overview from "./pages/Overview/overview.jsx";
import Question from "./pages/Question/question.jsx";
import Skill from "./pages/Skill/skill.jsx";
import Member from "./pages/Member/member.jsx";
import CreateMember from "./pages/Member/createmember.jsx";
import ViewMember from "./pages/Member/viewmember.jsx";
import DashboardPage from "./pages/Dashboard/dashboard.jsx";
import ViewQuestion from "./pages/Question/viewquestio.jsx";
import UpdateQuestion from "./pages/Question/updatequestion.jsx";
import CreateQuestion from "./pages/Question/createquestion.jsx";
import ViewSkill from "./pages/Skill/viewskill.jsx";
import UpdateSkill from "./pages/Skill/updateskill.jsx";
import CreateSkill from "./pages/Skill/createskill.jsx";
import ViewOverview from "./pages/Overview/viewoverview.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/overview/" element={<Overview />} />
      <Route path="/question" element={<Question />} />
      <Route path="/viewquestion/:id" element={<ViewQuestion />} />
      <Route path="/createquestion" element={<CreateQuestion />} />
      <Route path="/updatequestion/:id" element={<UpdateQuestion />} />
      <Route path="/skill" element={<Skill />} />
      <Route path="/viewskill/:id" element={<ViewSkill />} />
      <Route path="/updateskill/:id" element={<UpdateSkill />} />
      <Route path="/createskill" element={<CreateSkill />} />
      <Route path="/member" element={<Member />} />
      <Route path="/createmember" element={<CreateMember />} />
      <Route path="/member" element={<Member />} />
      <Route path="/viewmember/:id" element={<ViewMember />} />
      <Route path="/viewoverview" element={<ViewOverview />} />
    </Routes>
  </BrowserRouter>
);
