import { useState, useEffect, useCallback } from "react";
import apiClient from "@/src/apiClient";
import { FetchAllDocsDto } from "@/types/SmartRead/Documents";

export const useGetAllDocuments = () => {
    const [documents, setDocuments] = useState<FetchAllDocsDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const FetchDocs = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.get<FetchAllDocsDto[]>("//smartRead/file"); 
            setDocuments(response.data);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Error fetching documents.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        FetchDocs();
    }, [FetchDocs]);

    return { documents, loading, error, refetch: FetchDocs };
};