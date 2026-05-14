export const API_CONFIG = {
  BASE_URL: "https://scrappy-dish-be.onrender.com",
  TIMEOUT: 10000,
  RETRY_COUNT: 3,
};

export const API_HEADER_CONFIG = {
  CONTENT_TYPE: "application/json",
  AUTHORIZATION: "Bearer",
};

export const API_ENDPOINTS = {
  AUTH_GOOGLE: "/auth/google",
  VERIFY_ME: "/auth/me",

  LOGOUT: "/logout",
  LOGOUT_ALL: "/logout-all",

  USER: "/user",

  SUGGEST_SINGLE: "/recipes/suggest-single",
  SUGGEST_MULTIPLE: "/recipes/suggest-multiple",

  RECIPE_SAVE: "/recipes/save",
  RECIPE: (id: number) => `/recipes/${id}`,
  RECIPES: (page: number, per_page: number) =>
    `/recipes?page=${page}&per_page=${per_page}`,
};
