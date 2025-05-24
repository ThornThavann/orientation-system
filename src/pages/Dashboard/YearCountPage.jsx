import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export const YearCountPage = () => { 

  const [studentData, setStudentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:3000/api/student/year-count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch year count");
        return res.json();
      })
      .then((json) => {
        const data = json.data || [];
        console.log("Fetched student data:", data);  // <-- Add this line
        setStudentData(data);
        setFilteredData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);

    if (year === "") {
      setFilteredData(studentData);
    } else {
      const filtered = studentData.filter(
        (item) => item.year.toString() === year.toString()
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="flex flex-col flex-1">
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-blue-600 font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">▦</span> Year Count Dashboard
            </h1>

            <input
              type="number"
              placeholder="Search Year Count by year..."
              value={selectedYear}
              onChange={handleYearChange}
              className="border border-gray-300 rounded px-3 py-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {loading ? (
              <p>Loading student data...</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : filteredData.length > 0 ? (
              filteredData.map(({ year, total_students }) => (
                <Card key={year} title="Student" value={total_students} />
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="border border-gray-300 p-6 bg-gray-50 hover:shadow-lg transition-shadow rounded-lg">
    <p className="text-gray-600 uppercase tracking-wide font-semibold mb-2">
      {title}
    </p>
    <h2 className="text-3xl font-extrabold text-blue-600">{value}</h2>
  </div>
);


