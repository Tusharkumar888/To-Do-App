import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/signup"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

