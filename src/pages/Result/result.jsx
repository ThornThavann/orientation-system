import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function Result() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="flex-1 container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Book Catalog</h1>

        <Link to="/book-catalog/new">
          <button className="bg-blue-500 text-white px-6 py-2 mb-4 rounded-lg">
            Create
          </button>
        </Link>

        <div className="overflow-hidden rounded-lg border border-gray-800 mt-4">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-300 text-black">
              <tr className="border-b border-gray-800">
                <th className="px-7 py-5 text-left">Action</th>
                <th className="px-7 py-5 text-left">ISBN</th>
                <th className="px-7 py-5 text-left">Title</th>
                <th className="px-7 py-5 text-left">Authors</th>
                <th className="px-7 py-5 text-left">Publisher</th>
                <th className="px-7 py-5 text-left">Genre</th>
                <th className="px-7 py-5 text-left">Shelf Location</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-7 py-5">
                  <button className="bg-blue-400 text-white py-1 px-3 rounded hover:bg-blue-500">
                    View
                  </button>
                </td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
              </tr>
              <tr className="border-b border-gray-800 hover:bg-gray-100">
                <td className="px-7 py-5">
                  <button className="bg-blue-400 text-white py-1 px-3 rounded hover:bg-blue-500">
                    View
                  </button>
                </td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
                <td className="px-7 py-5">---</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Result;
