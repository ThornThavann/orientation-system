import React, { useEffect, useState } from "react";

export const YearCountPage = () => {
  const [yearInput, setYearInput] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [latestSkill, setLatestSkill] = useState(null);

  // Fetch both APIs when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch student year data
    fetch("http://localhost:3000/api/student/year-count", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const data = json.data || [];
        setStudentData(data);
        setFilteredStudents(data);
      })
      .catch((err) => console.error("Student fetch error:", err));

    // Fetch skill data
    fetch("http://localhost:3000/api/top-skill-year", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.data.sort((a, b) => b.year.localeCompare(a.year));
        setSkillData(sorted);
        setLatestSkill(sorted[0]); // default to latest
      })
      .catch((err) => console.error("Skill fetch error:", err));
  }, []);

  // Search both student and skill data by year
  const handleSearch = () => {
    if (yearInput === "") {
      setFilteredStudents(studentData);
      setLatestSkill(skillData[0]); // show latest if empty
    } else {
      const studentFiltered = studentData.filter(
        (item) => item.year.toString() === yearInput.toString()
      );
      const skillFiltered = skillData.find(
        (item) => item.year.toString() === yearInput.toString()
      );
      setFilteredStudents(studentFiltered);
      setLatestSkill(skillFiltered || null);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
    
      <div className="flex flex-col flex-1">
     
        <main className="flex-1 p-6">
          {/* Search Input */}
          <div className="flex items-center gap-4 mb-6">
            <input
              type="number"
              placeholder="Enter Year"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          {/* Popular Skill Section */}
          <section className="mb-8">
            <h1 className="text-xl font-bold mb-2">Popular Skill</h1>
            {latestSkill ? (
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded">
                <div><strong>Year:</strong> {latestSkill.year}</div>
                <div><strong>Skill:</strong> {latestSkill.skill_name}</div>
                <div><strong>Students:</strong> {latestSkill.studenttotal}</div>
              </div>
            ) : (
              <p>No skill data found for this year.</p>
            )}
          </section>

          {/* Student Year Count Section */}
          <section>
            <h2 className="text-xl font-bold mb-2">Student Count</h2>
            {filteredStudents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredStudents.map(({ year, total_students }) => (
                  <Card key={year} title={`Year ${year}`} value={total_students} />
                ))}
              </div>
            ) : (
              <p>No student data found for this year.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="border border-gray-300 p-6 bg-gray-50 hover:shadow-md rounded-lg">
    <p className="text-gray-600 font-semibold mb-1">{title}</p>
    <h2 className="text-3xl font-bold text-blue-600">{value}</h2>
  </div>
);
