import { useState, useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const navigate = useNavigate();

  // Load Data
  useEffect(() => {

    // Login check
    if (!userId || userId === "undefined") {

      navigate("/login");

      return;
    }

    // Load Cart
    const loadCart = async () => {

      try {

        const res = await api.get(`/cart/${userId}`);

        setCart(res.data);

      } catch (err) {

        console.error("Cart Error:", err);

      }
    };

    // Load Address
    const loadAddresses = async () => {

      try {

        const res = await api.get(`/address/${userId}`);

        setAddresses(res.data);

        if (res.data.length > 0) {
          setSelectedAddress(res.data[0]);
        }

      } catch (err) {

        console.error("Address Error:", err);

      }
    };

    loadCart();
    loadAddresses();

  }, [userId, navigate]);

  // Loading
  if (!cart) {

    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading...
      </div>
    );
  }

  // Safe Total
  const total = cart?.items?.reduce(
    (sum, item) =>
      sum +
      ((item.productId?.price || 0) * item.quantity),
    0
  );

  // Place Order
  const placeOrder = async () => {

    if (!selectedAddress) {

      alert("Please select address");

      return;
    }

    try {

      const res = await api.post("/order/place", {
        userId,
        address: selectedAddress
      });

      console.log(res.data);

      // Refresh navbar
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      navigate(
        `/order-success/${res.data.order._id}`
      );

    } catch (err) {

      console.error("Order Error:", err);

      alert("Failed to place order");
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold mb-8 text-center">
          Checkout
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Address Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              Select Address
            </h2>

            {addresses.length === 0 ? (

              <div>

                <p className="mb-4 text-gray-600">
                  No address found
                </p>

                <button
                  onClick={() =>
                    navigate("/checkout-address")
                  }
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                >
                  Add Address
                </button>

              </div>

            ) : (

              addresses.map((addr) => (

                <div
                  key={addr._id}
                  onClick={() =>
                    setSelectedAddress(addr)
                  }
                  className={`border p-4 rounded-xl mb-4 cursor-pointer transition ${
                    selectedAddress?._id === addr._id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:border-gray-400"
                  }`}
                >

                  <h3 className="font-bold text-lg">
                    {addr.fullName}
                  </h3>

                  <p>{addr.phone}</p>

                  <p className="text-gray-600">
                    {addr.addressLine},
                    {" "}
                    {addr.city},
                    {" "}
                    {addr.state}
                    {" - "}
                    {addr.pincode}
                  </p>

                </div>

              ))
            )}

          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-5">
              Order Summary
            </h2>

            <div className="space-y-4">

              {cart?.items?.map((item) => (

                item.productId && (

                  <div
                    key={item.productId._id}
                    className="flex justify-between border-b pb-3"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.productId.title}
                      </h3>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold">
                      ₹
                      {item.productId.price *
                        item.quantity}
                    </p>

                  </div>
                )
              ))}

            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-6 text-2xl font-bold">

              <span>Total:</span>

              <span>₹{total}</span>

            </div>

            {/* Button */}
            <button
              onClick={placeOrder}
              className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-bold transition"
            >
              Place Order (COD)
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}