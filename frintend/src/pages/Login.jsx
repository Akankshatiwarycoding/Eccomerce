import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/auth/login", form);

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save userId
      localStorage.setItem(
        "userId",
        res.data.user._id
      );

      // Success message
      setMsg("✅ Login successful!");

      // Update Navbar Cart
      window.dispatchEvent(new Event("cartUpdated"));

      // Redirect
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {

      setMsg(
        err.response?.data?.message || "❌ Login failed"
      );

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/30">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-white text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-center text-white/80 mb-8">
          Login to continue shopping
        </p>

        {/* Message */}
        {msg && (
          <div className="mb-5 text-center bg-white/20 border border-white/30 text-white py-3 rounded-xl font-medium">
            {msg}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="block text-white mb-2 text-sm font-medium">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none focus:ring-4 focus:ring-pink-300 transition"
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-white mb-2 text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/90 outline-none focus:ring-4 focus:ring-pink-300 transition"
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-purple-700 font-bold py-3 rounded-xl hover:bg-pink-100 hover:scale-[1.02] transition duration-300 shadow-lg"
          >
            Login
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-white/80 text-sm mt-8">

          Don’t have an account?{" "}

          <span
            onClick={() => navigate("/register")}
            className="font-bold cursor-pointer hover:text-yellow-200 transition"
          >
            Register
          </span>

        </p>

      </div>
    </div>
  );
}