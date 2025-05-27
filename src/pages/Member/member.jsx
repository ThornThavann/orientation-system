import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaUserFriends } from "react-icons/fa";
import Button from "../../components/Button";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";
import Buttons from "../../components/ButtonAction";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Member() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    axios
      .get("http://pse-skill-orientation.final25.psewmad.org/api/user/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else if (Array.isArray(res.data.data)) {
          setUsers(res.data.data);
        } else if (Array.isArray(res.data.user)) {
          setUsers(res.data.user);
        } else {
          console.warn("Unexpected response format:", res.data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
        setError("Failed to fetch user");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Run once on mount

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 container mx-auto px-6 py-10">
        <Header />
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <FaUserFriends />
            <span className="py-4">Member</span>
          </h1>

          <div className="mb-5">
            <Link to="/createmember">
              <Button name="Create" />
            </Link>
          </div>

          <div className="overflow-x-auto border rounded-lg shadow">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-indigo-600 text-white text-left">
                <tr>
                  <TableHeader name="Action" />
                  <TableHeader name="Name" />
                  <TableHeader name="Email" />
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((member) => (
                    <tr
                      key={member.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-7 py-5">
                        <Link to={`/viewmember/${member.id}`}>
                          <Buttons />
                        </Link>
                      </td>
                      <td className="px-7 py-5">{member.name}</td>
                      <td className="px-7 py-5">{member.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-b border-gray-800">
                    <td colSpan="2" className="text-center px-7 py-5 text-gray-500">
                      No user found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
