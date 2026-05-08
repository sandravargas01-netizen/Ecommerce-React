import { useState, useEffect } from 'react';
import api from '../services/api';

export function useProductsByWarehouse(warehouseId: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!warehouseId) return;
    setLoading(true);
    api.get(`/warehouses/${warehouseId}/products`)
      .then(res => setProducts(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [warehouseId]);

  return { products, loading, error };
}
