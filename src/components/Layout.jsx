import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes limpiar tokens, localStorage o estado de usuario
    console.log("Sesión cerrada");
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light font-display text-primary">
      <header className="sticky top-0 z-10 bg-background-light shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="text-primary">
                <svg
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 13.08l-2.58-2.58L9.34 11l2.16 2.16L16.42 8.5l1.42 1.42L10.5 15.08z"></path>
                </svg>
              </div>
              <h1 className="text-xl font-bold text-primary">TalentBridge</h1>
            </div>

            {/* Barra de navegación */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-primary border-b-2 border-primary pb-1"
              >
                Inicio
              </Link>
              <Link
                to="/cv"
                className="text-sm font-medium text-secondary hover:text-primary transition-colors"
              >
                CV
              </Link>
              <Link
                to="/comunidades"
                className="text-sm font-medium text-secondary hover:text-primary transition-colors"
              >
                Comunidades
              </Link>
              <Link
                to="/src/pages/Profile.jsx"
                className="text-sm font-medium text-secondary hover:text-primary transition-colors"
              >
                Perfil
              </Link>
            </nav>

            {/* Icono usuario / notificaciones y cerrar sesión */}
            <div className="flex items-center gap-4">
              <button
                className="relative rounded-full p-2 text-secondary hover:bg-black/5 hover:text-primary transition-colors"
                onClick={handleLogout}
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
              <button className="relative rounded-full p-2 text-secondary hover:bg-black/5 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDA3Nkm-ZQFjsZTfAYiCImamCzpey-TSjZDgFMpZxMHxMm19_jqD_7jo8clPaFHeEroQg9PvU_o1NzbXHpdSj0R_hzClc2gXTBx9aOAej7YdlQGUIM9IsyQ3GJWDhqmpBpthqR_Aue6avzpAy218MeqsJHEy0TPcX9rZoz-jKLMhEg4Pnin7WDta9SqHDFHAxqI1vh6qXEZW0qXCSJaiWWFyKYBVyDFTHvvIpdlCQ6-oUDOfpjbxNwgWIPYwKIgsIeMdHSQrd2DFo")',
                }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

