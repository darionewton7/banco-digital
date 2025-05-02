import apiClient from "./api";

// Define interfaces for response types
interface AccountResponse {
  id: number;
  user_id: number;
  account_number: string;
  balance: string; // Received as string from backend
  created_at: string;
}

export const getMyAccounts = async (): Promise<AccountResponse[]> => {
  const response = await apiClient.get<AccountResponse[]>("/accounts");
  return response.data;
};

export const getAccountBalance = async (accountId: number): Promise<{ balance: string }> => {
  const response = await apiClient.get<{ balance: string }>(`/accounts/${accountId}/balance`);
  return response.data;
};

// Add other account-related API calls if needed

