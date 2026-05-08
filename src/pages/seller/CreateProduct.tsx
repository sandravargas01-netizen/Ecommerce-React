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
      category: "Damas",
      size: "M",
      gender: "Mujer",
      price: "",
      stock: "",
      imageUrl: "",
    });

  // ============================
  // CREATE PRODUCT
  // ============================

  const handleCreate =
    async () => {

      try {

        setLoading(true);

        // ============================
        // CATEGORY IMAGES
        // ============================

        const images: any = {

          Damas:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b",

          Caballeros:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",

          Niños:
            "https://images.unsplash.com/photo-1519238359922-989348752efb",

          Zapatos:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

          Accesorios:
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
        };

        // ============================
        // BODY
        // ============================

        const body = {

          categoryId: 1,

          name:
            product.name,

          description:
            product.description,

          category:
            product.category,

          size:
            product.size,

          gender:
            product.gender,

          price: Number(
            product.price
          ),

          stock: Number(
            product.stock
          ),

          imageUrl:
            images[
              product.category
            ],

          brand:
            "Bodegón Virtual",

          model:
            "2026",

          color:
            "Negro",

          weight: 1,
        };

        console.log(
          "PRODUCT:",
          body
        );

        // ============================
        // API
        // ============================

        await createProduct(body);

        // ============================
        // LOCAL STORAGE
        // ============================

        const savedProducts =
          localStorage.getItem(
            "products"
          );

        const products =
          savedProducts
            ? JSON.parse(
                savedProducts
              )
            : [];

        const newProduct = {
          id: Date.now(),
          ...body,
          image:
            body.imageUrl,
        };

        products.push(
          newProduct
        );

        localStorage.setItem(
          "products",
          JSON.stringify(
            products
          )
        );

        alert(
          "✅ Producto creado correctamente"
        );

        // ============================
        // REDIRECT
        // ============================

        navigate(
          "/seller/inventory"
        );

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

          {/* CATEGORY */}

          <select
            value={product.category}
            onChange={(e) =>
              setProduct({
                ...product,
                category:
                  e.target.value,
              })
            }
            className="
              border
              rounded-2xl
              p-4
            "
          >

            <option value="Damas">
              👩 Damas
            </option>

            <option value="Caballeros">
              👨 Caballeros
            </option>

            <option value="Niños">
              👦 Niños
            </option>

            <option value="Zapatos">
              👟 Zapatos
            </option>

            <option value="Accesorios">
              👜 Accesorios
            </option>

          </select>

          {/* SIZE */}

          <select
            value={product.size}
            onChange={(e) =>
              setProduct({
                ...product,
                size:
                  e.target.value,
              })
            }
            className="
              border
              rounded-2xl
              p-4
            "
          >

            <option value="XS">
              XS
            </option>

            <option value="S">
              S
            </option>

            <option value="M">
              M
            </option>

            <option value="L">
              L
            </option>

            <option value="XL">
              XL
            </option>

          </select>

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