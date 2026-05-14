import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";

import ProductList from "./admin/Productlist";
import AddProduct from "./admin/AddProducts";
import EditProduct from "./admin/EditProduct";

import Navbar from "./components/Navbar";
import CheckoutAddress from "./pages/CheckoutAress";
import Checkout from "./pages/Checkout";
import OrderSuccess from './pages/OrderSuccess';
import Cart from "./pages/Cart";
// Layout component
function Layout() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
}

// Router with layout wrapping
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,   // ✅ use layout here
    children: [
      { path: "/", element: <Home /> },  // default route "/"
      { path: "login", element: <Login /> },
      { path: "register", element: <Signup /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      

      // Admin routes
      { path: "admin/products", element: <ProductList /> },
      { path: "admin/products/add", element: <AddProduct /> },
      { path: "admin/products/edit/:id", element: <EditProduct /> },
      {path:"/checkout-address",element:<CheckoutAddress/>},
       {path:"/checkout",element:<Checkout/>},
          {path:"/order-success/:id",element:<OrderSuccess/>},

    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}