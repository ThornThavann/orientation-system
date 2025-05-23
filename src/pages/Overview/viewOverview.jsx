import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import Button from "../../components/Button";

function View() {
  const navigate = useNavigate();  // Initialize the navigate function

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold">Book Catalog Information</h1>

      <div className="flex justify-start gap-4 mt-4 py-4">
        <Button 
          name="Back" 
          kind="bg-gray h-20 w-20 hover:bg-blue-700  rounded-lg" 
          onClick={() => navigate("/")} // This will navigate to the homepage
        />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <tbody>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-5 text-black font-semibold">Name</td>
              <td className="px-6 py-5">van</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-5 text-black font-semibold">School</td>
              <td className="px-6 py-5">sob</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-5 text-black font-semibold">Skill</td>
              <td className="px-6 py-5">John Doe, Jane Smith</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-5 text-black font-semibold">Gender</td>
              <td className="px-6 py-5">Example Publisher</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-5 text-black font-semibold">Year</td>
              <td className="px-6 py-5">2022</td>
            </tr>
            <tr className="border-t border-gray-200">
              <td className="px-6 py-5 text-black font-semibold">Grad</td>
              <td className="px-6 py-5">2nd</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default View;
