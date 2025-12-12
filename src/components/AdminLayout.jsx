import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, logout, isAdmin } from "../services/auth/authServices";

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    
    if (!currentUser || !isAdmin()) {
      navigate("/login/admin");
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login/admin");
  };

  const navItems = [
    { 
      path: "/admin/dashboard", 
      label: "Dashboard",
      icon: "dashboard"
    },
    { 
      path: "/admin/usuarios", 
      label: "Usuarios",
      icon: "people"
    },
    { 
      path: "/admin/cominidades", 
      label: "Cominidades",
      icon: "people"
    },
    { 
      path: "/admin/jobs", 
      label: "Jobs",
      icon: "people"
    },
    { 
      path: "/admin/panel", 
      label: "Panel",
      icon: "admin_panel_settings"
    },
  ];

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-main">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-purple"></div>
          <p className="text-text-secondary">Verificando permisos de administrador...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <header className="bg-background-header backdrop-blur-md border-b border-accent-purple/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y menú móvil */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-accent-purple/10 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-4 flex items-center">
                <div className="w-9 h-9 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">TB</span>
                </div>
                <div className="ml-3">
                  <span className="text-lg font-bold text-text-primary">TalentBridge</span>
                  <span className="ml-2 text-sm font-semibold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg shadow-gray-900/30"
                      : "text-text-secondary hover:text-text-primary hover:bg-accent-purple/10"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg mr-2">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-accent-purple to-accent-fuchsia flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.fullName?.charAt(0) || "A"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-text-primary">{user.fullName}</p>
                  <p className="text-xs text-text-secondary">Administrador</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/20 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">logout</span>
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar móvil */}
      {sidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-background-header backdrop-blur-xl">
              <div className="absolute top-0 right-0 -mr-12 pt-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                  <span className="sr-only">Cerrar sidebar</span>
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Sidebar header */}
              <div className="flex items-center p-6 border-b border-accent-purple/20">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">TB</span>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-bold text-text-primary">TalentBridge</p>
                  <p className="text-sm text-accent-purple">Panel Admin</p>
                </div>
              </div>
              
              {/* User info */}
              <div className="p-6 border-b border-accent-purple/20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-accent-purple to-accent-fuchsia flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {user.fullName?.charAt(0) || "A"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-text-primary">{user.fullName}</p>
                    <p className="text-sm text-text-secondary">Administrador</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation */}
              <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`group flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        location.pathname === item.path
                          ? "bg-gradient-to-r from-gray-900/30 to-gray-800/30 text-text-primary border border-accent-purple/30"
                          : "text-text-secondary hover:text-text-primary hover:bg-accent-purple/10"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="material-symbols-outlined text-xl mr-3">
                        {item.icon}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              
              {/* Logout button */}
              <div className="p-6 border-t border-accent-purple/20">
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl shadow-xl overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}