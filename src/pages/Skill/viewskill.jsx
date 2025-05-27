// src/pages/ViewSkill.jsx

import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function ViewSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axios.get(`http://pse-skill-orientation.final25.psewmad.org/api/skill/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSkill(res.data.skill || null);
      } catch (error) {
        console.error("Error fetching skill:", error);
        setSkill(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this skill?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://pse-skill-orientation.final25.psewmad.org/api/skill/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Skill deleted successfully!");
      navigate("/skill");
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("Failed to delete skill.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!skill) {
    return <div className="text-center mt-10 text-red-500">Skill not found.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 container mx-auto px-6 py-10">
        <Header />

        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          {/* Page title */}
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <FaClipboardList />
            <span className="">Skill</span>
          </h1>

          {/* Action buttons */}
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

            <button
              onClick={handleDelete}
              className="bg-red-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
            >
              Delete
            </button>
          </div>

          {/* Skill data table */}
          <div className="overflow-hidden rounded-lg border border-gray-800 mt-4">
            <table className="w-full bg-white">
              <tbody>
                <tr className="border-gray-800 hover:bg-gray-100">
                  <td className="px-4 py-3 font-semibold text-base w-1/3">Skill</td>
                  <td className="px-4 py-3">{skill.skill_name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
