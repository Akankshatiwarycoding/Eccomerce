import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/products/add", form);

      alert("Product added successfully");
      navigate("/admin/products");

    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center px-4">

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8">

        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              value={form[key]}
              onChange={handleChange}
              placeholder={`Enter ${key}`}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>

        </form>
      </div>
    </div>
  );
}