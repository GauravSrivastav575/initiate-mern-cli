import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">
        MERN Project Created Using initiate-mern
      </h1>
      <nav className="flex space-x-4 mb-8">
        <Link
          to="/"
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
        >
          About
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
