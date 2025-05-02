import apiClient from "./api";

// Define interfaces for request/response types (optional but recommended)
interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: number;
  username: string;
  email: string;
}

interface AuthResponse {
  message: string;
  user?: UserResponse;
}

export const registerUser = async (data: RegisterData): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>("/register", data);
  return response.data;
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/login", credentials);
  // Optionally store user data or token from response here or in the component
  return response.data;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>("/logout");
  // Optionally clear stored user data or token here or in the component
  return response.data;
};

export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>("/@me");
  return response.data;
};

