import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaClipboardList } from "react-icons/fa";
import Button from "../../components/Button";
import Buttons from "../../components/ButtonAction";
import TableHeader from "../../components/TableHeader";

export default function Skill() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />

      <div className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-6 flex items-center text-indigo-700 space-x-3">
          <FaClipboardList className="text-indigo-600 text-2xl" />
          <span>Overview</span>
        </h1>

        <div className="mb-6">
          <Link to="/createskill">
            <Button name="Create" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg shadow-md border border-gray-300 bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-indigo-100 text-indigo-800 uppercase text-sm font-semibold">
              <tr>
                <TableHeader name="Action" />
                <TableHeader name="Skill" />
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <Link to="/viewskill">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-6 py-4">Accounting</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <Link to="/ViewQuestion">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-6 py-4">Web Mobile App Development</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
