import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaTachometerAlt } from "react-icons/fa";
import YearCountPage from "./YearCountPage";
import SchoolCountPage from "./SchoolCountPage";




const DashboardPage = () => {
  const [yearInput, setYearInput] = useState("");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <main className="p-6 space-y-8">
          <h1 className="flex items-center text-indigo-600 gap-2 text-2xl font-bold">
            <FaTachometerAlt />
            Dashboard
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="string"
              placeholder="Type year to filter..."
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded w-64"
            />
          </div>

          <YearCountPage year={yearInput} />
          <SchoolCountPage year={yearInput} />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
