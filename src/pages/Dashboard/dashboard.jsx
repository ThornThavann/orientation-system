import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { YearCountPage } from "./YearCountPage";
import { SchoolCountPage } from "./SchoolCountPage";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <main className="p-6 space-y-8">
          {/* Section for Year Count */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">
              Yearly Student Summary
            </h2>
            <YearCountPage />
          </section>

          {/* Section for School Count */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-800">
              School-wise Student Count
            </h2>
            <SchoolCountPage />
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
