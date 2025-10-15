import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/register";
import Home from "./pages/Home";
import CvUpload from "./pages/CvUpload";
import Comunidades from "./pages/Comunidades";
import Profile from "./pages/Profile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route path="/" element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/cv" element={isLoggedIn ? <CvUpload /> : <Navigate to="/login" />} />
        <Route path="/comunidades" element={isLoggedIn ? <Comunidades /> : <Navigate to="/login" />} />
        <Route path="/perfil" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

        {/* Redirigir cualquier ruta desconocida */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;


