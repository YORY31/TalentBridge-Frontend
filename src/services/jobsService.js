import axios from "axios";

// 🔹 Obtener todos los trabajos
export const getAllJobs = async (activeOnly = true) => {
  try {
    const response = await axios.get(`/api/Jobs`, { params: { activeOnly } });
    return response.data;
  } catch (error) {
    console.error("Error al obtener trabajos:", error);
    throw error;
  }
};

// 🔹 Obtener trabajo por ID
export const getJobById = async (id) => {
  try {
    const response = await axios.get(`/api/Jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener trabajo:", error);
    throw error;
  }
};

// 🔹 Crear trabajo
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`/api/Jobs`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error al crear trabajo:", error);
    throw error;
  }
};

// 🔹 Actualizar trabajo
export const updateJob = async (id, jobData) => {
  try {
    const response = await axios.put(`/api/Jobs/${id}`, jobData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar trabajo:", error);
    throw error;
  }
};

// 🔹 Eliminar trabajo
export const deleteJob = async (id) => {
  try {
    const response = await axios.delete(`/api/Jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar trabajo:", error);
    throw error;
  }
};