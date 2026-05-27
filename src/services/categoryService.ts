import api from "./api";


// ===============================
// GET CATEGORIES
// ===============================

export const getCategories = async () => {

  const response = await api.get(
    "/categories"
  );

  return response.data;
};