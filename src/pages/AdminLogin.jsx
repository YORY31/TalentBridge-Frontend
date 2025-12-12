import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, isAdmin } from "../services/auth/authServices";

export default function AdminLogin({ setIsAdminLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Por favor ingresa tus credenciales");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Por favor ingresa un correo electrónico válido");
      return;
    }

    setIsLoading(true);

    try {
      const credentials = {
        email: email.trim(),
        password: password
      };
      
      const result = await loginUser(credentials);
      
      // Verificar que el usuario sea admin usando la función isAdmin
      if (!isAdmin()) {
        setMessage("Acceso denegado. Solo administradores pueden acceder.");
        // Limpiar localStorage si no es admin
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("tokenExpiration");
        return;
      }
      
      console.log("Login exitoso:", result);
      setMessage("✅ Acceso concedido. Redirigiendo...");
      
      // IMPORTANTE: Actualizar el estado de autenticación
      if (setIsAdminLoggedIn) {
        setIsAdminLoggedIn(true);
      }
      
      // Guardar preferencia "recordarme"
      if (rememberMe) {
        localStorage.setItem("adminRemember", "true");
      } else {
        localStorage.removeItem("adminRemember");
      }
      
      // CORRECCIÓN: Redirigir a la ruta correcta
      setTimeout(() => navigate("/admin/dashboard"), 1500);
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
      if (error.response?.status === 401) {
        setMessage("Credenciales inválidas. Verifica tu correo y contraseña.");
      } else if (error.response?.status === 403) {
        setMessage("Acceso denegado. Tu cuenta no tiene permisos de administrador.");
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error al iniciar sesión. Por favor intenta nuevamente.");
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
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-black text-text-primary mb-4">
                Talent<span className="text-accent-purple ml-2">Bridge</span>
                <span className="text-accent-purple ml-2">Admin</span>
              </h1>
              
              <p className="text-2xl font-bold text-text-primary mb-6">
                Panel de administración
              </p>
              
              <p className="text-lg text-text-secondary max-w-md leading-relaxed">
                Gestiona usuarios, vacantes y contenido del sistema TalentBridge.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="flex items-start gap-3 p-4 bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 3.75a3.75 3.75 0 01-7.5 0" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Gestión de usuarios</p>
                  <p className="text-sm text-text-secondary">Administra estudiantes y empresas</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Control de vacantes</p>
                  <p className="text-sm text-text-secondary">Modera y gestiona oportunidades</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Reportes y estadísticas</p>
                  <p className="text-sm text-text-secondary">Analiza el rendimiento del sistema</p>
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
                Acceso Administrativo
              </h2>
              <p className="text-text-secondary text-sm">
                Ingresa tus credenciales de administrador
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    placeholder="admin@talentbridge.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-background-main backdrop-blur-sm border-2 border-accent-purple/10 rounded-xl pl-12 pr-4 py-3.5 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary block">
                  Contraseña
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-secondary group-focus-within:text-accent-purple transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-background-main backdrop-blur-sm border-2 border-accent-purple/10 rounded-xl pl-12 pr-12 py-3.5 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    required
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-accent-purple bg-background-main border-accent-purple/30 rounded focus:ring-accent-purple focus:ring-2"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-text-primary">
                    Recordar sesión
                  </label>
                </div>
                
                <button
                  type="button"
                  onClick={() => navigate("/reset-password")}
                  className="text-xs text-accent-purple hover:text-accent-fuchsia transition-colors hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Message */}
              {message && (
                <div className={`p-4 rounded-xl text-sm font-medium border ${
                  message.includes("✅") || message.includes("concedido")
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
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-900/30 hover:shadow-gray-800/30 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Verificando...</span>
                  </>
                ) : (
                  <>
                    <span>Acceder al panel</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Back to Main Site */}
              <div className="text-center pt-4">
                <button 
                  type="button"
                  onClick={() => navigate("/")}
                  className="text-accent-purple hover:text-accent-fuchsia font-medium transition-colors hover:underline text-sm flex items-center justify-center gap-1 mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Volver al sitio principal
                </button>
              </div>
            </form>
          </div>

          {/* Security Warning */}
          <div className="mt-8 p-4 bg-yellow-900/20 backdrop-blur-sm border border-yellow-400/30 rounded-xl">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-sm text-yellow-300">
                Acceso restringido. Este panel es solo para personal autorizado.
                Toda actividad es monitoreada y registrada.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}