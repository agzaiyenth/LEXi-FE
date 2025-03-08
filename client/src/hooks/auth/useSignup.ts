import { useState } from 'react';
import Toast from 'react-native-toast-message';
import apiClient from '@/src/apiClient';
import { SignUpRequest, SignupResponse } from '@/src/types/auth/SignUp';

interface FieldErrors {
  fullName?: string;
  username?: string;
  email?: string;
  password?: string;
  message?: string;
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FieldErrors | null>(null);

  const signup = async (data: SignUpRequest): Promise<SignupResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post<SignupResponse>('/auth/signup', data);
      Toast.show({
        type: 'success',
        text1: response.data.message || 'Signup successful!'
      });
      return response.data;
    } catch (err: any) {
      // Check for field-specific errors in the response.
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
        Toast.show({
          type: 'error',
          text1: 'Sign Up Failed!',
          text2: "Please check the highlighted fields."
        });
      } else {
        const errorMessage = err.response?.data?.message || 'Signup failed!';
        setError({ message: errorMessage });
        Toast.show({
          type: 'error',
          text1: 'Sign Up Failed!',
          text2: errorMessage
        });
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
