import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth/authServices";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setMessage("Todos los campos son obligatorios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMessage("Por favor ingresa un correo electrónico válido");
      return;
    }

    if (password.length < 6) {
      setMessage("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setIsLoading(true);

    try {
      const userData = { 
        FullName: fullName.trim(),    
        Email: email.trim(), 
        Password: password 
      };
      
      const result = await registerUser(userData);
      
      console.log("Registro exitoso:", result);
      setMessage("Usuario registrado correctamente. Redirigiendo...");
      
      setFullName("");
      setEmail("");
      setPassword("");
      
      setTimeout(() => navigate("/login"), 1500);
      
    } catch (error) {
      console.error("Error al registrar:", error);
      
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        const firstError = validationErrors[0];
        setMessage(`${firstError.property}: ${firstError.error}`);
      } else if (error.response?.status === 400) {
        setMessage("Datos inválidos. Verifica la información ingresada");
      } else if (error.response?.status === 409) {
        setMessage("El correo electrónico ya está registrado");
      } else {
        setMessage("Error al registrar. Por favor intenta nuevamente");
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
                <span className="material-symbols-outlined text-4xl text-white">person_add</span>
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

            {/* Benefits */}
            <div className="space-y-4 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="flex items-start gap-3 p-4 bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-purple/20 to-accent-fuchsia/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent-purple text-sm">work</span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Acceso a oportunidades exclusivas</p>
                  <p className="text-sm text-text-secondary">Pasantías y empleos en empresas líderes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-fuchsia/20 to-accent-pink/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent-fuchsia text-sm">groups</span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Red profesional activa</p>
                  <p className="text-sm text-text-secondary">Conecta con profesionales y mentores</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-background-header backdrop-blur-md border border-accent-purple/10 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-pink/20 to-accent-purple/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-accent-pink text-sm">rocket_launch</span>
                </div>
                <div>
                  <p className="font-medium text-text-primary">Desarrollo profesional</p>
                  <p className="text-sm text-text-secondary">Recursos y herramientas para tu crecimiento</p>
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
                Crear Cuenta
              </h2>
              <p className="text-text-secondary text-sm">
                Únete a TalentBridge hoy mismo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary block">
                  Nombre completo
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-text-secondary group-focus-within:text-accent-purple transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-background-main backdrop-blur-sm border-2 border-accent-purple/10 rounded-xl pl-12 pr-4 py-3.5 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

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
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full bg-background-main backdrop-blur-sm border-2 border-accent-purple/10 rounded-xl pl-12 pr-4 py-3.5 text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                    placeholder="Mínimo 6 caracteres"
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
                  message.includes("correctamente")
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
                    <span>Creando cuenta...</span>
                  </>
                ) : (
                  <>
                    <span>Crear cuenta</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Link to Login */}
            <div className="text-center pt-6 mt-6 border-t border-accent-purple/20">
              <p className="text-text-secondary text-sm">
                ¿Ya tienes una cuenta?{" "}
                <button 
                  onClick={() => navigate("/login")}
                  className="text-accent-purple hover:text-accent-fuchsia font-semibold transition-colors hover:underline"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </div>

          {/* Terms */}
          <p className="text-center text-xs text-text-secondary mt-6">
            Al registrarte, aceptas nuestros{" "}
            <button className="text-accent-purple hover:text-accent-fuchsia hover:underline">Términos de servicio</button>
            {" "}y{" "}
            <button className="text-accent-purple hover:text-accent-fuchsia hover:underline">Política de privacidad</button>
          </p>
        </div>
      </div>
    </div>
  );
}