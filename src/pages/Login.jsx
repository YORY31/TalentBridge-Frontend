import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth/authServices";

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Por favor ingresa un correo electrónico válido");
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginUser({ email: email.trim(), password });

      if (result.token) {
        localStorage.setItem("token", result.token);
        setMessage("✅ Inicio de sesión exitoso. Redirigiendo...");
        setIsLoggedIn(true);
        
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.status === 401) {
        setMessage("Correo o contraseña incorrectos");
      } else if (error.response?.status === 404) {
        setMessage("Usuario no encontrado");
      } else {
        setMessage("Error al iniciar sesión. Por favor intenta nuevamente");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE2djI4YzAtMS4xLS45LTItMi0ySDIwYy0xLjEgMC0yIC45LTIgMlYxNmMwLTEuMSAuOS0yIDItMmgxNGMxLjEgMCAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">
        
        {/* Branding Section - Left */}
        <div className="text-center lg:text-left">
          <div className="space-y-6">
            {/* Logo */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent-purple to-accent-fuchsia rounded-2xl mb-6">
                <span className="material-symbols-outlined text-4xl text-white">handshake</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black text-text-primary mb-4">
                Talent<span className="bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent">Bridge</span>
              </h1>
              
              <p className="text-2xl font-bold text-text-primary mb-6">
                Conecta con tu futuro profesional
              </p>
              
              <p className="text-lg text-text-secondary max-w-md leading-relaxed">
                Descubre una comunidad de apoyo y encuentra las mejores oportunidades de pasantías.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl p-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent">500+</div>
                <div className="text-sm text-text-secondary mt-1">Empresas</div>
              </div>
              <div className="text-center bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl p-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-accent-fuchsia to-accent-pink bg-clip-text text-transparent">10K+</div>
                <div className="text-sm text-text-secondary mt-1">Estudiantes</div>
              </div>
              <div className="text-center bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl p-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent">95%</div>
                <div className="text-sm text-text-secondary mt-1">Satisfacción</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="pt-8 max-w-md mx-auto lg:mx-0">
              <div className="bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl p-6">
                <p className="text-text-secondary italic mb-4">
                  "Gracias a TalentBridge conseguí mi primera pasantía en una empresa tecnológica líder."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-purple to-accent-fuchsia"></div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">María González</p>
                    <p className="text-xs text-text-secondary">Desarrolladora Frontend</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section - Right */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-background-header backdrop-blur-md border-2 border-accent-purple/20 rounded-2xl p-8 shadow-2xl">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-text-primary mb-2">
                Iniciar Sesión
              </h2>
              <p className="text-text-secondary text-sm">
                Bienvenido de nuevo a TalentBridge
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary block">
                  Correo electrónico
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-secondary group-focus-within:text-accent-purple transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-background-main backdrop-blur-sm border-2 border-accent-purple/10 rounded-xl pl-12 pr-4 py-3.5 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-text-primary block">
                    Contraseña
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-xs text-accent-purple hover:text-accent-fuchsia transition-colors hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-secondary group-focus-within:text-accent-purple transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-background-main backdrop-blur-sm border-2 border-accent-purple/10 rounded-xl pl-12 pr-12 py-3.5 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-text-secondary hover:text-accent-purple transition-colors"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded-xl text-sm font-medium border ${
                  message.includes("✅") || message.includes("exitoso")
                    ? "bg-green-900/20 text-green-400 border-green-400/20"
                    : "bg-red-900/20 text-red-400 border-red-400/20"
                }`}>
                  {message}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-accent-purple to-accent-fuchsia hover:from-accent-fuchsia hover:to-accent-purple text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-accent-purple/30 hover:shadow-accent-fuchsia/30 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <span>Iniciar sesión</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-accent-purple/20"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-background-header text-text-secondary">O continúa con</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-3 border-2 border-accent-purple/10 text-text-primary font-medium rounded-xl hover:border-accent-purple/30 hover:bg-accent-purple/5 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="py-3 border-2 border-accent-purple/10 text-text-primary font-medium rounded-xl hover:border-accent-purple/30 hover:bg-accent-purple/5 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </form>

            {/* Link to Register */}
            <div className="text-center pt-6 mt-6 border-t border-accent-purple/20">
              <p className="text-text-secondary text-sm">
                ¿No tienes una cuenta?{" "}
                <button 
                  onClick={() => navigate("/register")}
                  className="text-accent-purple hover:text-accent-fuchsia font-semibold transition-colors hover:underline"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-text-secondary mt-6">
            Al iniciar sesión, aceptas nuestros{" "}
            <button className="text-accent-purple hover:text-accent-fuchsia hover:underline">Términos de servicio</button>
            {" "}y{" "}
            <button className="text-accent-purple hover:text-accent-fuchsia hover:underline">Política de privacidad</button>
          </p>
        </div>
      </div>
    </div>
  );
}