import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";

import {
  getProduct,
  updateProduct,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    stock: "",
    imageUrl: "",
    brand: "",
    model: "",
    color: "",
    weight: "",
  });

  useEffect(() => {
    if (!id) return;

    loadProduct();
    loadCategories();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await getProduct(id!);

      setProduct({
        name: response.name || "",
        description: response.description || "",
        categoryId: String(
          response.categoryId || response.category?.id || ""
        ),
        price: String(response.price || ""),
        stock: String(response.stock || ""),
        imageUrl: response.imageUrl || "",
        brand: response.brand || "",
        model: response.model || "",
        color: response.color || "",
        weight: String(response.weight || ""),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data || response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    if (
      !product.name ||
      !product.description ||
      !product.categoryId ||
      !product.price ||
      !product.stock
    ) {
      alert("⚠️ Completa todos los campos");
      return;
    }

    try {
      setLoading(true);

      const body = {
        categoryId: Number(product.categoryId),
        name: product.name,
        description: product.description,
        price: Number(product.price),
        stock: Number(product.stock),
        imageUrl:
          product.imageUrl ||
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        brand: product.brand || "Bodegón Virtual",
        model: product.model || "2026",
        color: product.color || "Negro",
        weight: Number(product.weight) || 1,
      };

      await updateProduct(id!, body);

      alert("✅ Producto actualizado correctamente");
      navigate("/seller/inventory");
    } catch (error) {
      console.log(error);
      alert("❌ Error al actualizar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      flex
      min-h-screen
      bg-gray-100
    ">
      <SellerSidebar activeSection="products" />

      <div className="flex-1 p-8">
        <div className="mb-10">
          <h1 className="text-5xl font-black text-gray-900 mb-2">
            Editar Producto 🛠️
          </h1>
          <p className="text-gray-500 text-lg">
            Ajusta el stock y los detalles del producto.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="font-semibold block mb-2">Nombre</label>
              <input
                type="text"
                placeholder="Nombre producto"
                value={product.name}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Descripción</label>
              <input
                type="text"
                placeholder="Descripción"
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Categoría</label>
              <select
                value={product.categoryId}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    categoryId: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-200"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold block mb-2">Precio</label>
              <input
                type="number"
                placeholder="Precio"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-200"
              />
            </div>

            <div>
              <label className="font-semibold block mb-2">Imagen (URL)</label>
              <input
                type="text"
                placeholder="URL de imagen"
                value={product.imageUrl}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    imageUrl: e.target.value,
                  })
                }
                className="w-full border rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-200"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <button
              onClick={() => navigate("/seller/inventory")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-4 rounded-2xl font-bold transition"
            >
              ← Volver
            </button>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg transition disabled:opacity-50"
            >
              {loading ? "Actualizando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
