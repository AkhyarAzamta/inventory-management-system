import { useState, useEffect } from 'react';
import axios from 'axios';

// Membatasi T agar memiliki properti id
type EntityWithId = { id: string | number };

type CrudHook<T extends EntityWithId> = {
  data: T[];
  loading: boolean;
  error: string | null;
  create: (newData: Omit<T, 'id'>) => Promise<void>; // id dihilangkan saat membuat data baru
  update: (id: T['id'], updatedData: Partial<T>) => Promise<void>; // Memperbolehkan partial update
  delete: (id: T['id']) => Promise<void>;
};

export function useCrud<T extends EntityWithId>(url: string): CrudHook<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const create = async (newData: Omit<T, 'id'>) => {
    try {
      const response = await axios.post(url, newData);
      setData((prev) => [...prev, response.data]);
    } catch (err) {
      setError('Failed to create data');
    }
  };

  const update = async (id: T['id'], updatedData: Partial<T>) => {
    try {
      const response = await axios.put(`${url}/${id}`, updatedData);
      setData((prev) =>
        prev.map((item) => (item.id === id ? response.data : item))
      );
    } catch (err) {
      setError('Failed to update data');
    }
  };

  const deleteItem = async (id: T['id']) => {
    try {
      await axios.delete(`${url}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError('Failed to delete data');
    }
  };

  return { data, loading, error, create, update, delete: deleteItem };
}
