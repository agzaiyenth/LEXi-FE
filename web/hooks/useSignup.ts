import { useState } from "react"
import axios from "axios"

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function signup(payload: {
    fullName: string
    username: string
    email: string
    password: string
    role: string
  }) {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", payload)
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}