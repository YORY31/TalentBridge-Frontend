import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Simulación de servicios API
const adminService = {
  getStatistics: async () => {
    return {
      totalUsers: 1543,
      activeUsers: 1247,
      universities: 28,
      totalApplications: 3245,
      jobPostings: 187,
      activeCompanies: 42,
      pendingReviews: 15,
      activeMentors: 65
    };
  },

  getRecentActivity: async () => {
    return [
      { id: 1, user: "Carlos Mendoza", action: "nueva solicitud", role: "Desarrollador Frontend", time: "Hace 5 min", type: "application" },
      { id: 2, user: "TechCorp Inc.", action: "nueva vacante", role: "Ingeniero de Datos", time: "Hace 15 min", type: "job" },
      { id: 3, user: "María López", action: "perfil actualizado", role: "Diseñadora UX/UI", time: "Hace 25 min", type: "profile" },
      { id: 4, user: "Global Solutions", action: "empresa verificada", role: null, time: "Hace 1 hora", type: "verification" },
      { id: 5, user: "Andrés Ruiz", action: "cuenta activada", role: "Estudiante", time: "Hace 2 horas", type: "activation" }
    ];
  },

  getSystemHealth: async () => {
    return {
      apiStatus: "healthy",
      databaseStatus: "healthy",
      storageStatus: "warning",
      uptime: "99.8%",
      responseTime: "120ms"
    };
  }
};

export default function AdminPanel() {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar datos en paralelo
      const [statsData, activityData, healthData] = await Promise.all([
        adminService.getStatistics(),
        adminService.getRecentActivity(),
        adminService.getSystemHealth()
      ]);

      setStats(statsData);
      setRecentActivity(activityData);
      setSystemHealth(healthData);
      
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    switch(action) {
      case 'clearCache':
        alert('Cache limpiado exitosamente');
        break;
      case 'backup':
        alert('Backup iniciado');
        break;
      case 'systemCheck':
        alert('Verificación del sistema completada');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
            <p className="text-text-secondary">Cargando panel de administración...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Panel de Control</h1>
            <p className="text-text-secondary mt-2">
              Panel centralizado de administración del sistema TalentBridge
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={loadDashboardData}
              className="px-4 py-2 border border-accent-purple/30 text-accent-purple rounded-xl hover:bg-accent-purple/10 transition-all duration-300 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Actualizar
            </button>
            
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar en el sistema..."
                className="pl-12 pr-4 py-2 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary placeholder-text-secondary"
              />
            </div>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="mt-6">
          <div className="flex space-x-1 border-b border-accent-purple/20">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-gray-900/50 to-gray-800/50 text-text-primary border-t border-x border-accent-purple/20"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-lg mr-2 align-middle">dashboard</span>
              Vista General
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${
                activeTab === "system"
                  ? "bg-gradient-to-r from-gray-900/50 to-gray-800/50 text-text-primary border-t border-x border-accent-purple/20"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-lg mr-2 align-middle">monitoring</span>
              Sistema
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-6 py-3 text-sm font-medium rounded-t-lg transition-all ${
                activeTab === "reports"
                  ? "bg-gradient-to-r from-gray-900/50 to-gray-800/50 text-text-primary border-t border-x border-accent-purple/20"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-lg mr-2 align-middle">assessment</span>
              Reportes
            </button>
          </div>
        </div>
      </div>

      {/* Contenido basado en tab activo */}
      {activeTab === "overview" && (
        <>
          {/* Estadísticas principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-text-secondary">Usuarios Totales</p>
                <span className="material-symbols-outlined text-accent-purple">
                  groups
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-text-primary">{stats?.totalUsers.toLocaleString()}</p>
                <p className="text-sm font-medium text-success flex items-center">
                  <span className="material-symbols-outlined text-base">
                    arrow_upward
                  </span>
                  12%
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-accent-purple/20">
                <p className="text-sm text-text-secondary">
                  <span className="text-accent-purple font-medium">{stats?.activeUsers}</span> usuarios activos
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-text-secondary">Vacantes Activas</p>
                <span className="material-symbols-outlined text-accent-purple">
                  work
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-text-primary">{stats?.jobPostings}</p>
                <p className="text-sm font-medium text-success flex items-center">
                  <span className="material-symbols-outlined text-base">
                    arrow_upward
                  </span>
                  8%
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-accent-purple/20">
                <p className="text-sm text-text-secondary">
                  <span className="text-accent-purple font-medium">{stats?.activeCompanies}</span> empresas activas
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-text-secondary">Solicitudes Totales</p>
                <span className="material-symbols-outlined text-accent-purple">
                  assignment
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-text-primary">{stats?.totalApplications.toLocaleString()}</p>
                <p className="text-sm font-medium text-success flex items-center">
                  <span className="material-symbols-outlined text-base">
                    arrow_upward
                  </span>
                  24%
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-accent-purple/20">
                <p className="text-sm text-text-secondary">
                  <span className="text-accent-purple font-medium">{stats?.universities}</span> universidades
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-text-secondary">Revisiones Pendientes</p>
                <span className="material-symbols-outlined text-accent-purple">
                  pending_actions
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-text-primary">{stats?.pendingReviews}</p>
                <p className="text-sm font-medium text-danger flex items-center">
                  <span className="material-symbols-outlined text-base">
                    warning
                  </span>
                  Requiere atención
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-accent-purple/20">
                <Link 
                  to="/admin/revisiones" 
                  className="text-sm text-accent-purple hover:text-accent-fuchsia transition-colors flex items-center gap-1"
                >
                  <span>Ver revisiones pendientes</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Gráficos y actividad */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Gráfico de actividad */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">Actividad Reciente</h2>
                  <Link 
                    to="/admin/actividad" 
                    className="text-sm text-accent-purple hover:text-accent-fuchsia transition-colors flex items-center gap-1"
                  >
                    <span>Ver todo</span>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </Link>
                </div>
                
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center p-4 rounded-xl bg-gray-900/20 hover:bg-gray-900/30 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        activity.type === 'application' ? 'bg-blue-500/20' :
                        activity.type === 'job' ? 'bg-green-500/20' :
                        activity.type === 'profile' ? 'bg-purple-500/20' :
                        'bg-orange-500/20'
                      }`}>
                        <span className={`material-symbols-outlined ${
                          activity.type === 'application' ? 'text-blue-400' :
                          activity.type === 'job' ? 'text-green-400' :
                          activity.type === 'profile' ? 'text-purple-400' :
                          'text-orange-400'
                        }`}>
                          {activity.type === 'application' ? 'send' :
                          activity.type === 'job' ? 'work' :
                          activity.type === 'profile' ? 'person' : 'verified'}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-text-primary font-medium">
                          <span className="text-accent-purple">{activity.user}</span> realizó {activity.action}
                        </p>
                        {activity.role && (
                          <p className="text-sm text-text-secondary">{activity.role}</p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-text-secondary">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Estado del sistema */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-lg p-6">
                <h2 className="text-xl font-bold text-text-primary mb-6">Estado del Sistema</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        systemHealth?.apiStatus === 'healthy' ? 'bg-green-500' :
                        systemHealth?.apiStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-text-primary">API Servidor</span>
                    </div>
                    <span className="text-text-secondary text-sm">{systemHealth?.uptime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        systemHealth?.databaseStatus === 'healthy' ? 'bg-green-500' :
                        systemHealth?.databaseStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-text-primary">Base de Datos</span>
                    </div>
                    <span className="text-text-secondary text-sm">{systemHealth?.responseTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/20">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        systemHealth?.storageStatus === 'healthy' ? 'bg-green-500' :
                        systemHealth?.storageStatus === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <span className="text-text-primary">Almacenamiento</span>
                    </div>
                    <span className="text-text-secondary text-sm">82% usado</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-accent-purple/20">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">Acciones Rápidas</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleQuickAction('clearCache')}
                      className="p-3 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20"
                    >
                      <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
                        cached
                      </span>
                      <span className="text-sm text-text-primary">Limpiar Cache</span>
                    </button>
                    
                    <button
                      onClick={() => handleQuickAction('backup')}
                      className="p-3 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20"
                    >
                      <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
                        backup
                      </span>
                      <span className="text-sm text-text-primary">Backup</span>
                    </button>
                    
                    <button
                      onClick={() => handleQuickAction('systemCheck')}
                      className="p-3 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20"
                    >
                      <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
                        verified
                      </span>
                      <span className="text-sm text-text-primary">Verificar Sistema</span>
                    </button>
                    
                    <button
                      onClick={() => window.open('/admin/logs', '_blank')}
                      className="p-3 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20"
                    >
                      <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
                        description
                      </span>
                      <span className="text-sm text-text-primary">Ver Logs</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "system" && (
        <div className="space-y-8">
          {/* Configuración del sistema */}
          <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6">Configuración del Sistema</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Modo de Mantenimiento</label>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/20">
                    <span className="text-text-primary">Estado actual: Activo</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-14 h-8 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-accent-purple"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Registro de Actividad</label>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-900/20">
                    <span className="text-text-primary">Nivel: Detallado</span>
                    <select className="bg-gray-900 border border-accent-purple/20 rounded-lg px-3 py-1 text-text-primary text-sm">
                      <option>Detallado</option>
                      <option>Normal</option>
                      <option>Mínimo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">Configuración de Email</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gray-900/20">
                    <p className="text-text-secondary text-sm">SMTP Server</p>
                    <p className="text-text-primary font-medium">smtp.talentbridge.com</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-900/20">
                    <p className="text-text-secondary text-sm">Puerto</p>
                    <p className="text-text-primary font-medium">587</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-900/20">
                    <p className="text-text-secondary text-sm">Estado</p>
                    <p className="text-green-400 font-medium">Conectado</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-accent-purple/20">
                <button className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-purple/20">
                  Guardar Configuración
                </button>
              </div>
            </div>
          </div>

          {/* Información del servidor */}
          <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6">Información del Servidor</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 rounded-xl bg-gray-900/20">
                <p className="text-text-secondary text-sm mb-2">Versión</p>
                <p className="text-text-primary font-medium">v2.1.0</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/20">
                <p className="text-text-secondary text-sm mb-2">Node.js</p>
                <p className="text-text-primary font-medium">18.16.0</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/20">
                <p className="text-text-secondary text-sm mb-2">Base de Datos</p>
                <p className="text-text-primary font-medium">PostgreSQL 15</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-900/20">
                <p className="text-text-secondary text-sm mb-2">Último Backup</p>
                <p className="text-text-primary font-medium">Hoy 02:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="space-y-8">
          {/* Generador de reportes */}
          <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6">Generar Reportes</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Tipo de Reporte</label>
                  <select className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary">
                    <option value="" className="bg-gray-900">Seleccionar tipo...</option>
                    <option value="users" className="bg-gray-900">Reporte de Usuarios</option>
                    <option value="vacancies" className="bg-gray-900">Reporte de Vacantes</option>
                    <option value="applications" className="bg-gray-900">Reporte de Solicitudes</option>
                    <option value="system" className="bg-gray-900">Reporte del Sistema</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Periodo</label>
                  <select className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary">
                    <option value="" className="bg-gray-900">Seleccionar periodo...</option>
                    <option value="today" className="bg-gray-900">Hoy</option>
                    <option value="week" className="bg-gray-900">Esta semana</option>
                    <option value="month" className="bg-gray-900">Este mes</option>
                    <option value="quarter" className="bg-gray-900">Este trimestre</option>
                    <option value="year" className="bg-gray-900">Este año</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Formato</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="format" value="pdf" className="mr-2 text-accent-purple" />
                    <span className="text-text-primary">PDF</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="format" value="excel" className="mr-2 text-accent-purple" />
                    <span className="text-text-primary">Excel</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="format" value="csv" className="mr-2 text-accent-purple" />
                    <span className="text-text-primary">CSV</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-accent-purple/20">
                <button className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-purple/20">
                  Generar Reporte
                </button>
              </div>
            </div>
          </div>

          {/* Reportes recientes */}
          <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6">Reportes Recientes</h2>
            
            <div className="space-y-4">
              {[
                { id: 1, name: "Reporte Mensual Usuarios", date: "15 Ene 2024", type: "PDF", size: "2.4 MB" },
                { id: 2, name: "Estadísticas de Vacantes", date: "10 Ene 2024", type: "Excel", size: "1.8 MB" },
                { id: 3, name: "Actividad del Sistema Diciembre", date: "05 Ene 2024", type: "PDF", size: "3.1 MB" },
                { id: 4, name: "Reporte de Empresas Registradas", date: "28 Dic 2023", type: "CSV", size: "0.9 MB" }
              ].map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-900/20 hover:bg-gray-900/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-gray-900/50 to-gray-800/50 flex items-center justify-center">
                      <span className="material-symbols-outlined text-accent-purple">
                        description
                      </span>
                    </div>
                    <div>
                      <p className="text-text-primary font-medium">{report.name}</p>
                      <p className="text-sm text-text-secondary">Generado: {report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-text-secondary text-sm">{report.type} • {report.size}</span>
                    <button className="p-2 text-accent-purple hover:text-accent-fuchsia transition-colors">
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Acceso rápido */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-text-primary mb-6">Acceso Rápido</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Link
            to="/admin/usuarios"
            className="p-4 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20 hover:border-accent-purple/40"
          >
            <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
              people
            </span>
            <span className="text-sm text-text-primary">Usuarios</span>
          </Link>
          
          <Link
            to="/admin/vacantes"
            className="p-4 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20 hover:border-accent-purple/40"
          >
            <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
              work
            </span>
            <span className="text-sm text-text-primary">Vacantes</span>
          </Link>
          
          <Link
            to="/admin/universidades"
            className="p-4 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20 hover:border-accent-purple/40"
          >
            <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
              school
            </span>
            <span className="text-sm text-text-primary">Universidades</span>
          </Link>
          
          <Link
            to="/admin/empresas"
            className="p-4 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20 hover:border-accent-purple/40"
          >
            <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
              business
            </span>
            <span className="text-sm text-text-primary">Empresas</span>
          </Link>
          
          <Link
            to="/admin/mentores"
            className="p-4 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20 hover:border-accent-purple/40"
          >
            <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
              diversity_3
            </span>
            <span className="text-sm text-text-primary">Mentores</span>
          </Link>
          
          <Link
            to="/admin/configuracion"
            className="p-4 text-center rounded-xl bg-gradient-to-r from-gray-900/50 to-gray-800/50 hover:from-gray-800 hover:to-gray-700 transition-all border border-accent-purple/20 hover:border-accent-purple/40"
          >
            <span className="material-symbols-outlined block mx-auto mb-2 text-accent-purple">
              settings
            </span>
            <span className="text-sm text-text-primary">Configuración</span>
          </Link>
        </div>
      </div>
    </div>
  );
}