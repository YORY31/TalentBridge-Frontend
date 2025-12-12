// usersServices.js
import axios from "axios";
import { getToken } from "./authServices";

// 🔹 IMPORTANTE: Usa la URL correcta de tu backend
const API_URL = "http://localhost:5169/api";

// Configurar axios para usar la URL base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    console.log("Obteniendo usuarios de:", `${API_URL}/Users`);
    const response = await apiClient.get(`/Users`);
    
    console.log("Respuesta completa:", response);
    console.log("Estructura de datos:", response.data);
    
    // Tu API devuelve { success: true, data: [...], count: ... }
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      console.log("Usuarios encontrados:", response.data.data.length);
      return response.data.data;  // ← Devuelve solo el array de usuarios
    }
    
    console.warn("Estructura de respuesta inesperada:", response.data);
    return [];
    
  } catch (error) {
    console.error("Error completo al obtener usuarios:", error);
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    }
    
    throw error;
  }
};

// 🔹 Obtener usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await apiClient.get(`/Users/${id}`);
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
    
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

// 🔹 Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    console.log("Actualizando usuario", id, "con datos:", userData);
    const response = await apiClient.put(`/Users/${id}`, userData);
    
    console.log("Respuesta de actualización:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// 🔹 Eliminar usuario
export const deleteUser = async (id) => {
  try {
    console.log("Eliminando usuario:", id);
    const response = await apiClient.delete(`/Users/${id}`);
    
    console.log("Respuesta de eliminación:", response);
    return { success: true };
    
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// 🔹 Crear admin
export const createAdmin = async (adminData) => {
  try {
    console.log("Creando admin con datos:", adminData);
    const response = await apiClient.post(`/Users/admin`, adminData);
    
    console.log("Respuesta de creación admin:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("Error al crear admin:", error);
    throw error;
  }
};