import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res= await axios.post("/auth/login",{ email, password });
      localStorage.setItem("token", res.data.token);
      login(res.data.user);
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message || "Login failed"
      );
    }
  };
  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center h-[80vh]">
        <form
          onSubmit={handleSubmit}
          className="w-[400px] border p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
