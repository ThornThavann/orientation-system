import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Buttons from "../../components/ButtonAction";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";


const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJlbWFpbCI6Im1vY2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDc5ODE2MzAsImV4cCI6MTc0Nzk4NTIzMH0.60bu5oguilKExhEUvhIn1t3rG9tiAhu_DrKXHQZqYqI";

export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [skills, setSkills] = useState([]);

  // Helper to get skill name by skill id
  const getSkillNameById = (id) => {
    const skill = skills.find((s) => s.id === id);
    console.log("Skill ID:", id);
    console.log("Skill Name:", skill ? skill.skill_name : "Not found");
    
    return skill ? skill.skill_name : "";
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/question/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        
        console.log("Response is an array:", res.data);
        if (Array.isArray(res.data)) {
          setQuestions(res.data);
          
        } else if (Array.isArray(res.data.data)) {
          setQuestions(res.data.data);
        } else if (Array.isArray(res.data.questions)) {
          setQuestions(res.data.questions);
        } else {
          console.warn("Unexpected response format:", res.data);
          setQuestions([]); 
        }
      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/skill/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {

        let skills = [];
        if (Array.isArray(res.data.skills)) {
          skills = res.data.skills;
        } else if (Array.isArray(res.data.data)) {
          skills = res.data.data;
        } else if (Array.isArray(res.data)) {
          skills = res.data;
        }
        const skillNames = skills.map((skill) => skill.skill_name);
        setSkills(skills.map((skill) => skill));
        console.log("All skill names:", skillNames);

      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
      });
  }, []);

  

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaQuestionCircle />
            <span className="py-4">Question</span>
          </h1>

          <div className="mb-5">
            <Link to="/createquestion">
              <Button name="Create" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-800">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-300 text-black">
                <tr className="border-b border-gray-800">
                  <TableHeader name="Action" />
                  <TableHeader name="Question" />
                  <TableHeader name="Skill" />
                </tr>
              </thead>
              <tbody>
                {Array.isArray(questions) && questions.length > 0 ? (
                  questions.map((q) => (
                    <tr
                      key={q.id}
                      className="border-b border-gray-800 hover:bg-gray-100"
                    >
                      <td className="px-7 py-5">
                        <Link to={`/viewquestion/${q.id}`}>
                          <Buttons />
                        </Link>
                      </td>
                      <td className="px-7 py-5">{q.question}</td>
                      <td className="px-7 py-5">{getSkillNameById(q.skill_id)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-5">
                      No questions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
