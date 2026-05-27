import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";

import {
  createProduct
} from "../../services/productService";

import {
  getCategories
} from "../../services/categoryService";

export default function CreateProduct() {

  const navigate =
    useNavigate();

  // =====================================
  // LOADING
  // =====================================

  const [loading, setLoading] =
    useState(false);

  // =====================================
  // CATEGORIES
  // =====================================

  const [categories, setCategories] =
    useState<any[]>([]);

  // =====================================
  // PRODUCT FORM
  // =====================================

  const [product, setProduct] =
    useState({
      name: "",
      description: "",
      categoryId: "",
      price: "",
      stock: "",
    });

  // =====================================
  // LOAD CATEGORIES
  // =====================================

  useEffect(() => {

    loadCategories();

  }, []);

  const loadCategories =
    async () => {

      try {

        const response =
          await getCategories();

        setCategories(
          response.data || response
        );

      } catch (error) {

        console.log(error);
      }
    };

  // =====================================
  // HANDLE CREATE PRODUCT
  // =====================================

  const handleCreate =
    async () => {

      // VALIDATION

      if (
        !product.name ||
        !product.description ||
        !product.categoryId ||
        !product.price ||
        !product.stock
      ) {

        alert(
          "⚠️ Completa todos los campos"
        );

        return;
      }

      try {

        setLoading(true);

        const body = {

          categoryId:
            Number(
              product.categoryId
            ),

          name:
            product.name,

          description:
            product.description,

          price:
            Number(
              product.price
            ),

          stock:
            Number(
              product.stock
            ),

          imageUrl:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",

          brand:
            "Bodegón Virtual",

          model:
            "2026",

          color:
            "Negro",

          weight:
            1,
        };

        console.log(body);

        await createProduct(body);

        alert(
          "✅ Producto creado correctamente"
        );

        navigate(
          "/seller/inventory"
        );

      } catch (error) {

        console.log(error);

        alert(
          "❌ Error al crear producto"
        );

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

      {/* SIDEBAR */}

      <SellerSidebar
        activeSection="products"
      />

      {/* CONTENT */}

      <div className="
        flex-1
        p-8
      ">

        {/* HEADER */}

        <div className="
          mb-10
        ">

          <h1 className="
            text-5xl
            font-black
            text-gray-900
            mb-2
          ">
            Crear Producto 🛍️
          </h1>

          <p className="
            text-gray-500
            text-lg
          ">
            Agrega nuevos productos
            a tu tienda.
          </p>

        </div>

        {/* FORM */}

        <div className="
          bg-white
          rounded-3xl
          shadow-lg
          p-8
          max-w-5xl
        ">

          <div className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-6
          ">

            {/* NAME */}

            <div>

              <label className="
                font-semibold
                block
                mb-2
              ">
                Nombre
              </label>

              <input
                type="text"
                placeholder="Nombre producto"
                value={product.name}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    name:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  outline-none
                  focus:ring-4
                  focus:ring-indigo-200
                "
              />

            </div>

            {/* DESCRIPTION */}

            <div>

              <label className="
                font-semibold
                block
                mb-2
              ">
                Descripción
              </label>

              <input
                type="text"
                placeholder="Descripción"
                value={product.description}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    description:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  outline-none
                  focus:ring-4
                  focus:ring-indigo-200
                "
              />

            </div>

            {/* CATEGORY */}

            <div>

              <label className="
                font-semibold
                block
                mb-2
              ">
                Categoría
              </label>

              <select
                value={product.categoryId}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    categoryId:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  outline-none
                  focus:ring-4
                  focus:ring-indigo-200
                "
              >

                <option value="">
                  Seleccionar categoría
                </option>

                {
                  categories.map(
                    (category: any) => (

                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>

                  ))
                }

              </select>

            </div>

            {/* PRICE */}

            <div>

              <label className="
                font-semibold
                block
                mb-2
              ">
                Precio
              </label>

              <input
                type="number"
                placeholder="Precio"
                value={product.price}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    price:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  outline-none
                  focus:ring-4
                  focus:ring-indigo-200
                "
              />

            </div>

            {/* STOCK */}

            <div>

              <label className="
                font-semibold
                block
                mb-2
              ">
                Stock
              </label>

              <input
                type="number"
                placeholder="Stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    stock:
                      e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  rounded-2xl
                  p-4
                  outline-none
                  focus:ring-4
                  focus:ring-indigo-200
                "
              />

            </div>

          </div>

          {/* BUTTON */}

          <div className="
            mt-10
          ">

            <button
              onClick={handleCreate}
              disabled={loading}
              className="
                bg-indigo-600
                hover:bg-indigo-700
                disabled:bg-gray-400
                text-white
                px-8
                py-4
                rounded-2xl
                font-bold
                shadow-lg
                transition
              "
            >

              {
                loading
                  ? "Creando producto..."
                  : "➕ Guardar producto"
              }

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}