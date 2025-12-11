import axios from "axios";

// 🔹 Obtener mentorías del usuario
export const getUserMentorships = async () => {
  try {
    const response = await axios.get(`/api/Mentorships/my-mentorships`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mentorías:", error);
    throw error;
  }
};

// 🔹 Obtener mentoría por ID
export const getMentorshipById = async (id) => {
  try {
    const response = await axios.get(`/api/Mentorships/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mentoría:", error);
    throw error;
  }
};

// 🔹 Obtener detalles de mentoría
export const getMentorshipDetails = async (id) => {
  try {
    const response = await axios.get(`/api/Mentorships/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de mentoría:", error);
    throw error;
  }
};

// 🔹 Crear mentoría
export const createMentorship = async (mentorshipData) => {
  try {
    const response = await axios.post(`/api/Mentorships`, mentorshipData);
    return response.data;
  } catch (error) {
    console.error("Error al crear mentoría:", error);
    throw error;
  }
};

// 🔹 Actualizar mentoría
export const updateMentorship = async (id, mentorshipData) => {
  try {
    const response = await axios.put(`/api/Mentorships/${id}`, mentorshipData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar mentoría:", error);
    throw error;
  }
};

// 🔹 Completar mentoría
export const completeMentorship = async (id) => {
  try {
    const response = await axios.post(`/api/Mentorships/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error("Error al completar mentoría:", error);
    throw error;
  }
};

// 🔹 Cancelar mentoría
export const cancelMentorship = async (id, reason) => {
  try {
    const response = await axios.post(`/api/Mentorships/${id}/cancel`, { reason });
    return response.data;
  } catch (error) {
    console.error("Error al cancelar mentoría:", error);
    throw error;
  }
};

// 🔹 SESIONES DE MENTORÍA
export const getMentorshipSessions = async (mentorshipId) => {
  try {
    const response = await axios.get(`/api/mentorships/${mentorshipId}/sessions`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener sesiones:", error);
    throw error;
  }
};

export const createSession = async (mentorshipId, sessionData) => {
  try {
    const response = await axios.post(`/api/mentorships/${mentorshipId}/sessions`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error al crear sesión:", error);
    throw error;
  }
};

export const updateSession = async (mentorshipId, sessionId, sessionData) => {
  try {
    const response = await axios.put(`/api/mentorships/${mentorshipId}/sessions/${sessionId}`, sessionData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar sesión:", error);
    throw error;
  }
};

export const deleteSession = async (mentorshipId, sessionId) => {
  try {
    await axios.delete(`/api/mentorships/${mentorshipId}/sessions/${sessionId}`);
  } catch (error) {
    console.error("Error al eliminar sesión:", error);
    throw error;
  }
};

export const startSession = async (mentorshipId, sessionId) => {
  try {
    const response = await axios.post(`/api/mentorships/${mentorshipId}/sessions/${sessionId}/start`);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export const endSession = async (mentorshipId, sessionId) => {
  try {
    const response = await axios.post(`/api/mentorships/${mentorshipId}/sessions/${sessionId}/end`);
    return response.data;
  } catch (error) {
    console.error("Error al finalizar sesión:", error);
    throw error;
  }
};

// 🔹 MILESTONES
export const getMentorshipMilestones = async (mentorshipId) => {
  try {
    const response = await axios.get(`/api/mentorships/${mentorshipId}/milestones`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener milestones:", error);
    throw error;
  }
};

export const createMilestone = async (mentorshipId, milestoneData) => {
  try {
    const response = await axios.post(`/api/mentorships/${mentorshipId}/milestones`, milestoneData);
    return response.data;
  } catch (error) {
    console.error("Error al crear milestone:", error);
    throw error;
  }
};

export const completeMilestone = async (mentorshipId, milestoneId, evidence) => {
  try {
    const response = await axios.post(`/api/mentorships/${mentorshipId}/milestones/${milestoneId}/complete`, 
      evidence ? { evidence } : {});
    return response.data;
  } catch (error) {
    console.error("Error al completar milestone:", error);
    throw error;
  }
};