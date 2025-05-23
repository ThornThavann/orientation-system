import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import TableHeader from "../../components/TableHeader";
import Header from "../../components/Header";
import { FaUser } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function Overview() {
  const [studentResults, setStudentResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [availableYears, setAvailableYears] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Assumes token is saved under the key "token"
  
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
  
    fetch("http://localhost:3000/api/student-results", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const results = Array.isArray(data) ? data : data.data;
        if (Array.isArray(results)) {
          setStudentResults(results);
          const years = [
            ...new Set(results.map((item) => new Date(item.created_at).getFullYear())),
          ];
          setAvailableYears(years.sort((a, b) => b - a));
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  

  const filteredResults = studentResults.filter((item) => {
    const term = searchTerm.toLowerCase();
    const year = new Date(item.created_at).getFullYear();
    const matchesSearch =
      item.studentname.toLowerCase().includes(term) ||
      item.school.toLowerCase().includes(term) ||
      item.grade.toString().includes(term) ||
      item.skillname.toLowerCase().includes(term) ||
      item.gender.toLowerCase().includes(term);

    const matchesYear = selectedYear === "All" || year.toString() === selectedYear;

    return matchesSearch && matchesYear;
  });

  const exportToExcel = () => {
    const exportData = filteredResults.map((item) => ({
      Name: item.studentname,
      School: item.school,
      Grade: item.grade,
      Skill: item.skillname,
      Year: new Date(item.created_at).getFullYear(),
      Gender: item.gender.charAt(0).toUpperCase(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Results");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "student_results.xlsx");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 container mx-auto px-6 py-10">
        <Header />
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h1 className="text-3xl font-bold text-indigo-700 flex items-center gap-2 mb-6">
            <FaUser />
            Overview
          </h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <button
              onClick={exportToExcel}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium shadow transition"
            >
              Export data to Excel
            </button>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md shadow-sm w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="All">All Years</option>
                {availableYears.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto border rounded-lg shadow">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-indigo-600 text-white text-left">
                <tr>
                  <TableHeader name="Name" />
                  <TableHeader name="School" />
                  <TableHeader name="Grade" />
                  <TableHeader name="Skill" />
                  <TableHeader name="Year" />
                  <TableHeader name="Gender" />
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{item.studentname}</td>
                    <td className="px-6 py-4">{item.school}</td>
                    <td className="px-6 py-4">{item.grade}</td>
                    <td className="px-6 py-4">{item.skillname}</td>
                    <td className="px-6 py-4">
                      {new Date(item.created_at).getFullYear()}
                    </td>
                    <td className="px-6 py-4">
                      {item.gender.charAt(0).toUpperCase()}
                    </td>
                  </tr>
                ))}
                {filteredResults.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-6 text-gray-500">
                      No matching data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
