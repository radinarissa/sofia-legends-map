import { useMutation } from "@tanstack/react-query";
import { api } from "../../api/axios";
import useAuth from "./useAuth";
import type { AuthResponse, LoginData } from "../../types/user";

async function loginRequest(data: LoginData): Promise<AuthResponse> {
  const { data: response } = await api.post<AuthResponse>("/auth/login", data);
  return response;
}

export default function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => login(response), 
  });
}