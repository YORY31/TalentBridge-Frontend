import axios from "axios";
import { getToken } from "./authServices";

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

// 🔹 Obtener todos los CVs
export const getAllCVs = async (userId = null) => {
  try {
    const params = userId ? { userId } : {};
    const response = await apiClient.get(`/CVs`, { params });
    
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    
    return [];
  } catch (error) {
    console.error("Error al obtener CVs:", error);
    throw error;
  }
};

// 🔹 Obtener CV por ID
export const getCVById = async (id) => {
  try {
    const response = await apiClient.get(`/CVs/${id}`);
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error("Error al obtener CV:", error);
    throw error;
  }
};

// 🔹 Obtener CV activo de usuario
export const getActiveCVByUser = async (userId) => {
  try {
    const response = await apiClient.get(`/CVs/user/${userId}/active`);
    
    if (response.data && response.data.success && response.data.data) {
      return response.data.data;
    }
    
    return null;
  } catch (error) {
    console.error("Error al obtener CV activo:", error);
    throw error;
  }
};

// 🔹 Subir CV (usando FormData para archivos)
export const uploadCV = async (formData) => {
  try {
    const token = getToken();
    
    const response = await axios.post(`${API_URL}/CVs/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error al subir CV:", error);
    throw error;
  }
};

// 🔹 Actualizar CV
export const updateCV = async (id, cvData) => {
  try {
    const response = await apiClient.put(`/CVs/${id}`, cvData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar CV:", error);
    throw error;
  }
};

// 🔹 Eliminar CV
export const deleteCV = async (id) => {
  try {
    const response = await apiClient.delete(`/CVs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar CV:", error);
    throw error;
  }
};

// 🔹 Analizar CV
export const analyzeCV = async (cvId, analysisData) => {
  try {
    const response = await apiClient.post(`/CVs/${cvId}/analyze`, analysisData);
    return response.data;
  } catch (error) {
    console.error("Error al analizar CV:", error);
    throw error;
  }
};