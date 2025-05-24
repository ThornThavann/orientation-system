import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaUserFriends } from "react-icons/fa";
import Button from "../../components/Button";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";
import Buttons from "../../components/ButtonAction";
import axios from "axios";
import { useEffect, useState } from "react";

const token =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJlbWFpbCI6Im1vY2hAZXhhbXBsZS5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDgwNzk1OTgsImV4cCI6MTc0ODA4MzE5OH0.t7xU-GQ84I_Qqdv0elaF6ndU0ixjtfUaFT5dCocYzb0";

export default function Member() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/user", {
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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-5 flex items-center space-x-2 text-indigo-600">
            <FaUserFriends />
            <span className="py-4">Member</span>
          </h1>

          <div className="mb-5">
            <Link to="/createmember">
              <Button name="Create" />
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-800">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-300 text-black">
                <tr className="border-b border-gray-800">
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
                      className="border-b border-gray-800 hover:bg-gray-100"
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
                    <td colSpan="3" className="px-7 py-5 text-center">
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
