import axios from "axios";

// 🔹 Obtener todos los usuarios
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`/api/Users`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

// 🔹 Obtener usuario por ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`/api/Users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }
};

// 🔹 Crear usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`/api/Users`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// 🔹 Actualizar usuario
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`/api/Users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
};

// 🔹 Eliminar usuario
export const deleteUser = async (id) => {
  try {
    await axios.delete(`/api/Users/${id}`);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    throw error;
  }
};

// 🔹 Crear admin
export const createAdmin = async (adminData) => {
  try {
    const response = await axios.post(`/api/Users/admin`, adminData);
    return response.data;
  } catch (error) {
    console.error("Error al crear admin:", error);
    throw error;
  }
};