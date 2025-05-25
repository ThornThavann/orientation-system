import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";


export default function Createskill() {
  const [skill, setSkill] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
  }, []);

  const handleInputChange = (e) => {
    setSkill(e.target.value);
  };

  const handleSave = async () => {
    if (!skill.trim()) {
      alert("Please enter a skill name.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3000/api/skill/new",
        { skill_name: skill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Skill create successfully!");
      navigate("/skill"); // Redirect back to skill list page after save
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("Failed to save skill.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaClipboardList />
            <span className="py-4 ">Create Skill</span>
          </h1>

          <div className="overflow-hidden rounded-lg mt-10">
            <label className="block mt-5">
              <span className="text-gray-700 font-semibold">Skill</span>
              <input
                type="text"
                name="skill"
                value={skill}
                onChange={handleInputChange}
                className="text-[18px] mt-4 block w-[900px] px-4 py-4 border-2 border-gray-300 rounded-xl"
                placeholder="Enter skill name"
              />
            </label>
          </div>

          <div className="flex space-x-4 mt-10">
            <Link to="/skill">
              <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Cancel
              </button>
            </Link>

            <button
              onClick={handleSave}
              className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
