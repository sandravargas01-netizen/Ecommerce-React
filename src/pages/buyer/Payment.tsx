import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../services/orderService";
import { useAuth } from "../../context/AuthContext";
import { CreditCard, Lock } from "lucide-react";

const Payment = () => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const shippingData = location.state?.shippingData;

  // =====================================
  // STATES
  // =====================================

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<"form" | "processing" | "success">("form");

  const [cardForm, setCardForm] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // =====================================
  // TOTAL
  // =====================================

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =====================================
  // FORMAT CARD NUMBER
  // =====================================

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  // =====================================
  // FORMAT EXPIRY
  // =====================================

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{2})/, "$1/$2")
      .slice(0, 5);
  };

  // =====================================
  // PROCESS PAYMENT
  // =====================================

  const handleProcessPayment = async () => {
    setError(null);

    // Validate card form
    if (!cardForm.cardNumber || !cardForm.cardName || !cardForm.expiryDate || !cardForm.cvv) {
      setError("Completa todos los datos de la tarjeta");
      return;
    }

    if (cardForm.cardNumber.replace(/\s/g, "").length !== 16) {
      setError("El número de tarjeta debe tener 16 dígitos");
      return;
    }

    if (cardForm.cvv.length !== 3) {
      setError("El CVV debe tener 3 dígitos");
      return;
    }

    try {
      setLoading(true);
      setPaymentStep("processing");

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!user) {
        return navigate("/login");
      }

      if (items.length === 0) {
        setError("El carrito está vacío");
        setPaymentStep("form");
        return;
      }

     let shippingAddressId = shippingData?.shippingAddressId;

if (!shippingAddressId) {
  shippingAddressId = 1;
}

      // Create order
      const itemsPayload = items.map((item) => ({
        productId: Number(item.id),
        quantity: item.quantity,
      }));

     await createOrder(
  itemsPayload,
  shippingAddressId
);

      clearCart();
      setPaymentStep("success");

      // Redirect after 2 seconds
      setTimeout(() => {
       navigate("/buyer/orders");
      }, 2000);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
        err.message ||
        "Error al procesar el pago"
      );
      setPaymentStep("form");
    } finally {
      setLoading(false);
    }
  };

  if (!shippingData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
            <p className="text-gray-500">Datos de envío no encontrados</p>
            <button
              onClick={() => navigate("/buyer/checkout")}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-2xl hover:bg-indigo-700"
            >
              Volver al Checkout
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-black mb-2">Pago 💳</h1>
          <p className="text-gray-500 text-lg">
            Completa tu pago de forma segura
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* PAYMENT FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
            {paymentStep === "form" && (
              <>
                <h2 className="text-3xl font-black mb-8">Datos de Tarjeta 🔒</h2>

                {error && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-2xl mb-6">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  {/* CARD NUMBER */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Número de Tarjeta
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-4 text-gray-400" size={20} />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardForm.cardNumber}
                        onChange={(e) =>
                          setCardForm({
                            ...cardForm,
                            cardNumber: formatCardNumber(e.target.value),
                          })
                        }
                        maxLength={19}
                        className="w-full border rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                  </div>

                  {/* CARD NAME */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Titular de la Tarjeta
                    </label>
                    <input
                      type="text"
                      placeholder="JUAN PEREZ"
                      value={cardForm.cardName}
                      onChange={(e) =>
                        setCardForm({
                          ...cardForm,
                          cardName: e.target.value.toUpperCase(),
                        })
                      }
                      className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* EXPIRY */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardForm.expiryDate}
                        onChange={(e) =>
                          setCardForm({
                            ...cardForm,
                            expiryDate: formatExpiry(e.target.value),
                          })
                        }
                        maxLength={5}
                        className="w-full border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>

                    {/* CVV */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        CVV
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                        <input
                          type="text"
                          placeholder="123"
                          value={cardForm.cvv}
                          onChange={(e) =>
                            setCardForm({
                              ...cardForm,
                              cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                            })
                          }
                          maxLength={3}
                          className="w-full border rounded-2xl p-4 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleProcessPayment}
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:bg-gray-400 mt-8"
                  >
                    {loading ? "Procesando..." : "Confirmar Pago"}
                  </button>
                </div>
              </>
            )}

            {paymentStep === "processing" && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mb-4"></div>
                <h3 className="text-2xl font-bold">Procesando pago...</h3>
                <p className="text-gray-500 mt-2">Por favor, no cierres esta página</p>
              </div>
            )}

            {paymentStep === "success" && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-3xl font-black mb-2">¡Pago Exitoso!</h3>
                <p className="text-gray-500 mb-4">Tu orden ha sido confirmada</p>
                <p className="text-sm text-gray-400">Redirigiendo a tu perfil...</p>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-3xl shadow-lg p-8 h-fit">
            <h3 className="text-2xl font-black mb-6">Resumen del Pedido 📋</h3>

            <div className="space-y-4 mb-6 border-b pb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6 border-b pb-6">
              <div>
                <p className="text-sm text-gray-500">Nombre</p>
                <p className="font-semibold">{shippingData.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dirección</p>
                <p className="font-semibold">{shippingData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ciudad</p>
                <p className="font-semibold">{shippingData.city}</p>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-black">
              <span>Total:</span>
              <span className="text-indigo-600">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
