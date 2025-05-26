import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { FaTachometerAlt } from "react-icons/fa";

const Card = ({ title, value }) => (
  <div className="border border-gray-300 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
    <p className="text-gray-700 font-semibold mb-2">{title}</p>
    <h2 className="text-2xl font-bold text-green-600">{value}</h2>
  </div>
);

const YearCountPage = ({ year }) => {
  const [studentData, setStudentData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [latestSkill, setLatestSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    Promise.all([
      fetch("http://localhost:3000/api/student/year-count", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),

      fetch("http://localhost:3000/api/top-skill-year", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([studentRes, skillRes]) => {
        const students = studentRes.data || [];
        const skills = skillRes.data || [];
        setStudentData(students);
        setFilteredStudents(students);

        const sortedSkills = skills.sort((a, b) => b.year.localeCompare(a.year));
        setSkillData(sortedSkills);
        setLatestSkill(sortedSkills[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (year === "") {
      setFilteredStudents(studentData);
      setLatestSkill(skillData[0] || null);
    } else {
      const studentFiltered = studentData.filter((item) =>
        item.year.toString().startsWith(year.toString())
      );
      const skillFiltered = skillData.find((item) =>
        item.year.toString().startsWith(year.toString())
      );
      setFilteredStudents(studentFiltered);
      setLatestSkill(skillFiltered || null);
    }
  }, [year, studentData, skillData]);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-xl font-bold mb-2">Popular Skill</h1>
        {latestSkill ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title={`Year: ${latestSkill.year}`} value={latestSkill.skill_name} />
            <Card title="Total Students" value={latestSkill.studenttotal} />
          </div>
        ) : (
          <p>No data this year</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-2">Student Count</h2>
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredStudents.map(({ year, total_students }) => (
              <Card key={year} title={`Year ${year}`} value={total_students} />
            ))}
          </div>
        ) : (
          <p>No data this year</p>
        )}
      </section>
    </div>
  );
};

const SchoolCountPage = ({ year }) => {
  const [schoolData, setSchoolData] = useState([]);
  const [filteredSchoolData, setFilteredSchoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setSchoolData(json);
        setFilteredSchoolData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (year === "") {
      setFilteredSchoolData(schoolData);
    } else {
      const filtered = schoolData.filter((item) =>
        item.year?.toString().startsWith(year.toString())
      );
      setFilteredSchoolData(filtered);
    }
  }, [year, schoolData]);

  if (loading) return <p>Loading school data...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold text-green-600 mb-4">
        Student by school in a year
      </h3>

      {filteredSchoolData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredSchoolData.map(({ school, year, student_count }, index) => (
            <Card
              key={`${school}-${year}-${index}`}
              title={`${school} (${year})`}
              value={student_count}
            />
          ))}
        </div>
      ) : (
        <p>No data this year</p>
      )}
    </div>
  );
};

const DashboardPage = () => {
  const [yearInput, setYearInput] = useState("");

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-100">
        <Header />
        <main className="p-6 space-y-8">
          <h1 className="flex items-center text-indigo-600 gap-2 text-2xl font-bold">
            <FaTachometerAlt />
            Dashboard
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <input
              type="number"
              placeholder="Type year to filter..."
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded w-64"
            />
          </div>

          <YearCountPage year={yearInput} />
          <SchoolCountPage year={yearInput} />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
