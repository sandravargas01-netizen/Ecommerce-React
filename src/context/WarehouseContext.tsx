import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface Warehouse {
  id: string;
  name: string;
}

interface WarehouseContextType {
  selectedWarehouse: Warehouse | null;
  setWarehouse: (warehouse: Warehouse) => void;
}

const WarehouseContext = createContext<WarehouseContextType | undefined>(undefined);

export const WarehouseProvider = ({ children }: { children: ReactNode }) => {
  const [selectedWarehouse, setWarehouse] = useState<Warehouse | null>(null);

  return (
    <WarehouseContext.Provider value={{ selectedWarehouse, setWarehouse }}>
      {children}
    </WarehouseContext.Provider>
  );
};

export const useWarehouse = () => {
  const context = useContext(WarehouseContext);
  if (!context) throw new Error('useWarehouse must be used within WarehouseProvider');
  return context;
};