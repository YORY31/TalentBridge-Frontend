import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAllUsers, 
  updateUser, 
  deleteUser,
  createAdmin 
} from "../../../services/user/usersServices";
import { getCurrentUser } from "../../../services/auth/authServices";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getAllUsers();
      
      console.log("Datos recibidos de API:", usersData);
      
      if (Array.isArray(usersData)) {
        setUsers(usersData);
        if (usersData.length === 0) {
          setMessage({ type: "info", text: "No hay usuarios registrados en el sistema" });
        }
      } else {
        console.error("Los datos no son un array:", usersData);
        setUsers([]);
        setMessage({ 
          type: "error", 
          text: "Error: Los datos recibidos no tienen el formato esperado" 
        });
      }
      
    } catch (error) {
      console.error("Error loading users:", error);
      setUsers([]);
      setMessage({ 
        type: "error", 
        text: `Error al cargar usuarios: ${error.message}` 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (updatedData) => {
    try {
      await updateUser(editingUser.id, updatedData);
      setMessage({ type: "success", text: "Usuario actualizado correctamente" });
      setEditingUser(null);
      loadUsers();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      await deleteUser(userId);
      setMessage({ type: "success", text: "Usuario eliminado correctamente" });
      loadUsers();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      await updateUser(user.id, { isActive: !user.isActive });
      setMessage({ 
        type: "success", 
        text: `Usuario ${!user.isActive ? "activado" : "desactivado"} correctamente` 
      });
      loadUsers();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error toggling user status:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleCreateAdmin = async (adminData) => {
    try {
      await createAdmin(adminData);
      setMessage({ type: "success", text: "Administrador creado correctamente" });
      setShowCreateModal(false);
      loadUsers();
      
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error creating admin:", error);
      setMessage({ type: "error", text: error.message });
    }
  };

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.fullName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const roleColors = {
    Admin: "bg-red-500/20 text-red-400 border border-red-500/30",
    Student: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    Mentor: "bg-green-500/20 text-green-400 border border-green-500/30",
    Employer: "bg-purple-500/20 text-accent-purple border border-accent-purple/30",
    User: "bg-gray-500/20 text-text-secondary border border-gray-500/30"
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
          <h1 className="text-3xl font-bold text-text-primary">Gestión de Usuarios</h1>
          <p className="text-text-secondary mt-2">
            {filteredUsers.length} usuario{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-accent-purple to-accent-fuchsia text-white rounded-xl hover:from-accent-purple/90 hover:to-accent-fuchsia/90 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-accent-purple/20 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">person_add</span>
            Nuevo Administrador
          </button>
          <button
            onClick={loadUsers}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Búsqueda */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Buscar usuario</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary placeholder-text-secondary"
              />
            </div>
          </div>

          {/* Filtro por rol */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Filtrar por rol</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/30 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
            >
              <option value="all" className="bg-gray-900">Todos los roles</option>
              <option value="Admin" className="bg-gray-900">Administrador</option>
              <option value="User" className="bg-gray-900">Usuario</option>
              <option value="Student" className="bg-gray-900">Estudiante</option>
              <option value="Mentor" className="bg-gray-900">Mentor</option>
              <option value="Employer" className="bg-gray-900">Empleador</option>
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
              <option value="active" className="bg-gray-900">Activos</option>
              <option value="inactive" className="bg-gray-900">Inactivos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-gradient-to-br from-gray-900/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-accent-purple/20 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-900/50 to-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Usuario</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Rol</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Estado</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Registro</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-accent-purple/20">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-accent-purple to-accent-fuchsia rounded-full flex items-center justify-center text-white font-bold">
                          {user.fullName?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{user.fullName || "Sin nombre"}</p>
                          <p className="text-sm text-text-secondary">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleColors[user.role] || "bg-gray-500/20 text-text-secondary"}`}>
                        {user.role || "No definido"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                          user.isActive 
                            ? "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                        }`}
                      >
                        {user.isActive ? "Activo" : "Inactivo"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("es-ES") : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/usuarios/${user.id}`)}
                          className="p-2 text-text-secondary hover:text-text-primary hover:bg-accent-purple/10 rounded-lg transition-colors"
                          title="Ver detalles"
                        >
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Editar usuario"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        
                        {user.id !== currentUser?.id && (
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Eliminar usuario"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="text-text-secondary">
                      <span className="material-symbols-outlined mx-auto h-16 w-16 text-text-secondary">
                        group
                      </span>
                      <p className="mt-4 text-lg font-medium text-text-primary">No se encontraron usuarios</p>
                      <p className="mt-2">Intenta cambiar los filtros o crear un nuevo usuario.</p>
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
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
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
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
        />
      )}

      {/* Modal de creación */}
      {showCreateModal && (
        <CreateAdminModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateAdmin}
        />
      )}
    </div>
  );
}

// Componente Modal para editar usuario
function EditUserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
    role: user.role || "User",
    isActive: user.isActive || false
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
              <h3 className="text-xl font-bold text-text-primary">Editar Usuario</h3>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Nombre completo</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Rol</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                  >
                    <option value="User" className="bg-gray-900">Usuario</option>
                    <option value="Student" className="bg-gray-900">Estudiante</option>
                    <option value="Mentor" className="bg-gray-900">Mentor</option>
                    <option value="Employer" className="bg-gray-900">Empleador</option>
                    <option value="Admin" className="bg-gray-900">Administrador</option>
                  </select>
                </div>

                <div className="space-y-2 flex items-end">
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
                      {formData.isActive ? "Activo" : "Inactivo"}
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

// Componente Modal para crear administrador
function CreateAdminModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
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
              <h3 className="text-xl font-bold text-text-primary">Crear Administrador</h3>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Nombre completo *</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Contraseña *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-accent-purple/20 rounded-xl focus:ring-2 focus:ring-accent-purple focus:border-transparent text-text-primary"
                    required
                    minLength="6"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-yellow-400 mt-0.5">
                    warning
                  </span>
                  <p className="text-sm text-yellow-300">
                    Se creará un usuario con permisos de administrador completo. 
                    Este usuario tendrá acceso a todas las funcionalidades del sistema.
                  </p>
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
                  Crear Administrador
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}