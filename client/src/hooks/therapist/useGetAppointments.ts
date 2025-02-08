
import { useState, useEffect, useCallback } from "react";
import apiClient from "@/src/apiClient";
import { IAppointment } from "@/types/therapist/appointment";

export const useGetAppointments = () => {
   
    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAppointments = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.get<IAppointment[]>("/appointments/user");
            setAppointments(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error fetching appointments.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAppointments();
    }, [fetchAppointments]);

    return { appointments, loading, error, refetch: fetchAppointments };
};
