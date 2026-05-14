import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];

  const loadProduct = async () => {
    try {
      const res = await api.get("/products");
      const product = res.data.find((p) => p._id === id);

      if (product) {
        setForm(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     await api.put(`/products/update/${id}`, form);

      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        Edit Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map(
          (key) =>
            allowedFields.includes(key) && (
              <input
                key={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={key}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}