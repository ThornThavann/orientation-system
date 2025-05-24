import React, { useEffect, useState } from "react";

export const SchoolCountPage = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [filteredSchoolData, setFilteredSchoolData] = useState([]);
  const [schoolYearFilter, setSchoolYearFilter] = useState("");
  const [schoolLoading, setSchoolLoading] = useState(true);
  const [schoolError, setSchoolError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/api/student/school-count", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch school count");
        return res.json();
      })
      .then((json) => {
        // Assume json is an array, adjust if your API returns differently
        setSchoolData(json);
        setFilteredSchoolData(json);
        setSchoolLoading(false);
      })
      .catch((err) => {
        setSchoolError(err.message);
        setSchoolLoading(false);
      });
  }, []);

  const handleSchoolYearChange = (e) => {
    const year = e.target.value;
    setSchoolYearFilter(year);

    if (year === "") {
      setFilteredSchoolData(schoolData);
    } else {
      const filtered = schoolData.filter(
        (item) => item.year?.toString() === year.toString()
      );
      setFilteredSchoolData(filtered);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-green-600">Student by school in a year</h3>
        <input
          type="number"
          placeholder="Filter by Year"
          value={schoolYearFilter}
          onChange={handleSchoolYearChange}
          className="border border-gray-300 rounded px-3 py-1"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {schoolLoading ? (
          <p>Loading school data...</p>
        ) : schoolError ? (
          <p className="text-red-500">Error: {schoolError}</p>
        ) : filteredSchoolData.length > 0 ? (
          filteredSchoolData.map(({ school, year, student_count }, index) => (
            <Card
              key={`${school}-${year}-${index}`}
              title={`${school} (${year})`}
              value={student_count}
            />
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="border border-gray-300 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
    <p className="text-gray-700 font-semibold mb-2">{title}</p>
    <h2 className="text-2xl font-bold text-green-600">{value}</h2>
  </div>
);
