import { string, unknown } from "zod";

const request = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T | undefined> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Http status ${response.status}`);
  }
  // post and patch
  if (
    response.headers.get("content-length") === "0" ||
    response.status === 204
  ) {
    return undefined as T;
  }
  const responseJson = await response.json();
  return responseJson;
};

export const apiClient = {
  get: <T>(url: string, signal?: AbortSignal) => request<T>(url, { signal }),
  post: <T>(url: string, body: unknown, signal?: AbortSignal) =>
    request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      signal,
      headers: { Content_Type: "application/json" },
    }),
  patch: <T>(url: string, body: unknown, signal?: AbortSignal) =>
    request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      signal,
      headers: { Content_Type: "application/json" },
    }),
  put: <T>(url: string, body: unknown, signal?: AbortSignal) =>
    request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      signal,
      headers: { Content_Type: "application/json" },
    }),
  delete: <T>(url: string, signal?: AbortSignal) =>
    request<T>(url, {
      method: "DELETE",
      signal,
    }),
  multiPartPost: <T>(url: string, body: FormData, signal?: AbortSignal) =>
    request<T>(url, {
      method: "POST",
      body,
      signal,
    }),
};
