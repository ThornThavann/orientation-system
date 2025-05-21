import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaQuestionCircle } from "react-icons/fa";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJlbWFpbCI6Im1vY2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDc4MTcxNDQsImV4cCI6MTc0NzgyMDc0NH0.3K0wG1GkhEw1otCvGBc7eCmEzupQ5Y1R_QkdhKIS_YI";

// ... your imports and token ...

export default function ViewQuestion() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/skill", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Skills fetched:", response.data);
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/question/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Question fetched:", response.data);
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!question) return <div className="p-6">Question not found.</div>;

  console.log("Question.skill:", question.skill);
  console.log("Skills array:", skills);

  // Make sure to compare same types (numbers)
  const skillName = skills.find(skill => Number(skill.id) === Number(question.skill))?.name || "No skill found";

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto ">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaQuestionCircle />
            <span>Question</span>
          </h1>

          <div className="flex p-4 space-x-4 ">
            <Link to="/question">
              <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Back
              </button>
            </Link>
            <Link to={`/updatequestion/${id}`}>
              <button className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Update
              </button>
            </Link>
            <button
              onClick={() => {
                alert("Deleted!");
              }}
              className="bg-red-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
            >
              Delete
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-800 mt-4">
            <table className="w-full bg-white">
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Question</td>
                  <td className="py-5">{question.question}</td>
                </tr>
                <tr className=" border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Skill</td>
                  <td className="py-5">{skillName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
