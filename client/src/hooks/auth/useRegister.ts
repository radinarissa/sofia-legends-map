import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/axios";
import useAuth from "./useAuth";
import type { AuthResponse, RegisterData } from "../../types/user";

async function registerRequest(data: RegisterData): Promise<AuthResponse> {
  const { data: response } = await api.post<AuthResponse>("/auth/register", data);
  return response;
}

export default function useRegister() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: registerRequest,
    onSuccess: (response) => login(response), 
  });
}