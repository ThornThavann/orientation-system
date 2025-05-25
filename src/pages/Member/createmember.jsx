import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";


export default function CreateMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,   // changed here
          email,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create user");
      }

      setSuccess("User created successfully!");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/createmember");
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 container mx-auto p-[100px]">
        <h1 className="text-2xl font-bold mb-5 text-indigo-600">Member</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold text-lg">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded-2xl px-3 py-4 w-[600px]"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold text-lg ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-300 rounded-2xl px-3 py-4 w-[600px]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-300 rounded-2xl px-3 py-4 w-[600px]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="flex space-x-5 mt-10">
            <Link to="/member">
              <button
                type="button"
                className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
