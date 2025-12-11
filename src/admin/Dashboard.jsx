import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  getAllUsers, 
  getAllUniversities, 
  getAllJobs,
  getAllCVs 
} from "../../services";
import { getCurrentUser } from "../../services/authServices";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalUniversities: 0,
    totalJobs: 0,
    totalCVs: 0,
    pendingVerifications: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadDashboardData();
    setUser(getCurrentUser());
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar datos en paralelo
      const [usersRes, univRes, jobsRes, cvsRes] = await Promise.all([
        getAllUsers(),
        getAllUniversities(),
        getAllJobs(),
        getAllCVs()
      ]);

      // Calcular estadísticas
      const totalUsers = usersRes.data?.length || 0;
      const activeUsers = usersRes.data?.filter(u => u.active)?.length || 0;
      const totalUniversities = univRes?.length || 0;
      const totalJobs = jobsRes.data?.length || 0;
      const totalCVs = cvsRes.data?.length || 0;

      setStats({
        totalUsers,
        activeUsers,
        totalUniversities,
        totalJobs,
        totalCVs,
        pendingVerifications: 5 // Mock data
      });

      // Usuarios recientes (últimos 5)
      const sortedUsers = [...(usersRes.data || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentUsers(sortedUsers);

      // Trabajos recientes (últimos 5)
      const sortedJobs = [...(jobsRes.data || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentJobs(sortedJobs);

    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const StatCard = ({ title, value, icon, color, change }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <span className="text-2xl">{icon}</span>
        </div>
        {change && (
          <span className={`text-sm font-medium ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );

  const QuickAction = ({ title, description, icon, action, color }) => (
    <button
      onClick={action}
      className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-gray-300 hover:shadow-md transition-all"
    >
      <div className={`p-3 rounded-xl ${color} bg-opacity-10 w-fit mb-4`}>
        <span className="text-xl">{icon}</span>
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {getGreeting()}, {user?.fullName?.split(' ')[0] || 'Administrador'}
        </h1>
        <p className="text-gray-600 mt-2">
          Bienvenido al panel de administración de TalentBridge
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <StatCard
          title="Total Usuarios"
          value={stats.totalUsers}
          icon="👥"
          color="bg-blue-500"
          change={12}
        />
        <StatCard
          title="Usuarios Activos"
          value={stats.activeUsers}
          icon="✅"
          color="bg-green-500"
          change={8}
        />
        <StatCard
          title="Universidades"
          value={stats.totalUniversities}
          icon="🎓"
          color="bg-purple-500"
        />
        <StatCard
          title="Trabajos Publicados"
          value={stats.totalJobs}
          icon="💼"
          color="bg-yellow-500"
          change={15}
        />
        <StatCard
          title="CVs Subidos"
          value={stats.totalCVs}
          icon="📄"
          color="bg-red-500"
          change={20}
        />
        <StatCard
          title="Pendientes"
          value={stats.pendingVerifications}
          icon="⏳"
          color="bg-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAction
            title="Crear Usuario"
            description="Agregar nuevo usuario al sistema"
            icon="➕"
            color="bg-blue-500"
            action={() => window.location.href = "/admin/users/create"}
          />
          <QuickAction
            title="Verificar Universidad"
            description="Revisar solicitudes de verificación"
            icon="✅"
            color="bg-green-500"
            action={() => window.location.href = "/admin/universities"}
          />
          <QuickAction
            title="Moderar Contenido"
            description="Revisar posts y comentarios"
            icon="👁️"
            color="bg-yellow-500"
            action={() => window.location.href = "/admin/communities"}
          />
          <QuickAction
            title="Generar Reporte"
            description="Crear reporte de actividad"
            icon="📊"
            color="bg-purple-500"
            action={() => window.location.href = "/admin/reports"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Usuarios recientes */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Usuarios Recientes</h2>
              <button className="text-sm text-primary hover:underline">
                Ver todos
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentUsers.map((user) => (
              <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.fullName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.verified 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {user.verified ? "Verificado" : "Pendiente"}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trabajos recientes */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Trabajos Recientes</h2>
              <button className="text-sm text-primary hover:underline">
                Ver todos
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentJobs.map((job) => (
              <div key={job.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.active 
                      ? "bg-green-100 text-green-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {job.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {job.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{job.companyName}</span>
                  <span>{formatDate(job.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Estado del Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-800">API</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-green-600">Operacional</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-green-800">Base de Datos</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-green-600">Conectado</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-800">Uptime</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-sm text-blue-600">99.8% este mes</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-purple-800">Usuarios Online</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
            <p className="text-sm text-purple-600">247 usuarios</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}