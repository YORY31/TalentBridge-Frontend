import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Simulación de servicios API (reemplazar con los servicios reales)
const vacanciesService = {
  getAllVacancies: async () => {
    // Simulación de datos
    return [
      {
        id: 1,
        title: "Desarrollador Frontend React",
        company: "TechCorp Inc.",
        location: "Ciudad de México",
        type: "Tiempo completo",
        salary: "$40,000 - $60,000",
        status: "active",
        applicants: 24,
        createdAt: "2024-01-15",
        deadline: "2024-02-28",
        description: "Buscamos desarrollador Frontend con experiencia en React y TypeScript."
      },
      {
        id: 2,
        title: "Diseñador UX/UI Senior",
        company: "CreativeStudio",
        location: "Guadalajara",
        type: "Tiempo completo",
        salary: "$45,000 - $65,000",
        status: "active",
        applicants: 18,
        createdAt: "2024-01-10",
        deadline: "2024-02-20",
        description: "Diseñador con experiencia en investigación de usuarios y prototipado."
      },
      {
        id: 3,
        title: "Ingeniero de Backend Java",
        company: "FinTech Solutions",
        location: "Monterrey",
        type: "Medio tiempo",
        salary: "$35,000 - $50,000",
        status: "pending",
        applicants: 12,
        createdAt: "2024-01-05",
        deadline: "2024-02-15",
        description: "Desarrollador Backend con experiencia en Java y Spring Boot."
      },
      {
        id: 4,
        title: "Especialista en Marketing Digital",
        company: "MarketingPro",
        location: "Remoto",
        type: "Tiempo completo",
        salary: "$30,000 - $45,000",
        status: "active",
        applicants: 32,
        createdAt: "2024-01-20",
        deadline: "2024-03-10",
        description: "Gestión de campañas digitales y análisis de métricas."
      },
      {
        id: 5,
        title: "Analista de Datos",
        company: "DataInsights",
        location: "CDMX",
        type: "Tiempo completo",
        salary: "$38,000 - $55,000",
        status: "expired",
        applicants: 28,
        createdAt: "2023-12-15",
        deadline: "2024-01-31",
        description: "Análisis de datos con Python y SQL, creación de dashboards."
      },
      {
        id: 6,
        title: "Project Manager IT",
        company: "TechProjects",
        location: "Querétaro",
        type: "Tiempo completo",
        salary: "$50,000 - $70,000",
        status: "active",
        applicants: 15,
        createdAt: "2024-01-18",
        deadline: "2024-03-05",
        description: "Gestión de proyectos de desarrollo de software."
      }
    ];
  },

  updateVacancyStatus: async (id, status) => {
    console.log(`Actualizando vacante ${id} a estado ${status}`);
    return { success: true };
  },

  deleteVacancy: async (id) => {
    console.log(`Eliminando vacante ${id}`);
    return { success: true };
  },

  createVacancy: async (data) => {
    console.log("Creando nueva vacante:", data);
    return { success: true, id: Date.now() };
  }
};

export default function VacanciesManagement() {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    loadVacancies();
  }, []);

  const loadVacancies = async () => {
    try {
      setLoading(true);
      const data = await vacanciesService.getAllVacancies();
      setVacancies(data);
    } catch (error) {
      console.error("Error loading vacancies:", error);
      setMessage({ 
        type: "error", 
        text: `Error al cargar vacantes: ${error.message}` 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await vacanciesService.updateVacancyStatus(id, newStatus);
      setVacancies(prev => prev.map(vac => 
        vac.id === id ? { ...vac, status: newStatus } : vac
      ));
      setMessage({ 
        type: "success", 
        text: `Estado de vacante actualizado a ${newStatus === 'active' ? 'activa' : 'inactiva'}` 
      });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating status:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleDeleteVacancy = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta vacante? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      await vacanciesService.deleteVacancy(id);
      setVacancies(prev => prev.filter(vac => vac.id !== id));
      setMessage({ type: "success", text: "Vacante eliminada correctamente" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error deleting vacancy:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleCreateVacancy = async (data) => {
    try {
      await vacanciesService.createVacancy(data);
      setMessage({ type: "success", text: "Vacante creada correctamente" });
      setShowCreateModal(false);
      loadVacancies();
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error creating vacancy:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  // Filtrar vacantes
  const filteredVacancies = vacancies.filter(vac => {
    const matchesSearch = 
      (vac.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vac.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vac.location || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || vac.status === statusFilter;
    const matchesType = typeFilter === "all" || vac.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Paginación
  const totalPages = Math.ceil(filteredVacancies.length / itemsPerPage);
  const paginatedVacancies = filteredVacancies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusColors = {
    active: "bg-green-500/20 text-green-400 border border-green-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    expired: "bg-red-500/20 text-red-400 border border-red-500/30",
    draft: "bg-gray-500/20 text-gray-400 border border-gray-500/30"
  };

  const statusLabels = {
    active: "Activa",
    pending: "Pendiente",
    expired: "Expirada",
    draft: "Borrador"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Gestión de Vacantes</h1>
          <p className="text-text-secondary mt-2">
            {filteredVacancies.length} vacante{filteredVacancies.length !== 1 ? 's' : ''} encontrada{filteredVacancies.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-purple/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Nueva Vacante
          </button>
          <button
            onClick={loadVacancies}
            className="px-6 py-3 border border-accent-purple/30 text-accent-purple rounded-xl hover:bg-accent-purple/10 transition-all duration-300 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Actualizar
          </button>
        </div>
      </div>

      {/* Mensajes */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-xl border ${
          message.type === "success" 
            ? "bg-green-500/10 text-green-400 border-green-500/20" 
            : "bg-red-500/10 text-red-400 border-red-500/20"
        }`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              {message.type === "success" ? "check_circle" : "error"}
            </span>
            <p>{message.text}</p>
          </div>
        </div>
      )}

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Vacantes Activas</p>
              <p className="text-2xl font-bold text-text-primary mt-2">
                {vacancies.filter(v => v.status === 'active').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400">
                work
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Solicitudes Totales</p>
              <p className="text-2xl font-bold text-text-primary mt-2">
                {vacancies.reduce((sum, vac) => sum + (vac.applicants || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400">
                groups
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Pendientes</p>
              <p className="text-2xl font-bold text-text-primary mt-2">
                {vacancies.filter(v => v.status === 'pending').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-yellow-400">
                schedule
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Expiradas</p>
              <p className="text-2xl font-bold text-text-primary mt-2">
                {vacancies.filter(v => v.status === 'expired').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-400">
                event_busy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Búsqueda */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Buscar vacante</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar por título, empresa o ubicación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary placeholder-text-secondary"
              />
            </div>
          </div>

          {/* Filtro por estado */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
            >
              <option value="all" className="bg-gray-900">Todos los estados</option>
              <option value="active" className="bg-gray-900">Activas</option>
              <option value="pending" className="bg-gray-900">Pendientes</option>
              <option value="expired" className="bg-gray-900">Expiradas</option>
              <option value="draft" className="bg-gray-900">Borradores</option>
            </select>
          </div>

          {/* Filtro por tipo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Tipo de empleo</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
            >
              <option value="all" className="bg-gray-900">Todos los tipos</option>
              <option value="Tiempo completo" className="bg-gray-900">Tiempo completo</option>
              <option value="Medio tiempo" className="bg-gray-900">Medio tiempo</option>
              <option value="Por proyecto" className="bg-gray-900">Por proyecto</option>
              <option value="Remoto" className="bg-gray-900">Remoto</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de vacantes */}
      <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-900/50 to-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Vacante</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Empresa</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Ubicación</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Solicitantes</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Fecha límite</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-purple/20">
              {paginatedVacancies.length > 0 ? (
                paginatedVacancies.map((vacancy) => (
                  <tr key={vacancy.id} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-text-primary">{vacancy.title}</p>
                        <p className="text-sm text-text-secondary mt-1">{vacancy.type}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-text-primary">{vacancy.company}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-text-secondary">
                          location_on
                        </span>
                        <span className="text-text-primary">{vacancy.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[vacancy.status] || "bg-gray-500/20 text-gray-400"}`}>
                        {statusLabels[vacancy.status] || vacancy.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary font-medium">{vacancy.applicants}</span>
                        <button
                          onClick={() => navigate(`/admin/vacantes/${vacancy.id}/solicitantes`)}
                          className="text-sm text-accent-purple hover:text-accent-fuchsia transition-colors"
                        >
                          Ver
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-text-primary">
                        {new Date(vacancy.deadline).toLocaleDateString("es-ES")}
                        <p className={`text-xs ${new Date(vacancy.deadline) < new Date() ? 'text-red-400' : 'text-text-secondary'}`}>
                          {new Date(vacancy.deadline) < new Date() ? 'Expirada' : 'Activa'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowDetailsModal(vacancy)}
                          className="p-2 text-text-secondary hover:text-text-primary hover:bg-accent-purple/10 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        
                        <button
                          onClick={() => navigate(`/admin/vacantes/${vacancy.id}/editar`)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Editar vacante"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        
                        {vacancy.status === 'active' ? (
                          <button
                            onClick={() => handleUpdateStatus(vacancy.id, 'expired')}
                            className="p-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10 rounded-lg transition-colors"
                            title="Desactivar vacante"
                          >
                            <span className="material-symbols-outlined text-lg">pause</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(vacancy.id, 'active')}
                            className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/10 rounded-lg transition-colors"
                            title="Activar vacante"
                          >
                            <span className="material-symbols-outlined text-lg">play_arrow</span>
                          </button>
                        )}
                        
                        <button
                          onClick={() => handleDeleteVacancy(vacancy.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Eliminar vacante"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="text-text-secondary">
                      <span className="material-symbols-outlined mx-auto h-16 w-16 text-text-secondary">
                        work
                      </span>
                      <p className="mt-4 text-lg font-medium text-text-primary">No se encontraron vacantes</p>
                      <p className="mt-2">Intenta cambiar los filtros o crear una nueva vacante.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-accent-purple/20">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-text-secondary">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredVacancies.length)} de {filteredVacancies.length} vacantes
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-accent-purple/30 rounded-lg text-sm font-medium text-text-primary hover:bg-accent-purple/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white shadow-lg"
                        : "border border-accent-purple/30 text-text-primary hover:bg-accent-purple/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-accent-purple/30 rounded-lg text-sm font-medium text-text-primary hover:bg-accent-purple/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de creación */}
      {showCreateModal && (
        <CreateVacancyModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateVacancy}
        />
      )}

      {/* Modal de detalles */}
      {showDetailsModal && (
        <VacancyDetailsModal
          vacancy={showDetailsModal}
          onClose={() => setShowDetailsModal(null)}
        />
      )}
    </div>
  );
}

// Componente Modal para crear vacante
function CreateVacancyModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Tiempo completo",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    deadline: "",
    status: "active"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-accent-purple/30">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Crear Nueva Vacante</h3>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Título de la vacante *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                    placeholder="Ej: Desarrollador Frontend React"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Empresa *</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Ubicación *</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                    placeholder="Ej: Ciudad de México, Remoto"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Tipo de empleo *</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                  >
                    <option value="Tiempo completo" className="bg-gray-900">Tiempo completo</option>
                    <option value="Medio tiempo" className="bg-gray-900">Medio tiempo</option>
                    <option value="Por proyecto" className="bg-gray-900">Por proyecto</option>
                    <option value="Remoto" className="bg-gray-900">Remoto</option>
                    <option value="Prácticas" className="bg-gray-900">Prácticas</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Salario</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    placeholder="Ej: $40,000 - $60,000"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Fecha límite *</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Descripción *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                  required
                  placeholder="Describe las responsabilidades del puesto..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Requisitos</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    placeholder="Lista de requisitos separados por puntos"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Beneficios</label>
                  <textarea
                    name="benefits"
                    value={formData.benefits}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    placeholder="Lista de beneficios ofrecidos"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Estado inicial</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                >
                  <option value="active" className="bg-gray-900">Activa</option>
                  <option value="pending" className="bg-gray-900">Pendiente</option>
                  <option value="draft" className="bg-gray-900">Borrador</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-accent-purple/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-accent-purple/30 text-accent-purple rounded-xl hover:bg-accent-purple/10 transition-all duration-300 font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-purple/20 font-medium"
                >
                  Crear Vacante
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Modal para ver detalles
function VacancyDetailsModal({ vacancy, onClose }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-accent-purple/30">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-text-primary">{vacancy.title}</h3>
                <p className="text-text-secondary mt-1">{vacancy.company} • {vacancy.location}</p>
              </div>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Información general */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/30 rounded-xl p-4 border border-accent-purple/20">
                  <p className="text-sm text-text-secondary">Tipo de empleo</p>
                  <p className="text-text-primary font-medium mt-1">{vacancy.type}</p>
                </div>
                <div className="bg-gray-900/30 rounded-xl p-4 border border-accent-purple/20">
                  <p className="text-sm text-text-secondary">Salario</p>
                  <p className="text-text-primary font-medium mt-1">{vacancy.salary}</p>
                </div>
                <div className="bg-gray-900/30 rounded-xl p-4 border border-accent-purple/20">
                  <p className="text-sm text-text-secondary">Solicitantes</p>
                  <p className="text-text-primary font-medium mt-1">{vacancy.applicants}</p>
                </div>
              </div>

              {/* Fechas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/30 rounded-xl p-4 border border-accent-purple/20">
                  <p className="text-sm text-text-secondary">Fecha de publicación</p>
                  <p className="text-text-primary font-medium mt-1">
                    {new Date(vacancy.createdAt).toLocaleDateString("es-ES", { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
                <div className="bg-gray-900/30 rounded-xl p-4 border border-accent-purple/20">
                  <p className="text-sm text-text-secondary">Fecha límite</p>
                  <p className="text-text-primary font-medium mt-1">
                    {new Date(vacancy.deadline).toLocaleDateString("es-ES", { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-3">Descripción del puesto</h4>
                  <p className="text-text-secondary">{vacancy.description}</p>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-accent-purple/20">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-accent-purple/30 text-accent-purple rounded-xl hover:bg-accent-purple/10 transition-all duration-300 font-medium"
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={() => window.location.href = `/admin/vacantes/${vacancy.id}/editar`}
                    className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-purple/20 font-medium"
                  >
                    Editar Vacante
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}