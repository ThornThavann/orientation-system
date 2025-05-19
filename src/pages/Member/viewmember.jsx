import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaUserFriends } from "react-icons/fa";
import Header from "../../components/Header";

export default function ViewMember() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 container mx-auto ">
        <Header/>

         <div className="flex-1 container mx-auto p-[50px]">
        <h1 className="text-2xl font-semibold mb-5 flex items-center space-x-2 text-indigo-600">
          <FaUserFriends />
          <span>Member</span>
        </h1>

        <div className="flex p-4 space-x-4 ">
          <Link to="/member">
            <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
              Back
            </button>
          </Link>
  
          <Link to="/member">
            <button
              onClick={() => {
                alert("Deleted!");
              }}
              className="bg-red-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
              Delete
            </button>
          </Link>

        </div>

        <div className="overflow-hidden rounded-lg border border-gray-800 mt-5">
          <table className="w-full bg-white">
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-2 font-semibold text-base">Name</td>
                <td className="py-5">Khon sreyvorleak</td>
              </tr>
              <tr className=" border-gray-800 hover:bg-gray-100">
                <td className="px-2 font-semibold text-base">Email</td>
                <td className="py-5">khonsreyvorleak@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        </div>
      </div>
  );
}

