import { useState, useEffect } from 'react';
import api from '../services/api';

export function useWarehouses() {
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/warehouses')
      .then(res => setWarehouses(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { warehouses, loading, error };
}
