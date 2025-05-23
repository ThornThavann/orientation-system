import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaQuestionCircle } from "react-icons/fa";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJlbWFpbCI6Im1vY2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDc5ODE2MzAsImV4cCI6MTc0Nzk4NTIzMH0.60bu5oguilKExhEUvhIn1t3rG9tiAhu_DrKXHQZqYqI";

export default function UpdateQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState("");

  useEffect(() => {
    const fetchQuestionAndSkills = async () => {
      try {
        // Fetch the question by ID
        const questionRes = await axios.get(`http://localhost:3000/api/question/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const questionData = questionRes.data;
        setQuestionText(questionData.question);
        setSelectedSkillId(questionData.skill_id?.toString() || "");

        // Fetch all skills
        const skillRes = await axios.get(`http://localhost:3000/api/skill/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSkills(skillRes.data.skills || []);
      } catch (error) {
        console.error("Error fetching question or skills:", error);
      }
    };

    fetchQuestionAndSkills();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/question/update/${id}`,
        {
          question: questionText,
          skill_id: Number(selectedSkillId),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Question updated successfully!");
      navigate("/question"); // Redirect to question list page after update
    } catch (error) {
      console.error("Update error:", error.response ? error.response.data : error.message);
      alert("Failed to update question.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaQuestionCircle />
            <span>Update Question</span>
          </h1>

          <div className="overflow-hidden rounded-lg mt-20">
            <label className="block">
              <span className="text-gray-700 font-semibold">Question</span>
              <input
                type="text"
                name="question"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="text-[18px] mt-4 block w-[700px] px-4 py-4 border-2 border-gray-300 rounded-xl"
              />
            </label>

            <div className="mt-6">
              <span className="text-gray-700 font-semibold">Skill</span>
              <select
                value={selectedSkillId}
                onChange={(e) => setSelectedSkillId(e.target.value)}
                className="mt-2 block w-[700px] px-4 py-4 border-2 border-gray-300 rounded-xl text-[18px]"
              >
                <option value="">-- Select Skill --</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id.toString()}>
                    {skill.skill_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex space-x-4 mt-10">
            <Link to="/question">
              <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Cancel
              </button>
            </Link>
            <button
              onClick={handleUpdate}
              disabled={!questionText || !selectedSkillId}
              className={`px-6 py-2 rounded-md hover:opacity-80 transition ${
                !questionText || !selectedSkillId
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-400 text-white"
              }`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
