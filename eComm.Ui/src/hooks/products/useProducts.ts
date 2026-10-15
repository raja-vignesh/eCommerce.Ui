import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { getProductsRequest } from "../../services/requests/products/ProductRequest";
import { QUERY_STALE_TIME } from "../../constants/queryContants";
import type { PagedResponse } from "../../sharedTypes/types/products/ProductsResponse.type";

export const useProducts = (
  pageNumber: number,
  pageSize: number,
): UseQueryResult<PagedResponse, Error> => {
  return useQuery({
    queryKey: ["products", pageNumber, pageSize],
    queryFn: ({ signal }) => {
      return getProductsRequest({
        pageNumber,
        pageSize,
        signal,
      });
    },
    staleTime: QUERY_STALE_TIME.ONE_MINUTE,
  });
};
