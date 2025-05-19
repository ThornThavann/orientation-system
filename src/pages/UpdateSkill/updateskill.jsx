import React from "react";
import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

export default function UpdateSkill() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 container mx-auto ">
        <Header/>
        <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
          <FaClipboardList />
          <span>Skill</span>
        </h1>

        <div className="overflow-hidden rounded-lg mt-10">
            
          <label className="block mt-5">
            <span className="text-gray-700 font-semibold ">Skill name</span>
            <input
              type="skill"
              name="skill"
              className="text-[18px] mt-4 block w-[700px] px-4 py-4 border-2  border-gray-300  rounded-xl"
            />
          </label>
        </div>

        <div className="flex space-x-4  mt-10">
          <Link to="/skill">
          <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
            Cancel
          </button>
          </Link>
          <Link to="/skill">
          <button className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
            Update
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

