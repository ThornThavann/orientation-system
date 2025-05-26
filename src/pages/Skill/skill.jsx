import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import Button from "../../components/Button";
import Buttons from "../../components/ButtonAction";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Skill() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/skill/all", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSkills(res.data);
        } else if (Array.isArray(res.data.data)) {
          setSkills(res.data.data);
        } else if (Array.isArray(res.data.skills)) {
          setSkills(res.data.skills);
        } else {
          console.warn("Unexpected response format:", res.data);
          setSkills([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch skills:", err);
        setError("Failed to fetch skills");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // <-- no extra closing brace here

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 container mx-auto px-6 py-10">
        <Header />
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <FaClipboardList />
            <span className="">Skill</span>
          </h1>

          <div className="mb-5">
            <Link to="/createskill">
              <Button name="Create" />
            </Link>
          </div>

          {loading && <p>Loading skills...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto border rounded-lg shadow">
              <table className="min-w-full bg-white text-sm">
                <thead className="bg-indigo-600 text-white text-left">
                  <tr>
                    <TableHeader name="Action" />
                    <TableHeader name="Skill" />
                  </tr>
                </thead>
                <tbody>
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <tr
                        key={skill.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-7 py-5">
                          <Link to={`/viewskill/${skill.id}`}>
                            <Buttons />
                          </Link>
                        </td>
                        <td className="px-7 py-5">{skill.skill_name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={2}
                        className="text-center px-7 py-5 text-gray-500"
                      >
                        No skills found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
