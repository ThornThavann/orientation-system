import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaQuestionCircle } from "react-icons/fa";
import Button from "../../components/Button";
import Buttons from "../../components/ButtonAction";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";

export default function Question() {
  return (
    
    <div className="flex min-h-screen">
      
      <Sidebar />
      {/* Main content */}
    
      <div className="flex-1 container mx-auto">
       <Header />
       
        <h1 className="text-2xl font-semibold mb-4 flex items-center space-x-2 text-indigo-600">
          <FaQuestionCircle />
          <span className="py-4 ">Question</span>
        </h1>

        <div className="mb-10">
          <Link to="/CreateQuestion">
            <Button name="Create" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-800">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-300 text-black">
              <tr className="border-b border-gray-800">
                <TableHeader name="Action" />
                <TableHeader name="Question" />
                <TableHeader name="Skill" />
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-7 py-5">
                  <Link to="/ViewQuestion">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-7 py-5">What is HTML?</td>
                <td className="px-7 py-5">WMAD</td>
              </tr>
              <tr className=" border-gray-800 hover:bg-gray-100">
                <td className="px-7 py-5">
                  <Link to="/ViewQuestion">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-7 py-5">What is CSS?</td>
                <td className="px-7 py-5">WMAD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
