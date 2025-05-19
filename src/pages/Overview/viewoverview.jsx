import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaUser } from "react-icons/fa";

export default function ViewOverview() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <h1 className="text-2xl font-semibold mb-5 flex items-center space-x-2 text-indigo-600">
            <FaUser />
            <span className="py-4 ">Overview</span>
          </h1>

         <div className="overflow-hidden rounded-lg border border-gray-800 mt-4">
            <table className="w-full bg-white">
              <tbody>
                <tr className=" border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Name</td>
                  <td className="py-5">Khon sreyvorleak</td>
                </tr>

                  <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">School</td>
                  <td className="py-5">Outside</td>
                </tr>

                  <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Grand</td>
                  <td className="py-5">12</td>
                </tr>

                  <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Skill</td>
                  <td className="py-5">WMAD</td>
                </tr>

                  <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Year</td>
                  <td className="py-5">2025</td>
                </tr>

                  <tr className=" border-gray-800 hover:bg-gray-100">
                  <td className="px-2 font-semibold text-base">Gender</td>
                  <td className="py-5">F</td>
                </tr>
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
