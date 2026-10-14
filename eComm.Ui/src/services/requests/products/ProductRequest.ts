import { apiClient } from "../../apiClient/apiClient";

const apiBaseUrl = import.meta.env.VITE_USER_PRODUCTS_BASE_URL;

type ProductsQueryType = {
  pageNumber: number;
  pageSize: number;
  signal?: AbortSignal;
};

export const getProductsRequest = async ({
  pageNumber,
  pageSize,
  signal,
}: ProductsQueryType) => {
  const response = await apiClient.get(
    `${apiBaseUrl}/api/products/pageNumber=${pageNumber}/pageSize=${pageSize}`,
    signal,
  );
  console.log(response);
  if (!response) {
    throw new Error("no products retrived");
  }
  const parsed = response.safeParseAsync();
};
