import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password
      });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-[420px] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Create Account
        </h2>

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Full Name"
          onChange={e => setName(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-3 rounded mb-5"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
