import React from 'react';
import { useWarehouses } from '../hooks/useWarehouses';
import { useWarehouse } from '../context/WarehouseContext';
import { useNavigate } from 'react-router-dom';

const WarehouseSelector: React.FC = () => {
  const { warehouses, loading } = useWarehouses();
  const { setWarehouse } = useWarehouse();
  const navigate = useNavigate();

  const handleSelect = (w: any) => {
    setWarehouse(w);
    navigate(`/productos?bodega=${w.id}`);
  };

  if (loading) return <div>Cargando bodegas...</div>;

  return (
    <div className="flex gap-2">
      <select
        className="form-select rounded px-3 py-1 border"
        onChange={(e) => {
          const id = e.target.value;
          const w = warehouses.find((x: any) => String(x.id) === id);
          if (w) handleSelect(w);
        }}
      >
        <option value="">Seleccionar bodega</option>
        {warehouses.map((w: any) => (
          <option key={w.id} value={w.id}>{w.name}</option>
        ))}
      </select>
    </div>
  );
};

export default WarehouseSelector;
