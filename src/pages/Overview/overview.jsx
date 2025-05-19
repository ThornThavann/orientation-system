import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Button from "../../components/Button";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";
import Buttons from "../../components/ButtonAction";
import { FaUser } from "react-icons/fa";
import SearchForm from "../../components/Search";

export default function Overview() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 container mx-auto">
        <Header />
        <div className="flex-1 container mx-auto p-[50px]">
          <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-semibold mb-5 flex items-center space-x-2 text-indigo-600">
            <FaUser />
            <span className="py-4 ">Overview</span>
          </h1> 
          <SearchForm/>
          </div>

          <div className="mb-5 justify-between flex">
            <Link to="/">
              <Button name="Export" />
            </Link>

            <Link to="/">
              <Button name="View by Date" />
            </Link>
          </div>

          <div className=" overflow-hidden rounded-lg border border-gray-800 ">
            <table className="min-w-full bg-white ">
              <thead className="bg-gray-300 text-black">
                <tr className="border-b border-gray-800">
                  <TableHeader name="Action" />
                  <TableHeader name="Name" />
                  <TableHeader name="School" />
                  <TableHeader name="Grand" />
                  <TableHeader name="Skill" />
                  <TableHeader name="Year" />
                  <TableHeader name="Gender" />
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-7 py-5">
                    <Link to="/viewoverview">
                      <Buttons />
                    </Link>
                  </td>
                  <td className="px-7 py-5">Khon sreyvorleak</td>
                  <td className="px-7 py-5">Outside</td>
                  <td className="px-7 py-5">12</td>
                  <td className="px-7 py-5">WMAD</td>
                  <td className="px-7 py-5">2025</td>
                  <td className="px-7 py-5">F</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-7 py-5">
                    <Link to="/viewoverview">
                      <Buttons />
                    </Link>
                  </td>
                  <td className="px-7 py-5">Khon sreyvorleak</td>
                  <td className="px-7 py-5">Outside</td>
                  <td className="px-7 py-5">12</td>
                  <td className="px-7 py-5">WMAD</td>
                  <td className="px-7 py-5">2025</td>
                  <td className="px-7 py-5">F</td>
                </tr>
                <tr className="border-b border-gray-800 hover:bg-gray-100">
                  <td className="px-7 py-5">
                    <Link to="/viewoverview">
                      <Buttons />
                    </Link>
                  </td>
                  <td className="px-7 py-5">Khon sreyvorleak</td>
                  <td className="px-7 py-5">Outside</td>
                  <td className="px-7 py-5">12</td>
                  <td className="px-7 py-5">WMAD</td>
                  <td className="px-7 py-5">2025</td>
                  <td className="px-7 py-5">F</td>
                </tr>
                <tr className="border-b  hover:bg-gray-100">
                  <td className="px-7 py-5">
                    <Link to="/viewoverview">
                      <Buttons />
                    </Link>
                  </td>
                  <td className="px-7 py-5">Khon sreyvorleak</td>
                  <td className="px-7 py-5">Outside</td>
                  <td className="px-7 py-5">12</td>
                  <td className="px-7 py-5">WMAD</td>
                  <td className="px-7 py-5">2025</td>
                  <td className="px-7 py-5">F</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
