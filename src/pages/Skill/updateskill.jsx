import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import React, { useState, useEffect } from 'react';



export default function UpdateSkill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState("");
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}api/skill/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Adjust based on your API response structure
        if (response.data.skill && response.data.skill.skill_name) {
          setSkill(response.data.skill.skill_name);
        } else {
          setSkill("");
          alert("Skill data not found.");
        }
      } catch (error) {
        console.error("Error fetching skill:", error.response?.data || error.message);
      }
    };

    fetchSkill();
  }, );

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/skill/${id}`,
        { skill_name: skill },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Update response:", res.data);
      alert("Skill updated successfully!");
      navigate("/skill");
    } catch (error) {
      console.error("Error updating skill:", error.response?.data || error.message);
      alert("Failed to update skill.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 container mx-auto px-6 py-10">
        <Header />
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <FaClipboardList />
            <span>Skill</span>
          </h1>

          <div className="overflow-hidden rounded-lg mt-10">
            <label className="block mt-5">
              <span className="text-gray-700 font-semibold text-xl">Skill name</span>
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                className="text-[18px] mt-4 block w-[700px] px-4 py-4 border-2 border-gray-300 rounded-xl"
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
              onClick={handleUpdate}
              className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
