import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  // Load Product
  const loadProduct = async () => {
    try {

      const res = await api.get("/products");

      const foundProduct = res.data.find(
        (item) => item._id === id
      );

      setProduct(foundProduct);

    } catch (error) {
      console.log("Error loading product:", error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  // Add To Cart
  const addToCart = async () => {

    try {

      const userId = localStorage.getItem("userId");

      // Login check
      if (!userId) {
        navigate("/login");
        return;
      }

      // Stock check
      if (product.stock <= 0) {
        alert("Product out of stock");
        return;
      }

      // API Call
      await api.post("/cart/add", {
        userId,
        productId: product._id
      });

      // Update Navbar Cart Count
      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart");

    } catch (error) {

      console.log("Add To Cart Error:", error);

    }
  };

  // Loading
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-gray-600">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100 py-12 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="bg-gray-50 p-8 flex items-center justify-center">

          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[450px] object-contain hover:scale-105 transition duration-500"
          />

        </div>

        {/* Product Details */}
        <div className="p-8 flex flex-col justify-center">

          {/* Category */}
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-4 w-fit">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-800 mb-5 leading-tight">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Price */}
          <div className="mb-4">

            <span className="text-4xl font-bold text-green-600">
              ₹{product.price}
            </span>

          </div>

          {/* Stock */}
          <div className="mb-8">

            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold text-lg">
                ✅ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-500 font-semibold text-lg">
                ❌ Out of Stock
              </p>
            )}

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">

            <button
              onClick={addToCart}
              disabled={product.stock <= 0}
              className={`px-8 py-4 rounded-xl text-lg font-bold shadow-lg transition duration-300
              ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
              }`}
            >
              🛒 Add To Cart
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="px-8 py-4 rounded-xl text-lg font-bold bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              View Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}