const SchoolCountPage = ({ year }) => {
  const [schoolData, setSchoolData] = useState([]);
  const [filteredSchoolData, setFilteredSchoolData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://pse-skill-orientation.final25.psewmad.org/api/student/school-count", {
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

export default SchoolCountPage;