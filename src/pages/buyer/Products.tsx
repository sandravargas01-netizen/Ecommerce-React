import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../../components/Navbar";

import mockProducts from "../../moks/mockProducts";

export default function Products() {

  // =====================================
  // NAVIGATE
  // =====================================

  const navigate =
    useNavigate();

  // =====================================
  // STATE
  // =====================================

  const [products, setProducts] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("Todas");

  // =====================================
  // LOAD PRODUCTS
  // =====================================

  useEffect(() => {

    // ============================
    // LOCAL PRODUCTS
    // ============================

    const localProducts =
      localStorage.getItem(
        "products"
      );

    const savedProducts =
      localProducts
        ? JSON.parse(localProducts)
        : [];

    // ============================
    // COMBINE PRODUCTS
    // ============================

    setProducts([
      ...mockProducts,
      ...savedProducts,
    ]);

  }, []);

  // =====================================
  // CATEGORIES
  // =====================================

  const categories = [
    "Damas",
    "Caballeros",
    "Niños",
    "Zapatos",
    "Accesorios",
  ];

  return (

    <>
      <Navbar />

      <div className="
        min-h-screen
        bg-gray-100
        p-6
      ">

        {/* =====================================
            BACK BUTTON
        ===================================== */}

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
            transition
            mb-8
          "
        >
          ← Volver
        </button>

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          mb-10
        ">

          <h1 className="
            text-5xl
            font-black
            mb-2
          ">
            Productos 🛍️
          </h1>

          <p className="
            text-gray-500
            text-lg
          ">
            Catálogo Bodegón Virtual
          </p>

        </div>

        {/* =====================================
            FILTERS
        ===================================== */}

        <div className="
          bg-white
          rounded-3xl
          shadow-md
          p-6
          mb-10
          flex
          flex-col
          md:flex-row
          gap-5
        ">

          {/* SEARCH */}

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
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />

          {/* CATEGORY */}

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

        </div>

        {/* =====================================
            CATEGORIES
        ===================================== */}

        {
          categories.map(
            (category) => {

              const filteredProducts =
                products.filter(
                  (product) => {

                    const matchCategory =

                      selectedCategory ===
                      "Todas"

                        ? product.category ===
                          category

                        : product.category ===
                          selectedCategory &&
                          product.category ===
                          category;

                    const matchSearch =

                      product.name
                        .toLowerCase()
                        .includes(
                          search.toLowerCase()
                        );

                    return (
                      matchCategory &&
                      matchSearch
                    );
                  }
                );

              // ============================
              // HIDE EMPTY CATEGORY
              // ============================

              if (
                filteredProducts.length === 0
              ) {
                return null;
              }

              return (

                <div
                  key={category}
                  className="mb-16"
                >

                  {/* =====================================
                      CATEGORY TITLE
                  ===================================== */}

                  <div className="
                    flex
                    items-center
                    gap-4
                    mb-8
                  ">

                    <h2 className="
                      text-4xl
                      font-black
                      text-gray-900
                    ">

                      {
                        category === "Damas"
                          ? "👩 Ropa para Damas"

                        : category === "Caballeros"
                          ? "👨 Ropa para Caballeros"

                        : category === "Niños"
                          ? "👦 Ropa para Niños"

                        : category === "Zapatos"
                          ? "👟 Zapatos"

                        : "👜 Accesorios"
                      }

                    </h2>

                  </div>

                  {/* =====================================
                      PRODUCTS GRID
                  ===================================== */}

                  <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-8
                  ">

                    {
                      filteredProducts.map(
                        (product) => (

                          <div
                            key={product.id}
                            className="
                              bg-white
                              rounded-3xl
                              shadow-lg
                              overflow-hidden
                              hover:scale-105
                              transition
                              duration-300
                            "
                          >

                            {/* IMAGE */}

                            <img
                              src={
                                product.imageUrl
                              }
                              alt={
                                product.name
                              }
                              className="
                                w-full
                                h-72
                                object-cover
                              "
                            />

                            {/* CONTENT */}

                            <div className="
                              p-6
                            ">

                              {/* BRAND */}

                              <span className="
                                bg-indigo-100
                                text-indigo-700
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                              ">
                                {
                                  product.brand
                                }
                              </span>

                              {/* NAME */}

                              <h3 className="
                                text-3xl
                                font-black
                                mt-5
                                mb-2
                              ">
                                {
                                  product.name
                                }
                              </h3>

                              {/* DESCRIPTION */}

                              <p className="
                                text-gray-500
                                mb-4
                              ">
                                {
                                  product.description
                                }
                              </p>

                              {/* SIZE */}

                              <div className="
                                flex
                                items-center
                                gap-2
                                mb-4
                                flex-wrap
                              ">

                                <span className="
                                  bg-gray-200
                                  px-3
                                  py-1
                                  rounded-full
                                  text-sm
                                  font-semibold
                                ">
                                  Talla:
                                  {" "}
                                  {
                                    product.size
                                  }
                                </span>

                              </div>

                              {/* PRICE */}

                              <h2 className="
                                text-4xl
                                font-black
                                text-indigo-600
                                mb-4
                              ">
                                $
                                {
                                  product.price
                                }
                              </h2>

                              {/* STOCK */}

                              <p className="
                                text-gray-600
                                mb-6
                              ">
                                Stock:
                                {" "}
                                {
                                  product.stock
                                }
                              </p>

                              {/* BUTTON */}

                              <button
                                className="
                                  w-full
                                  bg-green-600
                                  hover:bg-green-700
                                  text-white
                                  py-4
                                  rounded-2xl
                                  font-bold
                                  shadow-md
                                  transition
                                "
                              >
                                🛒 Agregar al carrito
                              </button>

                            </div>

                          </div>
                        )
                      )
                    }

                  </div>

                </div>
              );
            }
          )
        }

      </div>
    </>
  );
}