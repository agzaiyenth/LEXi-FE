import { useState } from "react";
import apiClient from "@/src/apiClient";
import { AnswerSubmissionDTO } from "@/src/types/Detection/Question";


export const useSubmitAnswer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitAnswer = async (answerData: AnswerSubmissionDTO): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<string>("/detection/answer", answerData);
      return response.data; // Returns "Correct" or "Incorrect"
    } catch (err) {
      setError("Failed to submit answer. Please try again.");
      console.error("Error submitting answer:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitAnswer, loading, error };
};
