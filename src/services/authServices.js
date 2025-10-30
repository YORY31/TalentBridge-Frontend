import axios from "axios";
import { API_URL } from "./apiConfing";

// 🔹 Registro
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar:", error);
    throw error;
  }
};


// 🔹 Login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/Auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// 🔹 Obtener perfil del usuario
export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/Auth/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
};
