import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Carrito</h1>
        {items.length === 0 ? (
          <div className="text-gray-600">Tu carrito está vacío.</div>
        ) : (
          <div className="space-y-4">
            {items.map((it) => (
              <div key={it.id} className="flex items-center justify-between border p-3 rounded">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-gray-500">{it.quantity} x ${it.price}</div>
                </div>
                <div className="flex gap-2">
                  <button className="text-red-500" onClick={() => removeItem(it.id)}>Eliminar</button>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between font-semibold">Total <span>${total}</span></div>
            <div className="flex gap-2">
              <button className="btn-primary" onClick={() => navigate('/checkout')}>Proceder al pago</button>
              <button className="px-3 py-2 border rounded" onClick={clearCart}>Vaciar</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;

