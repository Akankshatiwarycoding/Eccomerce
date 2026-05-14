import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const userId = localStorage.getItem("userId");

  const [cart, setCart] = useState(null);

  const navigate = useNavigate();

  // Load Cart
  const loadCart = async () => {
    try {

      if (!userId) return;

      const res = await api.get(`/cart/${userId}`);

      setCart(res.data);

    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, [userId]);

  // Remove Item
  const removeItem = async (productId) => {
    try {

      await api.post("/cart/remove", {
        userId,
        productId
      });

      loadCart();

      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error(err);
    }
  };

  // Update Quantity
  const updateQty = async (productId, quantity) => {
    try {

      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }

      await api.post("/cart/update", {
        userId,
        productId,
        quantity
      });

      loadCart();

      window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {
      console.error(err);
    }
  };

  // Loading
  if (!cart) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-2xl font-bold text-gray-600">
        Loading Cart...
      </div>
    );
  }

  // Total Price
  const total = cart?.items?.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  ) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          🛒 Your Shopping Cart
        </h1>

        {/* Empty Cart */}
        {cart.items.length === 0 ? (

          <div className="bg-white shadow-xl rounded-2xl p-10 text-center">

            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mb-6">
              Add some amazing products to your cart.
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition duration-300"
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="space-y-6">

            {/* Cart Items */}
            {cart.items.map((item) => (

              <div
                key={item.productId._id}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6 hover:shadow-2xl transition duration-300"
              >

                {/* Left Side */}
                <div className="flex items-center gap-5">

                  {/* Product Image */}
                  <img
                    src={item.productId.image}
                    alt={item.productId.title}
                    className="w-28 h-28 object-cover rounded-xl border"
                  />

                  {/* Product Info */}
                  <div>

                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.productId.title}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {item.productId.category}
                    </p>

                    <p className="text-xl font-semibold text-green-600 mt-2">
                      ₹{item.productId.price}
                    </p>

                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">

                  <button
                    onClick={() =>
                      updateQty(
                        item.productId._id,
                        item.quantity - 1
                      )
                    }
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold transition"
                  >
                    -
                  </button>

                  <span className="text-xl font-semibold min-w-[30px] text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQty(
                        item.productId._id,
                        item.quantity + 1
                      )
                    }
                    className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold transition"
                  >
                    +
                  </button>

                </div>

                {/* Right Side */}
                <div className="text-right">

                  <p className="text-2xl font-bold text-gray-800 mb-3">
                    ₹{item.productId.price * item.quantity}
                  </p>

                  <button
                    onClick={() => removeItem(item.productId._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition duration-300"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

            {/* Total Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-5">

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Total: ₹{total}
                </h2>

                <p className="text-gray-500 mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              <button
                onClick={() => navigate("/checkout-address")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition duration-300"
              >
                Proceed to Checkout
              </button>

            </div>

          </div>

        )}

      </div>
    </div>
  );
}