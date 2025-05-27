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
import Login from "./pages/Auth/login.jsx";

import ProtectedRoute from "./pages/Auth/ProtectedRoute.jsx"; // 👈 Import

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/overview"
        element={
          <ProtectedRoute>
            <Overview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/question"
        element={
          <ProtectedRoute>
            <Question />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewquestion/:id"
        element={
          <ProtectedRoute>
            <ViewQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createquestion"
        element={
          <ProtectedRoute>
            <CreateQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updatequestion/:id"
        element={
          <ProtectedRoute>
            <UpdateQuestion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/skill"
        element={
          <ProtectedRoute>
            <Skill />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewskill/:id"
        element={
          <ProtectedRoute>
            <ViewSkill />
          </ProtectedRoute>
        }
      />
      <Route
        path="/updateskill/:id"
        element={
          <ProtectedRoute>
            <UpdateSkill />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createskill"
        element={
          <ProtectedRoute>
            <CreateSkill />
          </ProtectedRoute>
        }
      />
      <Route
        path="/member"
        element={
          <ProtectedRoute>
            <Member />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createmember"
        element={
          <ProtectedRoute>
            <CreateMember />
          </ProtectedRoute>
        }
      />
      <Route
        path="/viewmember/:id"
        element={
          <ProtectedRoute>
            <ViewMember />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);
