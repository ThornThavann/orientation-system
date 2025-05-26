import { Link, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaQuestionCircle, FaClipboardList, FaUserFriends, FaSignOutAlt } from "react-icons/fa";
import logo from "../images/assets/logos.gif";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token"); // Remove token
      navigate("/");                     // Go to login page automatically
    }
  };

  return (
    <aside className="h-screen w-80 bg-gray-100 p-4 flex flex-col gap-6 text-blue-600">
      <div className="flex items-center gap-2">
        <img src={logo} alt="PSE Logo" className="h-50" />
      </div>

      <nav className="flex flex-col gap-4 mt-6">
        <Link to="/dashboard" className="text-2xl font-semibold flex items-center gap-2 hover:bg-gray-300 px-3 py-2 rounded">
          <FaTachometerAlt /> Dashboard
        </Link>
        <Link to="/overview" className="text-2xl font-semibold flex items-center gap-2 hover:bg-gray-300 px-3 py-2 rounded">
          <FaUser /> Overview
        </Link>
        <Link to="/skill" className="text-2xl font-semibold flex items-center gap-2 hover:bg-gray-300 px-3 py-2 rounded">
          <FaClipboardList /> Skill
        </Link>
        <Link to="/question" className="text-2xl font-semibold flex items-center gap-2 hover:bg-gray-300 px-3 py-2 rounded">
          <FaQuestionCircle /> Question
        </Link>
        <Link to="/member" className="text-2xl font-semibold flex items-center gap-2 hover:bg-gray-300 px-3 py-2 rounded">
          <FaUserFriends /> Member
        </Link>
        {/* Logout button with confirmation */}
        <button
          onClick={handleLogout}
          className="text-2xl font-semibold flex items-center gap-2 hover:bg-gray-300 px-3 py-2 rounded text-left"
          type="button"
        >
          <FaSignOutAlt /> Log out
        </button>
      </nav>
    </aside>
  );
}
