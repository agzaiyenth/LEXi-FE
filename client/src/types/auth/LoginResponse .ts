// types/auth.ts
export interface LoginRequest {
  username: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  username: string;
  fullName: string;
  roles: string[];
}
