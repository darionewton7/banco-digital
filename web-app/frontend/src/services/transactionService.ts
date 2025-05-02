import apiClient from "./api";

// Define interfaces for response/request types
interface TransactionResponse {
  id: number;
  account_id: number;
  type: string;
  amount: string; // Received as string
  description: string | null;
  timestamp: string;
  related_account_number: string | null;
}

interface TransferData {
  destination_account_number: string;
  amount: string; // Send as string
  description?: string;
}

export const getTransactions = async (accountId: number): Promise<TransactionResponse[]> => {
  const response = await apiClient.get<TransactionResponse[]>(`/accounts/${accountId}/transactions`);
  return response.data;
};

export const createTransfer = async (sourceAccountId: number, data: TransferData): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>(`/accounts/${sourceAccountId}/transfer`, data);
  return response.data;
};

