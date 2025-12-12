import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/register";
import Home from "./pages/Home";
import CvUpload from "./pages/CvUpload";
import Comunidades from "./pages/Comunidades";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UsersManagement from "./pages/UsersManagement";
import ComunityManagement from "./pages/ComunityManagement";
import AdminLayout from "./components/AdminLayout";
import AdminPanel from "./pages/AdminPanel";
import JobsManagement from "./pages/JobsManagement";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route 
          path="/login/admin" 
          element={<AdminLogin setIsAdminLoggedIn={setIsAdminLoggedIn} />} 
        />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas para usuarios normales */}
        <Route path="/" element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path="/cv" element={isLoggedIn ? <CvUpload /> : <Navigate to="/login" />} />
        <Route path="/comunidades" element={isLoggedIn ? <Comunidades /> : <Navigate to="/login" />} />
        <Route path="/jobs" element={isLoggedIn ? <Jobs /> : <Navigate to="/login" />} />
        <Route path="/perfil" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

        {/* Rutas protegidas para administradores - USANDO AdminLayout */}
        <Route 
          path="/admin/dashboard" 
          element={
            isAdminLoggedIn ? 
            <AdminLayout><AdminDashboard setIsAdminLoggedIn={setIsAdminLoggedIn} /></AdminLayout> : 
            <Navigate to="/login/admin" />
          } 
        />
        
        <Route 
          path="/admin/usuarios" 
          element={
            isAdminLoggedIn ? 
            <AdminLayout><UsersManagement /></AdminLayout> : 
            <Navigate to="/login/admin" />
          } 
        />

        <Route 
          path="/admin/cominidades" 
          element={
            isAdminLoggedIn ? 
            <AdminLayout><ComunityManagement /></AdminLayout> : 
            <Navigate to="/login/admin" />
          } 
        />

        <Route 
          path="/admin/jobs" 
          element={
            isAdminLoggedIn ? 
            <AdminLayout><JobsManagement /></AdminLayout> : 
            <Navigate to="/login/admin" />
          } 
        />

        <Route 
          path="/admin/panel" 
          element={
            isAdminLoggedIn ? 
            <AdminLayout><AdminPanel /></AdminLayout> : 
            <Navigate to="/login/admin" />
          } 
        />

        {/* Redirigir /admin a /admin/dashboard */}
        <Route 
          path="/admin" 
          element={
            isAdminLoggedIn ? 
            <Navigate to="/admin/dashboard" /> : 
            <Navigate to="/login/admin" />
          } 
        />

        {/* Redirigir cualquier ruta desconocida */}
        <Route path="*" element={<Navigate to={isLoggedIn || isAdminLoggedIn ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;