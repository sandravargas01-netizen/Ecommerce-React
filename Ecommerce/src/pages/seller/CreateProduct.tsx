import { useState } from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  createProduct
} from "../../services/productService";

export default function CreateProduct() {

  const navigate =
    useNavigate();

  // ============================
  // LOADING
  // ============================

  const [loading, setLoading] =
    useState(false);

  // ============================
  // FORM
  // ============================

  const [product, setProduct] =
    useState<any>({
      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    });

  // ============================
  // CREATE PRODUCT
  // ============================

  const handleCreate =
    async () => {

      try {

        setLoading(true);

        const body = {

          categoryId: 1,

          name:
            product.name,

          description:
            product.description,

          price: Number(
            product.price
          ),

          stock: Number(
            product.stock
          ),

          imageUrl:
            product.imageUrl,

          brand: "Nike",

          model: "2026",

          color: "Negro",

          weight: 1,
        };

        console.log(
          "PRODUCT:",
          body
        );

        await createProduct(body);

// =====================================
// SAVE LOCAL PRODUCTS
// =====================================

const savedProducts =
  localStorage.getItem(
    "products"
  );

const products =
  savedProducts
    ? JSON.parse(savedProducts)
    : [];

const newProduct = {
  id: Date.now(),
  ...body,
  image: body.imageUrl,
};

products.push(newProduct);

localStorage.setItem(
  "products",
  JSON.stringify(products)
);

alert(
  "✅ Producto creado correctamente"
);

// REDIRECT

navigate("/seller/inventory");
        

      } catch (error) {

        console.error(error);

        alert(
          "❌ Error creando producto"
        );

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      min-h-screen
      bg-gray-100
      p-8
    ">

      {/* HEADER */}

      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="
            bg-gray-800
            hover:bg-gray-900
            text-white
            px-6
            py-3
            rounded-2xl
            font-bold
            shadow-md
          "
        >
          ← Volver
        </button>

        <h1 className="
          text-5xl
          font-black
        ">
          Crear Producto 🛍️
        </h1>

      </div>


      {/* FORM */}

      <div className="
        bg-white
        rounded-3xl
        shadow-lg
        p-8
        max-w-5xl
        mx-auto
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
        ">

          {/* NAME */}

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
              border
              rounded-2xl
              p-4
            "
          />

          {/* DESCRIPTION */}

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
              border
              rounded-2xl
              p-4
            "
          />

          {/* PRICE */}

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
              border
              rounded-2xl
              p-4
            "
          />

          {/* STOCK */}

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
              border
              rounded-2xl
              p-4
            "
          />

          {/* IMAGE */}

          <input
            type="text"
            placeholder="URL imagen"
            value={product.imageUrl}
            onChange={(e) =>
              setProduct({
                ...product,
                imageUrl:
                  e.target.value,
              })
            }
            className="
              border
              rounded-2xl
              p-4
              md:col-span-2
            "
          />

        </div>

        {/* BUTTON */}

        <button
          onClick={handleCreate}
          disabled={loading}
          className="
            mt-8
            bg-indigo-600
            hover:bg-indigo-700
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
              ? "Creando..."
              : "Guardar producto"
          }
        </button>

      </div>

    </div>
  );
}