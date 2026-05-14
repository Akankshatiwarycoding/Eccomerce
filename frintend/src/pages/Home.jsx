import React, { useState, useEffect } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );
      setProducts(res.data);
    } catch (error) {
      console.log("Error loading products:", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

const addToCart = async(productId)=>{
  const userId = localStorage.getItem("userId");
  if(!userId){
    alert("please log in to add items your cart");
    return ;
  }
  const res = await api.post(`/cart/add`,{userId,productId});
  const total = res.data.cart.items.reduce(
  (sum,item) => sum+ item.productId.price*item.quantity,
   0
  );

  localStorage.setItem("cartCount",total);
  window.dispatchEvent(new Event("cartUpdated"));

}

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 p-6">

      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Explore Our Products
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg flex-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          <option value="Laptop">Laptop</option>
          <option value="Mobile">Mobile</option>
          <option value="Tablet">Tablet</option>
        </select>

      </div>

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product._id}
              to={`/product/${product._id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-blue-600 font-bold text-xl">
                  ₹{product.price}
                </p>

                <button onClick={()=>addToCart(product._id)}
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Add to Cart
                  </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No products found
          </p>
        )}

      </div>
    </div>
  );
}