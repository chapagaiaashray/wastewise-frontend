import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import Inquiry from "./pages/Inquiry";
import { useAuth } from "./context/AuthContext";


export default function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route
          path="/admin"
          element={isAuthenticated ? <AdminPanel /> : <Login />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
