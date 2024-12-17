import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { Login } from "../pages/LogIn";
import { Signup } from "../pages/SignUp";
import { ToDo } from "../pages/ToDo";
import { NotFound } from "../pages/NotFound";
import { AuthProvider } from "../public/Authpro";
import PrivateRoute from "../public/PrivateRoute";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login"></Navigate>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<NotFound></NotFound>}></Route>
          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/todo" element={<ToDo />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
    </>
  );
}

export default App;
