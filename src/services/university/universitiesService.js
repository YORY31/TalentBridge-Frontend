import axios from "axios";

// 🔹 Obtener todas las universidades
export const getAllUniversities = async () => {
  try {
    const response = await axios.get(`/api/Universities`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener universidades:", error);
    throw error;
  }
};

// 🔹 Obtener universidades activas
export const getActiveUniversities = async () => {
  try {
    const response = await axios.get(`/api/Universities/active`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener universidades activas:", error);
    throw error;
  }
};

// 🔹 Obtener universidad por ID
export const getUniversityById = async (id) => {
  try {
    const response = await axios.get(`/api/Universities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener universidad:", error);
    throw error;
  }
};

// 🔹 Obtener detalles de universidad
export const getUniversityDetails = async (id) => {
  try {
    const response = await axios.get(`/api/Universities/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de universidad:", error);
    throw error;
  }
};

// 🔹 Crear universidad
export const createUniversity = async (universityData) => {
  try {
    const response = await axios.post(`/api/Universities`, universityData);
    return response.data;
  } catch (error) {
    console.error("Error al crear universidad:", error);
    throw error;
  }
};

// 🔹 Actualizar universidad
export const updateUniversity = async (id, universityData) => {
  try {
    const response = await axios.put(`/api/Universities/${id}`, universityData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar universidad:", error);
    throw error;
  }
};

// 🔹 Eliminar universidad
export const deleteUniversity = async (id) => {
  try {
    await axios.delete(`/api/Universities/${id}`);
  } catch (error) {
    console.error("Error al eliminar universidad:", error);
    throw error;
  }
};

// 🔹 Verificar universidad
export const verifyUniversity = async (id) => {
  try {
    const response = await axios.patch(`/api/Universities/${id}/verify`);
    return response.data;
  } catch (error) {
    console.error("Error al verificar universidad:", error);
    throw error;
  }
};

// 🔹 Obtener carreras de universidad
export const getUniversityCareers = async (id) => {
  try {
    const response = await axios.get(`/api/Universities/${id}/careers`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener carreras:", error);
    throw error;
  }
};