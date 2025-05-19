import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaUserFriends } from "react-icons/fa";
import Button from "../../components/Button";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";
import Buttons from "../../components/ButtonAction";


export default function Member() {
  return (
    
    <div className="flex min-h-screen">
      <Sidebar />
    
      <div className="flex-1 container mx-auto">
      <Header />
        <div className="flex-1 container mx-auto p-[50px]">

       
        <h1 className="text-2xl font-semibold mb-5 flex items-center space-x-2 text-indigo-600">
          <FaUserFriends />
          <span className="py-4 ">Member</span>
        </h1>

         <div className="mb-5">
          <Link to="/createmember">
            <Button name="Create" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-800">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-300 text-black">
              <tr className="border-b border-gray-800">
                <TableHeader name="Action" />
                <TableHeader name="Name" />
                <TableHeader name="Email" />
              </tr>
            </thead>
            <tbody>
                
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-7 py-5">
                  <Link to="/viewmember">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-7 py-5">Khon sreyvorleak</td>
                <td className="px-7 py-5">Khonsreyvorleak@gmail.com</td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-7 py-5">
                  <Link to="/viewmember">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-7 py-5">Khon sreyvorleak</td>
                <td className="px-7 py-5">Khonsreyvorleak@gmail.com</td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-7 py-5">
                  <Link to="/viewmember">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-7 py-5">Khon sreyvorleak</td>
                <td className="px-7 py-5">Khonsreyvorleak@gmail.com</td>
              </tr><tr className="border-b  hover:bg-gray-100">
                <td className="px-7 py-5">
                  <Link to="/viewmember">
                    <Buttons />
                  </Link>
                </td>
                <td className="px-7 py-5">Khon sreyvorleak</td>
                <td className="px-7 py-5">Khonsreyvorleak@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
