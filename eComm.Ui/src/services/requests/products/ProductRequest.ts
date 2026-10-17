import { PagedResponseSchema } from "../../../sharedTypes/schemas/pagedResult/PagedResponseSchema";
import type { PagedResponse } from "../../../sharedTypes/types/products/ProductsResponse.type";
import { apiClient } from "../../apiClient/apiClient";

const apiBaseUrl = import.meta.env.VITE_PRODUCTS_API_BASE_URL;

type ProductsQueryType = {
  pageNumber: number;
  pageSize: number;
  signal?: AbortSignal;
};

export const getProductsRequest = async ({
  pageNumber,
  pageSize,
  signal,
}: ProductsQueryType): Promise<PagedResponse> => {
  const response = await apiClient.get(
    `${apiBaseUrl}/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    signal,
  );
  console.log(response);
  if (!response) {
    throw new Error("no products retrived");
  }
  const parsed = await PagedResponseSchema.safeParseAsync(response);
  if (!parsed.success) {
    console.error("products parsing failed", parsed.error.issues);
    console.error("zod error", parsed.error.message);
    throw new Error(parsed.error.message);
  }
  return parsed.data;
};

export const searchProductsRequest = async ({
  searchTerm,
  pageNumber,
  pageSize,
  signal,
}: {
  searchTerm: string;
  pageNumber: number;
  pageSize: number;
  signal?: AbortSignal;
}): Promise<PagedResponse> => {
  const searchParams = new URLSearchParams({
    searchTerm,
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });

  const response = await apiClient.get<PagedResponse>(
    `${apiBaseUrl}/api/products/search?${searchParams}`,
    signal,
  );
  if (!response) {
    throw new Error("Search API returned no data");
  }
  const parsed = await PagedResponseSchema.safeParseAsync(response);
  if (!parsed.success) {
    console.error("products parsing failed", parsed.error.issues);
    console.error("zod error", parsed.error.message);
    throw new Error(parsed.error.message);
  }
  return parsed.data;
};
