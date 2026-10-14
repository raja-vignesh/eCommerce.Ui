import { PagedResponseSchema } from "../../../sharedTypes/schemas/pagedResult/PagedResponseSchema";
import { ProductsResponseSchema } from "../../../sharedTypes/schemas/Products/ProductResponseSchema";
import type {
  PagedResponse,
  ProductsResponse,
} from "../../../sharedTypes/types/products/ProductsResponse.type";
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
