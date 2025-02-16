import { useState, useEffect, useCallback } from "react";
import apiClient from "@/src/apiClient";
import { DocumentResponse } from "@/src/types/SmartRead/documentResponse";

export const useFetchDocument = (fileId: number) => {
    const [document, setDocument] = useState<DocumentResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDocumentDetails = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.get<DocumentResponse>(`/smartRead/file/fetch/${fileId}`);            
            setDocument(response.data);
            console.log(response.data);
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "Failed to fetch document details.";
            setError(errorMessage);
            console.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [fileId]);

    useEffect(() => {
        fetchDocumentDetails();
    }, [fetchDocumentDetails]);

    return { document, loading, error, refetch: fetchDocumentDetails };
};
