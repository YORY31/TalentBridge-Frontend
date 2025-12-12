import { useEffect, useState } from "react";
import { getProfile } from "../../../services/auth/authServices";

export default function Bienvenida() {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      getProfile(token)
        .then((data) => {
          setUserName(data.FullName || data.fullName || "Usuario");
        })
        .catch((error) => console.error("Error al obtener perfil:", error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="relative mb-8 p-6 bg-gradient-to-br from-background-purple via-background-violet to-background-main rounded-2xl border border-accent-purple/20 overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2djI4YzAtMS4xLS45LTItMi0ySDIwYy0xLjEgMC0yIC45LTIgMlYxNmMwLTEuMSAuOS0yIDItMmgxNGMxLjEgMCAyIC45IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Texto de bienvenida */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <span className="material-symbols-outlined text-2xl text-accent-purple">
                waving_hand
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              {isLoading ? (
                <span className="inline-block w-48 h-8 bg-white/20 rounded-full animate-pulse"></span>
              ) : userName ? (
                `¡Bienvenida, ${userName}!`
              ) : (
                "¡Bienvenida!"
              )}
            </h2>
          </div>
          
          <p className="text-text-secondary text-lg md:text-xl mt-1 max-w-2xl">
            Tu progreso y oportunidades en un solo lugar. 
            <span className="block text-sm text-accent-fuchsia mt-2 font-medium">
              Explora comunidades, conecta con profesionales y haz crecer tu carrera
            </span>
          </p>
        </div>

        {/* Estadísticas rápidas */}
        <div className="flex gap-4">
          <div className="text-center p-3 bg-white/5 backdrop-blur-md rounded-xl border border-accent-purple/10 min-w-[100px]">
            <div className="text-2xl font-bold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent">
              +
            </div>
            <div className="text-xs text-text-secondary mt-1">Nuevas</div>
          </div>
          
          <div className="text-center p-3 bg-white/5 backdrop-blur-md rounded-xl border border-accent-purple/10 min-w-[100px]">
            <div className="text-2xl font-bold bg-gradient-to-r from-accent-fuchsia to-accent-pink bg-clip-text text-transparent">
              {userName ? "🔥" : "✨"}
            </div>
            <div className="text-xs text-text-secondary mt-1">Trending</div>
          </div>
          
          <div className="text-center p-3 bg-white/5 backdrop-blur-md rounded-xl border border-accent-purple/10 min-w-[100px]">
            <div className="text-2xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent">
              ↑
            </div>
            <div className="text-xs text-text-secondary mt-1">Progreso</div>
          </div>
        </div>
      </div>
    </div>
  );
}