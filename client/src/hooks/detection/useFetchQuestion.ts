import { useState, useEffect, useCallback } from "react";
import apiClient from "@/src/apiClient";
import { QuestionResponseDTO } from "@/src/types/Detection/Question";


export const useFetchQuestion = (sessionId: number | null) => {
  const [question, setQuestion] = useState<QuestionResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = useCallback(async () => {
    if (!sessionId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<QuestionResponseDTO>(`/detection/question/${sessionId}`);
      setQuestion(response.data);
    } catch (err) {
      setError("Failed to fetch question. Please try again.");
      console.error("Error fetching question:", err);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return { question, loading, error, fetchQuestion };
};
