import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJlbWFpbCI6Im1vY2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDc5ODk5MDMsImV4cCI6MTc0Nzk5MzUwM30.PKrzTAxbizFxYynBl_wVr7S5E_jRijglh0jJAD4o86o";

export default function ViewSkill() {
  const { id } = useParams();
  const navigate = useNavigate();  

  
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchSkill = async () => {
    try {
      const skillRes = await axios.get(`http://localhost:3000/api/skill/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkill(skillRes.data.skill || null);  // set whole skill object here
    } catch (error) {
      console.error("Error fetching skill:", error);
      setSkill(null);
    } finally {
      setLoading(false);
    }
  };

  fetchSkill();
}, [id]);

   const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to skill this question?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/skill/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("skill deleted successfully!");
      navigate("/skill");
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill.");
    }
  };


  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!skill) return <div className="text-center mt-10 text-red-500">Skill not found.</div>;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaClipboardList />
            <span>Skill</span>
          </h1>

          <div className="flex p-4 space-x-4">
            <Link to="/skill">
              <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Back
              </button>
            </Link>
            <Link to={`/updateskill/${id}`}>
              <button className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Update
              </button>
            </Link>
            <Link to="/skill">
                <button
              onClick={handleDelete}
              className="bg-red-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
              Delete
            </button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-800 mt-4">
            <table className="w-full bg-white">
              <tbody>
                <tr className="border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Skill</td>
                  <td className="py-5">{skill.skill_name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
