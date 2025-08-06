const BASE_URL = "http://localhost:8080/api";

export const API_URL = {
  USERS: `${BASE_URL}/usuarios`,
  REGISTER_USER: `${BASE_URL}/usuarios/registro`,
  LOGIN_USER: `${BASE_URL}/usuarios/login`,
  USER_PROFILE: (id: any) => `${BASE_URL}/usuarios/${id}`,
  UPDATE_USER: (id: any) => `${BASE_URL}/usuarios/${id}`,
  DELETE_USER: (id: any) => `${BASE_URL}/usuarios/${id}`,
  PRODUCTS: `${BASE_URL}/productos`,
  PRODUCT_DETAILS: (id: any) => `${BASE_URL}/productos/${id}`,
  CREATE_PRODUCT: `${BASE_URL}/productos`,
  UPDATE_PRODUCT: (id: any) => `${BASE_URL}/productos/${id}`,
};