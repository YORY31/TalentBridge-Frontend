import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllCommunities,
  createCommunity,
  updateCommunity,
  deleteCommunity,
  getCommunityMembers,
  removeMember,
  updateMemberRole
} from "../../../services/communities/communitiesService";

export default function CommunityManagement() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingCommunity, setEditingCommunity] = useState(null);
  const [editingMembers, setEditingMembers] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    loadCommunities();
  }, []);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      const communitiesData = await getAllCommunities();
      
      console.log("Datos recibidos de API:", communitiesData);
      
      if (Array.isArray(communitiesData)) {
        setCommunities(communitiesData);
        if (communitiesData.length === 0) {
          setMessage({ type: "info", text: "No hay comunidades registradas en el sistema" });
        }
      } else {
        console.error("Los datos no son un array:", communitiesData);
        setCommunities([]);
        setMessage({ 
          type: "error", 
          text: "Error: Los datos recibidos no tienen el formato esperado" 
        });
      }
      
    } catch (error) {
      console.error("Error loading communities:", error);
      setCommunities([]);
      setMessage({ 
        type: "error", 
        text: `Error al cargar comunidades: ${error.message}` 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditCommunity = (community) => {
    setEditingCommunity(community);
  };

  const handleUpdateCommunity = async (updatedData) => {
    try {
      await updateCommunity(editingCommunity.id, updatedData);
      setMessage({ type: "success", text: "Comunidad actualizada correctamente" });
      setEditingCommunity(null);
      loadCommunities();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating community:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleDeleteCommunity = async (communityId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta comunidad? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      await deleteCommunity(communityId);
      setMessage({ type: "success", text: "Comunidad eliminada correctamente" });
      loadCommunities();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error deleting community:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleToggleStatus = async (community) => {
    try {
      await updateCommunity(community.id, { isActive: !community.isActive });
      setMessage({ 
        type: "success", 
        text: `Comunidad ${!community.isActive ? "activada" : "desactivada"} correctamente` 
      });
      loadCommunities();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error toggling community status:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleCreateCommunity = async (communityData) => {
    try {
      await createCommunity(communityData);
      setMessage({ type: "success", text: "Comunidad creada correctamente" });
      setShowCreateModal(false);
      loadCommunities();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error creating community:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleViewMembers = async (community) => {
    try {
      const members = await getCommunityMembers(community.id);
      setEditingMembers({
        community,
        members: Array.isArray(members) ? members : []
      });
    } catch (error) {
      console.error("Error loading members:", error);
      setMessage({ type: "error", text: "Error al cargar miembros" });
    }
  };

  const handleRemoveMember = async (communityId, memberId) => {
    if (!window.confirm("¿Estás seguro de eliminar este miembro de la comunidad?")) {
      return;
    }

    try {
      await removeMember(communityId, memberId);
      setMessage({ type: "success", text: "Miembro eliminado correctamente" });
      
      // Actualizar lista de miembros
      const updatedMembers = editingMembers.members.filter(m => m.id !== memberId);
      setEditingMembers({
        ...editingMembers,
        members: updatedMembers
      });
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error removing member:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleUpdateMemberRole = async (communityId, memberId, newRole) => {
    try {
      await updateMemberRole(communityId, memberId, newRole);
      setMessage({ type: "success", text: "Rol actualizado correctamente" });
      
      // Actualizar rol en la lista
      const updatedMembers = editingMembers.members.map(member =>
        member.id === memberId ? { ...member, role: newRole } : member
      );
      setEditingMembers({
        ...editingMembers,
        members: updatedMembers
      });
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating member role:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  // Filtrar comunidades
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = 
      (community.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (community.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || community.type === typeFilter;
    const matchesVisibility = visibilityFilter === "all" || community.visibility === visibilityFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && community.isActive) ||
      (statusFilter === "inactive" && !community.isActive);
    
    return matchesSearch && matchesType && matchesVisibility && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredCommunities.length / itemsPerPage);
  const paginatedCommunities = filteredCommunities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const typeColors = {
    University: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    Interest: "bg-green-500/20 text-green-400 border border-green-500/30",
    Professional: "bg-purple-500/20 text-accent-purple border border-accent-purple/30",
    Study: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    Social: "bg-pink-500/20 text-pink-400 border border-pink-500/30"
  };

  const visibilityColors = {
    Public: "bg-green-500/20 text-green-400 border border-green-500/30",
    Private: "bg-red-500/20 text-red-400 border border-red-500/30",
    Restricted: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
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
          <h1 className="text-3xl font-bold text-text-primary">Gestión de Comunidades</h1>
          <p className="text-text-secondary mt-2">
            {filteredCommunities.length} comunidad{filteredCommunities.length !== 1 ? 'es' : ''} encontrada{filteredCommunities.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-purple/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Nueva Comunidad
          </button>
          <button
            onClick={loadCommunities}
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
            : message.type === "error" 
            ? "bg-red-500/10 text-red-400 border-red-500/20"
            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
        }`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              {message.type === "success" ? "check_circle" : 
               message.type === "error" ? "error" : "info"}
            </span>
            <p>{message.text}</p>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Búsqueda */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Buscar comunidad</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary placeholder-text-secondary"
              />
            </div>
          </div>

          {/* Filtro por tipo */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Filtrar por tipo</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
            >
              <option value="all" className="bg-gray-900">Todos los tipos</option>
              <option value="University" className="bg-gray-900">Universidad</option>
              <option value="Interest" className="bg-gray-900">Interés</option>
              <option value="Professional" className="bg-gray-900">Profesional</option>
              <option value="Study" className="bg-gray-900">Estudio</option>
              <option value="Social" className="bg-gray-900">Social</option>
            </select>
          </div>

          {/* Filtro por visibilidad */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Filtrar por visibilidad</label>
            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
            >
              <option value="all" className="bg-gray-900">Todas</option>
              <option value="Public" className="bg-gray-900">Públicas</option>
              <option value="Private" className="bg-gray-900">Privadas</option>
              <option value="Restricted" className="bg-gray-900">Restringidas</option>
            </select>
          </div>

          {/* Filtro por estado */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Filtrar por estado</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
            >
              <option value="all" className="bg-gray-900">Todos los estados</option>
              <option value="active" className="bg-gray-900">Activas</option>
              <option value="inactive" className="bg-gray-900">Inactivas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de comunidades */}
      <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-900/50 to-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Comunidad</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Tipo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Visibilidad</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Miembros</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-purple/20">
              {paginatedCommunities.length > 0 ? (
                paginatedCommunities.map((community) => (
                  <tr key={community.id} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent-purple to-accent-fuchsia rounded-xl flex items-center justify-center text-white font-bold">
                          {community.name?.charAt(0) || "C"}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{community.name || "Sin nombre"}</p>
                          <p className="text-sm text-text-secondary truncate max-w-xs">
                            {community.description || "Sin descripción"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeColors[community.type] || "bg-gray-500/20 text-text-secondary"}`}>
                        {community.type || "No definido"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${visibilityColors[community.visibility] || "bg-gray-500/20 text-text-secondary"}`}>
                        {community.visibility || "No definido"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm text-text-secondary">
                          group
                        </span>
                        <span className="text-text-primary font-medium">
                          {community.memberCount || 0}
                        </span>
                        <button
                          onClick={() => handleViewMembers(community)}
                          className="text-sm text-accent-purple hover:text-accent-fuchsia ml-2"
                        >
                          Ver
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(community)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          community.isActive 
                            ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                        }`}
                      >
                        {community.isActive ? "Activa" : "Inactiva"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/comunidades/${community.id}`)}
                          className="p-2 text-text-secondary hover:text-text-primary hover:bg-accent-purple/10 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        
                        <button
                          onClick={() => handleEditCommunity(community)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Editar comunidad"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        
                        <button
                          onClick={() => handleDeleteCommunity(community.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Eliminar comunidad"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="text-text-secondary">
                      <span className="material-symbols-outlined mx-auto h-16 w-16 text-text-secondary">
                        groups
                      </span>
                      <p className="mt-4 text-lg font-medium text-text-primary">No se encontraron comunidades</p>
                      <p className="mt-2">Intenta cambiar los filtros o crear una nueva comunidad.</p>
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
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredCommunities.length)} de {filteredCommunities.length} comunidades
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

      {/* Modal de edición */}
      {editingCommunity && (
        <EditCommunityModal
          community={editingCommunity}
          onClose={() => setEditingCommunity(null)}
          onSave={handleUpdateCommunity}
        />
      )}

      {/* Modal de creación */}
      {showCreateModal && (
        <CreateCommunityModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateCommunity}
        />
      )}

      {/* Modal de miembros */}
      {editingMembers && (
        <CommunityMembersModal
          community={editingMembers.community}
          members={editingMembers.members}
          onClose={() => setEditingMembers(null)}
          onRemoveMember={handleRemoveMember}
          onUpdateMemberRole={handleUpdateMemberRole}
        />
      )}
    </div>
  );
}

// Componente Modal para editar comunidad
function EditCommunityModal({ community, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: community.name || "",
    description: community.description || "",
    type: community.type || "Interest",
    visibility: community.visibility || "Public",
    isActive: community.isActive || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-accent-purple/30">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Editar Comunidad</h3>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Nombre de la comunidad *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary resize-none"
                    rows="3"
                    maxLength="500"
                    placeholder="Describe el propósito de la comunidad..."
                  />
                  <p className="text-xs text-text-secondary text-right">
                    {formData.description.length}/500 caracteres
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Tipo</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    >
                      <option value="Interest" className="bg-gray-900">Interés</option>
                      <option value="University" className="bg-gray-900">Universidad</option>
                      <option value="Professional" className="bg-gray-900">Profesional</option>
                      <option value="Study" className="bg-gray-900">Estudio</option>
                      <option value="Social" className="bg-gray-900">Social</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Visibilidad</label>
                    <select
                      value={formData.visibility}
                      onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    >
                      <option value="Public" className="bg-gray-900">Pública</option>
                      <option value="Private" className="bg-gray-900">Privada</option>
                      <option value="Restricted" className="bg-gray-900">Restringida</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="sr-only"
                      />
                      <div className={`block w-14 h-8 rounded-full ${formData.isActive ? 'bg-accent-purple' : 'bg-gray-700'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${formData.isActive ? 'transform translate-x-6' : ''}`}></div>
                    </div>
                    <span className="ml-3 text-sm text-text-primary">
                      {formData.isActive ? "Comunidad Activa" : "Comunidad Inactiva"}
                    </span>
                  </label>
                </div>
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
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Modal para crear comunidad
function CreateCommunityModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Interest",
    visibility: "Public",
    isActive: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-accent-purple/30">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-text-primary">Crear Nueva Comunidad</h3>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Nombre de la comunidad *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                    placeholder="Ej: Desarrollo Web, Matemáticas Avanzadas..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary resize-none"
                    rows="3"
                    maxLength="500"
                    placeholder="Describe el propósito de la comunidad..."
                  />
                  <p className="text-xs text-text-secondary text-right">
                    {formData.description.length}/500 caracteres
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Tipo *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                      required
                    >
                      <option value="Interest" className="bg-gray-900">Interés</option>
                      <option value="University" className="bg-gray-900">Universidad</option>
                      <option value="Professional" className="bg-gray-900">Profesional</option>
                      <option value="Study" className="bg-gray-900">Estudio</option>
                      <option value="Social" className="bg-gray-900">Social</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-primary">Visibilidad *</label>
                    <select
                      value={formData.visibility}
                      onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                      required
                    >
                      <option value="Public" className="bg-gray-900">Pública</option>
                      <option value="Private" className="bg-gray-900">Privada</option>
                      <option value="Restricted" className="bg-gray-900">Restringida</option>
                    </select>
                  </div>
                </div>
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
                  Crear Comunidad
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente Modal para gestionar miembros
function CommunityMembersModal({ community, members, onClose, onRemoveMember, onUpdateMemberRole }) {
  const [memberSearch, setMemberSearch] = useState("");

  const filteredMembers = members.filter(member =>
    (member.fullName || "").toLowerCase().includes(memberSearch.toLowerCase()) ||
    (member.email || "").toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose}></div>

        <div className="inline-block align-bottom bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-accent-purple/30">
          <div className="px-6 pt-6 pb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-text-primary">Miembros de la comunidad</h3>
                <p className="text-text-secondary mt-1">{community.name}</p>
              </div>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Buscador */}
            <div className="mb-6">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar miembros por nombre o email..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary placeholder-text-secondary"
                />
              </div>
            </div>

            {/* Lista de miembros */}
            <div className="max-h-96 overflow-y-auto rounded-xl border border-accent-purple/20">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 border-b border-accent-purple/10 hover:bg-gray-900/30 transition-colors last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-accent-purple to-accent-fuchsia rounded-full flex items-center justify-center text-white font-bold">
                        {member.fullName?.charAt(0) || "U"}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{member.fullName || "Sin nombre"}</p>
                        <p className="text-sm text-text-secondary">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <select
                        value={member.role || "Member"}
                        onChange={(e) => onUpdateMemberRole(community.id, member.id, e.target.value)}
                        className="px-3 py-1 bg-gray-900/50 border border-accent-purple/20 rounded-lg text-sm text-text-primary focus:ring-2 focus:ring-accent-purple focus:border-transparent"
                      >
                        <option value="Member" className="bg-gray-900">Miembro</option>
                        <option value="Moderator" className="bg-gray-900">Moderador</option>
                        <option value="Admin" className="bg-gray-900">Administrador</option>
                      </select>

                      <button
                        onClick={() => onRemoveMember(community.id, member.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Eliminar miembro"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <span className="material-symbols-outlined mx-auto h-12 w-12 text-text-secondary">
                    group_off
                  </span>
                  <p className="mt-4 text-text-primary">No se encontraron miembros</p>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-6 mt-6 border-t border-accent-purple/20">
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}