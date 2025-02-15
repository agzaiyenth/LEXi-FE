import apiClient from "@/src/apiClient";
import { useState } from "react";

export const useStartTest = () => {
  const [loading, setLoading] = useState(false);

  const startTest = async (): Promise<number | null> => {
    setLoading(true);
    try {
      const response = await apiClient.post("/detection/start");
      return response.data.session; // Returns session ID
    } catch (error) {
      console.error("Error starting test:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { startTest, loading };
};
