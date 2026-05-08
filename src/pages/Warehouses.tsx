import Navbar from '../components/Navbar';
import { useWarehouses } from '../hooks/useWarehouses';
import { useNavigate } from 'react-router-dom';
import { useWarehouse } from '../context/WarehouseContext';

const Warehouses = () => {
  const { warehouses, loading, error } = useWarehouses();
  const navigate = useNavigate();
  const { setWarehouse } = useWarehouse();

  const handleSelect = (w: any) => {
    setWarehouse(w);
    navigate(`/productos?bodega=${w.id}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Bodegas</h1>
        {loading && <p>Cargando bodegas...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {warehouses.map((w: any) => (
            <li key={w.id} className="border rounded p-4 bg-white shadow cursor-pointer hover:bg-gray-100" onClick={() => handleSelect(w)}>
              <h2 className="text-lg font-semibold">{w.name}</h2>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Warehouses;
