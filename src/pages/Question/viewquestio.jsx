import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaQuestionCircle } from "react-icons/fa";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";


const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJlbWFpbCI6Im1vY2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDgwNzA0ODQsImV4cCI6MTc0ODA3NDA4NH0.yzA3MpWm_2JxHodFfA2i_8SYuEHsTa5P-ziU2x1ykQs";

export default function ViewQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [skillName, setSkillName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionAndSkill = async () => {
      try {
        // Fetch question by ID
        const questionRes = await axios.get(`http://localhost:3000/api/question/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestion(questionRes.data);
        console.log("Question fetched:", questionRes.data);

        // Fetch related skill
        const skillId = questionRes.data.skill_id;
        if (skillId) {
          const skillRes = await axios.get(`http://localhost:3000/api/skill/${skillId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSkillName(skillRes.data.skill?.skill_name || "No skill found");
        } else {
          setSkillName("No skill assigned");
        }
      } catch (error) {
        console.error("Error fetching question or skill:", error);
        setSkillName("Error loading skill");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionAndSkill();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/question/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Question deleted successfully!");
      navigate("/question");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question.");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!question) return <div className="p-6">Question not found.</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaQuestionCircle />
            <span>Question</span>
          </h1>

          <div className="flex p-4 space-x-4">
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
              onClick={handleDelete}
              className="bg-red-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
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
                <tr className="border-gray-800 hover:bg-gray-100">
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
