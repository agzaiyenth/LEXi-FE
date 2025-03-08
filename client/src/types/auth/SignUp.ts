export interface SignUpRequest {
    fullName: string;
    username: string;
    email: string;
    password: string;
    }

export interface SignupResponse {
    username: string;
    email: string;
    message: string;
}