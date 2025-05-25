import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";



export default function UpdateSkill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState("");
  const token = localStorage.getItem("token"); 
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/skill/${id}`, {
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
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/skill/${id}`,
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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto ">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaClipboardList />
            <span>Skill</span>
          </h1>

          <div className="overflow-hidden rounded-lg mt-10">
            <label className="block mt-5">
              <span className="text-gray-700 font-semibold">Skill name</span>
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
