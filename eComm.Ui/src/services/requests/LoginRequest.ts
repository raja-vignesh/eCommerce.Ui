import { LoginResponseSchema } from "../../sharedTypes/schemas/LoginResponseSchema";
import type { LoginRequestType } from "../../sharedTypes/types/LoginRequest.type";
import type { LoginResponseType } from "../../sharedTypes/types/LoginResponse.type";
import { apiClient } from "../apiClient/apiClient";

const apiBaseUrl = import.meta.env.VITE_USER_API_BASE_URL;

type LoginRequest = {
  request: LoginRequestType;
  signal?: AbortSignal;
};

export const loginRequest = async (loginRequest: LoginRequest) => {
  const formData = new FormData();
  formData.append("email", loginRequest.request.email);
  formData.append("password", loginRequest.request.password);
  const response = await apiClient.multiPartPost<LoginResponseType>(
    `${apiBaseUrl}/api/user/login`,
    formData,
    loginRequest.signal,
  );
  if (!response) {
    throw new Error("no user retrived");
  }
  const parsed = await LoginResponseSchema.safeParseAsync(response);

  if (!parsed.success) {
    console.error("user parsing failed", parsed.error.issues);
    console.error("zod error", parsed.error.message);
    throw new Error(parsed.error.message);
  }
  return parsed.data;
};
