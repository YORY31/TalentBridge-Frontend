import axios from "axios";


// 🔹 Obtener todas las comunidades
export const getAllCommunities = async () => {
  try {
    const response = await axios.get(`/api/Communities`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener comunidades:", error);
    throw error;
  }
};

// 🔹 Obtener comunidades públicas
export const getPublicCommunities = async () => {
  try {
    const response = await axios.get(`/api/Communities/public`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener comunidades públicas:", error);
    throw error;
  }
};

// 🔹 Obtener comunidades por universidad
export const getCommunitiesByUniversity = async (universityId) => {
  try {
    const response = await axios.get(`/api/Communities/university/${universityId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener comunidades por universidad:", error);
    throw error;
  }
};

// 🔹 Obtener comunidades del usuario
export const getMyCommunities = async () => {
  try {
    const response = await axios.get(`/api/Communities/my-communities`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener mis comunidades:", error);
    throw error;
  }
};

// 🔹 Obtener comunidad por ID
export const getCommunityById = async (id) => {
  try {
    const response = await axios.get(`/api/Communities/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener comunidad:", error);
    throw error;
  }
};

// 🔹 Obtener detalles de comunidad
export const getCommunityDetails = async (id) => {
  try {
    const response = await axios.get(`/api/Communities/${id}/details`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener detalles de comunidad:", error);
    throw error;
  }
};

// 🔹 Crear comunidad
export const createCommunity = async (communityData) => {
  try {
    const response = await axios.post(`/api/Communities`, communityData);
    return response.data;
  } catch (error) {
    console.error("Error al crear comunidad:", error);
    throw error;
  }
};

// 🔹 Actualizar comunidad
export const updateCommunity = async (id, communityData) => {
  try {
    const response = await axios.put(`/api/Communities/${id}`, communityData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar comunidad:", error);
    throw error;
  }
};

// 🔹 Eliminar comunidad
export const deleteCommunity = async (id) => {
  try {
    await axios.delete(`/api/Communities/${id}`);
  } catch (error) {
    console.error("Error al eliminar comunidad:", error);
    throw error;
  }
};

// 🔹 Unirse a comunidad
export const joinCommunity = async (id) => {
  try {
    const response = await axios.post(`/api/Communities/${id}/join`);
    return response.data;
  } catch (error) {
    console.error("Error al unirse a comunidad:", error);
    throw error;
  }
};

// 🔹 Salir de comunidad
export const leaveCommunity = async (id) => {
  try {
    const response = await axios.post(`/api/Communities/${id}/leave`);
    return response.data;
  } catch (error) {
    console.error("Error al salir de comunidad:", error);
    throw error;
  }
};

// 🔹 Obtener miembros de comunidad
export const getCommunityMembers = async (id) => {
  try {
    const response = await axios.get(`/api/Communities/${id}/members`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener miembros:", error);
    throw error;
  }
};

// 🔹 Actualizar rol de miembro
export const updateMemberRole = async (communityId, memberId, role) => {
  try {
    const response = await axios.patch(`/api/Communities/${communityId}/members/role`, {
      memberId,
      role
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar rol:", error);
    throw error;
  }
};

// 🔹 Remover miembro
export const removeMember = async (communityId, memberId) => {
  try {
    await axios.delete(`/api/Communities/${communityId}/members/${memberId}`);
  } catch (error) {
    console.error("Error al remover miembro:", error);
    throw error;
  }
};

// 🔹 POSTS DE COMUNIDAD
export const getCommunityPosts = async (communityId) => {
  try {
    const response = await axios.get(`/api/communities/${communityId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener posts:", error);
    throw error;
  }
};

export const createPost = async (communityId, postData) => {
  try {
    const response = await axios.post(`/api/communities/${communityId}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error("Error al crear post:", error);
    throw error;
  }
};

export const likePost = async (communityId, postId) => {
  try {
    const response = await axios.post(`/api/communities/${communityId}/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error al dar like:", error);
    throw error;
  }
};

export const unlikePost = async (communityId, postId) => {
  try {
    const response = await axios.delete(`/api/communities/${communityId}/posts/${postId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error al remover like:", error);
    throw error;
  }
};

// 🔹 COMENTARIOS
export const getPostComments = async (postId) => {
  try {
    const response = await axios.get(`/api/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener comentarios:", error);
    throw error;
  }
};

export const createComment = async (postId, commentData) => {
  try {
    const response = await axios.post(`/api/posts/${postId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error al crear comentario:", error);
    throw error;
  }
};

export const likeComment = async (postId, commentId) => {
  try {
    const response = await axios.post(`/api/posts/${postId}/comments/${commentId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error al dar like a comentario:", error);
    throw error;
  }
};