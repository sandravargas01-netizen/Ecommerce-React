import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { useCart } from "../../context/CartContext";

import { createOrder } from "../../services/orderService";

import { useAuth } from "../../context/AuthContext";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setError(null);
    if (!user) return navigate('/login');
    if (items.length === 0) return setError('El carrito está vacío');
    setLoading(true);
    try {
      const payload = {
        items: items.map(i => ({ productId: Number(i.id), quantity: i.quantity })),
        shippingAddressId: null,
      };
      await createOrder(payload);
      clearCart();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Error al crear la orden');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        {error && <div className="error-text">{error}</div>}
        <div className="bg-white p-4 rounded shadow">
          <div className="mb-4">Resumen de la orden: {items.length} artículos</div>
          <button className="btn-primary" onClick={handlePlaceOrder} disabled={loading}>{loading ? 'Procesando...' : 'Realizar pedido'}</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;

