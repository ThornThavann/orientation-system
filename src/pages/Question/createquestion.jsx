import { Link } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { FaQuestionCircle } from "react-icons/fa";

export default function CreateQuestion() {
  const [question, setQuestion] = useState("");
  const [skillId, setSkillId] = useState("");
  const [skills, setSkills] = useState([]);
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("http://pse-skill-orientation.final25.psewmad.org/api/skill/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched skills:", res.data);
        setSkills(res.data.skills); // ✅ FIXED: use res.data.skills instead of res.data
      } catch (err) {
        console.error("Failed to load skills:", err);
      }
    };

    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      question: question,
      skill_id: Number(skillId),
    };

    try {
      const response = await axios.post(
        "http://pse-skill-orientation.final25.psewmad.org/api/question/new",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
      alert("Question created successfully!");
      setQuestion("");
      setSkillId("");
    } catch (error) {
      console.error("Error creating question:", error.response?.data || error.message);
      alert("Failed to create question.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 container mx-auto px-6 py-10">
        <Header />
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <FaQuestionCircle />
            <span className="py-4">Create Question</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden rounded-lg mt-10">
              <label className="block mt-5">
                <span className="text-gray-700 font-semibold text-xl">Question</span>
                <input
                  type="text"
                  name="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="text-[18px] mt-4 block w-[900px] py-4 px-4 border-2 border-gray-300 rounded-xl"
                  required
                />
              </label>

              <label className="block mt-5">
                <span className="text-gray-700 font-semibold text-xl">Skill</span>
                <select
                  name="skillId"
                  value={skillId}
                  onChange={(e) => setSkillId(e.target.value)}
                  className="text-[18px] mt-4 block w-[900px] py-4 px-4 border-2 border-gray-300 rounded-xl"
                  required
                >
                  <option value="" disabled>
                  
                  </option>
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.skill_name} {/* ✅ FIXED: use skill.skill_name */}
                      </option>
                    ))
                  ) : (
                    <option disabled>No skills available</option>
                  )}
                </select>
              </label>
            </div>

            <div className="flex space-x-4 mt-10">
              <Link to="/question">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
                >
                  Cancel
                </button>
              </Link>

              <button
                type="submit"
                className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
