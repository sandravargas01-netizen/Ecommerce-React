import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { CartProvider } from "./context/CartContext";
import AdminProducts from "./pages/admin/AdminProducts";

// ===============================
// AUTH
// ===============================

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";


// ===============================
// AUTH PAGES
// ===============================

import Login from "./pages/Login";

import Register from "./pages/Register";


// ===============================
// ADMIN
// ===============================

import AdminProfile from "./pages/admin/AdminProfile";

import Statistics from "./pages/admin/Statistics";

import CreateUsersAdmin from "./pages/admin/CreateUsersAdmin";


// ===============================
// BUYER
// ===============================

import BuyerProfile from "./pages/buyer/BuyerProfile";


import Products from "./pages/buyer/Products";

import Cart from "./pages/buyer/Cart";

import Checkout from "./pages/buyer/Checkout";

import Payment from "./pages/buyer/Payment";

import Orders from "./pages/buyer/Orders";


// ===============================
// SELLER
// ===============================

import SellerProfile from "./pages/seller/SellerProfile";

import CreateProduct from "./pages/seller/CreateProduct";

import EditProduct from "./pages/seller/EditProduct";

import Inventory from "./pages/seller/Inventory";

import OrderSeller from "./pages/seller/OrderSeller";

import CustomerSupport from "./pages/seller/CustomerSupport";



function App() {

 return (

  <AuthProvider>

    <CartProvider>

      <BrowserRouter>

        <Routes>

          {/* ===============================
              PUBLIC
          =============================== */}

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* ===============================
              ADMIN
          =============================== */}

          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute role="ADMIN">

                <AdminProfile />

              </ProtectedRoute>
            }
          />

          

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="ADMIN">

                <CreateUsersAdmin />

              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/statistics"
            element={
              <ProtectedRoute role="ADMIN">

                <Statistics />

              </ProtectedRoute>
            }
          />
          <Route
  path="/admin/products"
  element={
    <ProtectedRoute role="ADMIN">

      <Products />

    </ProtectedRoute>



  }
/>

          {/* ===============================
              SELLER
          =============================== */}

          <Route
            path="/seller-profile"
            element={
              <ProtectedRoute role="SELLER">

                <SellerProfile />

              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/create-product"
            element={
              <ProtectedRoute role="SELLER">

                <CreateProduct />

              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/edit-product/:id"
            element={
              <ProtectedRoute role="SELLER">

                <EditProduct />

              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/inventory"
            element={
              <ProtectedRoute role="SELLER">

                <Inventory />

              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/orders"
            element={
              <ProtectedRoute role="SELLER">

                <OrderSeller />

              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/support"
            element={
              <ProtectedRoute role="SELLER">

                <CustomerSupport />

              </ProtectedRoute>
            }
          />


          {/* ===============================
              BUYER
          =============================== */}

          <Route
            path="/buyer-profile"
            element={
              <ProtectedRoute role="BUYER">

                <BuyerProfile />

              </ProtectedRoute>
            }
          />

          <Route
         
  path="/buyer/products"
  element={
    <ProtectedRoute role="BUYER">

      <Products />

    </ProtectedRoute>
  }
/>

          <Route
            path="/buyer/cart"
            element={
              <ProtectedRoute role="BUYER">

                <Cart />

              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/checkout"
            element={
              <ProtectedRoute role="BUYER">

                <Checkout />

              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/payment"
            element={
              <ProtectedRoute role="BUYER">

                <Payment />

              </ProtectedRoute>
            }
          />

          <Route
            path="/buyer/orders"
            element={
              <ProtectedRoute role="BUYER">

                <Orders />

              </ProtectedRoute>
            }
          />

               </Routes>

      </BrowserRouter>

    </CartProvider>

  </AuthProvider>
  );
}

export default App;