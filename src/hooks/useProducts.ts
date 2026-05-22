import { useEffect, useState } from "react";

import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";


// ===============================
// HOOK
// ===============================

export function useProducts() {

  // ===============================
  // STATES
  // ===============================

  const [products, setProducts] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(
    null
  );


  // ===============================
  // GET PRODUCTS
  // ===============================

  const fetchProducts = async () => {

    try {

      setLoading(true);

      const data = await getProducts();

      console.log("PRODUCTS:", data);

      setProducts(data);

    } catch (err: any) {

      console.error(err);

      setError(err.message);

    } finally {

      setLoading(false);
    }
  };


  // ===============================
  // CREATE PRODUCT
  // ===============================

  const addProduct = async (product: any) => {

    try {

      const newProduct = await createProduct(
        product
      );

      setProducts((prev) => [
        ...prev,
        newProduct,
      ]);

    } catch (err: any) {

      setError(err.message);
    }
  };


  // ===============================
  // DELETE PRODUCT
  // ===============================

  const removeProduct = async (
    id: string
  ) => {

    try {

      await deleteProduct(id);

      setProducts((prev) =>
        prev.filter((p) => p.id !== id)
      );

    } catch (err: any) {

      setError(err.message);
    }
  };


  // ===============================
  // UPDATE PRODUCT
  // ===============================

  const editProduct = async (
    id: string,
    data: any
  ) => {

    try {

      const updated = await updateProduct(
        id,
        data
      );

      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? updated : p
        )
      );

    } catch (err: any) {

      setError(err.message);
    }
  };


  // ===============================
  // EFFECT
  // ===============================

  useEffect(() => {

    fetchProducts();

  }, []);


  return {

    products,

    loading,

    error,

    fetchProducts,

    addProduct,

    removeProduct,

    editProduct,
  };
}
