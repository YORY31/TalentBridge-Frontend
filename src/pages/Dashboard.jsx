import React from "react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {/* Tarjeta 1: Estudiantes de tu universidad */}
      <div className="relative bg-gradient-to-br from-background-header to-background-main backdrop-blur-md p-6 rounded-2xl border-2 border-accent-purple/20 hover:border-accent-purple/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-purple/10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-background-purple/20 rounded-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-xl text-accent-purple">
              school
            </span>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-accent-purple/20 to-accent-fuchsia/20 text-accent-purple">
            Univ. Ranking
          </span>
        </div>
        
        <p className="text-sm font-medium text-text-secondary mb-2">
          Estudiantes de tu universidad
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-bold bg-gradient-to-r from-accent-purple to-accent-fuchsia bg-clip-text text-transparent">25%</p>
          <p className="text-sm font-medium text-success flex items-center gap-1 bg-accent-purple/10 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-base text-accent-purple">
              trending_up
            </span>
            +5%
          </p>
        </div>
        
        {/* Barra de progreso */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>Top 25%</span>
            <span>100%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-accent-purple to-accent-fuchsia rounded-full"
              style={{ width: '25%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Tarjeta 2: Tasa de empleo de tu grupo */}
      <div className="relative bg-gradient-to-br from-background-header to-background-main backdrop-blur-md p-6 rounded-2xl border-2 border-accent-fuchsia/20 hover:border-accent-fuchsia/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-fuchsia/10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-background-violet/20 rounded-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-xl text-accent-fuchsia">
              work
            </span>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-accent-fuchsia/20 to-accent-pink/20 text-accent-fuchsia">
            Éxito Grupal
          </span>
        </div>
        
        <p className="text-sm font-medium text-text-secondary mb-2">
          Tasa de empleo de tu grupo
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-bold bg-gradient-to-r from-accent-fuchsia to-accent-pink bg-clip-text text-transparent">70%</p>
          <p className="text-sm font-medium text-success flex items-center gap-1 bg-accent-fuchsia/10 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-base text-accent-fuchsia">
              trending_up
            </span>
            +10%
          </p>
        </div>
        
        {/* Gráfico circular */}
        <div className="mt-6 relative">
          <div className="w-16 h-16 mx-auto">
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="3"
              />
              <path className="circle"
                strokeDasharray="70, 100"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="url(#gradient-fuchsia)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient-fuchsia" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-text-primary">70%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tarjeta 3: Vacantes aplicadas */}
      <div className="relative bg-gradient-to-br from-background-header to-background-main backdrop-blur-md p-6 rounded-2xl border-2 border-accent-pink/20 hover:border-accent-pink/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent-pink/10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-pink-900/20 rounded-lg backdrop-blur-sm">
            <span className="material-symbols-outlined text-xl text-accent-pink">
              assignment
            </span>
          </div>
          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-accent-pink/20 to-accent-purple/20 text-accent-pink">
            Actividad
          </span>
        </div>
        
        <p className="text-sm font-medium text-text-secondary mb-2">
          Vacantes aplicadas
        </p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-bold bg-gradient-to-r from-accent-pink to-accent-purple bg-clip-text text-transparent">5</p>
          <p className="text-sm font-medium text-success flex items-center gap-1 bg-accent-pink/10 px-2 py-1 rounded-full">
            <span className="material-symbols-outlined text-base text-accent-pink">
              trending_up
            </span>
            +2
          </p>
        </div>
        
        {/* Indicadores de aplicaciones */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-2">
            <span>Progreso mensual</span>
            <span>5/8 objetivo</span>
          </div>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  i < 5 
                    ? 'bg-gradient-to-b from-accent-pink to-accent-purple' 
                    : 'bg-white/10'
                } ${i === 4 ? 'animate-pulse' : ''}`}
              ></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-text-secondary mt-1">
            <span>Ene</span>
            <span className="text-accent-pink font-medium">Actual</span>
            <span>Dic</span>
          </div>
        </div>
      </div>
    </div>
  );
}