import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    universities: 0,
    totalApplications: 0,
    jobPostings: 0,
    activeCompanies: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  // Simular carga de datos del dashboard
  useEffect(() => {
    // En una implementación real, aquí harías llamadas a la API
    const fetchDashboardData = async () => {
      setLoading(true);
      
      // Simulación de delay de API
      setTimeout(() => {
        setStats({
          totalUsers: 1543,
          activeUsers: 1247,
          universities: 28,
          totalApplications: 3245,
          jobPostings: 187,
          activeCompanies: 42
        });
        
        setRecentActivity([
          { id: 1, user: "Carlos Mendoza", action: "nueva solicitud", role: "Desarrollador Frontend", time: "Hace 5 min", type: "application" },
          { id: 2, user: "TechCorp Inc.", action: "nueva vacante", role: "Ingeniero de Datos", time: "Hace 15 min", type: "job" },
          { id: 3, user: "María López", action: "perfil actualizado", role: "Diseñadora UX/UI", time: "Hace 25 min", type: "profile" },
          { id: 4, user: "Global Solutions", action: "empresa verificada", role: null, time: "Hace 1 hora", type: "verification" },
          { id: 5, user: "Andrés Ruiz", action: "cuenta activada", role: "Estudiante", time: "Hace 2 horas", type: "activation" }
        ]);
        
        setLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
            <p className="text-text-secondary">Cargando datos del dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Encabezado del Dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Panel de Administración</h1>
        <p className="text-text-secondary mt-2">
          Resumen completo de la plataforma TalentBridge
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-secondary">Total de Usuarios</p>
            <span className="material-symbols-outlined text-accent-purple">
              groups
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-text-primary">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm font-medium text-success flex items-center">
              <span className="material-symbols-outlined text-base">
                arrow_upward
              </span>
              12%
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-accent-purple/20">
            <p className="text-sm text-text-secondary">
              <span className="text-accent-purple font-medium">{stats.activeUsers}</span> usuarios activos
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-secondary">Universidades</p>
            <span className="material-symbols-outlined text-accent-purple">
              school
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-text-primary">{stats.universities}</p>
            <p className="text-sm font-medium text-success flex items-center">
              <span className="material-symbols-outlined text-base">
                arrow_upward
              </span>
              3 nuevas
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-accent-purple/20">
            <Link 
              to="/admin/universidades" 
              className="text-sm text-accent-purple hover:text-accent-fuchsia transition-colors flex items-center gap-1"
            >
              <span>Gestionar universidades</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
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
            <p className="text-3xl font-bold text-text-primary">{stats.totalApplications.toLocaleString()}</p>
            <p className="text-sm font-medium text-success flex items-center">
              <span className="material-symbols-outlined text-base">
                arrow_upward
              </span>
              24%
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-accent-purple/20">
            <p className="text-sm text-text-secondary">
              <span className="text-accent-purple font-medium">{stats.jobPostings}</span> vacantes activas
            </p>
          </div>
        </div>
      </div>

      {/* Segunda fila de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-secondary">Empresas Activas</p>
            <span className="material-symbols-outlined text-accent-purple">
              business_center
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-text-primary">{stats.activeCompanies}</p>
            <p className="text-sm font-medium text-success flex items-center">
              <span className="material-symbols-outlined text-base">
                arrow_upward
              </span>
              8%
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-secondary">Tasa de Éxito</p>
            <span className="material-symbols-outlined text-accent-purple">
              trending_up
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-text-primary">68%</p>
            <p className="text-sm font-medium text-success flex items-center">
              <span className="material-symbols-outlined text-base">
                arrow_upward
              </span>
              7%
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-accent-purple/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-text-secondary">Tiempo Promedio</p>
            <span className="material-symbols-outlined text-accent-purple">
              schedule
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-text-primary">14d</p>
            <p className="text-sm font-medium text-danger flex items-center">
              <span className="material-symbols-outlined text-base">
                arrow_downward
              </span>
              2d
            </p>
          </div>
        </div>
      </div>

      {/* Actividad Reciente y Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Actividad Reciente */}
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

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-lg p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6">Acciones Rápidas</h2>
            
            <div className="space-y-4">
              <Link
                to="/admin/usuarios/nuevo"
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-accent-purple/20 to-accent-fuchsia/20 hover:from-accent-purple/30 hover:to-accent-fuchsia/30 transition-all border border-accent-purple/30"
              >
                <span className="material-symbols-outlined text-accent-purple mr-3">
                  person_add
                </span>
                <div>
                  <p className="font-medium text-text-primary">Agregar Usuario</p>
                  <p className="text-sm text-text-secondary">Crear nueva cuenta</p>
                </div>
              </Link>

              <Link
                to="/admin/vacantes/nueva"
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all border border-blue-500/30"
              >
                <span className="material-symbols-outlined text-blue-400 mr-3">
                  add_circle
                </span>
                <div>
                  <p className="font-medium text-text-primary">Crear Vacante</p>
                  <p className="text-sm text-text-secondary">Publicar nuevo empleo</p>
                </div>
              </Link>

              <Link
                to="/admin/reportes"
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 transition-all border border-green-500/30"
              >
                <span className="material-symbols-outlined text-green-400 mr-3">
                  assessment
                </span>
                <div>
                  <p className="font-medium text-text-primary">Generar Reporte</p>
                  <p className="text-sm text-text-secondary">Estadísticas detalladas</p>
                </div>
              </Link>

              <Link
                to="/admin/configuracion"
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 transition-all border border-orange-500/30"
              >
                <span className="material-symbols-outlined text-orange-400 mr-3">
                  settings
                </span>
                <div>
                  <p className="font-medium text-text-primary">Configuración</p>
                  <p className="text-sm text-text-secondary">Ajustes del sistema</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}