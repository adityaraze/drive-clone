import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) return null; // 🔥 THIS LINE FIXES EVERYTHING

  return (
    <div className="flex justify-between items-center px-6 py-3 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">DriveClone</h1>

      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
