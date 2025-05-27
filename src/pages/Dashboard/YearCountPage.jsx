import React, { useState, useEffect } from 'react';


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
      fetch(`${process.env.REACT_APP_BASE_URL}api/student/year-count`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),

      fetch(`${process.env.REACT_APP_BASE_URL}api/top-skill-year`, {
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
const Card = ({ title, value }) => (
  <div className="border border-gray-300 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
    <p className="text-gray-700 font-semibold mb-2">{title}</p>
    <h2 className="text-2xl font-bold text-green-600">{value}</h2>
  </div>
);

export default YearCountPage;