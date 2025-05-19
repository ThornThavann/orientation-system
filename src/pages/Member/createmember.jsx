import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

export default function CreateMember() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 container mx-auto p-[100px]">
        <h1 className="text-2xl font-bold mb-5 text-indigo-600">Member</h1>

        <form className=" flex flex-col gap-4 ">
          <div className="flex flex-col">
            <label htmlFor="fullname" className="mb-1 font-semibold text-lg">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className="border border-gray-300 rounded-2xl px-3 py-4 w-[600px]"
              placeholder="Enter your full name"
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
              className="border border-gray-300 rounded-2xl  px-3 py-4  w-[600px]"
              placeholder="Enter your email"
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
              className="border border-gray-300 rounded-2xl  px-3 py-4  w-[600px]"
              placeholder="Enter your password"
            />
          </div>
        </form>

        <div className="flex space-x-5 mt-10">
        <Link to="/member">
        <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
          Cancel
        </button>
        </Link>


        <Link to="/member">
          <button className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
            Save
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}


