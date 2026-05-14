import { useNavigate, useParams } from "react-router-dom";

export default function OrderSuccess() {

  const navigate = useNavigate();

  const { id } = useParams();

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-lg w-full">

        <div className="text-6xl mb-4">
          🎉
        </div>

        <h1 className="text-4xl font-extrabold text-green-600 mb-4">
          Order Placed Successfully!
        </h1>

        <p className="text-gray-600 mb-3">
          Your order has been confirmed.
        </p>

        <p className="text-gray-500 mb-8">
          Order ID:
          <span className="font-bold text-black">
            {" "}
            {id}
          </span>
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
}