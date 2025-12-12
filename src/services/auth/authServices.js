import axios from "axios";
import { API_URL } from "../config/apiConfing";

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
    // Guardar token y datos del usuario
    if (response.data.token && response.data.user) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Guardar refresh token si existe
      if (response.data.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      
      // Guardar token expiration si existe
      if (response.data.tokenExpiration) {
        localStorage.setItem("tokenExpiration", response.data.tokenExpiration);
      }
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
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiration");
  localStorage.removeItem("adminRemember");
};

// 🔹 Verificar autenticación
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const user = getCurrentUser();
  
  // Verificar que exista token y usuario
  if (!token || !user) {
    return false;
  }
  
  // Opcional: Verificar expiración del token
  const expiration = localStorage.getItem("tokenExpiration");
  if (expiration) {
    const now = new Date();
    const expDate = new Date(expiration);
    if (now > expDate) {
      logout(); // Token expirado
      return false;
    }
  }
  
  return true;
};

// 🔹 Obtener usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Error al parsear usuario:", error);
    localStorage.removeItem("user");
    return null;
  }
};

// 🔹 Verificar si es administrador
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.role === "Admin";
};

// 🔹 Verificar si es usuario normal
export const isUser = () => {
  const user = getCurrentUser();
  return user && user.role === "User";
};

// 🔹 Obtener rol del usuario
export const getUserRole = () => {
  const user = getCurrentUser();
  return user ? user.role : null;
};

// 🔹 Obtener información básica del usuario
export const getUserInfo = () => {
  const user = getCurrentUser();
  if (!user) return null;
  
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    // Agrega más campos según tu API
  };
};

// 🔹 Obtener token
export const getToken = () => {
  return localStorage.getItem("token");
};

// 🔹 Actualizar datos del usuario en localStorage
export const updateUserInStorage = (userData) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = { ...currentUser, ...userData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  }
  return null;
};

// 🔹 Verificar si está autenticado y tiene un rol específico
export const hasRole = (role) => {
  const user = getCurrentUser();
  return user && user.role === role;
};

// 🔹 Refrescar token (si tu API lo soporta)
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No hay refresh token disponible");
    }
    
    const response = await axios.post(`${API_URL}/Auth/refresh`, {
      refreshToken: refreshToken
    });
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      
      if (response.data.tokenExpiration) {
        localStorage.setItem("tokenExpiration", response.data.tokenExpiration);
      }
      
      return response.data;
    }
  } catch (error) {
    console.error("Error al refrescar token:", error);
    logout();
    throw error;
  }
};

// 🔹 Verificar si el usuario está activo
export const isUserActive = () => {
  const user = getCurrentUser();
  return user && user.isActive === true;
};

// Interceptor para agregar token automáticamente a las peticiones
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

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (No autorizado) y no es una solicitud de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        await refreshToken();
        
        // Reintentar la solicitud original con el nuevo token
        const token = getToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Si el refresh falla, hacer logout
        logout();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper: Redirigir según rol
export const redirectByRole = () => {
  if (!isAuthenticated()) {
    return "/login";
  }
  
  const role = getUserRole();
  
  switch (role) {
    case "Admin":
      return "/admin/dashboard";
    case "User":
      return "/";
    default:
      return "/login";
  }
};