import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaQuestionCircle } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import Buttons from "../../components/ButtonAction";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";



export default function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [skills, setSkills] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage

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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 container mx-auto px-6 py-10">
        <Header />
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <FaQuestionCircle />
            <span className="py-4">Question</span>
          </h1>

          <div className="mb-5">
            <Link to="/createquestion">
              <Button name="Create" />
            </Link>
          </div>

          <div className="overflow-x-auto border rounded-lg shadow">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-indigo-600 text-white text-left">
                <tr>
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
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
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
                    <td colSpan="2" className="text-center px-7 py-5 text-gray-500">
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
