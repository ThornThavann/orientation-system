import React from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { YearCountPage } from "./YearCountPage";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <main className="p-6">
          <YearCountPage />
          {/* <SchoolCountPage /> */}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
