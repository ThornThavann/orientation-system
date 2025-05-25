import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaUserFriends } from "react-icons/fa";
// import Header from "../../components/Header";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Viewuser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Get token from localStorage

  useEffect(() => {
    console.log("User ID param:", id); // Debugging

    const fetchuser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("API response data:", res.data); // Debugging
        // Adjust this line depending on your API response shape:
        setUser(res.data.user || res.data || null);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchuser();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully!");
      navigate("/member");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!user) return <div className="text-center mt-10 text-red-500">User not found.</div>;

  return (
    
    <div className="flex min-h-screen">
      
      <Sidebar />
      {/* <Header/> */}

      {/* Main content */}
      <div className="flex-1 container mx-auto p-[50px]">
        <h1 className="text-2xl font-semibold mb-5 flex items-center space-x-2 text-indigo-600">
          <FaUserFriends />
          <span>User</span>
        </h1>

        <div className="flex p-4 space-x-4 ">
          <Link to="/member">
            <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
              Back
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
            Delete
          </button>

        </div>

        <div className="overflow-hidden rounded-lg border border-gray-800 mt-5">
          <table className="w-full bg-white">
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-2 font-semibold text-base">Name</td>
                <td className="py-5">{user.name}</td>
              </tr>
              <tr className="border-gray-800 hover:bg-gray-100">
                <td className="px-2 font-semibold text-base">Email</td>
                <td className="py-5">{user.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
