import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api.js";

export default function Navbar() {

  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);

  const userId = localStorage.getItem("userId");

  // Load Cart Count
  useEffect(() => {

    const loadCart = async () => {
      try {

        if (!userId) {
          setCartCount(0);
          return;
        }

        const res = await api.get(`/cart/${userId}`);

        const total = res.data?.items?.reduce(
          (sum, item) => sum + item.quantity,
          0
        ) || 0;

        setCartCount(total);

      } catch (err) {
        console.error("Error loading cart:", err);
      }
    };

    loadCart();

    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };

  }, [userId]);

  // Logout
  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-xl px-6 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide text-white hover:scale-105 transition duration-300"
        >
          🛍 Akanksha Store
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Home */}
          <Link
            to="/"
            className="text-white font-medium hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-3xl hover:scale-110 transition duration-300"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold min-w-[22px] h-[22px] px-1 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          {!userId ? (
            <div className="flex gap-3">

              <Link
                to="/login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 hover:scale-105 transition duration-300 shadow-md"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 hover:scale-105 transition duration-300 shadow-md"
              >
                Register
              </Link>

            </div>
          ) : (

            <button
              onClick={logout}
              className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 hover:scale-105 transition duration-300 shadow-md"
            >
              Logout
            </button>

          )}
        </div>
      </div>
    </nav>
  );
}