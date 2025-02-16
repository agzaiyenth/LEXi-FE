
import { useState, useEffect, useCallback } from "react";
import apiClient from "@/src/apiClient";
import { IAvailability } from "@/src/types/therapist/availability";

export const useGetAvailability = (therapistId: string) => {
    const [availability, setAvailability] = useState<IAvailability[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAvailability = useCallback(async () => {
        if (!therapistId) return;
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.get<IAvailability[]>(`/therapists/${therapistId}/availabilities`);
            setAvailability(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error fetching availability.");
        } finally {
            setLoading(false);
        }
    }, [therapistId]);

    useEffect(() => {
        fetchAvailability();
    }, [fetchAvailability]);

    return { availability, loading, error, refetch: fetchAvailability };
};
