import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartDrawer: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { items, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="bg-black/40 flex-1" onClick={onClose} />
      <div className="w-96 bg-white p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Carrito</h2>
          <button className="text-sm text-gray-500" onClick={onClose}>Cerrar</button>
        </div>
        <div className="space-y-3">
          {items.length === 0 && <div className="text-sm text-gray-500">Carrito vacío</div>}
          {items.map((it) => (
            <div key={it.id} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{it.name}</div>
                <div className="text-sm text-gray-500">{it.quantity} x ${it.price}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-red-500" onClick={() => removeItem(it.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between font-semibold">Total <span>${total}</span></div>
          <div className="mt-3 flex gap-2">
            <button
              className="flex-1 bg-indigo-600 text-white py-2 rounded"
              onClick={() => {
                onClose();
                navigate('/buyer/cart');
              }}
            >
              Ir al carrito
            </button>
            <button className="px-3 py-2 border rounded" onClick={clearCart}>Vaciar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
