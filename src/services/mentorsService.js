import axios from "axios";

// 🔹 Obtener perfil de mentor del usuario
export const getMyMentorProfile = async () => {
  try {
    const response = await axios.get(`/api/Mentors/profile`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil de mentor:", error);
    throw error;
  }
};

// 🔹 Obtener perfil de mentor por ID de usuario
export const getMentorProfile = async (userId) => {
  try {
    const response = await axios.get(`/api/Mentors/${userId}/profile`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil de mentor:", error);
    throw error;
  }
};

// 🔹 Actualizar perfil de mentor
export const updateMentorProfile = async (profileData) => {
  try {
    const response = await axios.put(`/api/Mentors/profile`, profileData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar perfil de mentor:", error);
    throw error;
  }
};

// 🔹 Buscar mentores
export const searchMentors = async (searchParams) => {
  try {
    const response = await axios.get(`/api/Mentors/search`, { params: searchParams });
    return response.data;
  } catch (error) {
    console.error("Error al buscar mentores:", error);
    throw error;
  }
};

// 🔹 Obtener mentores recomendados
export const getRecommendedMentors = async () => {
  try {
    const response = await axios.get(`/api/Mentors/recommended`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mentores recomendados:", error);
    throw error;
  }
};

// 🔹 Obtener todos los mentores
export const getAllMentors = async () => {
  try {
    const response = await axios.get(`/api/Mentors`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mentores:", error);
    throw error;
  }
};