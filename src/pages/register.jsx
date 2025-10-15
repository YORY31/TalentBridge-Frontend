import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    // Simulación de registro exitoso
    setMessage("Registro exitoso!");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    navigate("/login");
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4 bg-gray-100">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-600">TalentBridge</h1>
          <p className="mt-4 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Conecta con tu futuro profesional.
          </p>
          <p className="mt-6 text-lg text-gray-500">
            Descubre una comunidad de apoyo y encuentra las mejores oportunidades de pasantías.
          </p>
        </div>
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white/70 p-8 rounded-2xl shadow-xl backdrop-blur-lg border border-white/30">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Crea tu cuenta
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  person
                </span>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input w-full rounded-lg border-gray-300 bg-white/60 pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  mail
                </span>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input w-full rounded-lg border-gray-300 bg-white/60 pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  lock
                </span>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full rounded-lg border-gray-300 bg-white/60 pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all duration-300"
                  required
                />
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  lock_reset
                </span>
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input w-full rounded-lg border-gray-300 bg-white/60 pl-12 pr-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:ring-2 focus:ring-gray-600/50 transition-all duration-300"
                  required
                />
              </div>
              {message && <p className="text-red-500">{message}</p>}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-3 text-base font-bold text-white transition-all duration-300 hover:bg-gray-700"
              >
                Registrarse
              </button>
              <div className="text-center text-sm text-gray-500">
                ¿Ya tienes una cuenta?{" "}
                <Link
                  to="/login"
                  className="font-bold text-gray-700 hover:text-gray-900 hover:underline"
                >
                  Inicia sesión
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
