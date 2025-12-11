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
    // Guardar token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// 🔹 Obtener perfil del usuario
export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/Auth/profile`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
};

// 🔹 Logout
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// 🔹 Verificar autenticación
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// 🔹 Obtener usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// 🔹 Obtener token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Interceptor para agregar token automáticamente
axios.interceptors.request.use(
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