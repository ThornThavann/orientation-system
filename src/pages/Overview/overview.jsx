import React from "react";
import Sidebar from "../../components/Sidebar";

export default function overview() {
  return (
<div className="flex min-h-screen">
  <Sidebar />
  <div className="flex justify-between p-6 w-full">
    <h1 className="text-2xl font-bold">Welcome to Home Page</h1>
    <div className="flex space-x-6">
      <h1 className="text-xl">Thavann</h1>
      <img
        src="https://github.com/shadcn.png"
        alt="avatar"
        className="w-12 h-12 rounded-full"
      />
    </div>
  </div>
</div>
  );
}
