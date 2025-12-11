import axios from "axios";

// 🔹 Obtener todas las solicitudes de mentoría
export const getMentorshipRequests = async () => {
  try {
    const response = await axios.get(`/api/MentorshipRequests`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    throw error;
  }
};

// 🔹 Obtener solicitudes del usuario
export const getMyMentorshipRequests = async () => {
  try {
    const response = await axios.get(`/api/MentorshipRequests/my-requests`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mis solicitudes:", error);
    throw error;
  }
};

// 🔹 Obtener solicitud por ID
export const getMentorshipRequestById = async (id) => {
  try {
    const response = await axios.get(`/api/MentorshipRequests/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener solicitud:", error);
    throw error;
  }
};

// 🔹 Crear solicitud de mentoría
export const createMentorshipRequest = async (requestData) => {
  try {
    const response = await axios.post(`/api/MentorshipRequests`, requestData);
    return response.data;
  } catch (error) {
    console.error("Error al crear solicitud:", error);
    throw error;
  }
};

// 🔹 Eliminar solicitud
export const deleteMentorshipRequest = async (id) => {
  try {
    await axios.delete(`/api/MentorshipRequests/${id}`);
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
    throw error;
  }
};

// 🔹 Aplicar a solicitud
export const applyToRequest = async (requestId, applicationData) => {
  try {
    const response = await axios.post(`/api/MentorshipRequests/${requestId}/apply`, applicationData);
    return response.data;
  } catch (error) {
    console.error("Error al aplicar a solicitud:", error);
    throw error;
  }
};

// 🔹 Aceptar aplicación
export const acceptApplication = async (applicationId) => {
  try {
    const response = await axios.post(`/api/MentorshipRequests/applications/${applicationId}/accept`);
    return response.data;
  } catch (error) {
    console.error("Error al aceptar aplicación:", error);
    throw error;
  }
};

// 🔹 Retirar aplicación
export const withdrawApplication = async (applicationId) => {
  try {
    const response = await axios.post(`/api/MentorshipRequests/applications/${applicationId}/withdraw`);
    return response.data;
  } catch (error) {
    console.error("Error al retirar aplicación:", error);
    throw error;
  }
};