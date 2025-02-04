import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/src/apiClient';
import { ITherapist } from '@/types/therapist/therapist';

export const useGetAllTherapist = () => {
  const [therapists, setTherapists] = useState<ITherapist[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTherapists = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<ITherapist[]>('/therapist');
      setTherapists(response.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'An error occurred while fetching therapists.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTherapists();
  }, [fetchTherapists]);

  return { therapists, loading, error, refetch: fetchTherapists };
}; 