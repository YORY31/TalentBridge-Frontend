import Layout from "../components/Layout";

export default function Profile() {
  return (
    <Layout>
      <h2 className="text-2xl font-bold text-primary">Perfil</h2>
      <p className="text-secondary mt-1">Gestiona tu información y configuración de usuario.</p>
    </Layout>
  );
}

// import { useState, useEffect } from "react";
// import Layout from "../components/Layout";
// import { getProfile, updateUser } from "../services/usersServices";
// import { getCurrentUser, logout } from "../services/authServices";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     bio: "",
//     avatarUrl: "",
//     role: ""
//   });
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [activeTab, setActiveTab] = useState("profile");

//   useEffect(() => {
//     loadUserProfile();
//   }, []);

//   const loadUserProfile = async () => {
//     try {
//       setLoading(true);
//       const profileData = await getProfile();
//       setUser(profileData.data);
//       setFormData({
//         fullName: profileData.data.fullName || "",
//         email: profileData.data.email || "",
//         phoneNumber: profileData.data.phoneNumber || "",
//         bio: profileData.data.bio || "",
//         avatarUrl: profileData.data.avatarUrl || "",
//         role: profileData.data.role || ""
//       });
//     } catch (error) {
//       console.error("Error loading profile:", error);
//       setMessage({ type: "error", text: "Error al cargar el perfil" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const result = await updateUser(user.id, formData);
//       setUser(result.data);
//       setMessage({ type: "success", text: "Perfil actualizado exitosamente" });
//       setEditing(false);
      
//       // Actualizar usuario en localStorage si es el mismo usuario
//       const currentUser = getCurrentUser();
//       if (currentUser && currentUser.id === user.id) {
//         localStorage.setItem("user", JSON.stringify({
//           ...currentUser,
//           fullName: formData.fullName,
//           email: formData.email
//         }));
//       }
      
//       // Ocultar mensaje después de 3 segundos
//       setTimeout(() => {
//         setMessage({ type: "", text: "" });
//       }, 3000);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       setMessage({ type: "error", text: "Error al actualizar el perfil" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     window.location.href = "/login";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "No disponible";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("es-ES", {
//       year: "numeric",
//       month: "long",
//       day: "numeric"
//     });
//   };

//   const renderProfileInfo = () => (
//     <div className="space-y-6">
//       <div className="flex items-center space-x-6">
//         <div className="relative">
//           <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-4xl font-bold">
//             {user?.fullName?.charAt(0) || "U"}
//           </div>
//           {user?.verified && (
//             <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
//               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//               </svg>
//             </div>
//           )}
//         </div>
        
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">{user?.fullName}</h1>
//           <p className="text-gray-600 mt-1">@{user?.userName || user?.email?.split("@")[0]}</p>
//           <div className="flex items-center space-x-2 mt-3">
//             <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
//               {user?.role || "Usuario"}
//             </span>
//             {user?.verified && (
//               <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
//                 Verificado
//               </span>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <label className="text-sm font-medium text-gray-500">Correo electrónico</label>
//             <p className="mt-1 text-gray-900">{user?.email}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-500">Teléfono</label>
//             <p className="mt-1 text-gray-900">{user?.phoneNumber || "No especificado"}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-500">Miembro desde</label>
//             <p className="mt-1 text-gray-900">{formatDate(user?.createdAt)}</p>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="text-sm font-medium text-gray-500">Biografía</label>
//             <p className="mt-1 text-gray-900">{user?.bio || "Sin biografía"}</p>
//           </div>
//           <div>
//             <label className="text-sm font-medium text-gray-500">Estado</label>
//             <p className={`mt-1 ${user?.active ? "text-green-600" : "text-red-600"}`}>
//               {user?.active ? "Activo" : "Inactivo"}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="pt-6 border-t border-gray-200">
//         <button
//           onClick={() => setEditing(true)}
//           className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
//         >
//           Editar perfil
//         </button>
//       </div>
//     </div>
//   );

//   const renderEditForm = () => (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Nombre completo *</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Correo electrónico *</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//             required
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">Teléfono</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleInputChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//           />
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-medium text-gray-700">URL del avatar</label>
//           <input
//             type="url"
//             name="avatarUrl"
//             value={formData.avatarUrl}
//             onChange={handleInputChange}
//             placeholder="https://..."
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//           />
//         </div>
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium text-gray-700">Biografía</label>
//         <textarea
//           name="bio"
//           value={formData.bio}
//           onChange={handleInputChange}
//           rows="4"
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//           placeholder="Cuéntanos sobre ti..."
//         />
//       </div>

//       <div className="flex space-x-4 pt-6 border-t border-gray-200">
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
//         >
//           {loading ? "Guardando..." : "Guardar cambios"}
//         </button>
//         <button
//           type="button"
//           onClick={() => {
//             setEditing(false);
//             loadUserProfile();
//           }}
//           className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//         >
//           Cancelar
//         </button>
//       </div>
//     </form>
//   );

//   const renderSecurityTab = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Cambiar contraseña</h3>
//         <form className="space-y-4">
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Contraseña actual</label>
//             <input
//               type="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="••••••••"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Nueva contraseña</label>
//             <input
//               type="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="••••••••"
//             />
//           </div>
//           <div className="space-y-2">
//             <label className="text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
//             <input
//               type="password"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
//               placeholder="••••••••"
//             />
//           </div>
//           <button
//             type="submit"
//             className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
//           >
//             Cambiar contraseña
//           </button>
//         </form>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Sesiones activas</h3>
//         <p className="text-gray-600 mb-4">Actualmente estás conectado desde este dispositivo.</p>
//         <button
//           onClick={handleLogout}
//           className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
//         >
//           Cerrar sesión en todos los dispositivos
//         </button>
//       </div>
//     </div>
//   );

//   const renderSettingsTab = () => (
//     <div className="space-y-6">
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de notificaciones</h3>
//         <div className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium text-gray-900">Notificaciones por correo</p>
//               <p className="text-sm text-gray-600">Recibe actualizaciones importantes por correo</p>
//             </div>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input type="checkbox" className="sr-only peer" defaultChecked />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
//             </label>
//           </div>
          
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="font-medium text-gray-900">Notificaciones push</p>
//               <p className="text-sm text-gray-600">Recibe notificaciones en tiempo real</p>
//             </div>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input type="checkbox" className="sr-only peer" defaultChecked />
//               <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Zona peligrosa</h3>
//         <div className="space-y-4">
//           <button
//             onClick={handleLogout}
//             className="px-6 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-medium"
//           >
//             Cerrar sesión
//           </button>
          
//           <button
//             className="px-6 py-3 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
//             onClick={() => {
//               if (window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) {
//                 // Lógica para eliminar cuenta
//               }
//             }}
//           >
//             Eliminar cuenta permanentemente
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   if (loading && !user) {
//     return (
//       <Layout>
//         <div className="flex justify-center items-center min-h-[60vh]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-gray-900">Perfil</h2>
//           <p className="text-gray-600 mt-1">Gestiona tu información y configuración de usuario.</p>
//         </div>

//         {/* Mensajes */}
//         {message.text && (
//           <div className={`mb-6 p-4 rounded-lg ${
//             message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" :
//             message.type === "error" ? "bg-red-50 text-red-700 border border-red-200" :
//             "bg-blue-50 text-blue-700 border border-blue-200"
//           }`}>
//             {message.text}
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="mb-8 border-b border-gray-200">
//           <nav className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab("profile")}
//               className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === "profile"
//                   ? "border-primary text-primary"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Perfil
//             </button>
//             <button
//               onClick={() => setActiveTab("security")}
//               className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === "security"
//                   ? "border-primary text-primary"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Seguridad
//             </button>
//             <button
//               onClick={() => setActiveTab("settings")}
//               className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === "settings"
//                   ? "border-primary text-primary"
//                   : "border-transparent text-gray-500 hover:text-gray-700"
//               }`}
//             >
//               Configuración
//             </button>
//           </nav>
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8">
//           {activeTab === "profile" && (
//             <>
//               <div className="flex justify-between items-center mb-8">
//                 <h3 className="text-xl font-bold text-gray-900">
//                   {editing ? "Editar perfil" : "Información del perfil"}
//                 </h3>
//                 {!editing && (
//                   <button
//                     onClick={() => setEditing(true)}
//                     className="text-sm text-primary hover:text-primary/80 font-medium"
//                   >
//                     Editar perfil
//                   </button>
//                 )}
//               </div>
              
//               {editing ? renderEditForm() : renderProfileInfo()}
//             </>
//           )}
          
//           {activeTab === "security" && renderSecurityTab()}
//           {activeTab === "settings" && renderSettingsTab()}
//         </div>
//       </div>
//     </Layout>
//   );
// }