import {
  useEffect,
  useState,
} from "react";

import AdminSidebar from "../../components/AdminSidebar";

import { useNavigate } from "react-router-dom";


import {
  getProducts,
} from "../../services/productService";

import {
  getCategories,
} from "../../services/categoryService";

export default function AdminProducts() {

  const navigate = useNavigate();
  

  const [products, setProducts] =
    useState<any[]>([]);

  const [categories, setCategories] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("Todas");

  useEffect(() => {

    loadProducts();

    loadCategories();

  }, []);

  const loadProducts = async () => {

    try {

      const response =
        await getProducts();

      setProducts(
        response.data || response
      );

    } catch (error) {

      console.log(error);
    }
  };

  const loadCategories = async () => {

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

  const filteredProducts =
    products.filter((product: any) => {

      const matchSearch =

        product.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchCategory =

        selectedCategory ===
        "Todas"

          ? true

          : product.categoryId ===
            Number(
              selectedCategory
            );

      return (
        matchSearch &&
        matchCategory
      );
    });

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <AdminSidebar />

      <div className="flex-1 p-6">

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            mb-10
          "
        >

         <div className="flex justify-between items-center">

  <div>

    <h1
      className="
        text-5xl
        font-black
        mb-2
      "
    >
      Productos 📦
    </h1>

    <p
      className="
        text-gray-500
        text-lg
      "
    >
      Productos registrados por los sellers
    </p>

  </div>

  <button
    onClick={() =>
      navigate("/seller/create-product")
    }
    className="
      bg-green-600
      hover:bg-green-700
      text-white
      px-6
      py-3
      rounded-2xl
      font-bold
    "
  >
    ➕ Crear Producto
  </button>

</div>
        </div>

        <div
          className="
            bg-white
            rounded-3xl
            shadow-md
            p-6
            mb-10
            flex
            flex-col
            md:flex-row
            gap-5
          "
        >

          <input
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              flex-1
              border
              rounded-2xl
              p-4
            "
          />

          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(
                e.target.value
              )
            }
            className="
              border
              rounded-2xl
              p-4
              min-w-[250px]
            "
          >

            <option value="Todas">
              Todas las categorías
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

                )
              )
            }

          </select>

        </div>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
          "
        >

          {
            filteredProducts.map(
              (product: any) => (

                <div
                  key={product.id}
                  className="
                    bg-white
                    rounded-3xl
                    shadow-lg
                    overflow-hidden
                  "
                >

                  <img
                    src={
                      product.imageUrl ||
                      "https://via.placeholder.com/300"
                    }
                    alt={product.name}
                    className="
                      w-full
                      h-64
                      object-cover
                    "
                  />

                  <div className="p-6">

                    <h3
                      className="
                        text-xl
                        font-black
                        mb-2
                      "
                    >
                      {product.name}
                    </h3>

                    <p
                      className="
                        text-gray-500
                        mb-3
                      "
                    >
                      {product.description}
                    </p>

                    <p
                      className="
                        text-indigo-600
                        text-2xl
                        font-black
                      "
                    >
                      $
                      {Number(
                        product.price || 0
                      ).toLocaleString()}
                    </p>

         <div className="mt-4">

  <span
    className="
      bg-green-100
      text-green-700
      px-3
      py-1
      rounded-full
      text-sm
    "
  >
    Stock: {product.stock}
  </span>

  <button
    onClick={() =>
      navigate(
        `/seller/edit-product/${product.id}`
      )
    }
    className="
      w-full
      mt-4
      bg-indigo-600
      hover:bg-indigo-700
      text-white
      py-2
      rounded-xl
      font-semibold
    "
  >
    ✏️ Editar Producto
  </button>

</div>

                  </div>

                </div>

              )
            )
          }

        </div>

      </div>

    </div>

  );
}