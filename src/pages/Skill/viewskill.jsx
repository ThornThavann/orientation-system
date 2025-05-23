import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import Header from "../../components/Header";

export default function ViewSkill() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto ">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
            <FaClipboardList />
            <span>Skill</span>
          </h1>

          <div className="flex p-4 space-x-4 ">
            <Link to="/skill">
              <button className="bg-gray-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Back
              </button>
            </Link>
            <Link to="/updateskill">
              <button className="bg-blue-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition">
                Update
              </button>
            </Link>

            <Link to="/skill">
              <button
                onClick={() => {
                  alert("Deleted!");
                }}
                className="bg-red-400 text-white px-6 py-2 rounded-md hover:opacity-80 transition"
              >
                Delete
              </button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-800 mt-4">
            <table className="w-full bg-white">
              <tbody>
                <tr className=" border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Skill</td>
                  <td className="py-5">Web mobile app development</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
