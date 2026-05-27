import api from "./api";


// ===============================
// GET ALL PRODUCTS
// ===============================

export const getProducts = async () => {

  const response = await api.get(
    "/products"
  );

  return response.data;
};


// ===============================
// GET PRODUCT BY ID
// ===============================

export const getProduct = async (
  id: string
) => {

  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
};


// ===============================
// CREATE PRODUCT
// ===============================

export const createProduct = async (
  product: any
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.post(
    "/products",
    product,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = async (
  id: string,
  data: any
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.put(
    `/products/${id}`,
    data,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = async (
  id: string
) => {

  const token =
    localStorage.getItem("token");

  const response = await api.delete(
    `/products/${id}`,
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ===============================
// SEARCH PRODUCTS
// ===============================

export const searchProducts = async (
  search: string
) => {

  const response = await api.get(
    `/products/search?name=${search}`
  );

  return response.data;
};


// ===============================
// PRODUCTS BY CATEGORY
// ===============================

export const getProductsByCategory = async (
  categoryId: string
) => {

  const response = await api.get(
    `/products/category/${categoryId}`
  );

  return response.data;
};