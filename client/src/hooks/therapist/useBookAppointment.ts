import { useState } from "react";
import apiClient from "@/src/apiClient";
import { AppointmentDto, IAppointment } from "@/types/therapist/appointment";

export const useBookAppointment = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const bookAppointment = async (appointmentData: AppointmentDto, onSuccess?: (appointment: IAppointment) => void) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post<IAppointment>("/appointments", appointmentData);
            if (onSuccess) onSuccess(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Error booking appointment.");
        } finally {
            setLoading(false);
        }
    };

    return { bookAppointment, loading, error };
};
