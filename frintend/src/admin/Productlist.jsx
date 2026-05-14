import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // Load Products
  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log("Error loading products:", error);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/delete/${id}`);
      loadProducts();
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Product List
          </h2>

          <Link
            to="/admin/products/add"
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add New Product
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{product.title}</td>
                    <td className="p-3 font-medium text-green-600">
                      ₹{product.price}
                    </td>
                    <td className="p-3">{product.stock}</td>

                    <td className="p-3 text-center space-x-3">

                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="text-blue-600 hover:underline font-medium"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="text-red-500 hover:underline font-medium"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}