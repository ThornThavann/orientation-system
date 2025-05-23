import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
      
        <main className="flex-1 p-6 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-blue-600 font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">▦</span> Dashboard
            </h1>
            <div tabIndex={0} role="button" className="text-blue-600 cursor-pointer font-semibold">
              All ▼
            </div>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card title="Student" value="450" />
            <Card title="Skill" value="50" />
            <MustSkillCard />
          </div>

          {/* Chart Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <ChartBox title="Out side" percent="41%" number="550" />
            <ChartBox title="Inside" percent="60%" number="750" />
          </div>
        </main>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="border border-gray-300 p-6 bg-gray-50 hover:shadow-lg transition-shadow rounded-lg">
    <p className="text-gray-600 uppercase tracking-wide font-semibold mb-2">{title}</p>
    <h2 className="text-3xl font-extrabold text-blue-600">{value}</h2>
  </div>
);

const MustSkillCard = () => (
  <div className="border border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:shadow-lg transition-shadow duration-300">
    <h2 className="text-lg font-semibold mb-4">The must skill</h2>
    <div className="flex justify-center items-center mb-4">
      <div className="w-20 h-20 rounded-full border-8 border-blue-700 flex items-center justify-center text-blue-700 font-bold text-xl">
        93%
      </div>
    </div>
    <p className="text-sm font-medium text-gray-600">admin</p>
    <p className="text-sm text-gray-500">250</p>
  </div>
);

const ChartBox = ({ title, percent, number }) => (
  <div className="border border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:shadow-lg transition-shadow duration-300">
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 rounded-full border-8 border-cyan-400 flex items-center justify-center text-xl font-bold text-gray-700">
        {percent}
      </div>
    </div>
    <p className="text-sm font-medium text-gray-600">{title}</p>
    <p className="text-sm text-gray-500">{number}</p>
  </div>
);

export default DashboardPage;
