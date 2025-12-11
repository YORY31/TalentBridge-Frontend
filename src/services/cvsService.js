import axios from "axios";

// 🔹 Obtener todos los CVs
export const getAllCVs = async (userId = null) => {
  try {
    const params = userId ? { userId } : {};
    const response = await axios.get(`/api/CVs`, { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener CVs:", error);
    throw error;
  }
};

// 🔹 Obtener CV por ID
export const getCVById = async (id) => {
  try {
    const response = await axios.get(`/api/CVs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener CV:", error);
    throw error;
  }
};

// 🔹 Obtener CV activo de usuario
export const getActiveCVByUser = async (userId) => {
  try {
    const response = await axios.get(`/api/CVs/user/${userId}/active`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener CV activo:", error);
    throw error;
  }
};

// 🔹 Subir CV (usando FormData para archivos)
export const uploadCV = async (formData) => {
  try {
    const response = await axios.post(`/api/CVs/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
    const response = await axios.put(`/api/CVs/${id}`, cvData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar CV:", error);
    throw error;
  }
};

// 🔹 Eliminar CV
export const deleteCV = async (id) => {
  try {
    const response = await axios.delete(`/api/CVs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar CV:", error);
    throw error;
  }
};

// 🔹 Analizar CV
export const analyzeCV = async (cvId, analysisData) => {
  try {
    const response = await axios.post(`/api/CVs/${cvId}/analyze`, analysisData);
    return response.data;
  } catch (error) {
    console.error("Error al analizar CV:", error);
    throw error;
  }
};