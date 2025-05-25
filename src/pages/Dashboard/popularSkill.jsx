import React, { useEffect, useState } from "react";

export default function PopularSkillPage() {
  const [latestSkill, setLatestSkill] = useState(null);

  useEffect(() => {
    const fetchLatestSkill = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/top-skill-year", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        // Find the latest year
        const sortedByYear = result.data.sort((a, b) => b.year.localeCompare(a.year));
        setLatestSkill(sortedByYear[0]);
      } catch (error) {
        console.error("Error fetching skill data:", error);
      }
    };

    fetchLatestSkill();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Popular Skill (Latest Year)</h1>
      {latestSkill ? (
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded">
          <div><strong>Year:</strong> {latestSkill.year}</div>
          <div><strong>Skill:</strong> {latestSkill.skill_name}</div>
          <div><strong>Students:</strong> {latestSkill.studenttotal}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
