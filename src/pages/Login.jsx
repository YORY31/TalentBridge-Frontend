import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Correo y contraseña requeridos");
      return;
    }

    try {
      const result = await loginUser({ email, password });

      if (result.token) {
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        navigate("/"); // Redirige a Home o Dashboard
      } else {
        setMessage("Credenciales incorrectas");
      }
    } catch (error) {
      setMessage("Error al iniciar sesión. Verifica tus datos.");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4 bg-gray-100">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-600">TalentBridge</h1>
          <p className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Conecta con las mejores oportunidades.
          </p>
          <p className="mt-6 text-lg text-gray-500">
            Encuentra una comunidad afín en tu búsqueda de oportunidades y pasantías.
          </p>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/70 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white/30">
            <div className="flex justify-center mb-6">
              <div className="bg-gray-400 p-4 rounded-full">
                <span className="material-symbols-outlined text-white text-4xl">
                  work
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Iniciar Sesión
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input w-full rounded-lg border-2 border-gray-300 bg-white/80 pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full rounded-lg border-2 border-gray-300 bg-white/80 pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all duration-300"
                  required
                />
              </div>

              {message && <p className="text-red-500 text-sm">{message}</p>}

              <button
                type="submit"
                className="group relative w-full flex justify-center rounded-lg bg-gray-600 px-4 py-3 text-base font-bold text-white transition-all duration-300 hover:bg-gray-700"
              >
                Iniciar sesión
              </button>

              <div className="text-center text-sm text-gray-500">
                ¿No tienes una cuenta?{" "}
                <Link
                  to="/register"
                  className="font-bold text-gray-700 hover:text-gray-900 hover:underline"
                >
                  Regístrate
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
